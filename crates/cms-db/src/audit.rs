use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditEntry {
    pub tenant_id: Uuid,
    pub user_id: Option<Uuid>,
    pub action: String,
    pub entity_type: String,
    pub entity_id: Option<Uuid>,
    pub old_values: Option<serde_json::Value>,
    pub new_values: Option<serde_json::Value>,
    pub ip_address: Option<String>,
}

#[derive(Debug)]
pub struct AuditLogger;

impl AuditLogger {
    pub async fn log(pool: &PgPool, entry: &AuditEntry) -> Result<Uuid, sqlx::Error> {
        let id: Uuid = sqlx::query_scalar(
            r#"
            INSERT INTO audit_logs (tenant_id, user_id, action, entity_type, entity_id, old_values, new_values, ip_address)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NULLIF($8, '')::inet)
            RETURNING id
            "#,
        )
        .bind(entry.tenant_id)
        .bind(entry.user_id)
        .bind(&entry.action)
        .bind(&entry.entity_type)
        .bind(entry.entity_id)
        .bind(&entry.old_values)
        .bind(&entry.new_values)
        .bind(&entry.ip_address)
        .fetch_one(pool)
        .await?;

        Ok(id)
    }
}
