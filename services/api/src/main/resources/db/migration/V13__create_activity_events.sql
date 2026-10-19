-- Immutable snapshots for the global admin activity feed.
-- Deliberately has no foreign keys: source users, websites, and subscriptions
-- may be updated or deleted without rewriting historical activity.
CREATE TABLE activity_events (
    id UUID PRIMARY KEY,
    event_type VARCHAR(40) NOT NULL,
    description VARCHAR(500) NOT NULL,
    -- Contract field userName carries the actor's email snapshot.
    user_name VARCHAR(255) NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_activity_events_type
        CHECK (event_type IN ('SIGNUP', 'WEBSITE_PUBLISHED', 'SUBSCRIPTION_CREATED')),
    CONSTRAINT chk_activity_events_description_nonempty
        CHECK (length(trim(description)) > 0),
    CONSTRAINT chk_activity_events_user_name_nonempty
        CHECK (length(trim(user_name)) > 0)
);

-- Supports global newest-first retrieval with stable ordering when timestamps tie.
CREATE INDEX ix_activity_events_occurred_at_id
    ON activity_events (occurred_at DESC, id DESC);
