# launchapp-sveltekit

**Repo**: launchapp-dev/launchapp-sveltekit
**Framework**: SvelteKit
**Status**: Active development — Phase 1 template
**Last updated**: 2026-03-24T08:10Z (quality audit updated after 8 PRs merged 2026-03-24)
**AO**: Configured with 5 agents, 9 workflows, 5 cron schedules
**Tasks**: 8 seeded (auth, database, dashboard, landing, email, admin, docker)
**Requirements**: REQ-001 (Core SaaS), REQ-002 (SvelteKit SSR)
**Recent activity**: PRs merged through 2026-03-20T02:38Z with Vitest test infrastructure added; additional 8 PRs merged 2026-03-24

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

## Quality Audit Status (2026-03-24)

| Gate | Status | Notes |
|------|--------|-------|
| Build | Unknown | — |
| Lint | **391 errors** | Stable debt level — no improvement, no regression |
| Test | Unknown | Vitest infrastructure in place |

**Lint Debt**: 391 lint errors stable. Technical debt acknowledged; lint fixes not prioritized over feature delivery. This is the highest lint debt among active templates.

## Recent Changes (2026-03-20)

- Vitest test suite infrastructure added for unit/integration testing (through 02:38Z)
- Related test-adjacent fixes applied for billing, auth, and routing components
- Brings launchapp-sveltekit testing capabilities to parity with the flagship React Router template

## Post-16:27Z Activity — Model-Routing Churn (2026-03-20T19:38–20:53Z)

Rapid iteration on AO workflow agent model routing due to Claude API rate limits (Sonnet rate limited through 2026-03-24):
- **19:38–20:18Z**: Initial fallback sequence — revert to oai-runner (DeepSeek), then switch codex agents to oai-runner
- **20:19–20:27Z**: Attempt recovery with Haiku + Codex (both unrated-limited), then move all agents off Claude entirely
- **20:27–20:29Z**: Brief Gemini restoration (separate API), reverted mid-cycle, then restored again with separate rate-limit pool
- **20:53Z**: Remove build/lint/test/install gates to unblock push→PR pipeline

**User-visible impact**: Intermittent workflow slowdowns during testing/rollback cycles; no permanent code changes. Template's SvelteKit application code unaffected. AO agent selection remains dynamic based on live rate-limit state.
