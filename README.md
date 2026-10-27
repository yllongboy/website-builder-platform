# Website Builder Platform

## Product Overview

Website Builder Platform is a full-stack SaaS application for creating and managing customer websites. The repository includes separate Angular Builder and Admin apps, a Spring Boot API, PostgreSQL persistence with Flyway migrations, shared API contracts, and a GrapesJS visual editor. Billing, storage, and publishing integrations are covered by the product roadmap.

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

## Run the browser end-to-end tests

The Playwright suite opens Chromium and exercises the Builder and Admin apps in a disposable local environment. The Sprint 12 flow registers a user, creates a website from a free template, edits and saves content, verifies persistence after reload, and checks the Admin dashboard and settings.

### Requirements

- Node.js 20
- pnpm 10.8.1 through Corepack
- Java 21
- Docker Compose

Run commands through Corepack so the repository's declared pnpm version is used:

```sh
node --version
java -version
corepack pnpm --version
```

### Setup and run

From the repository root, install dependencies and Chromium once:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run test:e2e:install
```

Start the disposable PostgreSQL database on port 5433:

```sh
docker compose -p website-builder-e2e -f infra/docker/docker-compose.e2e.yml up -d --wait
```

Run the Sprint 12 browser flows:

```sh
E2E_USE_DISPOSABLE_ENV=true corepack pnpm run test:e2e --grep 'SCRUM-137 -'
```

Or run the complete browser suite:

```sh
E2E_USE_DISPOSABLE_ENV=true corepack pnpm run test:e2e
```

To watch Chromium interact with the pages, use `corepack pnpm run test:e2e:headed` with the same `E2E_USE_DISPOSABLE_ENV=true` prefix.

When the run is complete, stop and remove the disposable database and its volume:

```sh
docker compose -p website-builder-e2e -f infra/docker/docker-compose.e2e.yml down -v
```

The E2E command starts and stops its own API, Builder, and Admin servers. It requires ports 8081, 4200, and 4201 to be free. It never reuses existing servers or the normal development database. See [docs/testing/browser-e2e.md](docs/testing/browser-e2e.md) for isolation details and CI behavior.

### If registration fails before the form appears

Make sure the checkout contains the current default branch. The Builder's E2E serve configuration sets `prebundle: false` so the Builder and Admin dev servers do not collide while Angular/Vite optimizes their shared dependencies. Older checkouts can still show an Angular `firstCreatePass` error and time out while Playwright waits for the first-name field.

For a detached or stale checkout, update it before running the suite:

```sh
git fetch origin main
git checkout --detach origin/main
```

If `corepack pnpm --version` does not report `10.8.1`, use Corepack commands instead of a globally installed `pnpm`; a mismatched pnpm version may reject the lockfile or install Nx without the correct native optional dependency.
