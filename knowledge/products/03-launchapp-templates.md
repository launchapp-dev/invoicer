# LaunchApp Templates

> SaaS starter templates — launchapp-lite, launchapp-lite-v2, saas-template-launch-app-test (flagship), launchpad-saas-template, launchapp-react-router, plus framework-specific variants: launchapp-nextjs, launchapp-nuxt, launchapp-sveltekit

## Purpose

Production-ready SaaS starter templates for building full-stack applications. Templates provide a complete starting point with auth, billing, multi-tenancy, and team management pre-configured. They are designed to integrate with the Launchpad BaaS platform or be used standalone.

The **flagship template** (`saas-template-launch-app-test`) serves as the reference implementation. Framework-specific variants are pure ports of this flagship template to other TypeScript SSR frameworks, maintained continuously by AO.

## Maturity: Active Development

Active development is concentrated in `saas-template-launch-app-test`, which now functions as the flagship launchapp-lite trunk/canary. `launchapp-lite` and `launchapp-lite-v2` remain sibling template lines with lighter recent activity. Three new framework-specific variants were scaffolded on 2026-03-19: `launchapp-nextjs`, `launchapp-nuxt`, and `launchapp-sveltekit`.

## Visibility: Private

---

## `launchapp-lite` (private)

- **Description**: Lightweight SaaS starter — React Router 7, Hono, Better Auth, Drizzle, Supabase, Stripe
- **Stack**: React Router v7, Hono, Better Auth, Drizzle ORM, Supabase, Stripe, Tailwind CSS v4
- **Type**: Full-stack monorepo (pnpm workspaces + Turborepo)
- **Last updated**: 2026-03-17
- **Name**: `launchapp.dev` (package.json)

### Structure

```
apps/
  web/         - React Router v7 (Framework Mode), Shadcn UI, Radix UI, TailwindCSS
  native/      - React Native (Expo, NativeWind, Expo Router)
  landing/     - Marketing/landing page
packages/
  api/          - Hono-based API server and client
  api-hooks/    - React Query hooks (Zodios)
  auth/         - Better Auth integration
  config/       - Centralized configuration
  database/     - Drizzle ORM client, schema, migrations
  email/        - Email service with templating
  push-notifications/ - Push notification service
  storage/      - S3/local storage client
  typescript-config/ - Shared TypeScript configs
```

### Features

- Web + mobile (React Native/Expo) support
- Hono API server with React Query hooks
- Better Auth for web and mobile
- Drizzle ORM database layer
- Email service, push notifications, storage
- AI features (requires OpenAI/Anthropic/OpenRouter API keys)

---

## `launchapp-lite-v2` (private)

- **Description**: Lightweight SaaS starter — React Router 7, Hono, Better Auth, Drizzle, Supabase, Stripe, Tailwind CSS 4
- **Stack**: Similar to v1 with Tailwind CSS v4
- **Last updated**: 2026-03-17
- **Status**: Appears to be iterating alongside v1

---

## `launchpad-saas-template` (private)

- **Description**: Production-ready SaaS template with auth, billing, and teams — includes `.launchpad/` manifest for AI agent extensibility
- **Package**: `@launchpad/saas-template` v0.1.0
- **Stack**: Next.js 14+ (App Router), TypeScript, PostgreSQL + Prisma ORM, Tailwind CSS, Radix UI, Stripe, Zod
- **Last updated**: 2026-01-01

### Features

- Email/password + Google/GitHub OAuth + MFA
- Stripe subscriptions (multiple plans)
- Team management (organizations, invitations, RBAC)
- Multi-tenancy (organization-based data isolation)
- Audit logging
- `.launchpad/` directory with AI agent-readable manifests (manifest.yaml, schema.yaml, patterns.yaml, rules.yaml)

### Dependencies on Org Products

- `@launchpad/core` (workspace)
- `@launchpad/auth` (workspace)
- `@launchpad/db` (workspace)
- `@launchpad/payments-sdk` (workspace)
- Radix UI components

---

## `launchapp-react-router` (private)

- **Description**: React Router 7 lightweight starter template
- **Stack**: React Router v7, TypeScript, Tailwind CSS
- **Type**: Full-stack template
- **Last updated**: 2026-03-29
- **Status**: Active — recently updated, likely converging with launchapp-lite structure

---

## `saas-template-launch-app-test` (private)

- **Description**: Current flagship/canary launchapp-lite monorepo, despite the temporary repo name
- **Last updated**: 2026-03-20T00:39:32Z
- **Status**: Extremely active — 180+ merged PRs in the last 7 days

### Current Direction

- Deployment infrastructure expanded: Railway, Vercel, and Cloudflare Workers deployment configs + guides added on 2026-03-19.
  - **Cloudflare Workers**: Edge-first deployment with Hyperdrive (Neon Postgres pooling) and R2 (S3-compatible storage) integration. Sub-5ms cold starts, 50ms CPU time limit per request.
  - **Railway & Vercel**: Traditional deployment targets with full Node.js runtime support.
