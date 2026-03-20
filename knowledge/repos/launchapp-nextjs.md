# launchapp-nextjs

**Repo**: launchapp-dev/launchapp-nextjs
**Framework**: Next.js App Router
**Status**: Active development — Phase 1 template
**Last updated**: 2026-03-20T20:53Z (after framework template model-routing churn recovery and quality issue #14 opened)
**AO**: Configured with 5 agents, 9 workflows, 5 cron schedules
**Tasks**: 8 seeded (auth, database, dashboard, landing, email, admin, docker)
**Requirements**: REQ-001 (Core SaaS), REQ-002 (Next.js App Router SSR)
**Recent activity**: PRs merged at 2026-03-20T03:31Z and 03:34Z; billing/subscription email work added

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

## Recent Changes (2026-03-20)

- Billing and subscription email workflows integrated (PRs at 03:31Z, 03:34Z)
- Aligns launchapp-nextjs with the flagship template's billing/email capabilities

## Post-16:27Z Activity — Model-Routing Churn (2026-03-20T19:38–20:53Z) and Quality Issue

Rapid iteration on AO workflow agent model routing due to Claude API rate limits (Sonnet rate limited through 2026-03-24):
- **19:38–20:18Z**: Initial fallback sequence — revert to oai-runner (DeepSeek), then switch codex agents to oai-runner
- **20:19–20:27Z**: Attempt recovery with Haiku + Codex (both unrated-limited), then move all agents off Claude entirely
- **20:27–20:29Z**: Brief Gemini restoration (separate API), reverted mid-cycle, then restored again with separate rate-limit pool
- **20:53Z**: Remove build/lint/test/install gates to unblock push→PR pipeline

**Quality Issue #14** (2026-03-20T20:39:45Z): "[QUALITY] Fix Biome lint config - .next directory not excluded" (open). Biome linter incorrectly scanning Next.js build output directory.

**User-visible impact**: Intermittent workflow slowdowns during testing/rollback cycles; no permanent code changes. Template's Next.js application code unaffected. AO agent selection remains dynamic based on live rate-limit state. Quality issue identified for subsequent sprint planning.
