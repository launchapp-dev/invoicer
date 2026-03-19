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

## Launchpad BaaS Client SDKs

> Standalone client-side SDKs for the Launchpad BaaS platform. All v0.1.0, private, TypeScript/React. All depend on `@launchpad/core`.

| SDK | Package | Description | Status |
|---|---|---|---|
| `launchpad-core-sdk` | `@launchpad/core` | HTTP client, session management, React integration | Stable (last: Dec 2025) |
| `launchpad-auth-sdk` | `@launchpad/auth` | Auth hooks and components for React | Scaffolded (last: Dec 2025) |
| `launchpad-db-sdk` | `@launchpad/db` | React hooks for data querying (TanStack Query) | Active (last: Jan 2026) |
| `launchpad-cms-sdk` | `@launchpad/cms` | Headless CMS — content types, localization, versioning | Scaffolded (last: Dec 2025) |
| `launchpad-customers-sdk` | `@launchpad/customers` | Customer management, CRM, segmentation | Scaffolded (last: Dec 2025) |
| `launchpad-identity-sdk` | `@launchpad/identity` | User directory, SSO, RBAC, org management | Scaffolded (last: Dec 2025) |
| `launchpad-realtime-sdk` | `@launchpad/realtime` | WebSocket subscriptions | Scaffolded (last: Dec 2025) |
| `launchpad-storage-sdk` | `@launchpad/storage` | File uploads/downloads | Scaffolded (last: Dec 2025) |
| `launchpad-workflows-sdk` | `@launchpad/workflows` | Background jobs, scheduled tasks | Scaffolded (last: Dec 2025) |
| `launchpad-push-sdk` | `@launchpad/push` | Web/mobile push notifications | Scaffolded (last: Dec 2025) |
| `offline-sdk` | `@launchpad/offline` | Offline-first capabilities | Early (last: Dec 2025) |
| `testing-sdk` | `@launchpad/testing` | Testing utilities | Early (last: Dec 2025) |

## Launchpad BaaS Standalone Packages

| Repo | Package | Description | Status |
|---|---|---|---|
| `launchpad-analytics` | `@launchpad/analytics` | Pluggable analytics, event tracking, feature flags | Stable beta (last: Dec 2025) |
| `launchpad-audit-log` | `@launchpad/audit-log` | Audit logging for system events | Stable beta (last: Dec 2025) |
| `launchpad-appstores` | `@launchpad/appstores` | Apple App Store + Google Play IAP/receipt validation | Early beta (last: Dec 2025) |
| `launchpad-i18n` | `@launchpad/i18n` | Internationalization utilities | Early (last: Dec 2025) |
| `launchpad-payments-server` | `@launchpad/payments-server` | Stripe webhooks + subscription server | Early beta (last: Dec 2025) |
| `launchpad-push-server` | `@launchpad/push-server` | FCM, APNs, Web Push server | Active (last: Dec 2025) |
| `renovate-config` | — | Shared Renovate preset for org | Stable (last: Dec 2025) |

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
