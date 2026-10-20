# Browser end-to-end tests

The Playwright suite opens Chromium and clicks through the rendered Builder and Admin apps. It registers a uniquely named Builder user, creates a site from a free template, edits text in the GrapesJS canvas, saves it, reloads the editor to verify the saved content, and renames the site. It also signs into Admin, checks that dashboard metrics have loaded, updates the platform site name, checks it after reload, and restores the original value.

## Isolation and safety

The suite is opt-in and refuses to load unless `E2E_USE_DISPOSABLE_ENV=true` is set. Playwright launches the API with the dedicated `e2e` Spring profile on port `8081`, and launches fresh Builder/Admin servers on `4200` and `4201`. It never reuses servers already listening on those ports. The apps' E2E proxy target is fixed to the E2E API at `127.0.0.1:8081`; test app URL overrides are not supported.

The `e2e` profile is configured for `127.0.0.1:5433/website_builder_e2e`. An early API guard rejects datasource and Flyway connection overrides, and a startup check verifies the JDBC URL, connected server address/port, database, and user. Private server addresses are accepted to support Docker bridge networking. A deliberately configured tunnel to a private remote server could pass if it presents the exact expected URL and database identity, so run this suite only with the documented disposable database. It cannot point at the normal development API on port `8080` or its database on port `5432`. The E2E-only Flyway location seeds one active free template for the Builder journey. Both apps use an E2E environment with relative `/api` requests, routed through the disposable API proxy. The E2E profile contains only local placeholder credentials and does not call Stripe, Cloudflare/R2, or publish websites.

## Local run

Prerequisites: Node.js 20, pnpm 10.8.1 via Corepack, Java 21, and Docker Compose.

1. Install dependencies and Chromium once:

   ```sh
   corepack pnpm install --frozen-lockfile
   corepack pnpm run test:e2e:install
   ```

2. Start the dedicated disposable database. It uses a temporary filesystem and host port `5433`:

   ```sh
   docker compose -p website-builder-e2e -f infra/docker/docker-compose.e2e.yml up -d --wait
   ```

3. In another terminal, run the suite. The command starts the guarded E2E API and both Angular apps, then stops those servers when finished:

   ```sh
   E2E_USE_DISPOSABLE_ENV=true corepack pnpm run test:e2e
   ```

   To open Chromium visibly as it clicks through the same flows:

   ```sh
   E2E_USE_DISPOSABLE_ENV=true corepack pnpm run test:e2e:headed
   ```

4. Remove the disposable database after the tests:

   ```sh
   docker compose -p website-builder-e2e -f infra/docker/docker-compose.e2e.yml down -v
   ```

The seeded Admin login is `admin@example.com` / `password`; migration V6 sets this final password after the initial V5 seed. `E2E_ADMIN_EMAIL` and `E2E_ADMIN_PASSWORD` can select another identity in a disposable database. App URLs and the E2E API target are deliberately fixed to loopback.

## CI

The `Browser E2E` job provisions an ephemeral PostgreSQL 16 service on port `5433`, installs Chromium, and runs the same opted-in suite. Playwright starts the E2E-profile API and fresh frontend servers. On failure CI uploads Playwright traces, screenshots, the HTML report, and available server logs as `browser-e2e-failure-artifacts`.
