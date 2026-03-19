---
title: "Websites — Data Flow"
product: websites
type: data-flow
status: current
source_repos:
  - launchapp.dev
  - codeby.ai
  - lostcause.com
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

Data flow through the shared website architecture. All three sites follow the same pattern: SSR-rendered React Router 7 pages, Hono API routes for backend logic, Better Auth for authentication, and Drizzle ORM for database access.

## Diagram

```mermaid
sequenceDiagram
    participant BROWSER as Browser
    participant RR7 as React Router 7 (SSR)
    participant HONO as Hono API Server
    participant AUTH as Better Auth
    participant DB as PostgreSQL (Drizzle)
    participant SUPA as Supabase

    Note over BROWSER,SUPA: Page Request (SSR)
    BROWSER->>RR7: GET /pricing
    RR7->>RR7: Server-side render (loader)
    RR7->>BROWSER: HTML + hydration data

    Note over BROWSER,SUPA: Authentication Flow
    BROWSER->>RR7: POST /auth/login
    RR7->>AUTH: Authenticate (email/password or OAuth)
    AUTH->>DB: Verify credentials
    DB->>AUTH: User record
    AUTH->>RR7: Session token
    RR7->>BROWSER: Set-Cookie + redirect to /dashboard

    Note over BROWSER,SUPA: API Request (Authenticated)
    BROWSER->>HONO: GET /api/user/profile
    HONO->>AUTH: Validate session token
    AUTH->>DB: Lookup session
    DB->>AUTH: Valid session + user
    HONO->>DB: Query user profile data
    DB->>HONO: Profile data
    HONO->>BROWSER: JSON response

    Note over BROWSER,SUPA: Database Operations
    HONO->>DB: Drizzle ORM queries
    DB->>SUPA: PostgreSQL via connection string
    SUPA->>DB: Query results
```

## Notes

- React Router 7 handles SSR — pages are rendered server-side with data loaders
- Hono serves as the API layer, proxied from /api/* routes
- Better Auth manages sessions and OAuth flows; session tokens stored in cookies
- Drizzle ORM provides type-safe database access to PostgreSQL
- Supabase is used as the managed PostgreSQL provider
- The sites are primarily content/marketing pages with auth-gated dashboard sections
- Static pages (/, /pricing, /faq, /terms) are SSR-rendered without database access
- Dashboard pages (/dashboard/*) require authentication and fetch data via API
