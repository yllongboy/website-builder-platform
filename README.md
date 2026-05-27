# Website Builder Platform

## Product Overview

Website Builder Platform is a SaaS foundation for creating, managing, publishing, and billing customer websites. The initial product shape centers on a visual builder experience, an internal admin experience, a Spring Boot API, and shared platform contracts that support content, templates, billing, and publishing workflows.

This repository currently contains Sprint 0 planning and migration/bootstrap assets only. It does not yet implement Angular applications, Spring Boot business logic, Stripe flows, Cloudflare R2 integration, Flyway migrations, or PostgreSQL persistence.

## Stack

- Frontend: Angular + RxJS
- Frontend workspace: Nx preferred
- Apps: `builder-app`, `admin-app`
- Backend: Java 21 + Spring Boot 3
- Database: PostgreSQL
- Migrations: Flyway
- Storage: Cloudflare R2
- Payments: Stripe
- Editor: GrapesJS

## Folder Structure

```text
website-builder-platform/
  apps/
    builder-app/
    admin-app/
  services/
    api/
  docs/
    product/
    architecture/
    api/
    agents/
    context/
    roadmap/
  .github/agents/
  infra/
    docker/
    terraform/
    cloudflare/
  scripts/
  AGENTS.md
  README.md
```
