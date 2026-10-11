use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Documentation page inside a site.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct DocPage {
    pub id: Uuid,
    pub tenant_id: Uuid,
    pub site_id: Uuid,
    pub parent_id: Option<Uuid>,
    pub slug: String,
    pub title: String,
    pub description: Option<String>,
    pub content: String,
    pub frontmatter: serde_json::Value,
    pub status: String,
    pub order_index: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateDocPageRequest {
    pub parent_id: Option<Uuid>,
    pub slug: String,
    pub title: String,
    pub description: Option<String>,
    pub content: String,
    pub frontmatter: Option<serde_json::Value>,
    pub status: Option<String>,
    pub order_index: Option<i32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateDocPageRequest {
    pub parent_id: Option<Uuid>,
    pub slug: Option<String>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub content: Option<String>,
    pub frontmatter: Option<serde_json::Value>,
    pub status: Option<String>,
    pub order_index: Option<i32>,
}
