---
title: "SaaS Template — Dependency Graph"
product: saas-template
type: dependency
status: current
source_repos:
  - saas-template-launch-app-test
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

Internal package dependency graph for the saas-template-launch-app-test monorepo. Shows how the 15 internal @repo/* packages depend on each other, forming a clear layered architecture from foundational config through domain packages to the web app.

## Diagram

```mermaid
graph BT
    TS["@repo/typescript-config"]
    CORE["@repo/core"]
    CONFIG["@repo/config"]
    DB["@repo/database"]
    AUTH["@repo/auth"]
    API["@repo/api"]
    WEB["apps/web"]
    AI["@repo/ai"]
    BILLING["@repo/billing"]
    EMAIL["@repo/email"]
    STORAGE["@repo/storage"]
    ANALYTICS["@repo/analytics"]
    I18N["@repo/i18n"]
    APIHOOKS["@repo/api-hooks"]
    MCP["@repo/mcp"]
    UIKIT["@repo/ui-kit"]

    CONFIG --> TS
    DB --> CONFIG
    AUTH --> DB
    AUTH --> CONFIG
    AUTH --> EMAIL

    AI --> CONFIG
    BILLING --> CONFIG
    BILLING --> CORE
    EMAIL --> CONFIG
    STORAGE --> CONFIG

    API --> AI
    API --> AUTH
    API --> BILLING
    API --> CONFIG
    API --> DB
    API --> EMAIL
    API --> STORAGE

    APIHOOKS -.->|generated from OpenAPI spec| API

    MCP --> AUTH
    MCP --> DB

    WEB --> AUTH
    WEB --> CONFIG
    WEB --> DB
    WEB --> AI
    WEB --> API
    WEB --> ANALYTICS

    style TS fill:#e8e8e8,stroke:#999
    style CORE fill:#e8e8e8,stroke:#999
    style CONFIG fill:#f9e2af,stroke:#f5c211
    style DB fill:#89b4fa,stroke:#1e66f5
    style AUTH fill:#89b4fa,stroke:#1e66f5
    style API fill:#a6e3a1,stroke:#40a02b
    style WEB fill:#cba6f7,stroke:#8839ef
```

## Notes

- @repo/typescript-config and @repo/core are leaf nodes with no internal deps
- @repo/config depends on @repo/typescript-config and provides Zod-validated env access
- @repo/auth depends on @repo/email (for auth email flows) in addition to database and config
- @repo/api depends on @repo/email directly for transactional email sending
- @repo/billing depends on @repo/core (lazy-init utilities), not the other way around
- @repo/api-hooks is auto-generated from the OpenAPI spec via orval (dashed line = generated dependency)
- @repo/analytics, @repo/i18n, @repo/ui-kit are independent packages with no internal deps
- apps/web depends directly on @repo/api (not via api-hooks); does not depend on i18n, ui-kit, or api-hooks
