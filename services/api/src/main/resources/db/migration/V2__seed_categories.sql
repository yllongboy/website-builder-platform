INSERT INTO categories (id, name, slug, description, sort_order, is_active, created_at, updated_at)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Business', 'business', 'Business website templates', 1, TRUE, NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'Portfolio', 'portfolio', 'Portfolio website templates', 2, TRUE, NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', 'Restaurant', 'restaurant', 'Restaurant website templates', 3, TRUE, NOW(), NOW()),
    ('44444444-4444-4444-4444-444444444444', 'Landing Page', 'landing-page', 'Landing page templates', 4, TRUE, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;
