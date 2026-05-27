-- Website Builder Platform initial schema
-- PostgreSQL + Flyway

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_users_role CHECK (role IN ('USER', 'ADMIN')),
    CONSTRAINT chk_users_status CHECK (status IN ('ACTIVE', 'SUSPENDED', 'DELETED'))
);

CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE templates (
    id UUID PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES categories(id),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    html_content TEXT NOT NULL,
    css_content TEXT,
    editor_state JSONB,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE websites (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    template_id UUID REFERENCES templates(id),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL,
    status VARCHAR(50) NOT NULL,
    published_url TEXT,
    last_published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_websites_status CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

CREATE TABLE website_versions (
    id UUID PRIMARY KEY,
    website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
    html_content TEXT NOT NULL,
    css_content TEXT,
    editor_state JSONB,
    version_number INT NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE assets (
    id UUID PRIMARY KEY,
    owner_user_id UUID REFERENCES users(id),
    website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
    template_id UUID REFERENCES templates(id),
    file_name VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    r2_object_key TEXT NOT NULL,
    public_url TEXT,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    provider VARCHAR(50) NOT NULL,
    provider_customer_id VARCHAR(255),
    provider_subscription_id VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    plan_code VARCHAR(100) NOT NULL,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_subscriptions_status CHECK (
        status IN ('ACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED', 'INCOMPLETE', 'NONE')
    )
);

CREATE TABLE publish_logs (
    id UUID PRIMARY KEY,
    website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    message TEXT,
    published_url TEXT,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_publish_logs_status CHECK (status IN ('STARTED', 'SUCCESS', 'FAILED'))
);

CREATE TABLE stripe_events (
    id UUID PRIMARY KEY,
    stripe_event_id VARCHAR(255) NOT NULL UNIQUE,
    event_type VARCHAR(255) NOT NULL,
    processed BOOLEAN NOT NULL DEFAULT FALSE,
    payload JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX ux_websites_user_slug ON websites(user_id, slug);
CREATE UNIQUE INDEX ux_website_versions_current ON website_versions(website_id) WHERE is_current = TRUE;

CREATE INDEX ix_users_email ON users(email);
CREATE INDEX ix_categories_slug ON categories(slug);
CREATE INDEX ix_templates_category_id ON templates(category_id);
CREATE INDEX ix_templates_slug ON templates(slug);
CREATE INDEX ix_websites_user_id ON websites(user_id);
CREATE INDEX ix_websites_status ON websites(status);
CREATE INDEX ix_website_versions_website_id ON website_versions(website_id);
CREATE INDEX ix_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX ix_subscriptions_provider_subscription_id ON subscriptions(provider_subscription_id);
CREATE INDEX ix_assets_website_id ON assets(website_id);
CREATE INDEX ix_publish_logs_website_id ON publish_logs(website_id);
