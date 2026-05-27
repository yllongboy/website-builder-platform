-- Fixes the admin user password hash from V5 which contained an invalid hash.
-- Dev credentials: admin@example.com / password
-- Replace this hash before any non-local deployment.
UPDATE users
SET password_hash = '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG',
    updated_at    = NOW()
WHERE id = '00000000-0000-0000-0000-000000000001';
