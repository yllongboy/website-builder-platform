-- SCRUM-128: Convert legacy empty JSON editor_state values to NULL so consumers can
-- reliably distinguish "no saved editor state" from actual project data.

UPDATE templates
SET editor_state = NULL
WHERE editor_state = '{}'::jsonb;

UPDATE website_versions
SET editor_state = NULL
WHERE editor_state = '{}'::jsonb;
