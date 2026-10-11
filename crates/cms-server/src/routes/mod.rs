#[allow(clippy::redundant_pub_crate)]
pub(crate) mod health;

use axum::{
    middleware::from_fn_with_state,
    routing::get,
    Router,
};
use cms_server_core::{
    middleware::{auth_middleware, rate_limit_middleware, RateLimiter},
    state::AppState,
};
use std::time::Duration;

#[allow(clippy::redundant_pub_crate)]
pub(crate) fn build_router(state: AppState) -> Router {
    // 1. Rate limiter for login endpoint (5 attempts per 60s)
    let login_limiter = RateLimiter::new(5, Duration::from_secs(60));

    // Rate-limited auth routes
    let public_auth = cms_auth::router()
        .layer(from_fn_with_state(login_limiter, rate_limit_middleware));

    // 2. Public routes (no JWT required)
    let public_routes = Router::new()
        .route("/api/health", get(health::health_check))
        .merge(public_auth);

    // 3. Protected routes (require auth_middleware)
    let protected_routes = Router::new()
        .merge(cms_auth::protected_router())
        .merge(cms_sites::router())
        .merge(cms_docs::router())
        .merge(cms_notifications::routes())
        .layer(from_fn_with_state(state.clone(), auth_middleware));

    // 4. Combined router
    Router::new()
        .merge(public_routes)
        .merge(protected_routes)
        .with_state(state)
}
