use serde_json::Value;
use sqlx::{Postgres, Transaction};
use uuid::Uuid;

use crate::OutboxError;

#[derive(Debug, Clone)]
pub struct OutboxRow {
    pub tenant_id: Uuid,
    pub aggregate_type: &'static str,
    pub aggregate_id: Option<Uuid>,
    pub event_type: &'static str,
    pub payload: Value,
    pub idempotency_key: Option<String>,
}

/// Queue an outbox event inside an existing database transaction.
pub async fn queue_in_tx(
    tx: &mut Transaction<'_, Postgres>,
    row: OutboxRow,
) -> Result<Uuid, OutboxError> {
    let inserted: Option<(Uuid,)> = sqlx::query_as(
        r#"
        INSERT INTO outbox_events (
            tenant_id, aggregate_type, aggregate_id, event_type, payload, idempotency_key
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (tenant_id, event_type, idempotency_key)
            WHERE idempotency_key IS NOT NULL
            DO NOTHING
        RETURNING id
        "#,
    )
    .bind(row.tenant_id)
    .bind(row.aggregate_type)
    .bind(row.aggregate_id)
    .bind(row.event_type)
    .bind(&row.payload)
    .bind(row.idempotency_key.as_deref())
    .fetch_optional(&mut **tx)
    .await?;

    if let Some((id,)) = inserted {
        return Ok(id);
    }

    let existing: (Uuid,) = sqlx::query_as(
        r#"
        SELECT id FROM outbox_events
        WHERE tenant_id = $1 AND event_type = $2 AND idempotency_key = $3
        "#,
    )
    .bind(row.tenant_id)
    .bind(row.event_type)
    .bind(row.idempotency_key.as_deref())
    .fetch_one(&mut **tx)
    .await?;

    Ok(existing.0)
}
