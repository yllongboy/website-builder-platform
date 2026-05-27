# Folder Structure

## Repository Layout

```text
/website-builder-platform
  /apps
    /builder-app
    /admin-app
  /services
    /api
  /docs
    /product
    /architecture
    /api
    /agents
    /context
    /roadmap
  /.github/agentsq        
  /infra
    /docker
    /terraform
    /cloudflare
  /scripts
```

## Notes

- `apps/` is reserved for the future Nx workspace applications.
- `services/api/` is reserved for the Spring Boot service bootstrap.
- `docs/` stores planning, contracts, architecture, and governance artifacts.
- `docs/context/` was added to house project history because it is required by the migration task.
- `agents/` stores all `.agent.md` files in one predictable location.
- `infra/` groups local container, Terraform, and Cloudflare setup assets.
- `scripts/` is reserved for future automation helpers.

## Current State

This structure is intentionally bootstrap-only. Directories contain placeholders where necessary so the repository can preserve the target layout without prematurely generating application code.
