use cms_core::permissions::default_role_permissions;
use cms_server_core::middleware::auth::Claims;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Decision {
    Allow,
    Deny,
}

#[derive(Debug)]
pub struct AuthzEngine;

impl AuthzEngine {
    /// Evaluate if a user with given claims can perform an action on a site.
    pub fn can_perform(claims: &Claims, permission: &str, site_id: Option<&Uuid>) -> Decision {
        // SuperAdmin and OrgAdmin bypass all checks
        if claims.role == "super_admin" || claims.role == "org_admin" {
            return Decision::Allow;
        }

        // If site is specified, verify the user has access to that site
        if let Some(site) = site_id {
            if !claims.site_ids.contains(site) {
                return Decision::Deny;
            }
        }

        // Check if user has permission
        if claims.permissions.iter().any(|p| p == "*" || p == permission) {
            Decision::Allow
        } else {
            Decision::Deny
        }
    }

    /// Resolve effective permissions for a user given their role and custom access matrix.
    pub fn resolve_permissions(role: &str, access_matrix: &serde_json::Value) -> Vec<String> {
        let mut perms = default_role_permissions(role);

        // Add extra permissions
        if let Some(extra) = access_matrix.get("extra").and_then(|v| v.as_array()) {
            for p in extra {
                if let Some(code) = p.as_str() {
                    if !perms.contains(&code.to_string()) {
                        perms.push(code.to_string());
                    }
                }
            }
        }

        // Remove denied permissions
        if let Some(denied) = access_matrix.get("denied").and_then(|v| v.as_array()) {
            let denied_set: Vec<&str> = denied.iter().filter_map(|p| p.as_str()).collect();
            perms.retain(|p| !denied_set.contains(&p.as_str()));
        }

        perms
    }
}
