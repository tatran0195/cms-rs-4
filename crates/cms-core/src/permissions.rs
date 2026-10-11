//! Canonical permissions for the CMS Documentation platform.

pub mod p {
    pub mod auth {
        pub const LOGIN: &str = "auth.login";
        pub const REGISTER: &str = "auth.register";
        pub const ME: &str = "auth.me";
    }

    pub mod sites {
        pub const LIST: &str = "sites.list";
        pub const CREATE: &str = "sites.create";
        pub const VIEW: &str = "sites.view";
        pub const UPDATE: &str = "sites.update";
        pub const DELETE: &str = "sites.delete";
    }

    pub mod docs {
        pub const LIST: &str = "docs.list";
        pub const CREATE: &str = "docs.create";
        pub const VIEW: &str = "docs.view";
        pub const UPDATE: &str = "docs.update";
        pub const PUBLISH: &str = "docs.publish";
        pub const DELETE: &str = "docs.delete";
    }

    pub mod navigation {
        pub const VIEW: &str = "navigation.view";
        pub const UPDATE: &str = "navigation.update";
    }

    pub mod members {
        pub const LIST: &str = "members.list";
        pub const INVITE: &str = "members.invite";
        pub const UPDATE: &str = "members.update";
        pub const REMOVE: &str = "members.remove";
    }

    pub mod settings {
        pub const VIEW: &str = "settings.view";
        pub const UPDATE: &str = "settings.update";
    }

    pub mod api_keys {
        pub const MANAGE: &str = "api_keys.manage";
    }
}

pub fn default_role_permissions(role: &str) -> Vec<String> {
    match role {
        "super_admin" => vec!["*".to_string()],
        "org_admin" => vec![
            p::auth::LOGIN.to_string(),
            p::auth::REGISTER.to_string(),
            p::auth::ME.to_string(),
            p::sites::LIST.to_string(),
            p::sites::CREATE.to_string(),
            p::sites::VIEW.to_string(),
            p::sites::UPDATE.to_string(),
            p::sites::DELETE.to_string(),
            p::docs::LIST.to_string(),
            p::docs::CREATE.to_string(),
            p::docs::VIEW.to_string(),
            p::docs::UPDATE.to_string(),
            p::docs::PUBLISH.to_string(),
            p::docs::DELETE.to_string(),
            p::navigation::VIEW.to_string(),
            p::navigation::UPDATE.to_string(),
            p::members::LIST.to_string(),
            p::members::INVITE.to_string(),
            p::members::UPDATE.to_string(),
            p::members::REMOVE.to_string(),
            p::settings::VIEW.to_string(),
            p::settings::UPDATE.to_string(),
            p::api_keys::MANAGE.to_string(),
        ],
        "site_admin" => vec![
            p::auth::LOGIN.to_string(),
            p::auth::ME.to_string(),
            p::sites::LIST.to_string(),
            p::sites::VIEW.to_string(),
            p::sites::UPDATE.to_string(),
            p::docs::LIST.to_string(),
            p::docs::CREATE.to_string(),
            p::docs::VIEW.to_string(),
            p::docs::UPDATE.to_string(),
            p::docs::PUBLISH.to_string(),
            p::docs::DELETE.to_string(),
            p::navigation::VIEW.to_string(),
            p::navigation::UPDATE.to_string(),
            p::members::LIST.to_string(),
            p::settings::VIEW.to_string(),
        ],
        "editor" => vec![
            p::auth::LOGIN.to_string(),
            p::auth::ME.to_string(),
            p::sites::LIST.to_string(),
            p::sites::VIEW.to_string(),
            p::docs::LIST.to_string(),
            p::docs::CREATE.to_string(),
            p::docs::VIEW.to_string(),
            p::docs::UPDATE.to_string(),
            p::docs::PUBLISH.to_string(),
            p::navigation::VIEW.to_string(),
        ],
        _ => vec![
            p::auth::LOGIN.to_string(),
            p::auth::ME.to_string(),
            p::sites::LIST.to_string(),
            p::sites::VIEW.to_string(),
            p::docs::LIST.to_string(),
            p::docs::VIEW.to_string(),
            p::navigation::VIEW.to_string(),
        ],
    }
}
