# saas-template-launch-app-test

**Internal name**: launchapp-lite
**Org**: launchapp-dev
**Visibility**: private
**Status**: Active development (180+ merged PRs, multiple PRs per day)
**Created**: 2026-03-17
**Last pushed**: 2026-03-19

## Purpose

Lightweight SaaS starter monorepo providing auth, database, API, web frontend, payments, email, AI, i18n, and storage out of the box. Target audience: developers who want a production-ready SaaS foundation built on React Router 7, with sensible defaults and provider abstractions for swappable third-party services.

This is the flagship, actively developed template that receives AO-orchestrated task automation daily.

## Monorepo Structure

```
saas-template-launch-app-test/
├── apps/
│   └── web/                    React Router 7 SSR frontend
├── packages/
│   ├── ai/                     Vercel AI SDK wrapper (OpenAI + Anthropic)
│   ├── analytics/              PostHog provider abstraction (client + server)
│   ├── api/                    Hono API server with OpenAPI spec + Scalar docs
│   ├── api-hooks/              Auto-generated React Query hooks + Axios client (orval)
│   ├── auth/                   Better-Auth server + client setup, API key plugin
│   ├── billing/                Stripe + Polar.sh provider abstraction
│   ├── config/                 Shared env config with Zod validation + lazy-init
│   ├── core/                   Lazy-init utilities and shared env helpers
│   ├── database/               Drizzle ORM schema, migrations, db client
│   ├── email/                  Resend + React Email templates
│   ├── i18n/                   i18next internationalization (en/es)
│   ├── mcp/                    Custom MCP server scaffold (stdio transport)
│   ├── storage/                S3-compatible object storage (@aws-sdk)
│   ├── typescript-config/      Shared tsconfig base
│   └── ui-kit/                 Shared React component library (clsx + tailwind-merge)
├── infrastructure/
│   ├── pulumi/                 Pulumi IaC (@pulumi/aws, @pulumi/awsx)
│   └── scripts/                Deploy, health-check, secrets generation scripts
├── .ao/
│   ├── config.json             AO project config (project_name: saas-template-launch-app-test)
│   └── workflows/custom.yaml   Custom AO workflow with planner + default agents
└── docker-compose.yml          Local PostgreSQL dev environment
```

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | React Router 7 (SSR) | ^7.5.0 |
| Styling | TailwindCSS | ^4.2.2 |
| Language | TypeScript | ^5.8.0 |
| API | Hono + @hono/zod-openapi | latest |
| API Docs | @scalar/hono-api-reference | latest |
| Auth | Better-Auth + @better-auth/api-key | latest |
| Database | Drizzle ORM + PostgreSQL | drizzle ^0.45.0 |
| AI | Vercel AI SDK (@ai-sdk/openai, @ai-sdk/anthropic) | latest |
| Analytics | PostHog (posthog-js + posthog-node) | latest |
| Billing | Stripe + Polar.sh (@polar-sh/sdk) | latest |
| Email | Resend + React Email | latest |
| Storage | AWS S3 (@aws-sdk/client-s3) | latest |
| i18n | i18next + react-i18next | latest |
| MCP | @modelcontextprotocol/sdk | latest |
| Monorepo | Turborepo + pnpm | turbo ^2.8.19, pnpm ^10.32.1 |
| Linting | Biome | ^2.4.8 |
| Testing | Vitest | ^4.0.0 |
| IaC | Pulumi + AWS | @pulumi/aws ^6.0.0 |
| Bundler | Vite | ^8.0.0 |

## Internal Packages and Roles

### `@repo/config`
Central environment configuration using Zod schemas and the lazy-init pattern. All other packages consume config from here rather than reading `process.env` directly. Prevents re-initialization on every module load.

### `@repo/core`
Shared lazy-init utilities. Houses the pattern used by config, database, and other packages to defer expensive initialization until first use.

### `@repo/database`
Drizzle ORM setup with PostgreSQL. Exports schema, migrations, db client, and drizzle-zod validators. Schemas:
- `accounts` — OAuth provider accounts linked to users
- `sessions` — active user sessions
- `users` — core user records
- `waitlist_entries` — waitlist with status enum (pending/approved/declined/invited), referral fields, jsonb metadata

### `@repo/auth`
Better-Auth server + client configuration. Includes the `@better-auth/api-key` plugin for programmatic API key management. Consumes `@repo/config` and `@repo/database`.

### `@repo/api`
Hono API server with OpenAPI spec generation via `@hono/zod-openapi`. Served API reference via Scalar. Rate limiting via `@hono-rate-limiter/redis`. Routes:
- `admin` — admin-only operations
- `ai` — AI generation endpoints
- `api-keys` — CRUD for Better-Auth API keys (auth-protected)
- `billing` — Stripe/Polar checkout and subscription management
- `storage` — presigned S3 upload/download/delete endpoints
- `users` — user profile management
- `waitlist` — public join + verify endpoints

