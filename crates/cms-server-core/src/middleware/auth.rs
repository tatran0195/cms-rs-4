use axum::{
    extract::{Request, State},
    http::header::AUTHORIZATION,
    middleware::Next,
    response::Response,
};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{error::AppError, state::AppState};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub sub: Uuid,
    pub tenant_id: Uuid,
    pub email: String,
    pub role: String,
    #[serde(default)]
    pub permissions: Vec<String>,
    #[serde(default)]
    pub site_ids: Vec<Uuid>,
    pub exp: usize,
}

pub fn encode_jwt(claims: &Claims, key: &EncodingKey) -> Result<String, jsonwebtoken::errors::Error> {
    encode(&Header::default(), claims, key)
}

pub fn decode_jwt(token: &str, key: &DecodingKey) -> Result<Claims, jsonwebtoken::errors::Error> {
    let mut validation = Validation::default();
    validation.validate_exp = true;
    let data = decode::<Claims>(token, key, &validation)?;
    Ok(data.claims)
}

pub async fn auth_middleware(
    State(state): State<AppState>,
    mut request: Request,
    next: Next,
) -> Result<Response, AppError> {
    // 1. Try Authorization header: Bearer <token>, then 2. cookie
    let token = request
        .headers()
        .get(AUTHORIZATION)
        .and_then(|auth_header| auth_header.to_str().ok())
        .and_then(|auth_str| auth_str.strip_prefix("Bearer "))
        .map(|bearer| bearer.trim().to_string())
        .or_else(|| {
            request
                .headers()
                .get(axum::http::header::COOKIE)
                .and_then(|v| v.to_str().ok())
                .and_then(|cookies| {
                    cookies.split(';').find_map(|c| {
                        let (name, val) = c.trim().split_once('=')?;
                        if name == "access_token" {
                            Some(val.to_string())
                        } else {
                            None
                        }
                    })
                })
        });

    let Some(raw_token) = token else {
        return Err(AppError::Unauthorized);
    };

    let claims = decode_jwt(&raw_token, &state.jwt_decoding_key)
        .map_err(|_| AppError::Unauthorized)?;

    request.extensions_mut().insert(claims);

    Ok(next.run(request).await)
}
