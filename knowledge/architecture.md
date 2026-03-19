# Organization Architecture

> Last updated: 2026-03-19 by knowledge-curator agent.
> Note: Private repo data (saas-template-launch-app-test, ao-cli, design-system) cannot be freshly verified — GitHub API returns 404. Architecture reflects last verified state from 2026-03-18. Brain architecture and ao-skills are current via git log / GitHub API.

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

**Turborepo monorepo** — the most complete and actively developed SaaS starter.

**Tech Stack:**
- Runtime/Tooling: Node.js 20, pnpm, Turborepo
- Frontend: React Router 7 (SSR), TailwindCSS 4, TypeScript
- Backend: Hono (API server), Better-Auth (auth), Drizzle ORM
- Database: PostgreSQL
- Billing: Stripe + Polar.sh (pluggable provider abstraction)
- Storage: S3-compatible
- Email: Resend + React Email
- Analytics: PostHog
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
  api-hooks/     React Query hooks + Axios client (orval v8 generated)
  auth/          Better-Auth server + client
  billing/       Billing abstraction (Stripe + Polar.sh)
  config/        Shared env config (lazy-init, Zod-validated)
  core/          Core utilities (createLazyService, getRequiredEnv, etc.)
  database/      Drizzle schema (users, orgs, memberships, subscriptions), migrations, DB client
  email/         Resend + React Email templates
  i18n/          i18next (en/es) — opt-in internationalization
  mcp/           MCP server scaffold with stdio transport
  storage/       S3 file/object storage
  typescript-config/  Shared tsconfig base configs
  ui-kit/        Shared React component library
```

**Package Dependency Graph:**
```
typescript-config (no deps)
analytics, api-hooks, core, i18n, ui-kit (no internal deps)

config
  -> database -> auth
  -> ai, billing, email, storage

core -> billing

api  (ai, auth, billing, config, database)
web  (ai, auth, config, database)
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

---

### AO CLI (`ao-cli`)

Rust-based AI agent orchestrator CLI. Powers the org's own AI workforce automation.

**Features:**
- Worktree-based task isolation for parallel AI agents
- Multi-model routing (Claude, oai-runner models)
- Self-healing: auto-reroutes failing model pipelines to Claude
- Workflow-optimizer: tracks per-model success rates, creates bugfix tasks on failures
- Daemon with scheduled/on-demand workflows
- MCP server integration

---

### brain (this repo)

Org-wide AI workforce command center. Runs on AO CLI. Operating at scale as of 2026-03-19 with 44+ merged PRs since launch.

**Agents:** planner, triager, reviewer, doc-auditor, security-monitor, sdk-auditor, release-coordinator, impact-analyzer, stale-detector, competitive-researcher, product-cataloger, product-doc-writer, toolmaker, knowledge-curator, workflow-optimizer, gtm-strategist, product-ideator, revenue-analyst

**Scheduled:** Conductor runs every 5 minutes (replaced brain-planner), queuing and coordinating all knowledge workflows

**MCP servers:** context7, sequential-thinking, github, firecrawl, playwright

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
| Agent orchestration | AO CLI (custom Rust tool) |
| Dependency updates | Renovate (shared config in `renovate-config`) |
