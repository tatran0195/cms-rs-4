use sqlx::PgPool;
use tracing::info;

pub async fn init_schema(pool: &PgPool) -> Result<(), sqlx::Error> {
    info!("Initializing CMS database schema...");

    // Create extensions
    sqlx::query(r#"CREATE EXTENSION IF NOT EXISTS "uuid-ossp";"#)
        .execute(pool)
        .await?;

    // Create user_role enum type if not exists
    sqlx::query(
        r#"
        DO $$ BEGIN
            CREATE TYPE user_role AS ENUM (
                'super_admin', 'org_admin', 'site_admin', 'editor', 'viewer', 'member'
            );
        EXCEPTION
            WHEN duplicate_object THEN NULL;
        END $$;
        "#,
    )
    .execute(pool)
    .await?;

    // Create tenants table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS tenants (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            logo TEXT,
            config JSONB NOT NULL DEFAULT '{}'::jsonb,
            is_active BOOLEAN NOT NULL DEFAULT true,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        "#,
    )
    .execute(pool)
    .await?;

    // Create users table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
            email VARCHAR(255) NOT NULL UNIQUE,
            username VARCHAR(100) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            avatar_url TEXT,
            role user_role NOT NULL DEFAULT 'member',
            access_matrix JSONB NOT NULL DEFAULT '{}'::jsonb,
            is_active BOOLEAN NOT NULL DEFAULT true,
            email_verified BOOLEAN NOT NULL DEFAULT false,
            mfa_enabled BOOLEAN NOT NULL DEFAULT false,
            failed_login_attempts INT NOT NULL DEFAULT 0,
            locked_until TIMESTAMPTZ,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);")
        .execute(pool)
        .await?;
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);")
        .execute(pool)
        .await?;

    // Create sites table (multi-site doc sites)
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS sites (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(100) NOT NULL,
            description TEXT,
            icon TEXT,
            custom_domain VARCHAR(255),
            is_public BOOLEAN NOT NULL DEFAULT true,
            theme_config JSONB NOT NULL DEFAULT '{}'::jsonb,
            navigation_config JSONB NOT NULL DEFAULT '[]'::jsonb,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE(tenant_id, slug)
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_sites_tenant_id ON sites(tenant_id);")
        .execute(pool)
        .await?;
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_sites_custom_domain ON sites(custom_domain);")
        .execute(pool)
        .await?;

    // Create doc_pages table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS doc_pages (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
            site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
            parent_id UUID REFERENCES doc_pages(id) ON DELETE SET NULL,
            slug VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            content TEXT NOT NULL DEFAULT '',
            frontmatter JSONB NOT NULL DEFAULT '{}'::jsonb,
            status VARCHAR(50) NOT NULL DEFAULT 'published',
            order_index INT NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE(site_id, slug)
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_doc_pages_site_id ON doc_pages(site_id);")
        .execute(pool)
        .await?;
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_doc_pages_parent_id ON doc_pages(parent_id);")
        .execute(pool)
        .await?;

    // Create refresh_tokens table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS refresh_tokens (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            token_hash VARCHAR(64) NOT NULL UNIQUE,
            expires_at TIMESTAMPTZ NOT NULL,
            revoked BOOLEAN NOT NULL DEFAULT false,
            device_fingerprint TEXT,
            ip_address INET,
            user_agent TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);")
        .execute(pool)
        .await?;
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);")
        .execute(pool)
        .await?;

    // Create audit_logs table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS audit_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL,
            user_id UUID,
            action VARCHAR(100) NOT NULL,
            entity_type VARCHAR(100) NOT NULL,
            entity_id UUID,
            old_values JSONB,
            new_values JSONB,
            ip_address INET,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_id ON audit_logs(tenant_id);")
        .execute(pool)
        .await?;

    // Create outbox_events table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS outbox_events (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
            aggregate_type VARCHAR(100) NOT NULL,
            aggregate_id UUID,
            event_type VARCHAR(100) NOT NULL,
            payload JSONB NOT NULL DEFAULT '{}'::jsonb,
            status VARCHAR(50) NOT NULL DEFAULT 'pending',
            attempts INT NOT NULL DEFAULT 0,
            next_retry_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            sent_at TIMESTAMPTZ,
            last_error TEXT,
            dlq_at TIMESTAMPTZ,
            idempotency_key VARCHAR(255),
            claimed_at TIMESTAMPTZ,
            claimed_by VARCHAR(255)
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_outbox_events_tenant_status ON outbox_events(tenant_id, status);")
        .execute(pool)
        .await?;
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_outbox_events_drain ON outbox_events(next_retry_at) WHERE status IN ('pending', 'retrying');")
        .execute(pool)
        .await?;
    sqlx::query("CREATE UNIQUE INDEX IF NOT EXISTS idx_outbox_events_idemp ON outbox_events(tenant_id, event_type, idempotency_key) WHERE idempotency_key IS NOT NULL;")
        .execute(pool)
        .await?;
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_outbox_events_stale_claim ON outbox_events(claimed_at) WHERE status = 'retrying' AND claimed_at IS NOT NULL;")
        .execute(pool)
        .await?;

    // Create outbox_dlq table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS outbox_dlq (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            original_event_id UUID NOT NULL,
            tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
            event_type VARCHAR(100) NOT NULL,
            payload JSONB NOT NULL DEFAULT '{}'::jsonb,
            attempts INT NOT NULL,
            last_error TEXT,
            moved_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_outbox_dlq_tenant_moved ON outbox_dlq(tenant_id, moved_at DESC);")
        .execute(pool)
        .await?;

    // Create notifications table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS notifications (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            kind VARCHAR(50) NOT NULL DEFAULT 'info',
            title VARCHAR(255) NOT NULL,
            body TEXT,
            category VARCHAR(100),
            entity_type VARCHAR(100),
            entity_id UUID,
            action_url TEXT,
            is_read BOOLEAN NOT NULL DEFAULT false,
            read_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_notifications_user_feed ON notifications(tenant_id, user_id, is_read, created_at DESC);")
        .execute(pool)
        .await?;

    info!("Database schema initialization complete.");
    Ok(())
}
