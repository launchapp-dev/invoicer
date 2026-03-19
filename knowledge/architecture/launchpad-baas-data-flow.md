---
title: "Launchpad BaaS — Data Flow"
product: launchpad-baas
type: data-flow
status: current
source_repos:
  - launchpad-baas
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

How data flows through the Launchpad BaaS platform — from client SDK calls through the Hono API, authentication, database operations, and external service integrations. Shows the multi-tenant data isolation model.

## Diagram

```mermaid
sequenceDiagram
    participant C as Client App
    participant SDK as @launchpad/core SDK
    participant API as Hono API Server
    participant AUTH as @launchpad/auth
    participant DB as @launchpad/db (Drizzle)
    participant PG as PostgreSQL
    participant RT as Realtime Server
    participant WF as Workflow Engine

    Note over C,PG: Authentication Flow
    C->>SDK: launchpad.auth.signIn(credentials)
    SDK->>API: POST /auth/signin
    API->>AUTH: Validate credentials
    AUTH->>PG: Query users table
    PG-->>AUTH: User record
    AUTH-->>API: Session token
    API-->>SDK: Set-Cookie + user data
    SDK-->>C: Authenticated session

    Note over C,PG: Database Query Flow (Multi-Tenant)
    C->>SDK: launchpad.db.from("posts").select()
    SDK->>API: GET /db/query
    API->>AUTH: Validate session + extract tenant
    AUTH-->>API: tenant_id context
    API->>DB: Query with tenant isolation
    DB->>PG: SELECT ... WHERE tenant_id = ?
    PG-->>DB: Filtered results
    DB-->>API: Typed response
    API-->>SDK: JSON response
    SDK-->>C: Typed data

    Note over C,RT: Realtime Flow
    C->>RT: SSE connection (subscribe)
    RT->>PG: LISTEN on channel
    PG->>RT: NOTIFY (data change)
    RT-->>C: SSE event push

    Note over API,WF: Background Workflow
    API->>WF: Trigger workflow
    WF->>WF: Execute steps (circuit breaker)
    WF->>PG: Persist state
    WF-->>API: Workflow complete
```

## Notes

- Multi-tenancy enforced at the DB query layer — tenant_id is injected from auth context
- The realtime server uses PostgreSQL LISTEN/NOTIFY + Redis pub/sub + SSE for live updates
- Background workflows have circuit breaker patterns for resilience
- The SDK provides React hooks (via TanStack Query) for data fetching with automatic caching
- All SDK packages depend on @launchpad/core for HTTP client and session management
- The admin UI (Next.js) has its own API routes but shares the same DB layer
