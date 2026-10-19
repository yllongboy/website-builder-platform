ALTER TABLE subscriptions
    ADD COLUMN recurring_amount_minor BIGINT,
    ADD COLUMN recurring_currency VARCHAR(3),
    ADD COLUMN recurring_interval VARCHAR(10),
    ADD COLUMN recurring_interval_count INTEGER;

ALTER TABLE subscriptions
    ADD CONSTRAINT chk_subscriptions_recurring_price_nonnegative
        CHECK (recurring_amount_minor IS NULL OR recurring_amount_minor >= 0),
    ADD CONSTRAINT chk_subscriptions_recurring_interval
        CHECK (recurring_interval IS NULL OR recurring_interval IN ('day', 'week', 'month', 'year')),
    ADD CONSTRAINT chk_subscriptions_recurring_interval_count
        CHECK (recurring_interval_count IS NULL OR recurring_interval_count > 0),
    ADD CONSTRAINT chk_subscriptions_recurring_currency
        CHECK (recurring_currency IS NULL OR recurring_currency ~ '^[a-z]{3}$');
