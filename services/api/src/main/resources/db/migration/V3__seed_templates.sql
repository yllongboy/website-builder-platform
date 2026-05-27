INSERT INTO templates (
    id,
    category_id,
    name,
    slug,
    description,
    thumbnail_url,
    html_content,
    css_content,
    editor_state,
    is_premium,
    is_active,
    created_at,
    updated_at
)
VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'Agency Starter',
    'agency-starter',
    'Simple starter template for agencies and small businesses.',
    NULL,
    '<section><h1>Agency Starter</h1><p>Build your online presence.</p></section>',
    'body { font-family: system-ui, sans-serif; margin: 0; } section { padding: 4rem; }',
    '{}'::jsonb,
    FALSE,
    TRUE,
    NOW(),
    NOW()
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '22222222-2222-2222-2222-222222222222',
    'Creative Portfolio',
    'creative-portfolio',
    'Minimal portfolio template for creators.',
    NULL,
    '<section><h1>Creative Portfolio</h1><p>Showcase your best work.</p></section>',
    'body { font-family: system-ui, sans-serif; margin: 0; } section { padding: 4rem; }',
    '{}'::jsonb,
    FALSE,
    TRUE,
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;
