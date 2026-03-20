# SDK Consistency Matrix

> Last updated: 2026-03-20 by knowledge-curator agent (8th pass, through 2026-03-20T13:53:13Z).
> Source repo: `saas-template-launch-app-test` (flagship template).
> Note: Private repo data was freshly verified via authenticated GitHub CLI on 2026-03-20. The current default branch includes 2026-03-20 updates through 13:53:13Z with post-13:17Z activity: Docker hardening enhancements (PRs #361-#367) and package export-map configuration improvements. Earlier updates through 13:02:54Z: billing endpoint expansion, CI/Docker hardening (Node.js pinning), package documentation guides, and @repo/core test coverage additions. Further back: @ai-sdk/mistral provider, Docker CI fixes, @types/node/core tsconfig alignment, 2FA/TOTP in Better-Auth, Email OTP passwordless login, full @repo/ui-kit and @repo/i18n integration, AWS SDK 3.1013.0, Polar.sh SDK 0.46.5, and ajv ReDoS vulnerability fix.

## Core Framework Versions

| Package | Version | Notes |
|---|---|---|
| `react` | ^19.0.0 | React 19 |
| `react-router` | ^7.5.0 | SSR mode via `@react-router/dev` |
| `hono` | ^4.7.5 | API server |
| `better-auth` | ^1.2.7 | Auth |
| `drizzle-orm` | ^0.45.0 | ORM |
| `zod` | ^4.3.6 | Validation (shared across all packages) |
| `typescript` | ^5.8.0 | Strict TypeScript |
| `tailwindcss` | ^4.2.2 | Styling |
| `turbo` | ^2.8.19 | Monorepo build |
| `@trigger.dev/sdk` | ^4.0.0 | Async job runtime in `@repo/jobs` |
| `biome` | — | Linting/formatting |
| `pnpm` | ^10 | Package manager |

## Package-Level SDK Matrix (`saas-template-launch-app-test`)

| Package | Key SDKs | Version | Status |
|---|---|---|---|
| `@repo/api` | hono | ^4.7.5 | Current |
| | hono-rate-limiter | ^0.5.0 | Current (upgraded from 0.4.x) |
| | @hono-rate-limiter/redis | ^0.1.4 | — |
| | @sentry/node | ^10.0.0 | New on 2026-03-19 |
| | @upstash/qstash | ^2.7.21 | New on 2026-03-19 |
| | @upstash/redis | ^1.37.0 | — |
| | @hono/zod-openapi | ^1.2.2 | — |
| | @scalar/hono-api-reference | ^0.10.4 | — |
| | zod | ^4.3.6 | — |
| `@repo/auth` | better-auth | ^1.2.7 | Current |
| | @better-auth/api-key | ^1.5.5 | — |
| | @better-auth/totp | ^1.x | New 2026-03-20 (2FA support) |
| | @better-auth/email-otp | ^1.x | New 2026-03-20 (passwordless login) |
| `@repo/database` | drizzle-orm | ^0.45.0 | Current |
| | drizzle-kit | ^0.31.0 | — |
| | drizzle-zod | ^0.8.3 | — |
| | postgres | ^3.4.5 | — |
| `@repo/billing` | stripe | ^20.0.0 | Current |
| | @polar-sh/sdk | ^0.46.5 | Polar.sh (alternative, upgraded 2026-03-20) |
| `@repo/jobs` | @trigger.dev/sdk | ^4.0.0 | New package added 2026-03-19, upgraded from v3 the same day |
| | @repo/config | workspace:* | Shared env/config access |
| | @repo/email | workspace:* | Welcome-email + webhook tasks |
| `@repo/analytics` | posthog-node | ^5.0.0 | Current (upgraded from v4) |
| | posthog-js | ^1.57.0 | — |
| `@repo/email` | resend | ^6.0.0 | Current |
| | react-email | ^5.0.0 | Current (upgraded from v4) |
| | @react-email/components | ^1.0.0 | — |
| `@repo/storage` | @aws-sdk/client-s3 | ^3.1013.0 | Current (upgraded 2026-03-20) |
| | @aws-sdk/s3-request-presigner | ^3.1013.0 | Current (upgraded 2026-03-20) |
| `@repo/i18n` | i18next | ^25 | Current (upgraded from v24, wired into apps/web 2026-03-20) |
| | react-i18next | ^16 | Current (upgraded from v15, wired into apps/web 2026-03-20) |
| `@repo/ui-kit` | radix-ui/* | Latest | Fully integrated into apps/web 2026-03-20 |

## TypeScript Build Graph Status (`saas-template-launch-app-test`)

| Area | Current State | Notes |
|---|---|---|
| Internal buildable packages | `tsc --build` enabled | `@repo/api`, `@repo/auth`, `@repo/billing`, `@repo/database`, `@repo/email`, `@repo/jobs`, `@repo/mcp`, `@repo/storage`, and related packages now participate in the project-reference graph |
| Referenced package configs | `composite: true` where needed | The graph was tuned after merge to keep incremental `tsc --build` working without breaking CI |
| `apps/web` | References-only participant | The React Router/Vite app stays non-composite while still depending on the package graph |
| `packages/jobs` | Server-package tsconfig with JSX enabled | It extends `../typescript-config/base.json`, but keeps `jsx: "react-jsx"` because it imports `@repo/email` TSX templates |
| Cross-repo consistency | Still unresolved org-wide | The flagship template is now internally more consistent than the older dormant `@launchpad/*` SDK line |

## Launchpad BaaS Client SDKs

> Standalone client-side SDKs for the Launchpad BaaS platform. All v0.1.0, private, TypeScript/React. All depend on `@launchpad/core` (npm registry as of 2026-03-20).
>
> **MAJOR UPDATE (2026-03-20)**: npm publishing enabled for `@launchpad/core`. All 10 dependent SDKs updated to consume from npm registry instead of GitHub. All SDKs updated simultaneously as part of coordinated ecosystem maturity milestone.

| SDK | Package | Description | Status |
|---|---|---|---|
| `launchpad-core-sdk` | `@launchpad/core` | HTTP client, session management, React integration | **Active (2026-03-20: npm publishing enabled)** |
| `launchpad-auth-sdk` | `@launchpad/auth` | Auth hooks and components for React | **Active (2026-03-20: npm dep update)** |
| `launchpad-db-sdk` | `@launchpad/db` | React hooks for data querying (TanStack Query) | **Active (2026-03-20: npm dep update)** |
| `launchpad-cms-sdk` | `@launchpad/cms` | Headless CMS — content types, localization, versioning | **Active (2026-03-20: npm dep update)** |
| `launchpad-customers-sdk` | `@launchpad/customers` | Customer management, CRM, segmentation | **Active (2026-03-20: npm dep update)** |
| `launchpad-identity-sdk` | `@launchpad/identity` | User directory, SSO, RBAC, org management | **Active (2026-03-20: npm dep update)** |
| `launchpad-realtime-sdk` | `@launchpad/realtime` | WebSocket subscriptions | **Active (2026-03-20: npm dep update)** |
| `launchpad-storage-sdk` | `@launchpad/storage` | File uploads/downloads | **Stable (2026-03-20: npm dep update)** |
| `launchpad-workflows-sdk` | `@launchpad/workflows` | Background jobs, scheduled tasks | **Active (2026-03-20: npm dep update)** |
| `launchpad-push-sdk` | `@launchpad/push` | Web/mobile push notifications | **Active (2026-03-20: npm dep update)** |
| `launchpad-payments-sdk` | `@launchpad/payments` | Stripe integration, subscriptions, billing | **Active (2026-03-20: npm dep update)** |
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

## Recent Changes (last 7 days through 2026-03-20T06:22Z)

| Change | Detail | Repo / Area |
|---|---|---|
| **COORDINATED ECOSYSTEM UPDATE** | **npm publishing enabled for 11 LaunchPad SDKs** | All `launchpad-*-sdk` repos updated 2026-03-20 06:22Z: `@launchpad/core` now publishes to npm on version tags; 10 dependent SDKs transitioned from GitHub to npm registry deps |
| Added | `@ai-sdk/mistral` provider to AI SDK wrapper | `saas-template-launch-app-test` (`@repo/ai`) |
| Fixed | @types/node/core tsconfig alignment | `saas-template-launch-app-test` |
| Fixed | Docker CI install process for better container testing | `saas-template-launch-app-test` |
| Added | Vitest test framework infrastructure | `launchapp-sveltekit` |
| Added | `@repo/jobs` package for async work | `saas-template-launch-app-test` |
| Upgraded | `@trigger.dev/sdk` ^3.0.0 → ^4.0.0 in `@repo/jobs` | `saas-template-launch-app-test` |
| Added | `tsc --build` build path + project references across internal packages | `saas-template-launch-app-test` |
| Fixed | `@repo/jobs` tsconfig now extends `base.json` and keeps JSX for the `@repo/email` dependency chain | `saas-template-launch-app-test` |
| Added | `@upstash/qstash` ^2.7.21 for async job enqueueing | `saas-template-launch-app-test` (`@repo/api`) |
| Added | `@sentry/node` ^10.0.0 | `saas-template-launch-app-test` (`@repo/api`) |
| Added | `@sentry/react` ^10.0.0 | `saas-template-launch-app-test` (`apps/web`) |
| Removed | `@repo/api-hooks` package from the live monorepo | `saas-template-launch-app-test` |
| Upgraded | `hono-rate-limiter` 0.4.2 → 0.5.3 | `saas-template-launch-app-test` (`@repo/api`) |
| Upgraded | `i18next` v24 → v25 | `saas-template-launch-app-test` (`@repo/i18n`) |
| Upgraded | `react-i18next` v15 → v16 | `saas-template-launch-app-test` (`@repo/i18n`) |
| Upgraded | `react-email` v4 → v5 | `saas-template-launch-app-test` (`@repo/email`) |
| Upgraded | `posthog-node` v4 → v5 | `saas-template-launch-app-test` (`@repo/analytics`) |
| Upgraded | `tailwindcss` 4.2.1 → 4.2.2 | `saas-template-launch-app-test` |
| Upgraded | `turbo` 2.8.18 → 2.8.19 | `saas-template-launch-app-test` |
| Upgraded | `storybook` v8 → v10 | `design-system` |
