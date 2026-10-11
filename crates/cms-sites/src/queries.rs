use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{CreateSiteRequest, Site, UpdateSiteRequest};

#[derive(Debug)]
pub struct SiteQueries;

impl SiteQueries {
    pub async fn list_sites(pool: &PgPool, tenant_id: Uuid) -> Result<Vec<Site>, sqlx::Error> {
        sqlx::query_as::<_, Site>(
            "SELECT * FROM sites WHERE tenant_id = $1 ORDER BY created_at DESC",
        )
        .bind(tenant_id)
        .fetch_all(pool)
        .await
    }

    pub async fn get_site_by_id(
        pool: &PgPool,
        tenant_id: Uuid,
        id: Uuid,
    ) -> Result<Option<Site>, sqlx::Error> {
        sqlx::query_as::<_, Site>("SELECT * FROM sites WHERE tenant_id = $1 AND id = $2")
            .bind(tenant_id)
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
        req: &CreateSiteRequest,
    ) -> Result<Site, sqlx::Error> {
        let theme = req
            .theme_config
            .clone()
            .unwrap_or_else(|| serde_json::json!({}));
        let nav = req
            .navigation_config
            .clone()
            .unwrap_or_else(|| serde_json::json!([]));
        let is_public = req.is_public.unwrap_or(true);

        sqlx::query_as::<_, Site>(
            r"
            INSERT INTO sites (
                tenant_id, name, slug, description, icon, custom_domain, is_public, theme_config, navigation_config
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
            ",
        )
        .bind(tenant_id)
        .bind(&req.name)
        .bind(&req.slug)
        .bind(req.description.as_deref())
        .bind(req.icon.as_deref())
        .bind(req.custom_domain.as_deref())
        .bind(is_public)
        .bind(theme)
        .bind(nav)
        .fetch_one(pool)
        .await
    }

    pub async fn update_site(
        pool: &PgPool,
        tenant_id: Uuid,
        id: Uuid,
        req: &UpdateSiteRequest,
    ) -> Result<Option<Site>, sqlx::Error> {
        sqlx::query_as::<_, Site>(
            r"
            UPDATE sites SET
                name = COALESCE($1, name),
                slug = COALESCE($2, slug),
                description = COALESCE($3, description),
                icon = COALESCE($4, icon),
                custom_domain = COALESCE($5, custom_domain),
                is_public = COALESCE($6, is_public),
                theme_config = COALESCE($7, theme_config),
                navigation_config = COALESCE($8, navigation_config),
                updated_at = NOW()
            WHERE tenant_id = $9 AND id = $10
            RETURNING *
            ",
        )
        .bind(req.name.as_deref())
        .bind(req.slug.as_deref())
        .bind(req.description.as_deref())
        .bind(req.icon.as_deref())
        .bind(req.custom_domain.as_deref())
        .bind(req.is_public)
        .bind(req.theme_config.as_ref())
        .bind(req.navigation_config.as_ref())
        .bind(tenant_id)
        .bind(id)
        .fetch_optional(pool)
        .await
    }

    pub async fn delete_site(
        pool: &PgPool,
        tenant_id: Uuid,
        id: Uuid,
    ) -> Result<bool, sqlx::Error> {
        let rows_affected = sqlx::query("DELETE FROM sites WHERE tenant_id = $1 AND id = $2")
            .bind(tenant_id)
            .bind(id)
            .execute(pool)
            .await?
            .rows_affected();

        Ok(rows_affected > 0)
    }
}
