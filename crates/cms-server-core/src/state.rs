use jsonwebtoken::{DecodingKey, EncodingKey};
use sqlx::PgPool;

#[derive(Debug, Clone)]
pub struct CookieConfig {
    pub secure: bool,
    pub domain: Option<String>,
    pub same_site: String,
}

impl Default for CookieConfig {
    fn default() -> Self {
        Self {
            secure: false,
            domain: None,
            same_site: "Lax".to_string(),
        }
    }
}

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    pub jwt_encoding_key: EncodingKey,
    pub jwt_decoding_key: DecodingKey,
    pub cookie_config: CookieConfig,
    pub notification_hub: crate::notification_hub::NotificationHub,
}

impl std::fmt::Debug for AppState {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("AppState")
            .field("db", &"PgPool")
            .field("jwt_encoding_key", &"[redacted]")
            .field("jwt_decoding_key", &"[redacted]")
            .field("cookie_config", &self.cookie_config)
            .field("notification_hub", &"NotificationHub")
            .finish()
    }
}
