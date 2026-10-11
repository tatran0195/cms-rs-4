use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Unauthorized")]
    Unauthorized,

    #[error("Forbidden: {0}")]
    ForbiddenMessage(String),

    #[error("Forbidden")]
    Forbidden,

    #[error("Not Found: {0}")]
    NotFound(String),

    #[error("Bad Request: {0}")]
    BadRequest(String),

    #[error("Conflict: {0}")]
    Conflict(String),

    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Internal server error: {0}")]
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message, code) = match &self {
            Self::Unauthorized => (StatusCode::UNAUTHORIZED, "Unauthorized".to_string(), "UNAUTHORIZED"),
            Self::Forbidden => (StatusCode::FORBIDDEN, "Forbidden".to_string(), "FORBIDDEN"),
            Self::ForbiddenMessage(msg) => (StatusCode::FORBIDDEN, msg.clone(), "FORBIDDEN"),
            Self::NotFound(msg) => (StatusCode::NOT_FOUND, msg.clone(), "NOT_FOUND"),
            Self::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg.clone(), "BAD_REQUEST"),
            Self::Conflict(msg) => (StatusCode::CONFLICT, msg.clone(), "CONFLICT"),
            Self::Database(err) => {
                tracing::error!("Database error: {:?}", err);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Internal database error".to_string(),
                    "DATABASE_ERROR",
                )
            }
            Self::Internal(msg) => {
                tracing::error!("Internal error: {}", msg);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    msg.clone(),
                    "INTERNAL_ERROR",
                )
            }
        };

        let body = Json(json!({
            "message": message,
            "code": code,
            "status": status.as_u16(),
        }));

        (status, body).into_response()
    }
}
