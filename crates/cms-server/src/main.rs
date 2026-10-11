mod routes;

use axum::http::{header, HeaderValue, Method};
use cms_db::{create_pool, init_schema};
use cms_server_core::{
    config::AppConfig,
    state::{AppState, CookieConfig},
};
use jsonwebtoken::{DecodingKey, EncodingKey};
use std::net::SocketAddr;
use tower_http::{
    cors::{AllowOrigin, CorsLayer},
    trace::TraceLayer,
};
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1. Load .env file
    dotenvy::dotenv().ok();

    // 2. Setup logging
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info,cms_server=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    info!("Starting CMS Documentation Platform Server...");

    // 3. Load config
    let config = AppConfig::from_env();
    info!("Configuration loaded. Host: {}, Port: {}", config.host, config.port);

    // 4. Connect to database
    let pool = create_pool(&config.database_url).await?;
    info!("Connected to PostgreSQL database at {}", config.database_url);

    // 5. Initialize schema
    init_schema(&pool).await?;

    // 6. JWT Keys
    let jwt_encoding_key = EncodingKey::from_secret(config.jwt_secret.as_bytes());
    let jwt_decoding_key = DecodingKey::from_secret(config.jwt_secret.as_bytes());

    // 7. Cookie Config
    let cookie_config = CookieConfig {
        secure: config.secure_cookies,
        domain: None,
        same_site: "Lax".to_string(),
    };

    // 8. Notification Hub
    let notification_hub = cms_server_core::notification_hub::NotificationHub::new();

    // 9. Build AppState
    let state = AppState {
        db: pool.clone(),
        jwt_encoding_key,
        jwt_decoding_key,
        cookie_config,
        notification_hub,
    };

    // 10. Spawn Outbox Background Worker
    let registry = std::sync::Arc::new(cms_outbox::Registry::new());
    let worker_config = cms_outbox::WorkerConfig::default();
    let outbox_worker = cms_outbox::Worker::new(pool, registry, worker_config);
    let _outbox_shutdown = outbox_worker.spawn();
    info!("CMS Outbox background worker spawned.");

    // 9. Build router
    let app = routes::build_router(state);

    // 10. CORS configuration
    let allowed_origins: Vec<HeaderValue> = config
        .cors_origin
        .split(',')
        .filter_map(|s| s.trim().parse().ok())
        .collect();

    let cors = CorsLayer::new()
        .allow_origin(AllowOrigin::list(allowed_origins))
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::OPTIONS,
        ])
        .allow_headers([
            header::AUTHORIZATION,
            header::CONTENT_TYPE,
            header::ACCEPT,
            header::HeaderName::from_static("x-csrf-token"),
        ])
        .allow_credentials(true);

    let app = app.layer(cors).layer(TraceLayer::new_for_http());

    // 11. Bind and serve
    let addr: SocketAddr = format!("{}:{}", config.host, config.port).parse()?;
    info!("Server listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .with_graceful_shutdown(shutdown_signal())
    .await?;

    info!("Server shutdown cleanly.");
    Ok(())
}

async fn shutdown_signal() {
    let _ = tokio::signal::ctrl_c().await;
    info!("Shutdown signal received, draining active connections...");
}
