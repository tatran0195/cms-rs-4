use std::env;

#[derive(Debug, Clone)]
pub struct AppConfig {
    pub host: String,
    pub port: u16,
    pub database_url: String,
    pub jwt_secret: String,
    pub cors_origin: String,
    pub secure_cookies: bool,
}

impl AppConfig {
    pub fn from_env() -> Self {
        let host = env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
        let port = env::var("PORT")
            .ok()
            .and_then(|p| p.parse().ok())
            .unwrap_or(3000);
        let database_url = env::var("DATABASE_URL")
            .unwrap_or_else(|_| "postgres://postgres:postgres@127.0.0.1:5432/cms".to_string());
        let jwt_secret = env::var("JWT_SECRET").unwrap_or_else(|_| {
            "cms_secret_jwt_key_at_least_32_bytes_long_1234567890".to_string()
        });
        let cors_origin = env::var("CORS_ORIGIN").unwrap_or_else(|_| {
            "http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001".to_string()
        });
        let secure_cookies = env::var("SECURE_COOKIES")
            .is_ok_and(|v| v == "true" || v == "1");

        Self {
            host,
            port,
            database_url,
            jwt_secret,
            cors_origin,
            secure_cookies,
        }
    }
}
