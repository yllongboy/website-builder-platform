# Pre-Deployment Checklist

Things that must be in place before deploying to staging or production.

---

## 1. Environment Variables

All variables below must be set on the server before starting the API. None have safe fallbacks in staging/prod profiles.

### Database
| Variable | Description |
|---|---|
| `DB_URL` | JDBC connection string, e.g. `jdbc:postgresql://host:5432/website_builder` |
| `DB_USERNAME` | PostgreSQL user |
| `DB_PASSWORD` | PostgreSQL password — use a strong, unique value |

### JWT / Auth
| Variable | Description | Notes |
|---|---|---|
| `APP_JWT_SECRET` | JWT signing secret | **Minimum 32 characters.** Generate with `openssl rand -base64 48` |
| `APP_JWT_EXPIRATION_MS` | Token lifetime in ms | Optional — defaults to `86400000` (24 h) |

### CORS
| Variable | Description | Example |
|---|---|---|
| `APP_CORS_ALLOWED_ORIGINS` | Comma-separated allowed origins | `https://app.example.com,https://admin.example.com` |

### Stripe
| Variable | Description | Where to find it |
|---|---|---|
| `STRIPE_SECRET_KEY` | Live secret key | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Stripe Dashboard → Developers → Webhooks → signing secret |
| `STRIPE_PRO_PRICE_ID` | Price ID for the Pro plan | Stripe Dashboard → Products → Pro plan → price ID |
| `STRIPE_SUCCESS_URL` | Redirect after successful checkout | Optional — defaults to `http://localhost:4200/billing?success=true` |
| `STRIPE_CANCEL_URL` | Redirect after cancelled checkout | Optional — defaults to `http://localhost:4200/billing?canceled=true` |
| `STRIPE_PORTAL_RETURN_URL` | Redirect from billing portal | Optional — defaults to `http://localhost:4200/billing` |

> **Important:** Use `sk_live_…` keys in production, `sk_test_…` only in staging. Never commit real keys to source control.

---

## 2. Stripe Setup

- [ ] Create the **Pro** product and recurring price in the Stripe Dashboard (live mode)
- [ ] Register the production webhook endpoint: `https://api.example.com/api/billing/webhook`
- [ ] Enable webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- [ ] Copy the signing secret into `STRIPE_WEBHOOK_SECRET`

---

## 3. Database

- [ ] PostgreSQL 16 instance running and accessible from the API server
- [ ] Database `website_builder` created with the correct user and password
- [ ] Flyway migrations will run automatically on first startup — verify with `mvn flyway:info` before going live

---

## 4. Cloudflare / DNS

- [ ] `api.example.com` → API server (port 8080 or behind a reverse proxy on 443)
- [ ] `app.example.com` → Builder frontend
- [ ] `admin.example.com` → Admin frontend
- [ ] `*.sites.example.com` → Cloudflare R2 published static sites
- [ ] SSL certificates active on all domains

---

## 5. Cloudflare R2 (Published Sites)

- [ ] R2 bucket created and configured for public access
- [ ] `app.publish.base-url` in `application-prod.yml` updated to match the R2 public URL (e.g. `https://sites.example.com`)

---

## 6. Build

- [ ] `mvn clean package -P prod` succeeds with no test failures
- [ ] Docker image builds cleanly: `docker build -f infra/docker/api.Dockerfile .`
- [ ] JDK 21 (Amazon Corretto 21 or equivalent) used for both build and runtime

---

## 7. Security

- [ ] `APP_JWT_SECRET` is unique per environment and not reused from dev/staging
- [ ] `DB_PASSWORD` is strong and not the docker-compose dev default (`website_builder_dev_password`)
- [ ] Stripe live keys are restricted to the minimum required permissions in the Stripe Dashboard
- [ ] No `.env` files or secrets committed to the repository

---

## 8. Spring Active Profile

Ensure the server starts with `-Dspring.profiles.active=prod` (or `staging`). Without this, the app falls back to the base `application.yml` and will fail to start due to unresolved `${DB_URL}`, `${STRIPE_SECRET_KEY}`, etc.

```bash
java -Dspring.profiles.active=prod -jar platform-api-0.1.0-SNAPSHOT.jar
```

---

## 9. Smoke Test After Deploy

- [ ] `GET https://api.example.com/api/actuator/health` returns `{"status":"UP"}`
- [ ] User registration and login flows work end-to-end
- [ ] Stripe checkout redirects to the correct success URL
- [ ] At least one website can be published and the public URL is accessible
