# LaunchPad BaaS

> Backend-as-a-Service platform — core platform + 19+ SDKs + backend servers

## Purpose

Launchpad BaaS is a modular, scalable backend platform providing core services for the Launchpad template ecosystem. It includes authentication, database management, storage, payments, realtime, push notifications, AI, analytics, CMS, and more — all as independently deployable TypeScript packages.

The goal is to provide a "Firebase alternative" built on Postgres and open standards, with full TypeScript type safety and multi-tenancy built in.

## Maturity: Active Development (pre-1.0)

All packages are at `v0.1.0`. The platform is functional and in use by templates, but not yet publicly released.

As of 2026-03-19, SDK-CONSISTENCY issues have been filed across 10 of 11 client SDKs covering: missing READMEs, `tsconfig.json` deviations, `package.json` packaging gaps (missing `publishConfig`, `test:coverage` script), and import extension inconsistencies. `launchpad-storage-sdk` is the only client SDK with no open issues.

## Visibility: Private (except launchpad-db-engine)

---

## Core Repos

### `launchpad-baas` (private)
- **Type**: Monorepo (pnpm workspaces + Turborepo)
- **Description**: Main platform repo with API server, admin UI, and core SDKs
- **Stack**: TypeScript, Hono (API), Next.js (admin), Better Auth, Drizzle ORM, PostgreSQL, Railway (deployment)
- **Structure**: `apps/api` (Hono API), `apps/admin` (Next.js), `sdk/core`, `sdk/auth`, `sdk/db`
- **Last updated**: 2026-01-04

### `launchpad-ecosystem` (private)
- **Type**: Orchestration workspace / multi-agent dev environment
- **Description**: AI-powered parallel development workspace using git worktrees. Package name is `worktree-manager`. Coordinates multi-agent (Claude, Codex, Gemini) development across Launchpad SDK repos via MCP tools.
- **Stack**: TypeScript, MCP SDK (`@modelcontextprotocol/sdk`), Zod
- **Version**: 1.0.0
- **Last updated**: 2026-01-19
- **Status**: Active — used as the internal orchestration tool for building all `@launchpad/*` packages

---

## Client SDKs (all `@launchpad/*`, v0.1.0, private)

| Repo | Package | Description |
|------|---------|-------------|
| `launchpad-core-sdk` | `@launchpad/core` | Core HTTP client, session management, React integration |
| `launchpad-auth-sdk` | `@launchpad/auth` | Authentication hooks and components for React |
| `launchpad-db-sdk` | `@launchpad/db` | Database querying with TanStack Query React hooks |
| `launchpad-payments-sdk` | `@launchpad/payments` | Payments SDK — Stripe subscriptions and billing |
| `launchpad-storage-sdk` | `@launchpad/storage` | File uploads, downloads, and management |
| `launchpad-realtime-sdk` | `@launchpad/realtime` | WebSocket subscriptions and live data |
| `launchpad-workflows-sdk` | `@launchpad/workflows` | Background jobs, scheduled tasks, workflow automation |
| `launchpad-push-sdk` | `@launchpad/push` | Web and mobile push notifications |
| `launchpad-identity-sdk` | `@launchpad/identity` | User directory, SSO, RBAC, organization management |
| `launchpad-customers-sdk` | `@launchpad/customers` | Customer management, CRM, segmentation |
| `launchpad-cms-sdk` | `@launchpad/cms` | Headless CMS with content types, localization, versioning |
| `offline-sdk` | `@launchpad/offline` | Offline-first capabilities |
| `testing-sdk` | `@launchpad/testing` | Testing utilities |

---

## Standalone SDKs / Libraries (independent usage)

