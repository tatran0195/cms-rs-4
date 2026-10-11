use axum::{
    extract::{Path, State},
    http::StatusCode,
    routing::get,
    Extension, Json, Router,
};
use cms_core::Permissions;
use cms_server_core::{
    error::AppError,
    middleware::{
        auth::Claims,
        authorization::{require_permission, require_site_access},
    },
    state::AppState,
};
use uuid::Uuid;

use crate::{
    models::{CreateDocPageRequest, DocPage, UpdateDocPageRequest},
    queries::DocQueries,
};

pub async fn list_docs(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path(site_id): Path<Uuid>,
) -> Result<Json<Vec<DocPage>>, AppError> {
    require_permission(&claims, Permissions::docs::LIST)?;
    require_site_access(&claims, &site_id)?;

    let docs = DocQueries::list_docs(&state.db, claims.tenant_id, site_id)
        .await
        .map_err(AppError::from)?;

    Ok(Json(docs))
}

pub async fn create_doc(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path(site_id): Path<Uuid>,
    Json(body): Json<CreateDocPageRequest>,
) -> Result<(StatusCode, Json<DocPage>), AppError> {
    require_permission(&claims, Permissions::docs::CREATE)?;
    require_site_access(&claims, &site_id)?;

    let doc = DocQueries::create_doc(&state.db, claims.tenant_id, site_id, &body)
        .await
        .map_err(AppError::from)?;

    Ok((StatusCode::CREATED, Json(doc)))
}

pub async fn get_doc_by_slug(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path((site_id, slug)): Path<(Uuid, String)>,
) -> Result<Json<DocPage>, AppError> {
    require_permission(&claims, Permissions::docs::VIEW)?;
    require_site_access(&claims, &site_id)?;

    let doc = DocQueries::get_doc_by_slug(&state.db, claims.tenant_id, site_id, &slug)
        .await
        .map_err(AppError::from)?
        .ok_or_else(|| AppError::NotFound("Document not found".to_string()))?;

    Ok(Json(doc))
}

pub async fn update_doc(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path((site_id, id)): Path<(Uuid, Uuid)>,
    Json(body): Json<UpdateDocPageRequest>,
) -> Result<Json<DocPage>, AppError> {
    require_permission(&claims, Permissions::docs::UPDATE)?;
    require_site_access(&claims, &site_id)?;

    let doc = DocQueries::update_doc(&state.db, claims.tenant_id, site_id, id, &body)
        .await
        .map_err(AppError::from)?
        .ok_or_else(|| AppError::NotFound("Document not found".to_string()))?;

    Ok(Json(doc))
}

pub async fn delete_doc(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path((site_id, id)): Path<(Uuid, Uuid)>,
) -> Result<StatusCode, AppError> {
    require_permission(&claims, Permissions::docs::DELETE)?;
    require_site_access(&claims, &site_id)?;

    let deleted = DocQueries::delete_doc(&state.db, claims.tenant_id, site_id, id)
        .await
        .map_err(AppError::from)?;

    if !deleted {
        return Err(AppError::NotFound("Document not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/api/sites/{site_id}/docs", get(list_docs).post(create_doc))
        .route("/api/sites/{site_id}/docs/{slug}", get(get_doc_by_slug))
        .route(
            "/api/sites/{site_id}/docs/id/{id}",
            axum::routing::put(update_doc).delete(delete_doc),
        )
}
