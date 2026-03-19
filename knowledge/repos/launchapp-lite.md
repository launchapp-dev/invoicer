# launchapp-lite

**Repo**: `launchapp-dev/launchapp-lite`
**Visibility**: Private
**Language**: TypeScript
**Package name**: `launchapp.dev`
**Last updated**: 2026-03-17 (active)

## Purpose

Lightweight SaaS starter template with web + mobile support. Full-stack monorepo built on React Router v7, Hono, Better Auth, Drizzle, Supabase, and Stripe. Designed to be the fastest way to launch a SaaS product.

## Tech Stack

### Frontend
- React Router v7 (Framework Mode)
- React, Shadcn UI, Radix UI, Tailwind CSS
- React Native (Expo, NativeWind, Expo Router)

### Backend
- Hono API server
- Better Auth (web + mobile)
- Drizzle ORM (database schema + migrations)
- Supabase (database hosting)
- Stripe (payments)

### Infrastructure
- pnpm workspaces + Turborepo
- Node.js ≥18
- Biome (linting/formatting)

## Monorepo Structure

```
apps/
  web/       # React Router v7 web app
  native/    # React Native / Expo mobile app
  landing/   # Marketing landing page
packages/
  api/           # Hono API server + client
  api-hooks/     # React Query hooks (Zodios)
  auth/          # Better Auth integration
  config/        # Centralized configuration
  database/      # Drizzle ORM schema + migrations
  email/         # Email service
  push-notifications/ # Push notification service
  storage/       # Storage client (S3/local)
  typescript-config/ # Shared TypeScript configs
```

## Dependencies on Org Products

- **better-auth** (auth layer)
- Pattern-compatible with `@launchpad/*` SDKs (but not a direct dependency — implements similar patterns)

## Variants

- `launchapp-lite-v2` — v2 iteration with Tailwind CSS v4
- `saas-template-launch-app-test` — testing/staging version

## Current Status: Active Development

Updated 2026-03-17. Primary template product. The template being iterated on most actively.