### `@repo/api-hooks`
Auto-generated React Query hooks and Axios client from the OpenAPI spec using orval (upgraded to v8). Keeps client/server types in sync automatically.

### `@repo/billing`
Provider abstraction over Stripe and Polar.sh. Swappable via `PAYMENT_PROVIDER` env var. Contains separate `providers/stripe.ts` and `providers/polar.ts` implementations.

### `@repo/ai`
Wrapper around the Vercel AI SDK exposing OpenAI and Anthropic providers via a unified interface. Config-driven model selection.

### `@repo/analytics`
PostHog analytics abstraction with both client-side (posthog-js) and server-side (posthog-node) support.

### `@repo/email`
Resend email sending + React Email component templates. Used by auth flows and waitlist confirmation.

### `@repo/storage`
S3-compatible object storage using `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`. Presigned URL generation for secure browser-direct uploads/downloads.

### `@repo/i18n`
i18next internationalization with browser language detection and HTTP backend. Languages: English (en), Spanish (es).

### `@repo/mcp`
Custom MCP server scaffold using `@modelcontextprotocol/sdk` over stdio transport. Has access to `@repo/auth` and `@repo/database` for tool implementations.

### `@repo/ui-kit`
Shared React component library. Lightweight — uses `clsx` and `tailwind-merge` for class management. No heavy component framework dependency.

### `@repo/typescript-config`
Shared TypeScript base configurations consumed by all packages.

## Key Architecture Decisions

### Provider Abstraction Pattern
Billing (Stripe vs Polar) and AI (OpenAI vs Anthropic) use a provider interface pattern. Switching providers requires only an env var change (`PAYMENT_PROVIDER`), not code changes.

### Lazy-Init Pattern
Config, database connections, and other expensive resources use lazy initialization — they are created on first access, not at module import time. This is critical for SSR environments where module-level side effects cause issues.

### OpenAPI-First API Design
The Hono API uses `@hono/zod-openapi` so all routes are defined with Zod schemas that generate OpenAPI specs. `@scalar/hono-api-reference` serves live docs. `orval` consumes the spec to auto-generate `@repo/api-hooks`.

### Zod Validation Throughout
Zod is used at every boundary: config (`@repo/config`), database schemas via `drizzle-zod`, API route definitions, and client-side type generation.

### Turborepo Task Graph
`turbo.json` defines a proper build DAG. The `DATABASE_URL`, auth, and payment env vars are declared as `globalEnv` so Turborepo correctly invalidates caches when they change. Sensitive secrets are in `globalPassThroughEnv`.

## AO CLI Integration

This repo is deeply integrated with the AO Agent Orchestrator:

- `.ao/config.json` — names the project `saas-template-launch-app-test`
- `.ao/workflows/custom.yaml` — defines a custom workflow with:
  - `default` agent (claude-sonnet-4-6)
  - `planner` agent — reads all tasks, enforces dependency order, handles rework/rebase queue priority
  - MCP servers: context7, package-version, sequential-thinking, memory, github
  - Tools: npm, npx, node, gh, git, pnpm, WebSearch, WebFetch
- All PRs are created by AO via `ao/task-*` branches (e.g., `ao/task-182`, `ao/task-183`)
- The planner agent enforces dependency ordering and prioritizes rework → rebase → review → new work

## Infrastructure

- **Local dev**: Docker Compose with PostgreSQL
- **Production IaC**: Pulumi + AWS (`@pulumi/aws ^6.0.0`, `@pulumi/awsx ^2.0.0`)
- **Deploy scripts**: `infrastructure/scripts/deploy.sh`, `health-check.sh`, `generate-secrets.sh`
- **Docker**: `docker-compose.prod.yml` for production-like local testing

## Dependencies on Other Org Products

| Dependency | How Used |
|---|---|
| `better-auth` (org repo) | Auth layer via `@repo/auth` |
| AO CLI | Task orchestration, PR automation, planner workflow |

## Current Status and Recent Activity

**Extremely active development** — created 2026-03-17, already has 180+ merged PRs as of 2026-03-19. Recent additions:
- Waitlist system with DB schema, API route, email confirmation (TASK-182)
- API key management CRUD endpoints (TASK-183)
- Turbo.json alignment with full launchapp (TASK-184)
- Storage presigned URL API routes (TASK-175)
- Hono rate-limiter upgrade 0.4.2 → 0.5.3 (TASK-180)
- Orval upgrade v7 → v8 in api-hooks (TASK-179)

This repo is the primary development vehicle for the launchapp-lite product, with AO automating multiple feature tasks daily.