- Storage layer abstraction verified: `@repo/storage` confirmed compatible across R2, Tigris, and Vercel Blob.
- Authentication flows enhanced: email verification now added post-registration.
- The `@repo/jobs` async job package was removed, streamlining the package graph away from Trigger.dev.
- Recent work hardened admin/API security, fixed the ALB health-check path, and corrected API key dashboard typing.
- Sentry monitoring, in-app notifications, and Vitest test scaffolding all landed alongside deployment work.
- `@repo/api-hooks` was removed from the live monorepo, so this repo is converging on a leaner package graph instead of accumulating scaffolding.

---

## Framework-Specific Variants (New 2026-03-19)

Four **pure framework ports** of the flagship template now exist. These repos use identical architecture, monorepo structure, and @repo/* package naming — only the frontend framework differs. Each is maintained continuously by AO via autonomous agents that compare against the flagship template to prevent divergence.

### Quality Audit Summary (2026-03-24)

| Template | Build | Lint | Test | Health |
|----------|-------|------|------|--------|
| `launchapp-react-router` | **PASS** | **PASS** | **PASS (102)** | **Excellent** |
| `launchapp-nuxt` | Unknown | 3 errors (↓57%) | Unknown | Good |
| `launchapp-sveltekit` | Unknown | 391 errors (stable) | Unknown | Debt |
| `launchapp-nextjs` | **FAIL** | Unknown | Unknown | Blocked |

### `launchapp-react-router` (private)

- **Framework**: React Router 7 (SSR)
- **Description**: Production SaaS starter for React Router 7
- **Status**: **Healthy** — first audit shows all gates passing
- **Last updated**: 2026-03-24T08:10Z (first quality audit)
- **Quality**: Build PASS, Lint PASS, Test PASS (102 tests)
- **Structure**: Same @repo/* packages as flagship, with React Router 7 in `apps/web`
- **Deployment readiness**: READY — no blockers

### `launchapp-nextjs` (private)

- **Framework**: Next.js App Router (SSR)
- **Description**: Production SaaS starter for Next.js
- **Status**: **Blocked** — TypeScript build failure
- **Last updated**: 2026-03-24T08:10Z (15-PR merge burst #225-#208)
- **Quality**: Build FAIL (type mismatch in organizations.ts), Lint Unknown, Test Unknown
- **Structure**: Same @repo/* packages as flagship, with Next.js in `apps/web`
- **Blocker**: TypeScript type mismatch must be resolved before deployment

### `launchapp-nuxt` (private)

- **Framework**: Nuxt 4 (SSR)
- **Description**: Production SaaS starter for Nuxt 4
- **Status**: **Improving** — lint debt reducing
- **Last updated**: 2026-03-24T08:10Z (7-PR merge burst)
- **Quality**: Build Unknown, Lint 3 errors (57% reduction), Test Unknown
- **Structure**: Same @repo/* packages as flagship, with Nuxt in `apps/web`

### `launchapp-sveltekit` (private)

- **Framework**: SvelteKit (SSR)
- **Description**: Production SaaS starter for SvelteKit
- **Status**: **Stable debt** — high lint error count, no regression
- **Last updated**: 2026-03-24T08:10Z (8 PRs merged)
- **Quality**: Build Unknown, Lint 391 errors (stable), Test Unknown
- **Structure**: Same @repo/* packages as flagship, with SvelteKit in `apps/web`
- **Note**: Highest lint debt among templates; technical debt acknowledged

### Architecture Pattern

All three framework variants follow the same pattern:
- **Frontend**: Framework-specific app in `apps/web`
- **Backend**: Hono API in `packages/api` (shared with flagship)
- **Infrastructure**: Same @repo/* package structure as flagship
- **Build System**: Turborepo + pnpm (same as flagship)
- **Maintenance**: AO agents autonomously keep each in sync with flagship architecture

### Maturity Gap

All three repos are **early development** stage (created 2026-03-19). Core scaffolding and monorepo structure are in place, but app scripts (build, dev, test commands) may still be stubbed with `TODO` placeholders. Feature implementation and integration work is ongoing via AO workflows.

---

## Common Template Dependencies

All templates use:
- **better-auth** — org's own auth library (open-source)
- **Drizzle ORM** — database layer
- **Stripe** — payments
- **Radix UI** — component primitives
- **Tailwind CSS** — styling

The flagship template additionally uses:
- **Sentry** — web/API monitoring
- **Railway, Vercel, & Cloudflare Workers** — deployment platforms with native config support
  - **Cloudflare Workers**: Edge runtime with Hyperdrive (Postgres pooling) and R2 (object storage)
  - **Railway & Vercel**: Traditional cloud platforms with full Node.js runtime

## Other Template-Related Repos

- `create-launchapp` (public) — CLI script to scaffold a LaunchApp project
- `create-launchpad` (public) — CLI to get a Launchpad project started
- `launchapp.dev-landing` (private) — Landing page for launchapp.dev
- `launchapp-landing-v2` (private) — v2 landing page
