# launchapp-nuxt

**Repo**: launchapp-dev/launchapp-nuxt
**Framework**: Nuxt 4
**Status**: Active development — Phase 1 template
**Last updated**: 2026-03-29T21:33Z (17+ PRs merged, AI SDK 6.0, security fixes)
**AO**: Configured with 5 agents, 9 workflows, 5 cron schedules
**Tasks**: 8 seeded (auth, database, dashboard, landing, email, admin, docker)
**Requirements**: REQ-001 (Core SaaS), REQ-002 (Nuxt 4 SSR)
**Recent activity**: Major feature burst 2026-03-24 through 2026-03-29 with AI SDK 6.0, security hardening, and infrastructure improvements

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

## Recent Changes (2026-03-24 through 2026-03-29T21:33Z)

| PR | Task | Description |
|----|------|-------------|
| #292 | TASK-717 | AI SDK 6.0 features — agents, tools, gateway, MCP integration |
| #303 | TASK-299 | Security: force node-forge >=1.4.0 — resolves 4 high-severity CVEs |
| #305, #304 | TASK-307 | Unify Vite version across packages |
| #289 | TASK-091 | Outbound webhook system implementation |
| #284 | TASK-081 | Comprehensive health check endpoints and status page |
| #293 | TASK-710 | Referral API endpoints |
| #296 | TASK-066 | Vercel deployment config (vercel.json) |
| #273 | TASK-039 | FAQ page with accordion and JSON-LD schema |
| #262 | TASK-382 | Invoice history and PDF download for billing |
| #283 | TASK-080 | In-app product announcement system |
| #298 | — | Biome upgraded from 2.4.8 to 2.4.9 |
| #301, #295 | — | Remove unused @repo/ui-kit (React) package |
| #300 | TASK-205 | Normalize checkout route structure |
| #299, #302 | TASK-179 | VISION.md package checklist documentation updates |
| #265 | TASK-456 | Fix grok2/grokBeta explicit type annotations |
| #263 | TASK-446 | CI: conditional --frozen-lockfile for PRs |

## Critical Bugs

| Task | Severity | Description | Status |
|------|----------|-------------|--------|
| TASK-776 | **Critical** | `siteConfig.twitter` object causing 500 errors | Open — requires immediate fix |

## Quality Audit Status

| Gate | Status | Notes |
|------|--------|-------|
| Build | Unknown | — |
| Lint | **3 errors** | **57% reduction** from 7 errors (improvement trend) |
| Test | Unknown | — |

**Lint Improvement**: Down from 7 errors to 3 errors (57% reduction). Active lint debt reduction in progress.

## Infrastructure Updates

- **CLAUDE.md maintainer agent**: Added with 6-hour schedule (2026-03-24) for continuous maintenance
- **Package cleanup**: Removed dead React ui-kit packages (PR #301, #295)
- **Dependency unification**: Vite versions aligned across monorepo (TASK-307)
- **Security hardening**: node-forge CVE fixes applied (TASK-299)

## Earlier Changes (2026-03-20)

- Cookie consent and GDPR compliance work integrated
- Privacy-first approach for EU market
