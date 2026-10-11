use axum::{
    Extension, Json, Router,
    extract::{
        Path, Query, State,
        ws::{Message, WebSocket, WebSocketUpgrade},
    },
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post, put},
};
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use cms_server_core::{
    error::AppError,
    middleware::auth::Claims,
    notification_hub::{EventScope, NotificationEvent, user_topic},
    state::AppState,
};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Notification {
    pub id: Uuid,
    pub kind: String,
    pub title: String,
    pub body: Option<String>,
    pub category: Option<String>,
    pub entity_type: Option<String>,
    pub entity_id: Option<Uuid>,
    pub action_url: Option<String>,
    pub is_read: bool,
    pub read_at: Option<chrono::DateTime<chrono::Utc>>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Deserialize)]
pub struct ListNotificationsQuery {
    pub unread: Option<bool>,
    pub limit: Option<i64>,
}

#[derive(Debug, Serialize)]
pub struct NotificationListResponse {
    pub notifications: Vec<Notification>,
    pub unread_count: i64,
}

#[derive(Debug, Serialize)]
pub struct UnreadCountResponse {
    pub unread_count: i64,
}

const SELECT_COLS: &str = "id, kind, title, body, category, entity_type, entity_id, action_url, is_read, read_at, created_at";

pub async fn list_notifications(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Query(params): Query<ListNotificationsQuery>,
) -> Result<Json<NotificationListResponse>, AppError> {
    let limit = params.limit.unwrap_or(30).clamp(1, 100);

    let sql = if params.unread.unwrap_or(false) {
        format!(
            "SELECT {SELECT_COLS} FROM notifications \
             WHERE tenant_id = $1 AND user_id = $2 AND is_read = false \
             ORDER BY created_at DESC LIMIT $3"
        )
    } else {
        format!(
            "SELECT {SELECT_COLS} FROM notifications \
             WHERE tenant_id = $1 AND user_id = $2 \
             ORDER BY created_at DESC LIMIT $3"
        )
    };

    let notifications: Vec<Notification> = sqlx::query_as(&sql)
        .bind(claims.tenant_id)
        .bind(claims.sub)
        .bind(limit)
        .fetch_all(&state.db)
        .await
        .map_err(AppError::Database)?;

    let unread_count: (i64,) = sqlx::query_as(
        "SELECT COUNT(*) FROM notifications WHERE tenant_id = $1 AND user_id = $2 AND is_read = false",
    )
    .bind(claims.tenant_id)
    .bind(claims.sub)
    .fetch_one(&state.db)
    .await
    .map_err(AppError::Database)?;

    Ok(Json(NotificationListResponse {
        notifications,
        unread_count: unread_count.0,
    }))
}

pub async fn notifications_unread_count(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<UnreadCountResponse>, AppError> {
    let unread_count: (i64,) = sqlx::query_as(
        "SELECT COUNT(*) FROM notifications WHERE tenant_id = $1 AND user_id = $2 AND is_read = false",
    )
    .bind(claims.tenant_id)
    .bind(claims.sub)
    .fetch_one(&state.db)
    .await
    .map_err(AppError::Database)?;

    Ok(Json(UnreadCountResponse {
        unread_count: unread_count.0,
    }))
}

pub async fn mark_as_read(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path(id): Path<Uuid>,
) -> Result<StatusCode, AppError> {
    let rows_affected = sqlx::query(
        r#"
        UPDATE notifications
           SET is_read = true,
               read_at = NOW()
         WHERE id = $1 AND tenant_id = $2 AND user_id = $3
        "#,
    )
    .bind(id)
    .bind(claims.tenant_id)
    .bind(claims.sub)
    .execute(&state.db)
    .await
    .map_err(AppError::Database)?
    .rows_affected();

    if rows_affected == 0 {
        return Err(AppError::NotFound("Notification not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}

pub async fn mark_all_read(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
) -> Result<StatusCode, AppError> {
    sqlx::query(
        r#"
        UPDATE notifications
           SET is_read = true,
               read_at = NOW()
         WHERE tenant_id = $1 AND user_id = $2 AND is_read = false
        "#,
    )
    .bind(claims.tenant_id)
    .bind(claims.sub)
    .execute(&state.db)
    .await
    .map_err(AppError::Database)?;

    Ok(StatusCode::NO_CONTENT)
}

pub async fn ws_handler(
    ws: WebSocketUpgrade,
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_socket(socket, state, claims))
}

async fn handle_socket(socket: WebSocket, state: AppState, claims: Claims) {
    let (mut sender, mut receiver) = socket.split();
    let topic = user_topic(claims.sub);
    let mut hub_rx = state.notification_hub.subscribe(&topic).await;

    let mut send_task = tokio::spawn(async move {
        while let Ok(event) = hub_rx.recv().await {
            if let Ok(msg_json) = serde_json::to_string(&*event) {
                if sender.send(Message::Text(msg_json.into())).await.is_err() {
                    break;
                }
            }
        }
    });

    let mut recv_task = tokio::spawn(async move {
        while let Some(Ok(msg)) = receiver.next().await {
            if let Message::Close(_) = msg {
                break;
            }
        }
    });

    tokio::select! {
        _ = (&mut send_task) => recv_task.abort(),
        _ = (&mut recv_task) => send_task.abort(),
    };
}

/// Helper function to create an in-app notification in DB and broadcast to real-time subscribers.
#[allow(clippy::too_many_arguments)]
pub async fn create_notification(
    state: &AppState,
    tenant_id: Uuid,
    user_id: Uuid,
    kind: &str,
    title: &str,
    body: Option<&str>,
    category: Option<&str>,
    entity_type: Option<&str>,
    entity_id: Option<Uuid>,
    action_url: Option<&str>,
) -> Result<Uuid, AppError> {
    let id: (Uuid,) = sqlx::query_as(
        r#"
        INSERT INTO notifications (
            tenant_id, user_id, kind, title, body, category, entity_type, entity_id, action_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
        "#,
    )
    .bind(tenant_id)
    .bind(user_id)
    .bind(kind)
    .bind(title)
    .bind(body)
    .bind(category)
    .bind(entity_type)
    .bind(entity_id)
    .bind(action_url)
    .fetch_one(&state.db)
    .await
    .map_err(AppError::Database)?;

    state
        .notification_hub
        .publish(
            &[user_topic(user_id)],
            NotificationEvent {
                id: id.0,
                tenant_id,
                kind: kind.to_string(),
                title: title.to_string(),
                body: body.map(ToString::to_string),
                category: category.map(ToString::to_string),
                entity_type: entity_type.map(ToString::to_string),
                entity_id,
                action_url: action_url.map(ToString::to_string),
                scope: EventScope::Inbox,
            },
        )
        .await;

    Ok(id.0)
}

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/api/notifications", get(list_notifications))
        .route("/api/notifications/unread-count", get(notifications_unread_count))
        .route("/api/notifications/{id}/read", put(mark_as_read))
        .route("/api/notifications/read-all", post(mark_all_read))
        .route("/api/notifications/ws", get(ws_handler))
}
