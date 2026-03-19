# launchpad-db-engine

**Repo**: `launchapp-dev/launchpad-db-engine`
**Visibility**: Public
**Language**: TypeScript
**Package**: `@launchpad/db-engine` v0.1.0
**Last updated**: 2026-01-03

## Purpose

Custom database engine with built-in multi-tenancy, migrations, and TypeScript type generation. Built for BaaS platforms that need every query automatically scoped by `app_id` and `organization_id`.

## Tech Stack

- TypeScript
- Node.js 18+
- Supported databases: PostgreSQL (default), MySQL, SQLite
- CI: GitHub Actions
- Test coverage: Codecov

## Key Features

- **Multi-Database Support**: PostgreSQL, MySQL, SQLite
- **Built-in Multi-Tenancy**: Every query automatically scoped by `app_id` and `organization_id`
- **Custom Migration System**: Unified migrations for core and template tables
- **Dynamic Schema Registry**: Register schemas at runtime
- **Type Generation**: Generate TypeScript types from registered schemas
- **Query Builder**: Fluent, type-safe API

## Test Coverage

**191 tests**: 173 unit + 18 integration

## Installation

```bash
pnpm add @launchpad/db-engine postgres  # PostgreSQL
pnpm add @launchpad/db-engine mysql2    # MySQL
pnpm add @launchpad/db-engine better-sqlite3  # SQLite
```

## Dependencies on Org Products

None (standalone library)

## What Depends On This

- `launchpad-baas` (database layer)
- `@launchpad/db` SDK (likely wraps this)
- `launchpad-db-sdk`

## Current Status: Stable

Public package with test coverage. v0.1.0 but functionally complete.
