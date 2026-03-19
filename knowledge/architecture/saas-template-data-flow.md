---
title: "SaaS Template — Data Flow"
product: saas-template
type: data-flow
status: current
source_repos:
  - saas-template-launch-app-test
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How data moves through the SaaS template — from browser requests through SSR rendering, API routing, authentication, billing, and back. Covers the key flows: page rendering, API requests, auth, billing checkout, and file uploads.

## Diagram

```mermaid
sequenceDiagram
    participant B as Browser
    participant W as apps/web (React Router 7 SSR)
    participant A as @repo/api (Hono)
    participant AU as @repo/auth (Better-Auth)
    participant DB as @repo/database (Drizzle)
    participant PG as PostgreSQL
    participant BL as @repo/billing
    participant ST as Stripe/Polar.sh

    Note over B,PG: Page Request Flow
    B->>W: GET /dashboard
    W->>AU: Check session
    AU->>DB: Query session
    DB->>PG: SELECT from sessions
    PG-->>DB: Session data
    DB-->>AU: User authenticated
    AU-->>W: Auth context
    W-->>B: SSR HTML + hydration data

    Note over B,PG: API Request Flow
    B->>W: POST /api/users/profile
    W->>A: Proxy to Hono route
    A->>AU: Validate auth token
    AU-->>A: User context
    A->>DB: Update user record
    DB->>PG: UPDATE users
    PG-->>DB: OK
    DB-->>A: Updated user
    A-->>B: JSON response

    Note over B,ST: Billing Checkout Flow
    B->>A: POST /api/billing/checkout
    A->>AU: Validate auth
    A->>BL: Create checkout session
    BL->>ST: Create Stripe/Polar session
    ST-->>BL: Session URL
    BL-->>A: Redirect URL
    A-->>B: 302 → Checkout page
    ST->>A: Webhook: payment_succeeded
    A->>BL: Process webhook
    BL->>DB: Update subscription
    DB->>PG: INSERT/UPDATE subscriptions
```

## Notes

- React Router 7 SSR means the server renders full HTML on first load, then hydrates for SPA navigation
- The /api/* wildcard in apps/web proxies all API requests to the Hono server
- OpenAPI spec is generated from Zod schemas; @repo/api-hooks auto-generates typed React Query hooks from it
- File uploads use presigned S3 URLs — the API generates the URL, the browser uploads directly to S3
- PostHog analytics events fire client-side (posthog-js) and server-side (posthog-node)
