# LaunchApp Templates

> SaaS starter templates — launchapp-lite, launchapp-lite-v2, saas-template-launch-app-test, launchpad-saas-template

## Purpose

Production-ready SaaS starter templates for building full-stack applications. Templates provide a complete starting point with auth, billing, multi-tenancy, and team management pre-configured. They are designed to integrate with the Launchpad BaaS platform or be used standalone.

## Maturity: Active Development

Active development is concentrated in `saas-template-launch-app-test`, which now functions as the flagship launchapp-lite trunk/canary. `launchapp-lite` and `launchapp-lite-v2` remain sibling template lines with lighter recent activity.

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

## `saas-template-launch-app-test` (private)

- **Description**: Current flagship/canary launchapp-lite monorepo, despite the temporary repo name
- **Last updated**: 2026-03-19
- **Status**: Extremely active — 179 merged PRs in the last 7 days

### Current Direction

- Async/background jobs were added through a new `@repo/jobs` package powered by Trigger.dev v3.
- `@repo/api` now exposes QStash-backed job enqueueing and locks that surface to admin sessions or API keys.
- Recent work hardened admin/API security, fixed the ALB health-check path, and corrected API key dashboard typing.
- Sentry monitoring, in-app notifications, and Vitest test scaffolding all landed the same day.
- `@repo/api-hooks` was removed from the live monorepo, so this repo is converging on a leaner package graph instead of accumulating scaffolding.

---

## Common Template Dependencies

All templates use:
- **better-auth** — org's own auth library (open-source)
- **Drizzle ORM** — database layer
- **Stripe** — payments
- **Radix UI** — component primitives
- **Tailwind CSS** — styling

The flagship template additionally now uses:
- **Trigger.dev + Upstash QStash** — async/background jobs
- **Sentry** — web/API monitoring

## Other Template-Related Repos

- `create-launchapp` (public) — CLI script to scaffold a LaunchApp project
- `create-launchpad` (public) — CLI to get a Launchpad project started
- `launchapp.dev-landing` (private) — Landing page for launchapp.dev
- `launchapp-landing-v2` (private) — v2 landing page
