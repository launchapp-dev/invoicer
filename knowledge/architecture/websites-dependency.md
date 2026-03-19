---
title: "Websites — Dependency Graph"
product: websites
type: dependency
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

Dependency graph for the Websites product line. All sites share the same template-based dependencies: React Router 7, Hono, Better Auth, Drizzle ORM, and Tailwind CSS. Shows both internal org dependencies and external package dependencies.

## Diagram

```mermaid
graph BT
    subgraph "Website Repos (3 sites, same template)"
        LAUNCH["launchapp.dev"]
        CODEBY["codeby.ai"]
        LOST["lostcause.com"]
    end

    subgraph "Org Product Dependencies"
        BA["better-auth<br/>(org's auth framework)"]
    end

    subgraph "Framework Dependencies"
        RR7["React Router 7<br/>SSR framework"]
        REACT["React 18/19"]
        HONO["Hono<br/>API server"]
        DRIZZLE["Drizzle ORM<br/>Database layer"]
        TW["Tailwind CSS<br/>Styling"]
    end

    subgraph "Infrastructure Dependencies"
        SUPA["Supabase<br/>Managed PostgreSQL"]
    end

    subgraph "Build Tooling"
        PNPM["pnpm workspaces"]
        TURBO["Turborepo"]
    end

    LAUNCH --> BA
    CODEBY --> BA
    LOST --> BA

    LAUNCH --> RR7
    LAUNCH --> HONO
    LAUNCH --> DRIZZLE
    LAUNCH --> TW
    LAUNCH --> REACT

    CODEBY --> RR7
    CODEBY --> HONO
    CODEBY --> DRIZZLE
    CODEBY --> TW
    CODEBY --> REACT

    LOST --> RR7
    LOST --> HONO
    LOST --> DRIZZLE
    LOST --> TW
    LOST --> REACT

    DRIZZLE --> SUPA

    LAUNCH --> PNPM
    LAUNCH --> TURBO
    CODEBY --> PNPM
    CODEBY --> TURBO
    LOST --> PNPM
    LOST --> TURBO

    style BA fill:#a6e3a1,stroke:#40a02b
    style LAUNCH fill:#f9e2af,stroke:#f5c211
    style CODEBY fill:#89b4fa,stroke:#1e66f5
    style LOST fill:#f5c2e7,stroke:#ea76cb
```

## Notes

- All three sites have identical dependency trees — they were scaffolded from the same template
- **better-auth** is the only internal org dependency — used for authentication in all sites
- Core framework stack: React Router 7 + Hono + Drizzle ORM + Tailwind CSS
- Supabase provides managed PostgreSQL — the only external infrastructure dependency
- pnpm + Turborepo for monorepo management (consistent with org-wide conventions)
- No shared UI kit dependency (each site has its own packages/ui)
- Zod is used for schema validation (via Drizzle and env config)
- Sites do not depend on the design-system package — they have inline UI components
