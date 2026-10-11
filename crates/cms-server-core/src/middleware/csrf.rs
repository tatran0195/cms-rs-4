use axum::{
    extract::Request,
    http::{header::HeaderName, Method},
    middleware::Next,
    response::Response,
};

use crate::error::AppError;

static CSRF_HEADER: HeaderName = HeaderName::from_static("x-csrf-token");

pub async fn csrf_middleware(request: Request, next: Next) -> Result<Response, AppError> {
    // Safe HTTP methods do not mutate state — skip CSRF check
    if matches!(
        *request.method(),
        Method::GET | Method::HEAD | Method::OPTIONS | Method::TRACE
    ) {
        return Ok(next.run(request).await);
    }

    // Bearer token requests (e.g. mobile/CLI/external API) don't use cookies — skip CSRF
    if let Some(auth_header) = request.headers().get(axum::http::header::AUTHORIZATION) {
        if let Ok(val) = auth_header.to_str() {
            if val.starts_with("Bearer ") {
                return Ok(next.run(request).await);
            }
        }
    }

    // For cookie requests, check cookie matches header
    let cookie_token = request
        .headers()
        .get(axum::http::header::COOKIE)
        .and_then(|v| v.to_str().ok())
        .and_then(|cookies| {
            cookies.split(';').find_map(|c| {
                let (name, val) = c.trim().split_once('=')?;
                if name == "csrf_token" {
                    Some(val.to_string())
                } else {
                    None
                }
            })
        });

    let header_token = request
        .headers()
        .get(&CSRF_HEADER)
        .and_then(|v| v.to_str().ok())
        .map(ToString::to_string);

    match (cookie_token, header_token) {
        (Some(c), Some(h)) if c == h && !c.is_empty() => Ok(next.run(request).await),
        _ => Err(AppError::ForbiddenMessage("CSRF token missing or invalid".to_string())),
    }
}
