# Active Workstreams

> Last updated: 2026-03-18 by knowledge-curator agent.

## Summary

As of 2026-03-18, the org has 3 high-velocity active workstreams and 1 recently launched initiative.

---

## 1. saas-template-launch-app-test — Feature Buildout

**Repo:** `saas-template-launch-app-test`
**Owner:** Shooksie
**Status:** Very active — 180+ merged PRs in 7 days via AO daemon

The flagship SaaS template is under rapid AI-assisted development. The AO daemon is running agents against a large task backlog covering features, bugfixes, and dependency upgrades.

**Recent highlights (last 7 days):**
- Waitlist persistence: DB schema, API route, email confirmation (TASK-182)
- API key management CRUD route added to `@repo/api` (TASK-183)
- Storage routes: presigned upload/download/delete endpoints (TASK-175)
- Polar.sh billing dashboard support (TASK-170)
- Deployment: Dockerfile, docker-compose.prod.yml, deployment docs (TASK-173)
- Local dev docker-compose.yml for PostgreSQL (TASK-172)
- Security fix: rate limiter keyGenerator hardened against x-forwarded-for spoofing (TASK-164)
- Security fix: Zod runtime validation replacing `as` casts in billing webhook (TASK-166)
- `@repo/i18n` documented as opt-in with integration guide
- `@repo/mcp` tsconfig fixed for typecheck
- Multiple dependency upgrades: orval v7→v8, hono-rate-limiter 0.4→0.5, i18next v24→v25, react-i18next v15→v16, react-email v4→v5, posthog-node v4→v5, tailwindcss 4.2.1→4.2.2, turbo 2.8.18→2.8.19

**AO Workflow Config:**
- 5 agents, 9 phases, 6 workflows, staggered cron schedules
- Standard pipeline: implementation → push branch → create PR → PR review → merge

---

## 2. design-system — Component Library Buildout (Phase 3/4)

**Repo:** `design-system`
**Owner:** Shooksie
**Status:** Active — ~10 PRs merged in 7 days via AO

Completing the Radix UI-based React component library. Currently working through Phase 3 (extended) and Phase 4 (advanced) components.

**Recent highlights (last 7 days):**
- Combobox and MultiSelect components (TASK-033)
- VisuallyHidden, Portal, FocusScope utility components (TASK-032)
- Chart, KPICard, StatDisplay components (TASK-029)
- Storybook upgrade: v8 → v10 (TASK-030)
- Toolbar, ContextMenu, Menubar (TASK-028)
- Calendar and DatePicker (TASK-026)
- Table striped row variant, Alert info variant
- NavigationMenu, Breadcrumb, Pagination

**Roadmap status:**
- Phase 1-2 (Foundation, Core): Complete
- Phase 3 (Extended): Nearly complete — forms, navigation, data display
- Phase 4 (Advanced Patterns): In progress — charts, combobox, utility components done

---

## 3. AO CLI — Self-Healing Model Pipeline

**Repo:** `ao-cli`
**Owner:** Shooksie
**Status:** Active — infrastructure improvements ongoing

The AO CLI is being upgraded with self-healing and multi-owner agent team capabilities.

**Recent highlights:**
- Auto-detect and re-route failing model pipelines (reconciler + workflow-optimizer)
- Reconciler: failing oai-runner tasks auto-rerouted to Claude
- Workflow-optimizer: tracks per-model success rates, creates bugfix tasks on 0% success
- Multi-owner agent team: 6 Product Owners, 2 architects, 2 researchers, master reviewer
  - po-oai-runner: oai-runner/model routing (every 2hr)
  - po-web: web UI, GraphQL, React app (hourly)

---

## 4. Brain — Org-Wide AI Workforce Command Center (New)

**Repo:** `brain`
**Owner:** Shooksie
**Status:** Just launched (2026-03-18)

The brain repo was created today as the org-wide coordination layer for all AI agents.

**Setup completed:**
- 14+ specialized agents (planner, triager, reviewer, doc-auditor, security-monitor, sdk-auditor, release-coordinator, impact-analyzer, stale-detector, competitive-researcher, product-cataloger, product-doc-writer, toolmaker, knowledge-curator, workflow-optimizer, gtm-strategist, product-ideator, revenue-analyst)
- 14 on-demand workflows for org management
- Scheduled brain-planner every 3h
- Per-repo knowledge base structure (`knowledge/repos/`)
- Standard push/PR/merge flow for all brain-writing workflows
- Product ideation and revenue analysis workflows added
- GTM strategist and workflow optimizer agents added

**Active tasks queued:**
- TASK-003: Build org-wide architecture documentation (this task)

---

## 5. launchapp-lite-v2 — Turborepo Conversion

**Repo:** `launchapp-lite-v2`
**Owner:** Shooksie
**Status:** Recently active (2026-03-17), may be transitioning to active development

**Recent work:**
- Converted from single-app to Turborepo monorepo
- Hono SSR added
- packages: auth, database, typescript-config, ui
- Drizzle schema: organizations, memberships, subscriptions
- AO configured with 4 agents, 11 phases, 5 workflows, 3 schedules

---

## Stale / Lower Priority

- **Launchpad BaaS repos** — Last significant pushes were Dec 2025 – Jan 2026. No active development observed.
- **launchapp-landing-v2** — Static landing page, last push Jan 2026.
- **launchapp.dev** — Marketing site, last push Feb 2026.
- **mymoku.net** — Personal/product site, last push Mar 12 2026.

---

## AO Plugin Packs Ecosystem

**Repos:** `aws-pack`, `firebase-pack`, `pdf-pack`, + 12 more
**Status:** Scaffolded (2026-03-16 to 2026-03-17), likely awaiting content

All plugin packs were created in bulk on 2026-03-16 to 2026-03-17. Each follows the same scaffold pattern with workflows, hooks, skills, agents, and setup. The `claude-plugin-marketplace` indexes all packs.
