# LaunchPad BaaS

> Backend-as-a-Service platform — core platform + 19+ SDKs + backend servers

## Purpose

Launchpad BaaS is a modular, scalable backend platform providing core services for the Launchpad template ecosystem. It includes authentication, database management, storage, payments, realtime, push notifications, AI, analytics, CMS, and more — all as independently deployable TypeScript packages.

The goal is to provide a "Firebase alternative" built on Postgres and open standards, with full TypeScript type safety and multi-tenancy built in.

## Maturity: Active Development (pre-1.0)

All packages are at `v0.1.0`. The platform is functional and in use by templates, but not yet publicly released.

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
- **Type**: Orchestration workspace
- **Description**: Orchestration and workspace for Launchpad BaaS platform development
- **Stack**: TypeScript
- **Last updated**: 2026-01-14

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

| Repo | Package | Description | Visibility |
|------|---------|-------------|------------|
| `launchpad-db-engine` | `@launchpad/db-engine` | Custom DB engine with multi-tenancy, migrations, type generation. 191 tests. | **Public** |
| `launchpad-payments` | `@launchpad/payments` | Standalone payments SDK — Stripe, subscriptions, invoices, metered billing | Private |
| `launchpad-storage` | `@launchpad/storage` | Standalone storage SDK — S3, presigned URLs, multi-tenant | Private |
| `launchpad-email` | `@launchpad/email` | Standalone email SDK — Resend, templates, tracking | Private |
| `launchpad-workflows` | `@launchpad/workflows` | Standalone workflow engine — actions, circuit breaker, state mgmt | Private |
| `launchpad-secrets` | `@launchpad/secrets` | Standalone secrets SDK — AES-256-GCM encryption, versioning, rotation | Private |
| `launchpad-ai` | `@launchpad/ai` | Standalone AI SDK — OpenAI + Anthropic, streaming, embeddings, usage tracking | Private |
| `launchpad-analytics` | `@launchpad/analytics` | Pluggable analytics — event tracking and feature flags | Private |
| `launchpad-audit-log` | `@launchpad/audit-log` | Audit logging for tracking system events and user actions | Private |
| `launchpad-i18n` | `@launchpad/i18n` | Internationalization and localization utilities | Private |
| `launchpad-appstores` | `@launchpad/appstores` | Apple App Store + Google Play — receipt validation, IAP | Private |

---

## Backend Servers

| Repo | Package | Description |
|------|---------|-------------|
| `launchpad-server` | `@launchpad/server` | Type-safe HTTP server framework with OpenAPI and Zod (Hono-based) |
| `launchpad-payments-server` | `@launchpad/payments-server` | Payments server — Stripe webhooks, subscription API, usage billing |
| `launchpad-realtime-server` | `@launchpad/realtime-server` | Realtime server — PostgreSQL LISTEN/NOTIFY, Redis pub/sub, SSE |
| `launchpad-push-server` | `@launchpad/push-server` | Push notification server — FCM, APNs, Web Push |
| `launchpad-git-server` | `@launchpad/git-server` | Agent-optimized git server — worktree isolation, API-first (isomorphic-git) |
| `launchpad-mcp-server` | `@launchpad/mcp-server` | MCP server exposing Launchpad ops for AI coding agents |
| `launchpad-task-orchestrator` | `@launchpad/task-orchestrator` | Machine-consumable task queue and orchestration for AI agents |

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
