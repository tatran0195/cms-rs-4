use std::sync::Arc;
use std::time::Duration as StdDuration;
use chrono::Utc;
use serde_json::Value;
use sqlx::PgPool;
use tokio::sync::watch;
use tokio::time::interval;
use uuid::Uuid;

use crate::backoff::{MAX_ATTEMPTS, next_retry_at};
use crate::handler::{HandlerCtx, HandlerError, Registry};

#[derive(Clone, Debug)]
pub struct WorkerConfig {
    pub poll_interval: StdDuration,
    pub batch_size: i32,
    pub worker_id: String,
    pub stale_claim_sweep_interval: StdDuration,
    pub stale_claim_threshold: StdDuration,
    pub http_client: reqwest::Client,
}

impl Default for WorkerConfig {
    fn default() -> Self {
        Self {
            poll_interval: StdDuration::from_secs(2),
            batch_size: 32,
            worker_id: format!("worker-{}", Uuid::new_v4()),
            stale_claim_sweep_interval: StdDuration::from_secs(5 * 60),
            stale_claim_threshold: StdDuration::from_secs(10 * 60),
            http_client: reqwest::Client::new(),
        }
    }
}

#[derive(Debug)]
pub struct Worker {
    pool: PgPool,
    registry: Arc<Registry>,
    config: WorkerConfig,
}

impl Worker {
    pub fn new(pool: PgPool, registry: Arc<Registry>, config: WorkerConfig) -> Self {
        Self {
            pool,
            registry,
            config,
        }
    }

    pub fn spawn(self) -> watch::Sender<bool> {
        let (shutdown_tx, shutdown_rx) = watch::channel(false);
        let reaper_rx = shutdown_rx.clone();

        let pool_reap = self.pool.clone();
        let reap_config = self.config.clone();
        tokio::spawn(async move {
            stale_claim_reaper(pool_reap, reap_config, reaper_rx).await;
        });

        tokio::spawn(async move {
            drain_loop(self.pool, self.registry, self.config, shutdown_rx).await;
        });

        shutdown_tx
    }
}

async fn drain_loop(
    pool: PgPool,
    registry: Arc<Registry>,
    config: WorkerConfig,
    mut shutdown_rx: watch::Receiver<bool>,
) {
    let mut tick = interval(config.poll_interval);
    loop {
        tokio::select! {
            res = shutdown_rx.changed() => {
                if res.is_err() || *shutdown_rx.borrow() {
                    tracing::info!(worker_id = %config.worker_id, "CMS Outbox worker shutting down");
                    return;
                }
            }
            _ = tick.tick() => {
                if let Err(e) = drain_once(&pool, &registry, &config).await {
                    tracing::error!(error = %e, "CMS Outbox drain pass failed");
                }
            }
        }
    }
}

type ClaimedRow = (Uuid, Uuid, String, Value, i32, Option<Uuid>);

async fn drain_once(
    pool: &PgPool,
    registry: &Registry,
    config: &WorkerConfig,
) -> Result<(), sqlx::Error> {
    let mut tx = pool.begin().await?;
    let claimed: Vec<ClaimedRow> = sqlx::query_as(
        r#"
        WITH due AS (
            SELECT id FROM outbox_events
            WHERE status IN ('pending', 'retrying')
              AND next_retry_at <= now()
            ORDER BY next_retry_at
            FOR UPDATE SKIP LOCKED
            LIMIT $1
        )
        UPDATE outbox_events o
           SET status = 'retrying',
               attempts = o.attempts + 1,
               claimed_at = now(),
               claimed_by = $2
          FROM due
         WHERE o.id = due.id
        RETURNING o.id, o.tenant_id, o.event_type, o.payload, o.attempts,
                  (o.payload->'actor_context'->>'user_id')::uuid
        "#,
    )
    .bind(config.batch_size)
    .bind(&config.worker_id)
    .fetch_all(&mut *tx)
    .await?;
    tx.commit().await?;

    if claimed.is_empty() {
        return Ok(());
    }

    for (event_id, tenant_id, event_type, payload, attempts, actor_user_id) in claimed {
        let handler_opt = registry.lookup(&event_type);
        let pool_clone = pool.clone();
        let worker_id = config.worker_id.clone();
        let http_client = config.http_client.clone();

        tokio::spawn(async move {
            dispatch_one(
                pool_clone,
                handler_opt,
                event_id,
                tenant_id,
                event_type,
                payload,
                attempts,
                actor_user_id,
                worker_id,
                http_client,
            )
            .await;
        });
    }

    Ok(())
}

