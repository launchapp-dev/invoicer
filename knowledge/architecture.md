# Organization Architecture

> Last updated: 2026-03-19 by knowledge-curator agent.
> Verified against authenticated GitHub CLI access, recent merged PRs, and default-branch commits across private and public repos. This pass includes the post-19:30 2026-03-19 `design-system` workflow expansion, the flagship template's TypeScript project-reference/build refactor, and `brain`'s new operator workflows.

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

**Recent 2026-03-19 shifts:**
- `packages/jobs` was added for welcome-email and webhook processing, then upgraded from Trigger.dev v3 to v4 the same day.
- `@repo/api` now exposes a QStash-backed jobs route, with `/enqueue` restricted to admin sessions or API keys.
- Waitlist email triggering moved from `@repo/api` into a web action to reduce API/email coupling.
- TypeScript project references plus `tsc --build` were wired across the internal package graph for topological incremental builds.
- `packages/jobs/tsconfig.json` now extends the shared base config and keeps `jsx: "react-jsx"` because the jobs package depends on `@repo/email`'s TSX templates.
- `@repo/api-hooks` was removed from the default branch as dead code, so generated hooks are no longer part of the live package graph.

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

### design-system

Standalone Radix UI-based React component library. MIT licensed, shadcn/ui registry compatible.

**Tech Stack:** Radix UI, CVA, Tailwind CSS, Storybook v10, tsup, TypeScript

**Distribution:**
- npm: `@audiogenius/design-system`
- shadcn/ui registry protocol (individual component install)
- Blocks registry (pre-composed UI blocks)

**Component phases:**
- Phase 1–2 (complete): Foundation, core components (buttons, inputs, dialogs, etc.)
- Phase 3–4 (active): Navigation, data display, advanced patterns (Combobox, Calendar, Charts, etc.)

**Repo automation (2026-03-19):**
- The earlier dependency-update phase/workflow/6-hour cron remains in place for package scanning.
- `.ao/workflows/custom.yaml` now also adds `lint-check`, `typecheck`, and `wait-for-ci` gates to the component, standard, scaffold, and quick-fix workflows.
- New `token-generator` and `adoption-analyst` agents were added for design-token auditing and HEART-style adoption reporting.
- New `design-token-generation` and monthly `adoption-metrics` workflows now sit alongside component delivery and dependency upkeep.

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

**Current routing posture (2026-03-19):**
- v0.0.11 was merged earlier in the day, then `.ao/workflows/custom.yaml` was retuned repeatedly on the default branch.
- Most low/medium/high tasks now route to Codex GPT-5.4 during the temporary doubled-rate-limit window through 2026-04-02.
- Features stay on Claude Sonnet, bugfix/refactor work routes to Codex, UI work routes to Gemini, and analytical phases like PR review/reconciler/workflow-optimizer moved to Codex.

---

### brain (this repo)

Org-wide AI workforce command center. Runs on AO CLI. Operating at scale as of 2026-03-19 with 55 merged PRs since creation.

**Agents:** planner, triager, reviewer, doc-auditor, security-monitor, sdk-auditor, release-coordinator, impact-analyzer, stale-detector, competitive-researcher, product-cataloger, product-doc-writer, toolmaker, knowledge-curator, workflow-optimizer, gtm-strategist, product-ideator, revenue-analyst

**Scheduled:** Conductor runs every 10 minutes, with additional weekly/daily schedules for decision-pipeline and question-generation workflows

**MCP servers:** context7, sequential-thinking, github, firecrawl, playwright, `brain-knowledge-mcp`, `brain-products-mcp`

**Current platform state:**
- Structured SQLite-backed data layer and MCP servers were added on 2026-03-19 for typed knowledge and product access.
- The conductor was tightened with deduplication, stale-task cleanup, and idempotent PR phases.
- `brain` now has explicit operator workflows for repo quality audits, decision batching, and cross-repo execution of approved actions.

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
