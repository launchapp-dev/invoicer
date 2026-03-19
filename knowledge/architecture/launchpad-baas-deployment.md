---
title: "Launchpad BaaS — Deployment Architecture"
product: launchpad-baas
type: deployment
status: current
source_repos:
  - launchpad-baas
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How Launchpad BaaS is deployed — primary target is Railway with Docker as the containerization layer. Shows the multi-service deployment model with separate API and admin services.

## Diagram

```mermaid
graph TD
    subgraph "Source"
        MONO["launchpad-baas monorepo<br/>pnpm + Turborepo"]
    end

    subgraph "Build"
        TURBO["Turborepo Build DAG"]
        DOCKER["Docker Multi-stage Build<br/>Dockerfile"]
        NIXPACKS["nixpacks.toml<br/>Railway auto-build"]
    end

    subgraph "CI/CD"
        GHA["GitHub Actions<br/>.github/"]
        E2E["Playwright E2E Tests"]
        PERF["Performance Tests"]
    end

    subgraph "Railway Platform"
        APISERVICE["API Service<br/>Hono server"]
        ADMINSERVICE["Admin Service<br/>Next.js + nginx"]
        RAILPG[(Railway PostgreSQL)]
        RAILREDIS[(Railway Redis)]
    end

    subgraph "Docker Compose (Local)"
        DCAPI["API Container"]
        DCADMIN["Admin Container"]
        DCPG[(PostgreSQL)]
        DCREDIS[(Redis)]
    end

    subgraph "External Services"
        S3[AWS S3]
        STRIPE[Stripe]
        RESEND[Resend]
    end

    subgraph "Database Migrations"
        MIGRATIONS["migrations/<br/>core/ + templates/"]
    end

    MONO --> TURBO
    TURBO --> DOCKER
    TURBO --> NIXPACKS
    MONO --> GHA
    GHA --> E2E
    GHA --> PERF

    DOCKER --> DCAPI
    DOCKER --> DCADMIN
    DCAPI --> DCPG
    DCAPI --> DCREDIS

    NIXPACKS --> APISERVICE
    NIXPACKS --> ADMINSERVICE
    APISERVICE --> RAILPG
    APISERVICE --> RAILREDIS
    ADMINSERVICE --> RAILPG

    APISERVICE --> S3
    APISERVICE --> STRIPE
    APISERVICE --> RESEND

    MIGRATIONS --> RAILPG
    MIGRATIONS --> DCPG
```

## Notes

- Railway is primary deployment via nixpacks.toml auto-detection
- Docker multi-stage build available (Dockerfile.disabled suggests migration in progress)
- Admin service uses nginx with runtime env injection and security headers
- Two migration directories: core/ for platform tables, templates/ for template-specific tables
- Local development via docker-compose.yml (PostgreSQL + Redis)
- E2E tests via Playwright; performance testing infrastructure exists
- Makefile provides `make unified-run` for single-image deployment
- railway.json provides Railway-specific deployment configuration
- renovate.json manages automated dependency updates
