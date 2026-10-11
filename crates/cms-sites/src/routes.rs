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
    models::{CreateSiteRequest, Site, UpdateSiteRequest},
    queries::SiteQueries,
};

pub async fn list_sites(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
) -> Result<Json<Vec<Site>>, AppError> {
    require_permission(&claims, Permissions::sites::LIST)?;

    let sites = SiteQueries::list_sites(&state.db, claims.tenant_id)
        .await
        .map_err(AppError::from)?;

    // If user has site scoping, filter by assigned site_ids
    if claims.role != "super_admin" && claims.role != "org_admin" {
        let filtered = sites
            .into_iter()
            .filter(|s| claims.site_ids.contains(&s.id))
            .collect();
        return Ok(Json(filtered));
    }

    Ok(Json(sites))
}

pub async fn get_site(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path(id): Path<Uuid>,
) -> Result<Json<Site>, AppError> {
    require_permission(&claims, Permissions::sites::VIEW)?;
    require_site_access(&claims, &id)?;

    let site = SiteQueries::get_site_by_id(&state.db, claims.tenant_id, id)
        .await
        .map_err(AppError::from)?
        .ok_or_else(|| AppError::NotFound("Site not found".to_string()))?;

    Ok(Json(site))
}

pub async fn create_site(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Json(body): Json<CreateSiteRequest>,
) -> Result<(StatusCode, Json<Site>), AppError> {
    require_permission(&claims, Permissions::sites::CREATE)?;

    let site = SiteQueries::create_site(&state.db, claims.tenant_id, &body)
        .await
        .map_err(AppError::from)?;

    Ok((StatusCode::CREATED, Json(site)))
}

pub async fn update_site(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateSiteRequest>,
) -> Result<Json<Site>, AppError> {
    require_permission(&claims, Permissions::sites::UPDATE)?;
    require_site_access(&claims, &id)?;

    let site = SiteQueries::update_site(&state.db, claims.tenant_id, id, &body)
        .await
        .map_err(AppError::from)?
        .ok_or_else(|| AppError::NotFound("Site not found".to_string()))?;

    Ok(Json(site))
}

pub async fn delete_site(
    State(state): State<AppState>,
    Extension(claims): Extension<Claims>,
    Path(id): Path<Uuid>,
) -> Result<StatusCode, AppError> {
    require_permission(&claims, Permissions::sites::DELETE)?;
    require_site_access(&claims, &id)?;

    let deleted = SiteQueries::delete_site(&state.db, claims.tenant_id, id)
        .await
        .map_err(AppError::from)?;

    if !deleted {
        return Err(AppError::NotFound("Site not found".to_string()));
    }

    Ok(StatusCode::NO_CONTENT)
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/api/sites", get(list_sites).post(create_site))
        .route(
            "/api/sites/{id}",
            get(get_site).put(update_site).delete(delete_site),
        )
}
