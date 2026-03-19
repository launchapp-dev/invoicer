# launchapp-nextjs

**Repo**: `launchapp-dev/launchapp-nextjs`
**Visibility**: Private
**Language**: TypeScript
**Package name**: `launchapp-nextjs`
**Created**: 2026-03-19 (active development)
**Last updated**: 2026-03-19

## Purpose

Production-ready SaaS starter template for **Next.js App Router**, built and maintained by AO Agent Orchestrator. Proves that AO can build and continuously maintain production software for any TypeScript SSR framework.

## Architecture

Framework-specific port of `saas-template-launch-app-test` using:
- **Next.js** — App Router (SSR)
- **Hono API** — Backend server (same as flagship template)
- **Turborepo** + pnpm monorepo structure
- **@repo/** package namespace — matches flagship template conventions

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router (SSR) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| API | Hono + @hono/zod-openapi |
| Auth | Better Auth (OAuth, magic link, email/password) |
| Database | Drizzle ORM + PostgreSQL |
| Billing | Stripe + Polar.sh (pluggable) |
| Email | Resend + React Email |
| Storage | S3-compatible (presigned URLs) |
| Analytics | PostHog |
| Monorepo | Turborepo + pnpm |
| Linting | Biome |
| IaC | Docker, docker-compose |

## Monorepo Structure

Same as flagship `saas-template-launch-app-test`:
```
apps/
  web/          - Next.js App Router frontend
packages/
  api/          - Hono API server
  auth/         - Better Auth setup
  database/     - Drizzle ORM + schema
  config/       - Zod-validated env config
  email/        - Resend + React Email
  storage/      - S3-compatible uploads
  billing/      - Stripe/Polar abstraction
  analytics/    - PostHog integration
  typescript-config/
```

## Features

- **Auth**: Better Auth with OAuth (Google, GitHub), magic link, email/password
- **Billing**: Stripe subscriptions + Polar.sh alternative
- **Database**: Drizzle ORM + PostgreSQL with user/org/subscription schemas
- **Email**: Resend + React Email templates for welcome, password reset, billing
- **Storage**: S3-compatible file upload/download with presigned URLs
- **Analytics**: PostHog (server + client)
- **Admin Dashboard**: User and subscription management
- **Landing Page + Blog**: Marketing pages with static content
- **i18n**: Internationalization support
- **Docker**: Multi-stage Dockerfile for deployment

## Relationship to Flagship Template

This is a **pure framework-specific port** of `saas-template-launch-app-test` to Next.js. Same architecture, same package structure, same conventions — only the frontend framework differs.

## AO Integration

- Configured with AO workflows and continuous maintenance
- Product owner agent compares against flagship template to catch divergence
- AO daemon autonomously implements features, runs tests, creates/reviews PRs
- All PRs created via `ao/task-*` branches

## Current Status: Early Development

Created 2026-03-19. Repository is freshly scaffolded with core monorepo structure and build tooling in place. Framework-specific features and integration work ongoing.

## Dependencies on Org Products

- **better-auth** — auth layer
- **AO CLI** — task orchestration and continuous maintenance
