# launchapp-nuxt

**Repo**: launchapp-dev/launchapp-nuxt
**Framework**: Nuxt 4
**Status**: Active development — Phase 1 template
**Last updated**: 2026-03-20T00:36:04Z (after PR #11 merge)
**AO**: Configured with 5 agents, 9 workflows, 5 cron schedules
**Tasks**: 8 seeded (auth, database, dashboard, landing, email, admin, docker)
**Requirements**: REQ-001 (Core SaaS), REQ-002 (Nuxt 4 SSR)
**Recent activity**: PR #11 merged on 2026-03-20T00:36:04Z

## Purpose

Production SaaS starter template for Nuxt 4, built and maintained by AO.
Part of the Phase 1 template strategy — covering the Big 3 SSR TypeScript frameworks.

## Structure

Turborepo + pnpm monorepo with @repo/* packages copied from flagship template:
- apps/web — Nuxt 4 frontend (SSR)
- packages/ — auth, billing, database, email, storage, analytics, config, core, ui-kit, api, api-hooks, typescript-config

## Dependencies

- Packages from saas-template-launch-app-test (shared @repo/* packages)
- Better Auth, Drizzle, Stripe, Resend, PostHog, Tailwind CSS 4