#[allow(clippy::too_many_arguments)]
async fn dispatch_one(
    pool: PgPool,
    handler_opt: Option<Arc<dyn crate::handler::Handler>>,
    event_id: Uuid,
    tenant_id: Uuid,
    event_type: String,
    payload: Value,
    attempts: i32,
    actor_user_id: Option<Uuid>,
    _worker_id: String,
    http_client: reqwest::Client,
) {
    let ctx = HandlerCtx {
        pool: pool.clone(),
        tenant_id,
        event_id,
        event_type: event_type.clone(),
        actor_user_id,
        attempts,
        http_client,
    };

    let result = if let Some(handler) = handler_opt {
        handler.handle(&ctx, &payload).await
    } else {
        tracing::warn!(event_type = %event_type, "No handler registered for event_type in CMS Outbox; marking sent");
        Ok(Value::Null)
    };

    match result {
        Ok(_) => {
            let _ = sqlx::query(
                r#"
                UPDATE outbox_events
                   SET status = 'sent',
                       sent_at = now(),
                       last_error = NULL
                 WHERE id = $1
                "#,
            )
            .bind(event_id)
            .execute(&pool)
            .await;
        }
        Err(HandlerError::Permanent(reason)) => {
            move_to_dlq(&pool, event_id, tenant_id, &event_type, &payload, attempts, &reason).await;
        }
        Err(HandlerError::Transient(reason)) => {
            if attempts >= MAX_ATTEMPTS {
                move_to_dlq(&pool, event_id, tenant_id, &event_type, &payload, attempts, &reason).await;
            } else {
                let next_retry = next_retry_at(attempts);
                let _ = sqlx::query(
                    r#"
                    UPDATE outbox_events
                       SET status = 'retrying',
                           next_retry_at = $2,
                           last_error = $3
                     WHERE id = $1
                    "#,
                )
                .bind(event_id)
                .bind(next_retry)
                .bind(&reason)
                .execute(&pool)
                .await;
            }
        }
    }
}

async fn move_to_dlq(
    pool: &PgPool,
    event_id: Uuid,
    tenant_id: Uuid,
    event_type: &str,
    payload: &Value,
    attempts: i32,
    error_msg: &str,
) {
    let _ = sqlx::query(
        r#"
        INSERT INTO outbox_dlq (original_event_id, tenant_id, event_type, payload, attempts, last_error)
        VALUES ($1, $2, $3, $4, $5, $6)
        "#,
    )
    .bind(event_id)
    .bind(tenant_id)
    .bind(event_type)
    .bind(payload)
    .bind(attempts)
    .bind(error_msg)
    .execute(pool)
    .await;

    let _ = sqlx::query(
        r#"
        UPDATE outbox_events
           SET status = 'dlq',
               dlq_at = now(),
               last_error = $2
         WHERE id = $1
        "#,
    )
    .bind(event_id)
    .bind(error_msg)
    .execute(pool)
    .await;
}

async fn stale_claim_reaper(
    pool: PgPool,
    config: WorkerConfig,
    mut shutdown_rx: watch::Receiver<bool>,
) {
    let mut tick = interval(config.stale_claim_sweep_interval);
    loop {
        tokio::select! {
            res = shutdown_rx.changed() => {
                if res.is_err() || *shutdown_rx.borrow() {
                    return;
                }
            }
            _ = tick.tick() => {
                let threshold_chrono = chrono::Duration::from_std(config.stale_claim_threshold)
                    .unwrap_or_else(|_| chrono::Duration::minutes(10));
                let cutoff = Utc::now() - threshold_chrono;

                let _ = sqlx::query(
                    r#"
                    UPDATE outbox_events
                       SET status = 'pending',
                           claimed_at = NULL,
                           claimed_by = NULL
                     WHERE status = 'retrying'
                       AND claimed_at < $1
                    "#,
                )
                .bind(cutoff)
                .execute(&pool)
                .await;
            }
        }
    }
}
