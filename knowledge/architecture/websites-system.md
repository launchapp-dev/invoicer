---
title: "Websites — System Architecture"
product: websites
type: system
status: current
source_repos:
  - launchapp-landing-v2
  - codeby.ai
  - lostcause.com
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

System architecture of the org's web properties. launchapp-landing-v2 is the most complex — a full-featured platform monorepo with 16 packages, web + native apps, payments, push notifications, and MCP integration. The other sites (codeby.ai, lostcause.com) use a simpler shared template.

## Diagram

```mermaid
graph TD
    subgraph "launchapp-landing-v2 (Full Platform)"
        subgraph "Apps"
            WEB2["apps/web<br/>React Router 7 SSR"]
            NATIVE["apps/native<br/>React Native / Expo"]
        end

        subgraph "Packages (16)"
            API2["packages/api<br/>Hono API server"]
            AUTH2["packages/auth<br/>Better Auth"]
            DB2["packages/database<br/>Drizzle ORM"]
            CONFIG2["packages/config"]
            AI2["packages/ai"]
            BILLING2["packages/payments<br/>Stripe"]
            EMAIL2["packages/email<br/>Resend"]
            STORAGE2["packages/storage<br/>S3"]
            ANALYTICS2["packages/analytics"]
            I18N2["packages/i18n"]
            PUSH["packages/push-notifications"]
            APPSTORES["packages/appstores"]
            APIHOOKS2["packages/api-hooks"]
            UIKIT2["packages/ui-kit"]
        end

        WEB2 --> API2
        WEB2 --> AUTH2
        NATIVE --> API2
        API2 --> AUTH2
        API2 --> DB2
        API2 --> BILLING2
        API2 --> EMAIL2
        AUTH2 --> DB2
    end

    subgraph "Simpler Sites (Template-Based)"
        subgraph "Shared Template"
            RR7["React Router 7<br/>SSR + Hono"]
            AUTH_PKG["packages/auth"]
            DB_PKG["packages/database"]
            UI_PKG["packages/ui"]
        end

        CODEBY["codeby.ai<br/>Last updated: 2025-06"]
        LOST["lostcause.com<br/>Last updated: 2025-08"]

        RR7 --> AUTH_PKG
        RR7 --> DB_PKG
        CODEBY -.->|Uses template| RR7
        LOST -.->|Uses template| RR7
    end

    subgraph "External Services"
        PG["PostgreSQL<br/>(Supabase)"]
        STRIPE["Stripe"]
        RESEND["Resend"]
        FCM["FCM / APNs"]
    end

    DB2 --> PG
    DB_PKG --> PG
    BILLING2 --> STRIPE
    EMAIL2 --> RESEND
    PUSH --> FCM

    style WEB2 fill:#a6e3a1,stroke:#40a02b
    style NATIVE fill:#f9e2af,stroke:#f5c211
    style CODEBY fill:#89b4fa,stroke:#1e66f5
    style LOST fill:#f5c2e7,stroke:#ea76cb
```

## Notes

- launchapp-landing-v2 is a full platform (not a simple landing page) with 16 packages + web + native apps
- It includes payments, push notifications, appstores, analytics, i18n, AI, and MCP integration
- pnpm 10.11.0 + Turborepo for monorepo management
- codeby.ai and lostcause.com use a simpler 4-package template
- launchapp.dev (last updated 2025-11) and legacy landing pages are in maintenance mode
- mymoku.net is a separate web app with recent activity (2026-03)
