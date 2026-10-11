use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{CreateDocPageRequest, DocPage, UpdateDocPageRequest};

#[derive(Debug)]
pub struct DocQueries;

impl DocQueries {
    pub async fn list_docs(
        pool: &PgPool,
        tenant_id: Uuid,
        site_id: Uuid,
    ) -> Result<Vec<DocPage>, sqlx::Error> {
        sqlx::query_as::<_, DocPage>(
            "SELECT * FROM doc_pages WHERE tenant_id = $1 AND site_id = $2 ORDER BY order_index ASC, created_at ASC",
        )
        .bind(tenant_id)
        .bind(site_id)
        .fetch_all(pool)
        .await
    }

    pub async fn get_doc_by_slug(
        pool: &PgPool,
        tenant_id: Uuid,
        site_id: Uuid,
        slug: &str,
    ) -> Result<Option<DocPage>, sqlx::Error> {
        sqlx::query_as::<_, DocPage>(
            "SELECT * FROM doc_pages WHERE tenant_id = $1 AND site_id = $2 AND slug = $3",
        )
        .bind(tenant_id)
        .bind(site_id)
        .bind(slug)
        .fetch_optional(pool)
        .await
    }

    pub async fn get_doc_by_id(
        pool: &PgPool,
        tenant_id: Uuid,
        site_id: Uuid,
        id: Uuid,
    ) -> Result<Option<DocPage>, sqlx::Error> {
        sqlx::query_as::<_, DocPage>(
            "SELECT * FROM doc_pages WHERE tenant_id = $1 AND site_id = $2 AND id = $3",
        )
        .bind(tenant_id)
        .bind(site_id)
        .bind(id)
        .fetch_optional(pool)
        .await
    }

    pub async fn create_doc(
        pool: &PgPool,
        tenant_id: Uuid,
        site_id: Uuid,
        req: &CreateDocPageRequest,
    ) -> Result<DocPage, sqlx::Error> {
        let frontmatter = req
            .frontmatter
            .clone()
            .unwrap_or_else(|| serde_json::json!({}));
        let status = req.status.as_deref().unwrap_or("published");
        let order_index = req.order_index.unwrap_or(0);

        sqlx::query_as::<_, DocPage>(
            r"
            INSERT INTO doc_pages (
                tenant_id, site_id, parent_id, slug, title, description, content, frontmatter, status, order_index
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
            ",
        )
        .bind(tenant_id)
        .bind(site_id)
        .bind(req.parent_id)
        .bind(&req.slug)
        .bind(&req.title)
        .bind(req.description.as_deref())
        .bind(&req.content)
        .bind(frontmatter)
        .bind(status)
        .bind(order_index)
        .fetch_one(pool)
        .await
    }

    pub async fn update_doc(
        pool: &PgPool,
        tenant_id: Uuid,
        site_id: Uuid,
        id: Uuid,
        req: &UpdateDocPageRequest,
    ) -> Result<Option<DocPage>, sqlx::Error> {
        sqlx::query_as::<_, DocPage>(
            r"
            UPDATE doc_pages SET
                parent_id = COALESCE($1, parent_id),
                slug = COALESCE($2, slug),
                title = COALESCE($3, title),
                description = COALESCE($4, description),
                content = COALESCE($5, content),
                frontmatter = COALESCE($6, frontmatter),
                status = COALESCE($7, status),
                order_index = COALESCE($8, order_index),
                updated_at = NOW()
            WHERE tenant_id = $9 AND site_id = $10 AND id = $11
            RETURNING *
            ",
        )
        .bind(req.parent_id)
        .bind(req.slug.as_deref())
        .bind(req.title.as_deref())
        .bind(req.description.as_deref())
        .bind(req.content.as_deref())
        .bind(req.frontmatter.as_ref())
        .bind(req.status.as_deref())
        .bind(req.order_index)
        .bind(tenant_id)
        .bind(site_id)
        .bind(id)
        .fetch_optional(pool)
        .await
    }

    pub async fn delete_doc(
        pool: &PgPool,
        tenant_id: Uuid,
        site_id: Uuid,
        id: Uuid,
    ) -> Result<bool, sqlx::Error> {
        let rows = sqlx::query(
            "DELETE FROM doc_pages WHERE tenant_id = $1 AND site_id = $2 AND id = $3",
        )
        .bind(tenant_id)
        .bind(site_id)
        .bind(id)
        .execute(pool)
        .await?
        .rows_affected();

        Ok(rows > 0)
    }
}
