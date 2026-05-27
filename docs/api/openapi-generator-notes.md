# OpenAPI Generator Notes

Recommended Angular client generation command:

```bash
openapi-generator-cli generate \
  -i docs/api/openapi.yaml \
  -g typescript-angular \
  -o libs/api-client
```

Recommended rule:
- `docs/api/openapi.yaml` is the source of truth.
- `libs/shared-models` contains hand-authored shared interfaces.
- `libs/api-client` should be generated from OpenAPI for actual HTTP services.
- Do not duplicate HTTP client logic manually.
