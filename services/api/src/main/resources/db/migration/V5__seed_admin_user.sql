-- Dev admin user seed. Credentials: admin@example.com / admin1234
-- Password hash is bcrypt cost 12. Change credentials before any non-local deployment.
INSERT INTO users (id, email, password_hash, role, status, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@example.com',
    '$2a$12$RjhzK.Yd3QLbPeAqoFYCXeC1f2vQqLfBsK3sR5GgvLJyLc8bB4oqG',
    'ADMIN',
    'ACTIVE',
    NOW(),
    NOW()
)
ON CONFLICT (id) DO NOTHING;
