-- Persist revoked JWT identifiers until their tokens expire.
-- Store only the opaque JTI, never the full bearer token.
CREATE TABLE revoked_tokens (
    jti VARCHAR(255) PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX ix_revoked_tokens_expires_at
    ON revoked_tokens (expires_at);
