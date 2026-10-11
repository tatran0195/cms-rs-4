use cms_core::{doc::DocPage, site::Site, tenant::Tenant, user::User};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(Debug)]
pub struct DbQueries;

impl DbQueries {
    // ── Tenant ─────────────────────────────────────────────────────────────
    pub async fn create_tenant(
        pool: &PgPool,
        name: &str,
        slug: &str,
    ) -> Result<Tenant, sqlx::Error> {
        sqlx::query_as::<_, Tenant>(
            r#"
            INSERT INTO tenants (name, slug, config)
            VALUES ($1, $2, '{}'::jsonb)
            RETURNING *
            "#,
        )
        .bind(name)
        .bind(slug)
        .fetch_one(pool)
        .await
    }

    pub async fn get_tenant_by_id(pool: &PgPool, id: Uuid) -> Result<Option<Tenant>, sqlx::Error> {
        sqlx::query_as::<_, Tenant>("SELECT * FROM tenants WHERE id = $1")
            .bind(id)
            .fetch_optional(pool)
            .await
    }

    // ── User ───────────────────────────────────────────────────────────────
    pub async fn get_user_by_email(pool: &PgPool, email: &str) -> Result<Option<User>, sqlx::Error> {
        sqlx::query_as::<_, User>("SELECT * FROM users WHERE email = $1")
            .bind(email)
            .fetch_optional(pool)
            .await
    }

    pub async fn get_user_by_id(pool: &PgPool, id: Uuid) -> Result<Option<User>, sqlx::Error> {
        sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
            .bind(id)
            .fetch_optional(pool)
            .await
    }

    pub async fn create_user(
        pool: &PgPool,
        tenant_id: Uuid,
        email: &str,
        username: &str,
        full_name: &str,
        password_hash: &str,
        role: cms_core::user::Role,
    ) -> Result<User, sqlx::Error> {
        sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (tenant_id, email, username, full_name, password_hash, role)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            "#,
        )
        .bind(tenant_id)
        .bind(email)
        .bind(username)
        .bind(full_name)
        .bind(password_hash)
        .bind(role)
        .fetch_one(pool)
        .await
    }

    // ── Site ───────────────────────────────────────────────────────────────
    pub async fn list_sites(pool: &PgPool, tenant_id: Uuid) -> Result<Vec<Site>, sqlx::Error> {
        sqlx::query_as::<_, Site>("SELECT * FROM sites WHERE tenant_id = $1 ORDER BY created_at ASC")
            .bind(tenant_id)
            .fetch_all(pool)
            .await
    }

    pub async fn get_site_by_id(pool: &PgPool, id: Uuid) -> Result<Option<Site>, sqlx::Error> {
        sqlx::query_as::<_, Site>("SELECT * FROM sites WHERE id = $1")
            .bind(id)
            .fetch_optional(pool)
            .await
    }

    pub async fn get_site_by_slug(
        pool: &PgPool,
        tenant_id: Uuid,
        slug: &str,
    ) -> Result<Option<Site>, sqlx::Error> {
        sqlx::query_as::<_, Site>("SELECT * FROM sites WHERE tenant_id = $1 AND slug = $2")
            .bind(tenant_id)
            .bind(slug)
            .fetch_optional(pool)
            .await
    }

    pub async fn create_site(
        pool: &PgPool,
        tenant_id: Uuid,
        name: &str,
        slug: &str,
        description: Option<&str>,
        theme_config: Option<serde_json::Value>,
        navigation_config: Option<serde_json::Value>,
    ) -> Result<Site, sqlx::Error> {
        sqlx::query_as::<_, Site>(
            r#"
            INSERT INTO sites (tenant_id, name, slug, description, theme_config, navigation_config)
            VALUES ($1, $2, $3, $4, COALESCE($5, '{}'::jsonb), COALESCE($6, '[]'::jsonb))
            RETURNING *
            "#,
        )
        .bind(tenant_id)
        .bind(name)
        .bind(slug)
        .bind(description)
        .bind(theme_config)
        .bind(navigation_config)
        .fetch_one(pool)
        .await
    }

    // ── Doc Pages ──────────────────────────────────────────────────────────
    pub async fn list_docs(pool: &PgPool, site_id: Uuid) -> Result<Vec<DocPage>, sqlx::Error> {
        sqlx::query_as::<_, DocPage>(
            "SELECT * FROM doc_pages WHERE site_id = $1 ORDER BY order_index ASC, created_at ASC",
        )
        .bind(site_id)
        .fetch_all(pool)
        .await
    }

    pub async fn get_doc_by_slug(
        pool: &PgPool,
        site_id: Uuid,
        slug: &str,
    ) -> Result<Option<DocPage>, sqlx::Error> {
        sqlx::query_as::<_, DocPage>("SELECT * FROM doc_pages WHERE site_id = $1 AND slug = $2")
            .bind(site_id)
            .bind(slug)
            .fetch_optional(pool)
            .await
    }
}
