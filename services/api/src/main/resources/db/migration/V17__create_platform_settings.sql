-- SCRUM-107: Persist the singleton set of platform-wide admin settings.
-- Keep each setting in a typed column so constraints and partial updates remain explicit.
CREATE TABLE platform_settings (
    singleton_id SMALLINT PRIMARY KEY DEFAULT 1,
    site_name VARCHAR(100) NOT NULL,
    site_description VARCHAR(500) NOT NULL,
    support_email VARCHAR(254) NOT NULL,
    email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
    new_user_notifications BOOLEAN NOT NULL DEFAULT TRUE,
    payment_notifications BOOLEAN NOT NULL DEFAULT TRUE,
    weekly_report BOOLEAN NOT NULL DEFAULT FALSE,
    two_factor_required BOOLEAN NOT NULL DEFAULT FALSE,
    session_timeout INT NOT NULL DEFAULT 24,
    password_min_length INT NOT NULL DEFAULT 8,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_platform_settings_singleton CHECK (singleton_id = 1),
    CONSTRAINT chk_platform_settings_site_name CHECK (BTRIM(site_name) <> ''),
    CONSTRAINT chk_platform_settings_session_timeout CHECK (session_timeout BETWEEN 1 AND 720),
    CONSTRAINT chk_platform_settings_password_min_length CHECK (password_min_length BETWEEN 8 AND 128)
);

-- Seed the existing Settings UI defaults so the API always has a row to read.
INSERT INTO platform_settings (
    singleton_id,
    site_name,
    site_description,
    support_email
) VALUES (
    1,
    'SiteBuilder',
    'Create beautiful websites with our easy-to-use builder.',
    'support@sitebuilder.com'
);
