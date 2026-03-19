# LaunchApp Templates

> SaaS starter templates — launchapp-lite, launchapp-lite-v2, launchpad-saas-template

## Purpose

Production-ready SaaS starter templates for building full-stack applications. Templates provide a complete starting point with auth, billing, multi-tenancy, and team management pre-configured. They are designed to integrate with the Launchpad BaaS platform or be used standalone.

## Maturity: Active Development

Both template variants are under active development as of early 2026.

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

- **Description**: Test/staging version of launchapp-lite
- **Last updated**: 2026-03-19
- **Status**: Appears to be a testing environment

---

## Common Template Dependencies

All templates use:
- **better-auth** — org's own auth library (open-source)
- **Drizzle ORM** — database layer
- **Stripe** — payments
- **Radix UI** — component primitives
- **Tailwind CSS** — styling

## Other Template-Related Repos

- `create-launchapp` (public) — CLI script to scaffold a LaunchApp project
- `create-launchpad` (public) — CLI to get a Launchpad project started
- `launchapp.dev-landing` (private) — Landing page for launchapp.dev
- `launchapp-landing-v2` (private) — v2 landing page
