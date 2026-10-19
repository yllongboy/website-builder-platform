# Database Schema

Primary database: PostgreSQL  
Migration tool: Flyway  
Primary keys: UUID  
Main schema file: `services/api/src/main/resources/db/migration/V1__init_schema.sql`

## Tables

- users
- categories
- templates
- websites
- website_versions
- assets
- subscriptions
- publish_logs
- stripe_events

## Important Rules

- `websites.user_id + websites.slug` must be unique.
- Only one current website version is allowed per website.
- Stripe events are stored to prevent duplicate webhook processing.
- Subscription recurring price snapshots store the total recurring amount after quantity multiplication in minor units, lowercase ISO currency, interval, and interval count. These fields are nullable for existing subscriptions and Stripe prices without a fixed unit amount; no historical backfill is performed.
- Publishing must validate subscription status server-side.
- Website access must always validate ownership server-side.
