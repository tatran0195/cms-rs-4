use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Platform user.
#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: Uuid,
    pub tenant_id: Uuid,
    pub email: String,
    pub username: String,
    pub full_name: String,
    pub password_hash: String,
    pub avatar_url: Option<String>,
    pub role: Role,
    pub access_matrix: serde_json::Value,
    pub is_active: bool,
    pub email_verified: bool,
    pub mfa_enabled: bool,
    pub failed_login_attempts: i32,
    pub locked_until: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "user_role", rename_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum Role {
    SuperAdmin,
    OrgAdmin,
    SiteAdmin,
    Editor,
    Viewer,
    Member,
}

impl Role {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::SuperAdmin => "super_admin",
            Self::OrgAdmin => "org_admin",
            Self::SiteAdmin => "site_admin",
            Self::Editor => "editor",
            Self::Viewer => "viewer",
            Self::Member => "member",
        }
    }
}

impl std::str::FromStr for Role {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_ascii_lowercase().as_str() {
            "super_admin" | "superadmin" => Ok(Self::SuperAdmin),
            "org_admin" | "orgadmin" | "owner" | "admin" => Ok(Self::OrgAdmin),
            "site_admin" | "siteadmin" => Ok(Self::SiteAdmin),
            "editor" => Ok(Self::Editor),
            "viewer" => Ok(Self::Viewer),
            "member" | "user" => Ok(Self::Member),
            other => Err(format!("Unknown role: {other}")),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfo {
    pub id: Uuid,
    pub tenant_id: Uuid,
    pub email: String,
    pub username: String,
    pub full_name: String,
    pub avatar_url: Option<String>,
    pub role: String,
    pub email_verified: bool,
    pub mfa_enabled: bool,
}
