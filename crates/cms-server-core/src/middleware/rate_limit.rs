use std::{
    collections::HashMap,
    net::IpAddr,
    sync::{Arc, Mutex},
    time::{Duration, Instant},
};

use axum::{
    extract::{ConnectInfo, Request, State},
    middleware::Next,
    response::Response,
};

use crate::error::AppError;

#[derive(Debug, Clone)]
pub struct RateLimiter {
    attempts: Arc<Mutex<HashMap<IpAddr, Vec<Instant>>>>,
    max_attempts: usize,
    window: Duration,
}

impl RateLimiter {
    pub fn new(max_attempts: usize, window: Duration) -> Self {
        Self {
            attempts: Arc::new(Mutex::new(HashMap::new())),
            max_attempts,
            window,
        }
    }

    pub fn check(&self, ip: IpAddr) -> bool {
        let now = Instant::now();
        let Ok(mut map) = self.attempts.lock() else {
            return true;
        };

        let entry = map.entry(ip).or_default();
        entry.retain(|&t| now.duration_since(t) < self.window);

        if entry.len() >= self.max_attempts {
            false
        } else {
            entry.push(now);
            true
        }
    }
}

pub async fn rate_limit_middleware(
    State(limiter): State<RateLimiter>,
    request: Request,
    next: Next,
) -> Result<Response, AppError> {
    let client_ip = request
        .extensions()
        .get::<ConnectInfo<std::net::SocketAddr>>()
        .map_or(IpAddr::V4(std::net::Ipv4Addr::LOCALHOST), |ci| ci.0.ip());

    if !limiter.check(client_ip) {
        return Err(AppError::BadRequest(
            "Too many requests. Please try again later.".to_string(),
        ));
    }

    Ok(next.run(request).await)
}
