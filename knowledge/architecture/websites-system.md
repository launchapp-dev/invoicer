---
title: "Websites — System Architecture"
product: websites
type: system
status: current
source_repos:
  - launchapp.dev
  - codeby.ai
  - lostcause.com
  - launchapp-landing-v2
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

System architecture of the org's web properties. All three main sites (launchapp.dev, codeby.ai, lostcause.com) share the same monorepo template structure — React Router 7 SSR frontend with Hono API backend, Drizzle ORM, and Supabase/PostgreSQL. The launchapp-landing-v2 is the current active landing page development.

## Diagram

```mermaid
graph TD
    subgraph "Shared Website Architecture (Template-Based)"
        subgraph "Frontend"
            RR7["React Router 7<br/>SSR rendering"]
            TW["Tailwind CSS<br/>Styling"]
        end

        subgraph "API Layer"
            HONO["Hono<br/>API server"]
        end

        subgraph "Packages (Monorepo)"
            AUTH_PKG["packages/auth<br/>Better Auth"]
            DB_PKG["packages/database<br/>Drizzle ORM"]
            UI_PKG["packages/ui<br/>Shared components"]
            TS_PKG["packages/typescript-config"]
        end

        subgraph "Infrastructure"
            PG["PostgreSQL<br/>(via Supabase)"]
        end
    end

    RR7 --> HONO
    RR7 --> AUTH_PKG
    RR7 --> UI_PKG
    HONO --> AUTH_PKG
    HONO --> DB_PKG
    AUTH_PKG --> DB_PKG
    DB_PKG --> PG

    subgraph "Web Properties"
        LAUNCH["launchapp.dev<br/>Main product site<br/>Last updated: 2025-11"]
        CODEBY["codeby.ai<br/>AI product site<br/>Last updated: 2025-06"]
        LOST["lostcause.com<br/>Web property<br/>Last updated: 2025-08"]
        LANDING["launchapp-landing-v2<br/>Active landing page<br/>Last updated: 2026-01"]
    end

    LAUNCH -.->|Uses template| RR7
    CODEBY -.->|Uses template| RR7
    LOST -.->|Uses template| RR7

    style LAUNCH fill:#a6e3a1,stroke:#40a02b
    style LANDING fill:#f9e2af,stroke:#f5c211
    style CODEBY fill:#89b4fa,stroke:#1e66f5
    style LOST fill:#f5c2e7,stroke:#ea76cb
```

## Notes

- All three main sites were scaffolded from the same monorepo template (launchapp-lite pattern)
- launchapp.dev is the main product website but appears outdated (last updated 2025-11)
- launchapp-landing-v2 (updated 2026-01) is the active landing page under development
- codeby.ai and lostcause.com are in maintenance mode with no recent updates
- Shared stack: React Router 7 + Hono + Better Auth + Drizzle ORM + Tailwind CSS
- pnpm workspaces + Turborepo for monorepo management
- Several legacy/abandoned landing pages exist: launchapp.dev-landing, aethris-landing, site-inspector-landing
- mymoku.net is a separate web app with recent activity (2026-03)