| Repo | Package | Description | Version | Last Updated | Status | Visibility |
|------|---------|-------------|---------|--------------|--------|------------|
| `launchpad-db-engine` | `@launchpad/db-engine` | Custom DB engine with multi-tenancy, migrations, type generation. 191 tests. | 0.x | — | Stable | **Public** |
| `launchpad-payments` | `@launchpad/payments` | Standalone payments SDK — Stripe, subscriptions, invoices, metered billing | 0.1.0 | 2026-01-14 | Stable | Private |
| `launchpad-storage` | `@launchpad/storage` | Standalone storage SDK — S3/GCS, presigned URLs, upload progress, multi-tenant | 0.1.0 | 2026-01-04 | Stable | Private |
| `launchpad-email` | `@launchpad/email` | Standalone email SDK — Resend, templates, multi-tenant tracking | 0.1.0 | 2026-01-04 | Stable | Private |
| `launchpad-workflows` | `@launchpad/workflows` | Standalone workflow engine — declarative actions, circuit breaker, BullMQ distributed | 0.1.0 | 2026-01-03 | Active dev | Private |
| `launchpad-secrets` | `@launchpad/secrets` | Standalone secrets SDK — AES-256-GCM encryption, versioning, key rotation | 0.1.0 | 2025-12-30 | Stable | Private |
| `launchpad-ai` | `@launchpad/ai` | Standalone AI SDK — OpenAI + Anthropic, streaming, embeddings, usage tracking | 0.1.0 | 2025-12-12 | Stable | Private |
| `launchpad-analytics` | `@launchpad/analytics` | Pluggable analytics — event tracking and feature flags | — | — | Unknown | Private |
| `launchpad-audit-log` | `@launchpad/audit-log` | Audit logging for tracking system events and user actions | — | — | Unknown | Private |
| `launchpad-i18n` | `@launchpad/i18n` | Internationalization and localization utilities | — | — | Unknown | Private |
| `launchpad-appstores` | `@launchpad/appstores` | Apple App Store + Google Play — receipt validation, IAP | — | — | Unknown | Private |

---

## Backend Servers

| Repo | Package | Description | Version | Last Updated | Status |
|------|---------|-------------|---------|--------------|--------|
| `launchpad-server` | `@launchpad/server` | Type-safe HTTP server framework with OpenAPI 3.1 and Zod (Hono-based) | 0.1.0 | 2025-12-16 | Stable |
| `launchpad-payments-server` | `@launchpad/payments-server` | Payments server — Stripe webhooks, subscription API, usage billing | — | — | Unknown |
| `launchpad-realtime-server` | `@launchpad/realtime-server` | Realtime server — PostgreSQL LISTEN/NOTIFY, Redis pub/sub, SSE | 0.1.0 | 2025-12-19 | Stable |
| `launchpad-push-server` | `@launchpad/push-server` | Push notification server — FCM, APNs, Web Push | — | — | Unknown |
| `launchpad-git-server` | `@launchpad/git-server` | Agent-optimized git server — worktree-per-task isolation, isomorphic-git | 0.1.0 | 2026-01-01 | Stable |
| `launchpad-mcp-server` | `@launchpad/mcp-server` | MCP server exposing Launchpad ops for AI coding agents | 0.1.0 | 2026-01-01 | Stable |
| `launchpad-task-orchestrator` | `@launchpad/task-orchestrator` | Machine-consumable task queue (17 MCP tools) for AI agent workflows | 0.1.0 | 2025-12-20 | Stable |

---

## Tech Stack

- **Language**: TypeScript (Node.js)
- **API Framework**: Hono
- **Authentication**: better-auth (org's own library)
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (primary), MySQL and SQLite (supported)
- **Payments**: Stripe
- **Storage**: S3-compatible (AWS S3)
- **Email**: Resend
- **Push Notifications**: FCM, APNs, Web Push
- **AI**: OpenAI, Anthropic
- **Deployment**: Railway (primary), Docker
- **Monorepo**: pnpm workspaces + Turborepo

## Internal Dependencies

- All SDKs depend on `@launchpad/core` (core SDK)
- `launchpad-saas-template` depends on `@launchpad/core`, `@launchpad/auth`, `@launchpad/db`, `@launchpad/payments`
- `launchpad-baas` hosts the reference implementation of `@launchpad/core`, `@launchpad/auth`, `@launchpad/db`

## External Dependencies on Org Products

- Uses `better-auth` for authentication (org's own open-source library)
