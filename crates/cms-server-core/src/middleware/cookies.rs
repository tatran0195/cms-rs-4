use axum_extra::extract::cookie::{Cookie, SameSite};
use time::Duration;

use crate::state::CookieConfig;

pub fn build_access_cookie(token: &str, config: &CookieConfig) -> String {
    let mut builder = Cookie::build(("access_token", token.to_string()))
        .path("/")
        .http_only(true)
        .same_site(if config.same_site == "None" {
            SameSite::None
        } else {
            SameSite::Lax
        })
        .max_age(Duration::minutes(15));

    if config.secure {
        builder = builder.secure(true);
    }
    if let Some(ref d) = config.domain {
        builder = builder.domain(d.clone());
    }

    builder.build().to_string()
}

pub fn build_refresh_cookie(token: &str, config: &CookieConfig) -> String {
    let mut builder = Cookie::build(("refresh_token", token.to_string()))
        .path("/api/auth")
        .http_only(true)
        .same_site(if config.same_site == "None" {
            SameSite::None
        } else {
            SameSite::Lax
        })
        .max_age(Duration::days(7));

    if config.secure {
        builder = builder.secure(true);
    }
    if let Some(ref d) = config.domain {
        builder = builder.domain(d.clone());
    }

    builder.build().to_string()
}

pub fn build_csrf_cookie(token: &str, config: &CookieConfig) -> String {
    let mut builder = Cookie::build(("csrf_token", token.to_string()))
        .path("/")
        .http_only(false) // Accessible to JS for double-submit
        .same_site(SameSite::Lax)
        .max_age(Duration::hours(24));

    if config.secure {
        builder = builder.secure(true);
    }
    if let Some(ref d) = config.domain {
        builder = builder.domain(d.clone());
    }

    builder.build().to_string()
}

pub fn clear_cookie(name: &str, path: &str) -> String {
    Cookie::build((name.to_string(), String::new()))
        .path(path.to_string())
        .max_age(Duration::seconds(0))
        .build()
        .to_string()
}
