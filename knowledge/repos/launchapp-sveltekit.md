# launchapp-sveltekit

**Repo**: launchapp-dev/launchapp-sveltekit
**Framework**: SvelteKit
**Status**: Active development — Phase 1 template
**Last updated**: 2026-03-20T02:38Z (after Vitest test suite and related fixes)
**AO**: Configured with 5 agents, 9 workflows, 5 cron schedules
**Tasks**: 8 seeded (auth, database, dashboard, landing, email, admin, docker)
**Requirements**: REQ-001 (Core SaaS), REQ-002 (SvelteKit SSR)
**Recent activity**: PRs merged through 2026-03-20T02:38Z with Vitest test infrastructure added

## Purpose

Production SaaS starter template for SvelteKit, built and maintained by AO.
Part of the Phase 1 template strategy — covering the Big 3 SSR TypeScript frameworks.

## Structure

Turborepo + pnpm monorepo with @repo/* packages copied from flagship template:
- apps/web — SvelteKit frontend (SSR)
- packages/ — auth, billing, database, email, storage, analytics, config, core, ui-kit, api, api-hooks, typescript-config

## Dependencies

- Packages from saas-template-launch-app-test (shared @repo/* packages)
- Better Auth, Drizzle, Stripe, Resend, PostHog, Tailwind CSS 4
- Vitest for unit and integration testing

## Recent Changes (2026-03-20)

- Vitest test suite infrastructure added for unit/integration testing (through 02:38Z)
- Related test-adjacent fixes applied for billing, auth, and routing components
- Brings launchapp-sveltekit testing capabilities to parity with the flagship React Router template
