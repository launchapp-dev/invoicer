# SDK Consistency Matrix

> Last updated: 2026-03-18 by knowledge-curator agent.
> Source repo: `saas-template-launch-app-test` (flagship template).

## Core Framework Versions

| Package | Version | Notes |
|---|---|---|
| `react` | ^19.0.0 | React 19 |
| `react-router` | ^7 | SSR mode via `@react-router/dev` |
| `hono` | ^4.7.5 | API server |
| `better-auth` | ^1.2.7 | Auth |
| `drizzle-orm` | ^0.45.0 | ORM |
| `zod` | ^4.3.6 | Validation (shared across all packages) |
| `typescript` | ^5 | Strict TypeScript |
| `tailwindcss` | ^4.2.2 | Styling |
| `turbo` | ^2.8.19 | Monorepo build |
| `biome` | — | Linting/formatting |
| `pnpm` | ^10 | Package manager |

## Package-Level SDK Matrix (`saas-template-launch-app-test`)

| Package | Key SDKs | Version | Status |
|---|---|---|---|
| `@repo/api` | hono | ^4.7.5 | Current |
| | hono-rate-limiter | ^0.5.0 | Current (upgraded from 0.4.x) |
| | @hono-rate-limiter/redis | ^0.1.4 | — |
| | @upstash/redis | ^1.37.0 | — |
| | @hono/zod-openapi | ^1.2.2 | — |
| | @scalar/hono-api-reference | ^0.10.4 | — |
| | zod | ^4.3.6 | — |
| `@repo/auth` | better-auth | ^1.2.7 | Current |
| | @better-auth/api-key | ^1.5.5 | — |
| `@repo/database` | drizzle-orm | ^0.45.0 | Current |
| | drizzle-kit | ^0.31.0 | — |
| | drizzle-zod | ^0.8.3 | — |
| | postgres | ^3.4.5 | — |
| `@repo/billing` | stripe | ^20.0.0 | Current |
| | @polar-sh/sdk | ^0.46.0 | Polar.sh (alternative) |
| `@repo/analytics` | posthog-node | ^5.0.0 | Current (upgraded from v4) |
| | posthog-js | ^1.57.0 | — |
| `@repo/email` | resend | ^6.0.0 | Current |
| | react-email | ^5.0.0 | Current (upgraded from v4) |
| | @react-email/components | ^1.0.0 | — |
| `@repo/storage` | @aws-sdk/client-s3 | ^3.1011.0 | Current |
| | @aws-sdk/s3-request-presigner | ^3.1011.0 | — |
| `@repo/api-hooks` | orval | ^8 | Current (upgraded from v7) |
| `@repo/i18n` | i18next | ^25 | Current (upgraded from v24) |
| | react-i18next | ^16 | Current (upgraded from v15) |

## Launchpad BaaS SDKs (legacy)

> These are standalone SDKs from the older Launchpad BaaS product line. Less actively maintained.

| SDK | Description | Status |
|---|---|---|
| `launchpad-identity-sdk` | User directory, SSO, RBAC, org management | Stale (last: Dec 2025) |
| `launchpad-payments-sdk` | Stripe payments | Stale (last: Jan 2026) |
| `launchpad-storage-sdk` | File uploads/downloads | Stale (last: Dec 2025) |
| `launchpad-realtime-sdk` | WebSocket subscriptions | Stale (last: Dec 2025) |
| `launchpad-workflows-sdk` | Background jobs, scheduled tasks | Stale (last: Dec 2025) |
| `launchpad-push-sdk` | Web/mobile push notifications | Stale (last: Dec 2025) |
| `launchpad-db-sdk` | React hooks for data querying (TanStack Query) | Stale (last: Jan 2026) |

## Design System Package

| Package | Key SDKs | Version | Status |
|---|---|---|---|
| `@audiogenius/design-system` | Radix UI | — | Active (Phase 3-4 components) |
| | tailwindcss | — | CVA + Tailwind, no runtime CSS-in-JS |
| | storybook | v10 | Upgraded from v8 |
| | tsup | — | Build |

## Recent Upgrades (last 7 days)

| Package | From | To | Repo |
|---|---|---|---|
| orval | v7 | v8 | `saas-template-launch-app-test` (`@repo/api-hooks`) |
| hono-rate-limiter | 0.4.2 | 0.5.3 | `saas-template-launch-app-test` (`@repo/api`) |
| i18next | v24 | v25 | `saas-template-launch-app-test` (`@repo/i18n`) |
| react-i18next | v15 | v16 | `saas-template-launch-app-test` (`@repo/i18n`) |
| react-email | v4 | v5 | `saas-template-launch-app-test` (`@repo/email`) |
| posthog-node | v4 | v5 | `saas-template-launch-app-test` (`@repo/analytics`) |
| tailwindcss | 4.2.1 | 4.2.2 | `saas-template-launch-app-test` |
| turbo | 2.8.18 | 2.8.19 | `saas-template-launch-app-test` |
| storybook | v8 | v10 | `design-system` |
