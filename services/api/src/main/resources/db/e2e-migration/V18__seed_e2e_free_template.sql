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
VALUES (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    '11111111-1111-1111-1111-111111111111',
    'E2E Starter',
    'e2e-starter',
    'Deterministic free template for isolated browser automation.',
    NULL,
    '<section><h1>E2E Starter</h1><p>Replace this text in the browser editor.</p></section>',
    'body { font-family: system-ui, sans-serif; margin: 0; } section { padding: 4rem; }',
    '{}'::jsonb,
    FALSE,
    TRUE,
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;
