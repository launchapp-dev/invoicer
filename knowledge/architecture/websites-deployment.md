---
title: "Websites — Deployment"
product: websites
type: deployment
status: current
source_repos:
  - launchapp-landing-v2
  - codeby.ai
  - lostcause.com
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

Deployment architecture for the org's web properties. Sites use React Router 7 SSR which requires a Node.js server runtime. Supabase provides managed PostgreSQL. Exact hosting platforms are not specified in the repos.

## Diagram

```mermaid
graph TD
    subgraph "Source (GitHub)"
        LAUNCH_SRC["launchapp-dev/launchapp.dev<br/>Private"]
        CODEBY_SRC["launchapp-dev/codeby.ai<br/>Private"]
        LOST_SRC["launchapp-dev/lostcause.com<br/>Private"]
        LANDING_SRC["launchapp-dev/launchapp-landing-v2<br/>Private"]
    end

    subgraph "Build Pipeline"
        BUILD["Turborepo build<br/>pnpm build"]
        SSR_BUILD["React Router 7<br/>SSR server build"]
    end

    subgraph "Hosting (Node.js Runtime)"
        LAUNCH_HOST["launchapp.dev<br/>Node.js server"]
        CODEBY_HOST["codeby.ai<br/>Node.js server"]
        LOST_HOST["lostcause.com<br/>Node.js server"]
    end

    subgraph "Managed Services"
        SUPA["Supabase<br/>PostgreSQL + Auth infra"]
        DNS["DNS<br/>Custom domains"]
    end

    LAUNCH_SRC --> BUILD
    CODEBY_SRC --> BUILD
    LOST_SRC --> BUILD

    BUILD --> SSR_BUILD
    SSR_BUILD --> LAUNCH_HOST
    SSR_BUILD --> CODEBY_HOST
    SSR_BUILD --> LOST_HOST

    LAUNCH_HOST --> SUPA
    CODEBY_HOST --> SUPA
    LOST_HOST --> SUPA

    LAUNCH_HOST --> DNS
    CODEBY_HOST --> DNS
    LOST_HOST --> DNS

    style LAUNCH_HOST fill:#a6e3a1,stroke:#40a02b
    style CODEBY_HOST fill:#89b4fa,stroke:#1e66f5
    style LOST_HOST fill:#f5c2e7,stroke:#ea76cb
    style LANDING_SRC fill:#f9e2af,stroke:#f5c211
```

## Notes

- All sites require a Node.js server runtime (React Router 7 SSR is not static)
- Exact hosting platform not visible in repos — likely Vercel, Railway, or similar Node.js host
- All repos are private
- Supabase provides managed PostgreSQL for all sites
- launchapp-landing-v2 is the actively developed landing page (updated 2026-01)
- codeby.ai (last updated 2025-10) and lostcause.com (last updated 2025-09) are in maintenance mode
- No visible CI/CD configuration (GitHub Actions) in the repos
- Docker support possible via the template but not confirmed in use
- Each site likely has its own Supabase project (separate databases)
