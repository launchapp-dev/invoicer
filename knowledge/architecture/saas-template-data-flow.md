---
title: "SaaS Template — Data Flow"
product: saas-template
type: data-flow
status: current
source_repos:
  - saas-template-launch-app-test
generated_by: architecture-diagrammer
generated_at: 2026-03-19
last_verified: 2026-03-19
---

## Overview

How data moves through the SaaS template — from browser requests through SSR rendering, API routing, authentication, billing, background job queuing, and back. Covers the key flows: page rendering, API requests, auth, billing checkout, file uploads, and async job processing.

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
    participant QS as Upstash QStash
    participant JB as @repo/jobs (Trigger.dev)
    participant EM as @repo/email (Resend)

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

    Note over A,EM: Background Job Flow
    A->>QS: POST /jobs/enqueue (url, body, delay, retries)
    QS-->>A: messageId
    QS->>A: POST /jobs/process (signed callback)
    A->>A: Verify QStash signature
    A-->>QS: 200 OK

    Note over JB,EM: Trigger.dev Task Execution
    JB->>EM: send-welcome-email task
    EM-->>JB: Email sent
    JB->>JB: process-webhook task (Stripe/Polar events)
```

## Notes

- React Router 7 SSR means the server renders full HTML on first load, then hydrates for SPA navigation
- The /api/* wildcard in apps/web proxies all API requests to the Hono server
- OpenAPI spec is generated from Zod schemas; @repo/api-hooks auto-generates typed React Query hooks from it
- File uploads use presigned S3 URLs — the API generates the URL, the browser uploads directly to S3
- PostHog analytics events fire client-side (posthog-js) and server-side (posthog-node)
- Job enqueuing via QStash: the API posts to /jobs/enqueue which publishes to QStash with optional delay/retries; QStash calls back to /jobs/process with signature verification
- @repo/jobs defines Trigger.dev tasks that run asynchronously: send-welcome-email (sends via @repo/email) and process-webhook (handles Stripe/Polar webhook events)
