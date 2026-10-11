use uuid::Uuid;

use crate::{error::AppError, middleware::auth::Claims};

pub const BYPASS_ROLES: &[&str] = &["super_admin", "org_admin"];

pub fn is_bypass_role(claims: &Claims) -> bool {
    BYPASS_ROLES.contains(&claims.role.as_str())
}

pub fn require_permission(claims: &Claims, perm: &str) -> Result<(), AppError> {
    if is_bypass_role(claims) {
        return Ok(());
    }
    if claims.permissions.iter().any(|p| p == "*" || p == perm) {
        return Ok(());
    }
    Err(AppError::ForbiddenMessage(format!("Missing permission: {perm}")))
}

pub fn require_any_permission(claims: &Claims, perms: &[&str]) -> Result<(), AppError> {
    if is_bypass_role(claims) {
        return Ok(());
    }
    if perms
        .iter()
        .any(|perm| claims.permissions.iter().any(|p| p == "*" || p == *perm))
    {
        return Ok(());
    }
    Err(AppError::ForbiddenMessage("Missing required permission".to_string()))
}

pub fn require_site_access(claims: &Claims, site_id: &Uuid) -> Result<(), AppError> {
    if is_bypass_role(claims) {
        return Ok(());
    }
    if claims.site_ids.contains(site_id) {
        return Ok(());
    }
    Err(AppError::ForbiddenMessage("No access to this documentation site".to_string()))
}

pub fn require_ownership(claims: &Claims, resource_owner_id: &Uuid) -> Result<(), AppError> {
    if is_bypass_role(claims) {
        return Ok(());
    }
    if claims.sub == *resource_owner_id {
        return Ok(());
    }
    Err(AppError::ForbiddenMessage("You do not own this resource".to_string()))
}
