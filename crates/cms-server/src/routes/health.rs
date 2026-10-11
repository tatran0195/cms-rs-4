use axum::{extract::State, Json};
use cms_server_core::state::AppState;
use serde_json::{json, Value};

#[allow(clippy::redundant_pub_crate)]
pub(crate) async fn health_check(State(state): State<AppState>) -> Json<Value> {
    let db_ok = sqlx::query_scalar::<_, i32>("SELECT 1")
        .fetch_one(&state.db)
        .await
        .is_ok();

    Json(json!({
        "status": if db_ok { "ok" } else { "degraded" },
        "service": "cms-server",
        "database": if db_ok { "connected" } else { "disconnected" },
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}
