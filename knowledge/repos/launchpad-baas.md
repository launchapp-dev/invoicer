# launchpad-baas

**Repo**: `launchapp-dev/launchpad-baas`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-01-04

## Purpose

The main Launchpad BaaS platform monorepo. Provides the core backend services for all Launchpad templates: authentication, database management, API infrastructure, and admin UI.

## Tech Stack

- **Runtime**: Node.js (≥20)
- **Package manager**: pnpm (workspaces + Turborepo)
- **API**: Hono
- **Auth**: better-auth
- **Database**: PostgreSQL + Drizzle ORM
- **Admin UI**: Next.js
- **Deployment**: Railway (primary), Docker

## Architecture

```
launchpad-baas/
  apps/
    api/       # Hono-based API server
    admin/     # Admin UI (Next.js)
  sdk/
    core/      # @launchpad/core — core utilities
    auth/      # @launchpad/auth — authentication
    db/        # @launchpad/db — database layer
  migrations/
    core/      # Core table migrations
    templates/ # Template-specific migrations
```

## Dependencies on Org Products

- **better-auth** (authentication backbone)
- Hosts early versions of `@launchpad/core`, `@launchpad/auth`, `@launchpad/db`

## What Depends On This

- `launchpad-saas-template` uses `@launchpad/core`, `@launchpad/auth`, `@launchpad/db`
- All other `launchpad-*-sdk` packages build on top of the core established here

## Current Status: Stable/Active

Recent commit (2026-01-04): Added Docker image for admin service with nginx, runtime env injection, security headers, health endpoint.

## Deployment

- Railway (managed PostgreSQL, Redis, S3-compatible storage)
- Docker (unified image) — `docker build`, `make unified-run`
