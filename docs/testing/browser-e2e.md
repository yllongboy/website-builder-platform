# Browser end-to-end tests

The Playwright suite launches Chromium and exercises the rendered Builder and Admin applications against a local Spring API and a disposable PostgreSQL database. It registers a uniquely named Builder user, creates a site from a free template, renames it, and verifies the name after reload. It also signs into Admin, checks that the dashboard metrics have loaded, updates the platform site name, checks it after reload, and restores the original value.

The tests do not publish sites, call Cloudflare/R2, or create Stripe charges. The local compose file stores PostgreSQL data in a temporary filesystem and uses port `5433`; it does not use the regular development database or its `5432` port.

## Local run

Use three terminal windows from the repository root. Prerequisites are Node.js 20, pnpm 10.8.1 through Corepack, Java 21, and Docker Compose.

1. Install dependencies and Chromium once:

   ```sh
   corepack pnpm install --frozen-lockfile
   corepack pnpm run test:e2e:install
   ```

2. Start the isolated test database:

   ```sh
   docker compose -p website-builder-e2e -f infra/docker/docker-compose.e2e.yml up -d --wait
   ```

3. Start the API with the development profile, pointing it at the isolated database:

   ```sh
   SPRING_PROFILES_ACTIVE=dev \
   SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5433/website_builder_e2e \
   SPRING_DATASOURCE_USERNAME=website_builder \
   SPRING_DATASOURCE_PASSWORD=website_builder_e2e_password \
   APP_JWT_SECRET=local-e2e-jwt-secret-must-be-at-least-32-characters \
   APP_CORS_ALLOWED_ORIGINS=http://127.0.0.1:4200,http://127.0.0.1:4201 \
   mvn -f services/pom.xml spring-boot:run -Dspring-boot.run.profiles=dev
   ```

   Keep this process running. Flyway creates the schema and applies the development fixtures on the empty test database. The seeded Admin login is `admin@example.com` / `password`; V6 migration sets this final password after the initial V5 seed.

4. In another terminal, run the browser tests. Playwright starts both Angular dev servers automatically and shuts them down when it finishes:

   ```sh
   corepack pnpm run test:e2e
   ```

   To open Chromium visibly while it clicks through the same flows, use:

   ```sh
   corepack pnpm run test:e2e:headed
   ```

When finished, stop the API with Ctrl+C and remove the disposable database:

```sh
docker compose -p website-builder-e2e -f infra/docker/docker-compose.e2e.yml down -v
```

The browser suite is serial because the Admin scenario temporarily updates a global setting and restores its previous value. Unique registration addresses prevent collisions between repeat runs. Tests support `E2E_BUILDER_URL`, `E2E_ADMIN_URL`, `E2E_ADMIN_EMAIL`, and `E2E_ADMIN_PASSWORD` overrides.

## CI

The `Browser E2E` job starts an ephemeral PostgreSQL service, applies Flyway migrations through the local API, installs Chromium, and runs `pnpm run test:e2e`. On failure it uploads Playwright traces, screenshots, the HTML report, and the API startup log as the `browser-e2e-failure-artifacts` artifact.
