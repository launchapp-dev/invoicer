# launchapp-nextjs

**Repo**: launchapp-dev/launchapp-nextjs
**Framework**: Next.js App Router
**Status**: Active development — Phase 1 template
**Last updated**: 2026-03-20T00:37:58Z (after PR #10 merge)
**AO**: Configured with 5 agents, 9 workflows, 5 cron schedules
**Tasks**: 8 seeded (auth, database, dashboard, landing, email, admin, docker)
**Requirements**: REQ-001 (Core SaaS), REQ-002 (Next.js App Router SSR)
**Recent activity**: PR #9 (00:37:08Z) and PR #10 (00:37:58Z) merged on 2026-03-20

## Purpose

Production SaaS starter template for Next.js App Router, built and maintained by AO.
Part of the Phase 1 template strategy — covering the Big 3 SSR TypeScript frameworks.

## Structure

Turborepo + pnpm monorepo with @repo/* packages copied from flagship template:
- apps/web — Next.js App Router frontend (SSR)
- packages/ — auth, billing, database, email, storage, analytics, config, core, ui-kit, api, api-hooks, typescript-config

## Dependencies

- Packages from saas-template-launch-app-test (shared @repo/* packages)
- Better Auth, Drizzle, Stripe, Resend, PostHog, Tailwind CSS 4
