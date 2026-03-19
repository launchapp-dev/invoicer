---
title: "SaaS Template — System Architecture"
product: saas-template
type: system
status: current
source_repos:
  - saas-template-launch-app-test
generated_by: architecture-diagrammer
generated_at: 2026-03-19
last_verified: 2026-03-19
---

## Overview

High-level system architecture of the flagship SaaS template (launchapp-lite). Shows the Turborepo monorepo structure with apps/web as the SSR frontend, the Hono API server, the new background jobs package (Trigger.dev), QStash-based job queuing in the API, and all external service integrations connected through provider abstractions.

## Diagram

```mermaid
graph TD
    subgraph Browser
        CLIENT[React Router 7 SSR Client]
    end

    subgraph "Turborepo Monorepo"
        subgraph "apps/"
            WEB["apps/web<br/>React Router 7 SSR<br/>TailwindCSS 4, Vite"]
        end

        subgraph "packages/"
            API["@repo/api<br/>Hono + OpenAPI"]
            AUTH["@repo/auth<br/>Better-Auth"]
            DB["@repo/database<br/>Drizzle ORM"]
            CONFIG["@repo/config<br/>Zod-validated env"]
            BILLING["@repo/billing<br/>Stripe / Polar.sh"]
            AI["@repo/ai<br/>Vercel AI SDK"]
            EMAIL["@repo/email<br/>Resend + React Email"]
            STORAGE["@repo/storage<br/>S3-compatible"]
            ANALYTICS["@repo/analytics<br/>PostHog"]
            I18N["@repo/i18n<br/>i18next"]
            APIHOOKS["@repo/api-hooks<br/>React Query + Axios"]
            MCP["@repo/mcp<br/>MCP Server"]
            UIKIT["@repo/ui-kit<br/>Component Library"]
            CORE["@repo/core<br/>Lazy-init utilities"]
            JOBS["@repo/jobs<br/>Trigger.dev Tasks"]
        end
    end

    subgraph "External Services"
        PG[(PostgreSQL)]
        STRIPE[Stripe API]
        POLAR[Polar.sh API]
        S3[AWS S3]
        RESEND[Resend Email API]
        POSTHOG[PostHog Analytics]
        OPENAI[OpenAI API]
        ANTHROPIC[Anthropic API]
        QSTASH[Upstash QStash]
        TRIGGERDEV[Trigger.dev Cloud]
    end

    CLIENT -->|HTTP/SSR| WEB
    WEB --> API
    WEB --> AUTH
    API --> AUTH
    API --> DB
    API --> BILLING
    API --> AI
    API --> STORAGE
    API -->|Job queuing| QSTASH
    QSTASH -->|Callback| API
    AUTH --> DB
    DB --> PG
    BILLING -->|Provider Abstraction| STRIPE
    BILLING -->|Provider Abstraction| POLAR
    EMAIL --> RESEND
    STORAGE --> S3
    ANALYTICS --> POSTHOG
    AI --> OPENAI
    AI --> ANTHROPIC
    MCP --> AUTH
    MCP --> DB
    API --> EMAIL
    JOBS --> EMAIL
    JOBS --> CONFIG
    JOBS --> TRIGGERDEV
```

## Notes

- The provider abstraction pattern allows swapping Stripe↔Polar.sh and OpenAI↔Anthropic via env vars
- All packages use lazy-init: config/db/auth initialized on first use, not at module load (critical for SSR)
- The API uses @hono/zod-openapi for spec generation; orval auto-generates @repo/api-hooks from the spec
- Internal packages use the @repo/* namespace convention
- Biome replaces ESLint+Prettier for linting/formatting
- @repo/jobs defines background tasks (send-welcome-email, process-webhook) using Trigger.dev SDK
- @repo/api integrates QStash (Upstash) for job enqueuing via POST /api/jobs/enqueue and webhook processing via POST /api/jobs/process with signature verification
- Job queuing uses QStash as the transport layer; Trigger.dev provides the task runtime
