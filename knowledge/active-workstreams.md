# Active Workstreams

> Last updated: 2026-03-29 by knowledge-curator agent (through 2026-03-29T21:33Z).
> Verified with authenticated GitHub CLI access across private repos. launchapp-nuxt major update: 17+ PRs merged including AI SDK 6.0, security fixes (node-forge CVEs), health endpoints, webhooks, referrals. Critical bug identified: siteConfig.twitter 500 errors (TASK-776).

## Summary

As of 2026-03-29, the org has 4 very high-velocity workstreams (`launchapp-react-router`, `design-system`, `ao-cli`, `brain`), plus emerging velocity in framework variants (`launchapp-sveltekit`, `launchapp-nextjs`, `launchapp-nuxt`), and new product/repos (`invoicer`, `condohub`, `postpilot`, `launchapp-crm`, `ao-dashboard`, `ao-fleet`). **launchapp-nextjs QA burst completed 2026-03-29** with critical findings:

- **launchapp-nextjs (2026-03-29 QA burst):** **CRITICAL REGRESSION** — Runtime `ZodError` on every page caused by client-side validation of server-only env vars. **124 Playwright tests run: 13 passed, 111 failed.** Dashboard 404s identified: `/dashboard/settings`, `/dashboard/api-keys`, `/dashboard/notifications`. QA.md created with full test plan.
- **launchapp-react-router**: First audit shows **excellent health** — Build PASS, Lint PASS, Test PASS (102 tests). Ready for deployment. **Repo renamed** from `saas-template-launch-app-test`.
- **launchapp-sveltekit**: Lint stable at **391 errors** — no improvement, no regression (8 PRs merged).
- **launchapp-nuxt**: Lint improved to **3 errors** — 57% reduction from 7 errors (17+ PRs merged since 2026-03-24). Critical bug TASK-776 (`siteConfig.twitter` 500 errors) identified.

PO Review Cycle 34 complete with Phase 2 active and 37 days to $10k MRR deadline. Fleet scan Cycle 29 shows design-system daemon STOPPED (TASK-640 in backlog) and launchapp-react-router runner disconnected (TASK-630 READY).

---

## 1. launchapp-react-router — Flagship Template Hardening + Incremental Build Graph

**Repo:** `launchapp-react-router` (renamed from `saas-template-launch-app-test`)
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation/review/merge pipeline on top of the repo's custom workflow
**Status:** Extremely active — 188 merged PRs since 2026-03-12

This repo is no longer best described as a "test/staging" copy. It is the primary launchapp-lite trunk/canary where new platform capabilities land first.

**Current focus:**
- Expand deployment infrastructure (Railway, Vercel).
- Verify storage layer compatibility across providers (R2, Tigris, Vercel Blob).
- Strengthen authentication flows (email verification post-registration).
- Make `tsc --build` and project references reliable across the workspace.
- Decouple over-coupled API responsibilities.
- Harden admin/API security and deployment health.
- Tighten types and monitoring around the dashboard + API surface.

**Recent highlights (verified through 2026-03-20T20:19:38Z):**
- **AI provider expansion (2026-03-20):** @ai-sdk/mistral provider added to the AI SDK wrapper for additional model support.
- **Docker CI (2026-03-20):** Docker CI install fixes applied for improved container-based testing.
- **TypeScript alignment (2026-03-20):** @types/node/core tsconfig corrected for type consistency.
- **Auth expansion (2026-03-20):** Two-factor authentication (TOTP) added to Better-Auth for enhanced security.
- **Auth expansion (2026-03-20):** Email OTP passwordless login plugin integrated into Better-Auth.
- **Package integration (2026-03-20):** @repo/ui-kit fully integrated into apps/web for shared component access.
- **Internationalization (2026-03-20):** @repo/i18n wired into apps/web with English/Spanish support.
- **Dependency updates (2026-03-20):** AWS SDK bumped to 3.1013.0; Polar.sh SDK upgraded to 0.46.5.
- **Security (2026-03-20):** ajv ReDoS vulnerability resolved via pnpm override.
- **Deployment shift (2026-03-20):** Cloudflare deployment documentation removed; focus moved to Railway and Vercel.
- **Billing API expansion (2026-03-20, post-12:43Z):** GET /api/billing/subscription endpoint added for subscription query (TASK-374).
- **CI/Docker hardening (2026-03-20, 12:51:14Z–13:02:36Z):** Node.js version pinned to 20.18.3 in CI (TASK-382), duplicate ENV CI=true removed from Dockerfile (TASK-381).
- **Documentation & testing (2026-03-20, 13:02:36Z–13:02:54Z):** Comprehensive package guides added for ai, analytics, core, i18n, mcp, storage, typescript-config, and ui-kit (TASK-380); test coverage for @repo/core getRequiredEnv/getEnvWithDefault utilities added (TASK-371).
- **Docker hardening & package configuration (2026-03-20, 13:17:55Z–13:53:13Z):** PRs #361-#367 merged with Docker hardening enhancements and package export-map configuration improvements for better module resolution and dependency tree optimization.
- **AO agent routing (2026-03-20, 20:19:38Z):** Default agent route changed from Claude to oai-runner/MiniMax-M2.7 to mitigate Sonnet rate limits (effective through 2026-03-24). Flagship template application code unaffected.
- **Earlier 2026-03-19 highlights:**
  - Email verification flow added post-registration for enhanced auth security.
  - Waitlist join flow moved out of `@repo/api` into a web action to reduce API/email coupling.
  - Dashboard API key typing was corrected by serializing/mapping Better-Auth date fields.

