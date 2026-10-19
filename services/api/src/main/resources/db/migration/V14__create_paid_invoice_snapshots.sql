-- Immutable, minimal snapshots of successfully paid Stripe invoices.
-- The Stripe invoice ID is the primary key so webhook replays cannot duplicate a payment.
CREATE TABLE paid_invoice_snapshots (
    stripe_invoice_id VARCHAR(255) PRIMARY KEY,
    amount_paid_cents BIGINT NOT NULL,
    currency VARCHAR(3) NOT NULL,
    paid_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT chk_paid_invoice_snapshots_amount_nonnegative
        CHECK (amount_paid_cents >= 0),
    CONSTRAINT chk_paid_invoice_snapshots_currency_lowercase
        CHECK (currency ~ '^[a-z]{3}$')
);

-- Supports chronological reporting with stable ordering for equal paid_at values.
CREATE INDEX ix_paid_invoice_snapshots_paid_at_id
    ON paid_invoice_snapshots (paid_at DESC, stripe_invoice_id DESC);

CREATE INDEX ix_paid_invoice_snapshots_currency_paid_at
    ON paid_invoice_snapshots (currency, paid_at);
