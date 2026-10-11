use async_trait::async_trait;
use serde_json::Value;
use sqlx::PgPool;
use std::collections::HashMap;
use std::sync::Arc;
use thiserror::Error;
use uuid::Uuid;

#[derive(Clone, Debug)]
pub struct HandlerCtx {
    pub pool: PgPool,
    pub tenant_id: Uuid,
    pub event_id: Uuid,
    pub event_type: String,
    pub actor_user_id: Option<Uuid>,
    pub attempts: i32,
    pub http_client: reqwest::Client,
}

#[derive(Debug, Error)]
pub enum HandlerError {
    #[error("transient failure: {0}")]
    Transient(String),

    #[error("permanent failure: {0}")]
    Permanent(String),
}

#[async_trait]
pub trait Handler: Send + Sync + std::fmt::Debug {
    fn event_type(&self) -> &'static str;
    async fn handle(&self, ctx: &HandlerCtx, payload: &Value) -> Result<Value, HandlerError>;
}

#[derive(Debug, Default)]
pub struct Registry {
    handlers: HashMap<&'static str, Arc<dyn Handler>>,
}

impl Registry {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn register<H: Handler + 'static>(&mut self, handler: H) {
        let key = handler.event_type();
        self.handlers.insert(key, Arc::new(handler));
    }

    pub fn lookup(&self, event_type: &str) -> Option<Arc<dyn Handler>> {
        self.handlers.get(event_type).cloned()
    }

    pub fn len(&self) -> usize {
        self.handlers.len()
    }

    pub fn is_empty(&self) -> bool {
        self.handlers.is_empty()
    }
}
