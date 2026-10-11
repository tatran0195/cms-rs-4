use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Documentation site belonging to an organization / company.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Site {
    pub id: Uuid,
    pub tenant_id: Uuid,
    pub name: String,
    pub slug: String,
    pub description: Option<String>,
    pub icon: Option<String>,
    pub custom_domain: Option<String>,
    pub is_public: bool,
    pub theme_config: serde_json::Value,
    pub navigation_config: serde_json::Value,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateSiteRequest {
    pub name: String,
    pub slug: String,
    pub description: Option<String>,
    pub icon: Option<String>,
    pub custom_domain: Option<String>,
    pub is_public: Option<bool>,
    pub theme_config: Option<serde_json::Value>,
    pub navigation_config: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateSiteRequest {
    pub name: Option<String>,
    pub slug: Option<String>,
    pub description: Option<String>,
    pub icon: Option<String>,
    pub custom_domain: Option<String>,
    pub is_public: Option<bool>,
    pub theme_config: Option<serde_json::Value>,
    pub navigation_config: Option<serde_json::Value>,
}
