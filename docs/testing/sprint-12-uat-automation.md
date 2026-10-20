# Sprint 12 UAT automation

This suite covers the Ready for UAT acceptance behavior for the Sprint 12 ticket set. Cases use local mocks, deterministic fixtures, or the existing Testcontainers PostgreSQL integration tests; no case performs a live Stripe request or charge.

## Commands

Run the admin UI suite with:

```sh
pnpm exec nx run admin-app:test --runInBand
```

Run builder UI tests (including logout teardown and registration names) with:

```sh
pnpm exec nx run builder-app:test --runInBand
```

Run backend unit and integration tests with:

```sh
mvn -f services/pom.xml verify --no-transfer-progress
```

Run the Sprint 12 test discovery and CI wiring smoke with:

```sh
pnpm run test:sprint12-uat
```

GitHub Actions runs all four commands. The discovery smoke checks that each ticket has a prefixed test case and is included in this map.

## Ticket-to-case mapping

| Ticket | Automated coverage |
| --- | --- |
| SCRUM-125 | PostgreSQL-backed JWT revocation survives application restart; expiry cleanup removes expired records and retains valid records; logout revokes access to protected endpoints. |
| SCRUM-126 | Unsubscribing an in-flight logout resets the guard so a subsequent logout can complete. |
| SCRUM-127 | Logout delegates the Authorization header to AuthService and maps missing/invalid headers to unauthorized responses. |
| SCRUM-97 | Registration persists optional names and returns them in user/profile responses; admin responses carry names; registration sends names; admin UI renders full name, em dash, and email initial fallback. |
| SCRUM-99 | Admin website mapping returns nullable owner/template names, zero page views, and creation time; UI shows details, “Not tracked,” timestamps, and null fallbacks. |
| SCRUM-101 | Template mapping and admin listing return website-reference usage counts, zero fallback, and creation time; UI shows usage and creation date in grid/list views. |
| SCRUM-103 | Backend category listing batches per-category counts with zero fallback; UI displays correct singular/plural counts and the empty state. |
| SCRUM-105 | Subscription service maps plan/status/amount/renewal/creation fields and overview counts/MRR from fixtures; controller enforces admin access; empty pages are covered. |
| SCRUM-107 | Admin settings GET/PATCH round-trip, partial updates, invalid/empty request rejection, access control, and UI load/save/error states. |
| SCRUM-108 | Admin metrics reports total websites separately from the PUBLISHED-only count. |
| SCRUM-109 | Month-over-month percentages use the prior month baseline and return null where the baseline is unavailable. |
| SCRUM-110 | Metrics sums current calendar-month USD invoice cents and returns zero when there are no invoices. |
| SCRUM-111 | Time series emits six monthly buckets, correct user counts, zero-filled revenue gaps, and rejects unsupported periods. |
| SCRUM-112 | Activity endpoint handles an empty feed, returns newest 20 with stable ties, enforces admin access, persists across restart, and supports required event types. |
| SCRUM-135 | Node test verifies CI invokes the documented admin and builder test commands, Maven suite, and ticket coverage map. |