---

## 2. design-system — Component Library Buildout + Repo Automation

**Repo:** `design-system`
**Owner:** Shooksie
**Who is doing the work:** AO product-owner, component-author, reviewer, updater, token-generator, and adoption-analyst agents
**Status:** Very active — 70 merged PRs since 2026-03-12

The repo is still finishing Phase 3/4 component coverage, but it is now also being automated as an AO-managed dependency-aware component platform.

**Current focus:**
- Finish high-level block coverage and docs-site polish.
- Keep dependencies moving with an explicit updater workflow.
- Add formal lint/typecheck/CI gates to the AO delivery workflows.
- Start design-token generation and monthly adoption reporting.

**Recent highlights (verified through 2026-03-29T00:23Z):**
- **AI Component Generator (2026-03-27, TASK-443/TASK-458):** Backend API with Storybook generation and full docs.
- **Smart Theming (2026-03-27, TASK-418):** Claude vision API integration for intelligent theme generation.
- **CopilotPanel (2026-03-27, TASK-483):** Complete AI chat panel with input, chat history, and keyboard navigation.
- **Magic UI effects (2026-03-27, TASK-476):** MagicCard, HoverCard, AnimatedCard with advanced hover/gradient effects.
- **Animated backgrounds (2026-03-27, TASK-475):** GradientBackground, AnimatedGradient, ShimmerBackground components.
- **Text animations (2026-03-27, TASK-474):** AnimatedText and TextTransition with stagger animations.
- **VS Code Extension (2026-03-27, TASK-461):** Snippets, autocomplete, and token preview.
- **Plugin System (2026-03-27, TASK-424/TASK-465):** Component extension plugin system with implementation docs.
- **Community Themes (2026-03-27, TASK-450/TASK-464):** Community themes gallery with 5+ featured themes.
- **CLAUDE.md maintainer (2026-03-29):** Maintainer agent added with 6-hour schedule.
- **Quality gates (2026-03-28):** Added to all workflows; CI switched from npm to pnpm.
- **Earlier highlights (2026-03-20):** Phase 4 completion (Timeline block), CLI scaffolding, layout transitions, palettes docs, page blocks, accessibility hardening (WCAG 2.4.7/4.1.3), Storybook docs upgrade to Next.js 16.2.0, component dependency sync, Chromatic visual regression, changelog automation, npm publishing pipeline, token-generator and adoption-analyst agents.

---

## 3. AO CLI — v0.2.30-0.2.35 + Unified Work Inbox

**Repo:** `ao-cli`
**Owner:** Shooksie
**Who is doing the work:** AO's own planner/reconciler/reviewer/workflow stack plus direct maintainer commits
**Status:** Very active — 80+ merged PRs since 2026-03-12

The release train moved from v0.0.11 stability work into a rapid v0.2.3x feature burst centered on SQLite-backed queries, externalized packs, and unified CLI surfaces.

**Current focus:**
- Reduce memory footprint by moving workflow queries to SQLite.
- Externalize built-in workflow packs for independent versioning.
- Converge planning, inbox, and `now` commands into a unified work surface.

**Recent highlights (verified through 2026-03-29T18:45Z):**
- **v0.2.30-0.2.35 releases (2026-03-26 through 2026-03-29):**
  - v0.2.30: Docker support, unified global config under `~/.ao`, docs refresh.
  - v0.2.31-0.2.32: DB-backed workflow queries, crash detection, dead code removal, tool result events.
  - v0.2.33: Hardcoded model routing defaults removed; fully config-driven routing.
  - v0.2.34: SQLite-backed queries, RAM reduction, parallel test fix.
  - v0.2.35: **Stop auto-marking tasks done on workflow completion** — eliminates premature task completion.
- **Unified work inbox (REQ-040, 2026-03-28):** New `ao now` / `ao inbox` surface with comprehensive test coverage.
- **Externalized packs (2026-03-27):** Built-in workflow packs extracted from the binary for independent updates.
- **Claude profile routing (2026-03-26):** Workflow execution routes through configurable `sparkcube` Claude profile.
- **Documentation & licensing (2026-03-27):** Elastic License 2.0 (ELv2) applied, quick-start guide added, branding matched to launchapp.dev.
- **Earlier stability (2026-03-20):** Planner MCP crash fix, macOS codesign fix, orphan tracker data-loss fix, cargo test gate.

---

## 4. launchapp-sveltekit — SvelteKit Variant

**Repo:** `launchapp-sveltekit`
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation workflows
**Status:** Active — **Stable lint debt at 391 errors** (through 2026-03-24T08:10Z)

This repo represents the org's SvelteKit-based SaaS template offering, built to parallel the flagship React Router 7 template while exploring alternative JavaScript frameworks.

**Quality Audit Results (2026-03-24):**
| Gate | Status | Details |
|------|--------|---------|
| Build | Unknown | — |
| Lint | **391 errors** | Stable debt level, no improvement/regression |
| Test | Unknown | Vitest infrastructure in place |

**Note**: Highest lint debt among templates; technical debt acknowledged. 8 PRs merged 2026-03-24.

**Current focus:**
- Establish parity with the flagship template in billing and auth capabilities.
- Validate SvelteKit's productivity claims for rapid SaaS prototyping.
- Build a library of framework variants for different developer preferences.
- Ensure org schema supports multi-tenant SvelteKit apps.

**Recent highlights (verified through 2026-03-20T20:53Z):**
- **Testing (2026-03-20):** Vitest test suite infrastructure added for unit and integration testing.
- **Test fixes (2026-03-20):** Related test-adjacent fixes applied across billing, auth, and routing components.
- **Billing (2026-03-20):** Multi-plan pricing tiers implemented (Starter/Pro/Enterprise) with Stripe integration.
- **Frontend (2026-03-20):** Tailwind CSS 4 styling, root layout structure for page organization.
- **Auth (2026-03-20):** Auth middleware integrated for protected routes and role-based access control.
- **Organization (2026-03-20):** Org schema migration added for multi-tenant support.

---

## 4a. launchapp-react-router — New Healthy Template (Formerly saas-template-launch-app-test)

**Repo:** `launchapp-react-router` (renamed from `saas-template-launch-app-test`)
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation workflows
**Status:** **Excellent health** — first quality audit completed 2026-03-24

This repo is the primary launchapp-lite trunk/canary where new platform capabilities land first. It was renamed from `saas-template-launch-app-test` in late March 2026.

**Quality Audit Results (2026-03-24, first audit):**
| Gate | Status | Details |
|------|--------|---------|
| Build | **PASS** | Clean build, no errors |
| Lint | **PASS** | No lint errors |
| Test | **PASS** | 102 tests passing |

**Deployment readiness**: **READY** — all gates passing, no blockers for production deployment. This is the healthiest template in the fleet.

**Recent highlights (2026-03-24 through 2026-03-29):**
- TypeScript upgraded to 6.0; `@repo/flags`, `@repo/push`, `@repo/appstores` packages added.
- `@repo/api` synced with improvements from `launchapp-nextjs`.
- Rolldown native binding fixes and npm security monitoring added.

---

## 4b. launchapp-nextjs — Next.js App Router Variant

**Repo:** `launchapp-nextjs`
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation workflows + CLAUDE.md maintainer agent (6-hour schedule)
**Status:** Active — **CRITICAL QA REGRESSIONS** identified 2026-03-29

Next.js App Router-based SaaS template. **15 PRs merged** in recent burst (#225-#208).

**Quality Audit Results (2026-03-29 QA burst):**
| Gate | Status | Details |
|------|--------|---------|
| Build | **FAIL** | TypeScript type mismatch in `organizations.ts` (from 2026-03-24 audit) |
| E2E Tests | **FAIL** | 124 Playwright tests: **13 passed, 111 failed** (90% failure rate) |
| Lint | Unknown | — |

**QA.md added (2026-03-29)** with comprehensive Playwright test plan and results.

**Critical Bugs Identified:**

1. **CRITICAL — Runtime ZodError on every page**
   - **Root cause:** `packages/config/src/env.ts` uses a Proxy that validates server-only env vars (`DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`) on any property access. The root `providers.tsx` imports `env` and triggers validation from `"use client"` components, causing a ZodError dialog that blocks the entire UI on every page.
   - **Impact:** All auth flows, dashboard access, and landing page content are blocked.
   - **Status:** Must be fixed before any deployment.

2. **HIGH — Dashboard route 404s**
   - `/dashboard/settings` — missing `page.tsx` in `apps/web/src/app/dashboard/settings/`
   - `/dashboard/api-keys` — route path mismatch (actual route is `/dashboard/settings/api-keys`)
   - `/dashboard/notifications` — route path mismatch (actual route is `/dashboard/settings/notifications`)

**Recent highlights (verified through 2026-03-29T13:56Z):**
- **QA infrastructure (2026-03-29):** `QA.md` added with Playwright test plan and 2026-03-29 run results.
- **CLAUDE.md maintainer (2026-03-29):** Maintainer agent added with 6-hour schedule for continuous maintenance.
- **qa-tester agent (2026-03-28):** Playwright MCP-based E2E tester agent added with chained quality gates.
- **Package additions (2026-03-24):** `@repo/flags` (feature flags), `@repo/push` (push notifications), `@repo/appstores` (IAP validation) added.
- **TypeScript upgrade (2026-03-24):** Upgraded to 6.0.2.
- **Security patches (2026-03-24):** systeminformation CVEs patched (CVE-2025-68154, CVE-2026-26318, CVE-2026-26280).
- **Billing & Email (2026-03-20):** Billing and subscription email workflows integrated.

---

## 4c. launchapp-nuxt — Nuxt 4 Variant

**Repo:** `launchapp-nuxt`
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation workflows + CLAUDE.md maintainer agent (6-hour schedule)
**Status:** Active — **17+ PRs merged since 2026-03-24**, critical bug identified (TASK-776)

Nuxt 4-based SaaS template with privacy-first focus. Major feature burst including AI SDK 6.0, security hardening, and infrastructure improvements.

**Quality Audit Results (2026-03-24, last verified):**
| Gate | Status | Details |
|------|--------|---------|
| Build | Unknown | — |
| Lint | **3 errors** | **57% reduction** from 7 errors |
| Test | Unknown | — |

**Critical Bug (TASK-776):**
- `siteConfig.twitter` object issue causing **500 errors**
- Status: **Critical** — requires immediate fix

**Recent highlights (2026-03-24 through 2026-03-29T21:33Z):**
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

**Infrastructure updates:**
- CLAUDE.md maintainer agent added with 6-hour schedule (2026-03-24)
- Package cleanup: removed dead React ui-kit packages
- Dependency unification: Vite versions aligned across monorepo

**Trend**: Active feature development with security hardening. Addressing critical bug TASK-776 required for stability.

---

## 5. brain — Structured Knowledge Platform

**Repo:** `brain`
**Owner:** Shooksie
**Who is doing the work:** conductor + 20-agent roster (knowledge-curator/product-doc-writer/toolmaker/reviewer/brain-reviewer/brain-pr-sweep and others)
**Status:** Extremely active — quality audit burst completed 2026-03-24

The brain repo maintains the org-wide knowledge base with continuous updates.

**Current focus:**
- Keep the knowledge base aligned with same-day org changes (running knowledge-update workflows continuously).
- Capture quality audit results so agents can reason about deployment readiness without re-running audits.
- Stabilize conductor scheduling and writing workflows.

**Recent highlights (2026-03-24 through 2026-03-29):**
- **launchapp-nextjs QA burst (2026-03-29)**: Critical ZodError regression and dashboard 404s documented. 124 Playwright tests: 13 passed, 111 failed.
- **Quality audit burst completed (2026-03-24)**: 4 templates audited with findings documented in knowledge/repos/
- `launchapp-react-router` captured as fully healthy template (build+test+lint all pass) — **READY for deployment**
- `launchapp-sveltekit` lint debt documented (391 errors, stable) — highest debt, acknowledged
- `launchapp-nextjs` TypeScript blocker documented (build FAIL) — **deployment blocked**
- `launchapp-nuxt` lint improvement captured (3 errors, 57% reduction from 7) — **improving trend**
- PO Review Cycle 34 complete: Phase 2 active, 37 days to $10k MRR deadline, TASK-526/527 READY for revenue execution
- Fleet scan Cycle 29: design-system daemon STOPPED (TASK-640 in backlog), launchapp-react-router runner disconnected (TASK-630 READY)

---

## 5. Launchpad SDK Consistency — Standards Initiative

**Repos:** `launchpad-*-sdk` family
**Owner:** Shooksie
**Who is doing the work:** planning/requirements stage only so far
**Status:** Early initiative — issues filed, little fresh code activity

The org opened SDK consistency tracking work on 2026-03-18, but this is still mostly governance and backlog shaping rather than active implementation.

**Current focus:**
- Standardize naming, interfaces, error handling, and test/documentation expectations across Launchpad SDKs.
- Decide how the `@launchpad/*` SDK line relates to the rapidly moving `@repo/*` packages in the flagship template.

---

## 6. AO Skills + Pack Ecosystem — Newly Created Surface Area

**Repos:** `ao-skills`, `ao-bundled-packs`, `claude-plugin-marketplace`, plus 15 pack repos
**Owner:** Shooksie
**Who is doing the work:** direct maintainer work plus AO pack authoring
**Status:** New and active — 23 repos were created in the org since 2026-03-12

**Current focus:**
- Publish AO's Claude Code skill surface.
- Establish first-party/community pack scaffolds.
- Align plugin metadata with the launchapp-dev org rename.

**Recent highlights:**
- `ao-skills` now exposes 15 AO-focused skills via Claude plugin metadata.
- `ao-bundled-packs` and `claude-plugin-marketplace` were created to organize and index pack distribution.
- AWS, Firebase, PDF, monitoring, Ollama, Postgres, Figma, Slack, Stripe, Playwright, Linear, research, Docker, Supabase, and Google Workspace pack repos all appeared in the same creation wave.

---

## 7. New AO Platform & Product Workstreams (2026-03-24 through 2026-03-29)

A significant expansion of the org's surface area occurred in late March 2026. These repos are already showing high velocity:

### AO Platform
- **`ao-dashboard`** — Fleet control dashboard for AO daemons, schedules, MCP, and cross-project workflows (44+ commits since creation).
- **`ao-fleet`** — Rust-based fleet control plane for daemon orchestration and MCP management.
- **`ao-projects`** — Standalone task and requirements management for AI-driven development pipelines (Rust).
- **`ao-desktop`** — Tauri desktop wrapper for AO CLI.
- **`ao-starter`** — `create-ao` CLI for scaffolding AO workflows in any project.

### Product Showcases
- **`invoicer`** — AI-built invoice generator (Next.js + `@launchapp/design-system`); 55+ merged PRs; serves as an AO autonomy showcase.
- **`condohub`** — Condominium management platform (Next.js); 14+ merged PRs; visitor management, i18n, onboarding wizard.
- **`postpilot`** — AI-native social media automation platform; 8+ merged PRs.
- **`launchapp-crm`** — Production CRM SaaS built with single-conductor AO workflow; 17+ merged PRs.

### Creative Tools
- **`storyforge`** — AI media production pipeline for serialized stories (comics, motion comics, animated episodes).

---

## Archived / Lower Priority

- `agent-orchestrator` is now archived. AO's active engine is `ao-cli`; the desktop shell remains historical.
- Launchpad BaaS repos remain lower-velocity. Most last substantive pushes are from December 2025 to January 2026.
- Marketing/landing repos remain materially less active than the four core workstreams above.
