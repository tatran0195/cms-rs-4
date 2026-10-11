//! `cms-outbox` — durable transactional outbox queue for background processing and integrations.
//!
//! Every asynchronous side effect (webhooks, email dispatches, notification delivery, index rebuilding)
//! writes an `outbox_events` row inside the caller's database transaction.
//! A dedicated background worker polls with `FOR UPDATE SKIP LOCKED` and jittered backoff.

pub mod backoff;
pub mod handler;
pub mod queue;
pub mod worker;

pub use handler::{Handler, HandlerCtx, HandlerError, Registry};
pub use queue::{OutboxRow, queue_in_tx};
pub use worker::{Worker, WorkerConfig};

use thiserror::Error;

#[derive(Debug, Error)]
pub enum OutboxError {
    #[error("queue write failed: {0}")]
    QueueWrite(#[from] sqlx::Error),

    #[error("handler not registered for event_type {0}")]
    HandlerNotFound(String),

    #[error("worker shutdown")]
    Shutdown,

    #[error("outbox error: {0}")]
    Other(String),
}
