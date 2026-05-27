-- Sprint 2 performance indexes for category/template listing and search queries.
-- Note: Categories use soft-delete semantics via is_active = FALSE to avoid FK delete conflicts.

CREATE INDEX IF NOT EXISTS idx_categories_active_sort
    ON categories (is_active, sort_order);

CREATE INDEX IF NOT EXISTS idx_templates_active
    ON templates (is_active);

CREATE INDEX IF NOT EXISTS idx_templates_category_active
    ON templates (category_id, is_active);

CREATE INDEX IF NOT EXISTS idx_templates_name_lower
    ON templates (lower(name));
