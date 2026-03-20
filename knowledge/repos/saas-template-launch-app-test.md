# saas-template-launch-app-test

**Internal name**: launchapp-lite
**Org**: launchapp-dev
**Visibility**: private
**Status**: Active development (179 merged PRs in the last 7 days, multiple PRs per hour)
**Created**: 2026-03-17
**Last pushed**: 2026-03-20 (after rate-limit agent routing fix at 2026-03-20T20:19:38Z)

## Purpose

Production-ready SaaS starter monorepo providing auth, database, API, web frontend, payments, email, AI, i18n, storage, monitoring, and async jobs out of the box. Target audience: developers who want a full-stack SaaS foundation built on React Router 7, with sensible defaults and provider abstractions for swappable third-party services.

This is the flagship, actively developed template that receives AO-orchestrated task automation daily. Despite the repo name, it now functions as the primary launchapp-lite trunk/canary rather than a throwaway testing copy.

## Monorepo Structure

```
saas-template-launch-app-test/
├── apps/
│   └── web/                    React Router 7 SSR frontend
├── packages/
│   ├── ai/                     Vercel AI SDK wrapper (OpenAI + Anthropic)
│   ├── analytics/              PostHog provider abstraction (client + server)
│   ├── api/                    Hono API server with OpenAPI spec + Scalar docs
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
| Monitoring | Sentry (web + API) | `@sentry/react` / `@sentry/node` ^10.0.0 |
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
- `jobs` — QStash-backed async job enqueueing (restricted to admin sessions or API keys)
- `storage` — presigned S3 upload/download/delete endpoints
- `users` — user profile management
- `waitlist` — verification/support endpoints; join submission now starts from a web action

### `@repo/billing`
Provider abstraction over Stripe and Polar.sh. Swappable via `PAYMENT_PROVIDER` env var. Contains separate `providers/stripe.ts` and `providers/polar.ts` implementations.

### `@repo/ai`
Wrapper around the Vercel AI SDK exposing OpenAI and Anthropic providers via a unified interface. Config-driven model selection.

### `@repo/analytics`
PostHog analytics abstraction with both client-side (posthog-js) and server-side (posthog-node) support.

### `@repo/email`
Resend email sending + React Email component templates. Used by auth flows and waitlist confirmation.

### `@repo/storage`
S3-compatible object storage using `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`. Presigned URL generation for secure browser-direct uploads/downloads. Verified compatible with R2, Tigris, and Vercel Blob storage providers.

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
The Hono API uses `@hono/zod-openapi` so all routes are defined with Zod schemas that generate OpenAPI specs. `@scalar/hono-api-reference` serves live docs. The older generated-client package (`@repo/api-hooks`) was removed from the live monorepo on 2026-03-19, so the OpenAPI surface is currently used for documentation and typed route contracts rather than a shipped internal hooks package.

### Zod Validation Throughout
Zod is used at every boundary: config (`@repo/config`), database schemas via `drizzle-zod`, API route definitions, and runtime validation inside the web/API layers.

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
- **Deployment targets**: Railway, Vercel, and Cloudflare Workers configurations available (all merged 2026-03-19)
  - **Cloudflare Workers**: `apps/web/wrangler.toml`, `apps/web/workers/app.ts`, and `docs/deployment/cloudflare.md` guide
    - Uses Hyperdrive for Neon Postgres connection pooling at the edge
    - Uses R2 for S3-compatible object storage (replaces traditional S3 when deployed to CF)
    - Built with `CF_PAGES=1` flag for ESM module format
    - Sub-5ms cold starts, with 50ms CPU time limit per request on free plan (30s on paid)
    - Integrates with React Router via `AppLoadContext` to expose CF bindings (Hyperdrive, R2)
    - Known constraints: no Node.js fs/child_process APIs, uses `nodejs_compat` flag for crypto/path support
  - **Railway & Vercel**: Traditional platforms with full Node.js runtime and Pulumi IaC support

## Dependencies on Other Org Products

| Dependency | How Used |
|---|---|
| `better-auth` (org repo) | Auth layer via `@repo/auth` |
| AO CLI | Task orchestration, PR automation, planner workflow |

## Current Status and Recent Activity

**Extremely active development** — created 2026-03-17 and already at 180+ merged PRs in the current 7-day window. Recent verified changes:
- `2b6c17c`: remove `@repo/email` coupling from `@repo/api` by moving waitlist join into a web action
- `79ef14c`: fix Pulumi ALB health checks to use `/api/health`
- `4ee9dfe`: fix dashboard API key typing by mapping Better-Auth results instead of unsafe casts
- `@repo/api-hooks` removed from the default branch as dead code
- Sentry, notifications, and Vitest setup all landed the same day
- PR #288: `@repo/jobs` package removed (Trigger.dev async jobs no longer in template)
- PR #289: `@repo/storage` verified compatible across R2, Tigris, and Vercel Blob
- PR #290, #291, #294: Railway and Vercel deployment configurations + guides added
- **Cloudflare Workers deployment support**: `wrangler.toml`, `workers/app.ts` entry point, and comprehensive deployment guide with Hyperdrive + R2 integration (merged 2026-03-19)
- PR #292: Email verification flow added after user registration
- `c5c7029` (latest, 2026-03-19): cleanup — removed remaining stale `@repo/jobs` references from `CLAUDE.md`; updated package manifests and lockfile to reflect removal of the jobs package

This repo is the primary development vehicle for the launchapp-lite product, with AO automating multiple feature tasks daily. Three deployment targets (Railway, Vercel, Cloudflare Workers) now have full configuration and documentation support.

**Recent activity (2026-03-20)**:
- Early morning cycle: PR #323 (00:39:14Z) and PR #325 (00:39:32Z) merged.
- Post-12:43Z activity (billing, CI, docs, and testing):
  - PR #347 (12:49:26Z): GET /api/billing/subscription endpoint added (TASK-374)
  - PR #353 (12:51:14Z): Node.js version pinned to 20.18.3 in CI (TASK-382)
  - PR #355 (13:02:30Z): Duplicate ENV CI=true removed from Dockerfile (TASK-381)
  - PR #354 (13:02:36Z): Comprehensive package guides documented for ai, analytics, core, i18n, mcp, storage, typescript-config, ui-kit (TASK-380)
  - PR #351 (13:02:54Z): Test coverage added for @repo/core getRequiredEnv/getEnvWithDefault (TASK-371)
- Post-13:17Z activity (Docker hardening & package export-map):
  - PRs #361-#367 (13:17:55Z–13:53:13Z): Docker hardening enhancements and package export-map configuration improvements for better module resolution and dependency tree optimization
- Post-16:27Z activity (AO agent rate-limit recovery):
  - Commit at 2026-03-20T20:19:38Z: Default agent route changed to oai-runner/MiniMax-M2.7 to address Claude API rate limits (Sonnet rate limited through 2026-03-24). No changes to application code.

Continuing active development with multiple automated tasks per hour and demonstrated improvements in billing surface, CI reliability, documentation, test coverage, and rate-limit resilience.
