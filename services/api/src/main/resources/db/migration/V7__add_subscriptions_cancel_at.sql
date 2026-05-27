-- SCRUM-32: Add cancel_at_period_end to subscriptions table
ALTER TABLE subscriptions
    ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE;