# Organization Architecture

> Last updated: 2026-03-20 by knowledge-curator agent (through 2026-03-20T16:27:00Z).
> Verified against authenticated GitHub CLI access, recent merged PRs, and default-branch commits across private and public repos. This pass includes 2026-03-20 updates through 16:27:00Z with post-13:17Z activity: ao-cli PRs #117-#119 (DeepSeek routing, cargo test gate, agent-runner leak fix); saas-template-launch-app-test PRs #361-#367 (Docker hardening, package export-map); design-system PR #132 (component dependency sync). Earlier same-day updates: brain-reviewer and brain-pr-sweep agents for PR gating and continuous sweeping, ao-cli planner MCP crash fix + macOS codesign fix + bundled packs embedding, design-system Phase 4 completion + layout transitions + palettes page + landing/blog/error blocks + accessibility hardening, and launchapp-sveltekit Vitest test suite + pricing tiers & org schema migration.

## Overview

The `launchapp-dev` GitHub org builds and maintains:
1. **SaaS starter templates** — production-ready monorepos for launching SaaS products fast
2. **AO CLI** — an AI agent orchestrator (Rust) powering the org's own AI workforce
3. **Design system** — a standalone Radix UI-based React component library
4. **Launchpad BaaS** — a Backend-as-a-Service platform (older, less active)
5. **AO plugin packs** — Claude Code skill/workflow packs for extending AO agents
6. **Brain** — the org-wide AI workforce command center (this repo)

---

## Primary Products

### saas-template-launch-app-test (flagship SaaS template)

**Turborepo monorepo** — the org's primary launchapp-lite trunk/canary and the highest-volume AO-managed codebase.

**Tech Stack:**
- Runtime/Tooling: Node.js 20, pnpm, Turborepo
- Frontend: React Router 7 (SSR), TailwindCSS 4, TypeScript
- Backend: Hono (API server), Better-Auth (auth), Drizzle ORM
- Database: PostgreSQL
- Billing: Stripe + Polar.sh (pluggable provider abstraction)
- Background jobs: Trigger.dev v4 + Upstash QStash
- Storage: S3-compatible
- Email: Resend + React Email
- Analytics: PostHog
- Monitoring: Sentry (web + API)
- Linting: Biome (no ESLint/Prettier)
- AI: OpenAI / Anthropic SDK wrapper
- Containerization: Docker (multi-stage), docker-compose for local dev

**Monorepo Structure:**
```
apps/
  web/           React Router 7 SSR frontend (marketing, auth, dashboard, admin)

packages/
  ai/            AI SDK wrapper (OpenAI, Anthropic providers)
  analytics/     Analytics abstraction (Console + PostHog providers)
  api/           Hono API server (routes, middleware)
  auth/          Better-Auth server + client
  billing/       Billing abstraction (Stripe + Polar.sh)
  config/        Shared env config (lazy-init, Zod-validated)
  core/          Core utilities (createLazyService, getRequiredEnv, etc.)
  database/      Drizzle schema (users, orgs, memberships, subscriptions), migrations, DB client
  email/         Resend + React Email templates
  i18n/          i18next (en/es) — opt-in internationalization
  jobs/          Trigger.dev task definitions + shared async job payloads
  mcp/           MCP server scaffold with stdio transport
  storage/       S3 file/object storage
  typescript-config/  Shared tsconfig base configs
  ui-kit/        Shared React component library
```

**Package Dependency Graph:**
```
typescript-config (no deps)
analytics, core, i18n, ui-kit (no internal deps)

config
  -> database -> auth
  -> ai, billing, email, jobs, storage

core -> billing

jobs (config, email)
api  (ai, auth, billing, config, database, storage)
web  (ai, analytics, api, auth, config, database, email)
```

**Conventions:**
- All internal packages imported as `@repo/<name>`
- Lazy-init pattern: config/db/auth initialized on first use, not at module load
- Path alias: `~/*` maps to `./app/*` in `apps/web`
- Server-only code uses `index.server.ts` exports

**Route Structure (apps/web):**
- `/` — Marketing landing page
- `/pricing`, `/waitlist`, `/faq`, `/terms`, `/privacy`, `/cookie-policy`
- `/auth/login`, `/auth/register`
- `/blog` — Static blog listing
- `/dashboard/*` — Auth-guarded (profile, billing, settings)
- `/admin/*` — Admin-only (users, subscriptions management)
- `/checkout/success`, `/checkout/cancel`
- `/api/*` — Wildcard proxy to Hono API

**Recent 2026-03-20 shifts (through 06:07Z):**
- @ai-sdk/mistral provider added to the AI SDK wrapper (new model support).
- Docker CI install fix applied for better container-based testing.
- @types/node/core tsconfig alignment corrected for type consistency.
- Two-factor authentication (TOTP) added to Better-Auth for enhanced security.
- Email OTP passwordless login plugin integrated into Better-Auth for improved user onboarding.
- `@repo/ui-kit` fully integrated into apps/web, providing shared UI component access across the monorepo.
- `@repo/i18n` wired into apps/web with minimal integration example (i18n support now available across the app).
- @aws-sdk/* bumped to 3.1013.0 and @polar-sh/sdk upgraded to 0.46.5 for latest provider support.
- ajv ReDoS vulnerability resolved via pnpm override for security hardening.
- Dashboard and API security improved: Better-Auth date field serialization fixes, API key typing corrections, and CORS allowHeaders expansion.
- Cloudflare deployment documentation removed; deployment focus shifted to Railway and Vercel.
- Two-factor setup, password reset, and logout flows all enhanced as part of the 2FA rollout.

---

### launchapp-lite-v2

Simpler/lighter SaaS starter. Turborepo with React Router 7 + Hono SSR.

**Packages:**
- `auth`, `database`, `typescript-config`, `ui`

AO-configured with 8 tasks, 4 agents, 11 phases, 5 workflows, 3 schedules.

---

### launchapp-lite (original)

Older lightweight SaaS starter with React Router 7, Hono, Better Auth, Drizzle, Supabase, Stripe, Tailwind CSS 4.

---

### launchapp-sveltekit

SaaS template built with SvelteKit, focusing on lightweight modern frameworks.

**Recent 2026-03-24 quality audit:**
- **Lint debt**: 391 errors (stable, no improvement/regression)
- Highest lint debt among active templates; acknowledged technical debt

**Recent 2026-03-20 updates:**
- Vitest test suite infrastructure added for unit/integration testing
- Multi-plan pricing tiers implemented with Stripe integration
- Tailwind CSS 4 styling, root layout structure
- Auth middleware integrated for protected routes
- Organization schema migration for multi-tenant support

This template represents the org's Svelte-first SaaS offering and differs from the flagship React Router 7 template in tech choices while maintaining parity in billing and auth capabilities.

---

### launchapp-nextjs

SaaS template built with Next.js App Router.

**Recent 2026-03-24 quality audit:**
- **Build**: **FAIL** — TypeScript type mismatch in `organizations.ts` blocks deployment
- **15 PRs merged** in recent burst (#225-#208) introduced type regression

**Recent 2026-03-20 updates:**
- Billing and subscription email workflows integrated
- Aligns with flagship template's billing/email capabilities

---

### launchapp-nuxt

SaaS template built with Nuxt 4.

**Recent 2026-03-24 quality audit:**
- **Lint**: **3 errors** — **57% reduction** from 7 errors (improvement trend)
- **7 PRs merged** 2026-03-24

**Recent 2026-03-20 updates:**
- Cookie consent and GDPR compliance work integrated
- Privacy-first approach for EU market

---

### launchapp-react-router

SaaS template built with React Router 7.

**Recent 2026-03-24 quality audit (first audit):**
- **Build**: **PASS**
- **Lint**: **PASS**
- **Test**: **PASS** (102 tests)

**Status**: **Excellent health** — healthiest template in the fleet. Ready for deployment with no blockers.

---

### design-system

Standalone Radix UI-based React component library. MIT licensed, shadcn/ui registry compatible.

**Tech Stack:** Radix UI, CVA, Tailwind CSS, Storybook v10, tsup, TypeScript

**Distribution:**
- npm: `@audiogenius/design-system`
- shadcn/ui registry protocol (individual component install)
- Blocks registry (pre-composed UI blocks)

**Component phases:**
- Phase 1–3 (complete): Foundation, core components, navigation, data display (buttons, inputs, dialogs, tables, combobox, calendar, etc.)
- Phase 4 (active/near-complete): Advanced patterns, ecommerce blocks (Timeline, ProductCard, ShoppingCart, CheckoutForm, etc.)

**Recent additions (2026-03-20, through 06:07Z):**
- **Timeline block** (TASK-093): New data visualization block added to Phase 4 block library.
- **Design system CLI scaffolding** (TASK-094): `create-design-system` CLI tool added for rapid component generation and project setup.
- **Layout transition animations**: New animation utilities for route/page transitions added.
- **Palettes documentation page**: Comprehensive design token/color palette documentation added to Storybook.
- **Page composition blocks**: Landing page, blog, and error page blocks completed for e-commerce + marketing use cases.

**Repo automation (2026-03-19–20):**
- The earlier dependency-update phase/workflow/6-hour cron remains in place for package scanning.
- `.ao/workflows/custom.yaml` adds `lint-check`, `typecheck`, and `wait-for-ci` gates to the component, standard, scaffold, and quick-fix workflows.
- New `token-generator` and `adoption-analyst` agents audit design tokens and track adoption metrics via HEART framework.
- `design-token-generation` and monthly `adoption-metrics` workflows now sit alongside component delivery and dependency upkeep.
- Visual regression testing integrated with Chromatic for automated screenshot diffs on every PR.
- Changelog automation via conventional commits + release-it for versioning and release notes.
- NPM publishing pipeline via GitHub Actions for automated package releases to npm registry.

---

### AO CLI (`ao-cli`)

Rust-based AI agent orchestrator CLI. Powers the org's own AI workforce automation.

**Features:**
- Worktree-based task isolation for parallel AI agents
- Task-specialized routing across Claude, Codex GPT-5.4, Gemini, and cheaper monitoring paths
- Self-healing: auto-reroutes failing model pipelines away from exhausted providers
- Workflow-optimizer: tracks per-model success rates, creates bugfix tasks on failures
- Daemon with scheduled/on-demand workflows
- MCP server integration

**Current routing posture (2026-03-20):**
- v0.0.11 released 2026-03-19, followed by post-release stability improvements on 2026-03-20.
- Most low/medium/high tasks now route to Codex GPT-5.4 during the temporary doubled-rate-limit window through 2026-04-02.
- Features stay on Claude Sonnet, bugfix/refactor work routes to Codex, UI work routes to Gemini, and analytical phases like PR review/reconciler/workflow-optimizer moved to Codex.

**Recent stability improvements (2026-03-20, through 04:27Z):**
- Fixed planner MCP crash that occurred during workflow state transitions (commit 04:11Z).
- Fixed macOS codesign install process for Darwin binary distribution (commit 04:19Z).
- Embedded bundled packs into AO binary for faster, offline pack access (commit 04:27Z).
- Fixed failing daemon_run tests: notification delivery, selection source, task state change events.
- Aligned workflow YAML docs, parser, and validation; rejected unsupported authored keys.
- Added fallback and pre-flight validation for session resume in agent-runner.
- Fixed orphan tracker data loss when cleanup removes the entire tracker file.
- Added cargo test gate to rust-workspace-ci pull request checks for better CI quality control.
- Standardized task MCP input structs to use `id` field name across all task operations.

---

### brain (this repo)

Org-wide AI workforce command center. Runs on AO CLI. Operating at scale as of 2026-03-20 with 58+ merged PRs since creation (2026-03-19).

**Agents (20-strong roster):** planner, triager, reviewer, doc-auditor, security-monitor, sdk-auditor, release-coordinator, impact-analyzer, stale-detector, competitive-researcher, product-cataloger, product-doc-writer, toolmaker, knowledge-curator, workflow-optimizer, gtm-strategist, product-ideator, revenue-analyst, **brain-reviewer** (NEW 2026-03-20), **brain-pr-sweep** (NEW 2026-03-20)

**Scheduled:**
- Conductor runs every 10 minutes
- brain-pr-sweep runs every 3 minutes (NEW 2026-03-20)
- Additional weekly/daily schedules for decision-pipeline and question-generation workflows

**MCP servers:** context7, sequential-thinking, github, firecrawl, playwright, `brain-knowledge-mcp`, `brain-products-mcp`

**Current platform state:**
- Structured SQLite-backed data layer and MCP servers were added on 2026-03-19 for typed knowledge and product access.
- The conductor was tightened with deduplication, stale-task cleanup, and idempotent PR phases.
- `brain` now has explicit operator workflows for repo quality audits, decision batching, and cross-repo execution of approved actions.
- **NEW (2026-03-20):** PR review gating layer (brain-reviewer) prevents premature task completion and ensures diff quality before merge. Continuous PR sweeper (brain-pr-sweep) handles conflicts, change requests, and stale PR reconciliation every 3 minutes.

**Architecture diagrams:** 32 diagrams in `knowledge/architecture/`, last verified 2026-03-19

---

## Launchpad BaaS (legacy/lower activity)

A full Backend-as-a-Service platform with standalone SDKs. Less actively developed as of March 2026.

**Services:**
- `launchpad-baas` — Core BaaS platform
- `launchpad-db-engine` — Custom DB engine with multi-tenancy
- `launchpad-realtime-server` — PostgreSQL LISTEN/NOTIFY + Redis pub/sub + SSE

**SDKs:** identity, payments, storage, realtime, workflows, push, db, email, secrets

---

## AO Plugin Packs

Claude Code skill/workflow extension packs for AO CLI. Two distinct types:

### ao-skills (core AO skills plugin)

The official Claude Code plugin for AO CLI itself. Installed via Claude Code plugin manager using `marketplace.json`.

**Format:** `.claude-plugin/plugin.json` manifest + `skills/<name>/SKILL.md` with YAML frontmatter

**15 skills published (as of 2026-03-19):**
- `getting-started`, `task-management`, `workflow-authoring`, `daemon-operations`, `queue-management`
- `mcp-tools`, `troubleshooting`, `mcp-setup`, `configuration`, `setup-ao`
- `workflow-patterns`, `agent-personas`, `mcp-servers-for-agents`, `pack-authoring`, `skill-authoring`

### Domain-Specific Bundled Packs (ao-bundled-packs)

Extension packs targeting third-party services and platforms.

**Published packs:** aws-pack, firebase-pack, pdf-pack, monitoring-pack, ollama-pack, postgres-pack, figma-pack, slack-pack, stripe-pack, playwright-pack, linear-pack, research-pack, docker-pack, supabase-pack, google-workspace-pack

**Registry:** `claude-plugin-marketplace` — index of all packs

---

## Cross-Cutting Conventions

| Convention | Detail |
|---|---|
| Monorepo tooling | Turborepo + pnpm workspaces |
| Internal package namespace | `@repo/*` |
| Linting | Biome (replaces ESLint + Prettier) |
| ORM | Drizzle (PostgreSQL) |
| Auth | Better-Auth |
| API framework | Hono |
| Frontend | React Router 7 (SSR) |
| Styling | Tailwind CSS 4 |
| Async jobs | Trigger.dev v4 + Upstash QStash |
| Agent orchestration | AO CLI (custom Rust tool) |
| Dependency updates | Renovate (shared config in `renovate-config`) |
