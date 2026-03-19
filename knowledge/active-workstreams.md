# Active Workstreams

> Last updated: 2026-03-19 by knowledge-curator agent.
> Note: Private repo activity (saas-template-launch-app-test, ao-cli, design-system) cannot be freshly verified — GitHub API returns 404 for these repos. Status below reflects last known state from 2026-03-18. Brain repo, ao-skills activity is current via GitHub API.

## Summary

As of 2026-03-19, the org has 3 high-velocity active workstreams (private, last verified 2026-03-18), 1 SDK consistency initiative in early remediation, the Brain command center operating at scale, and a new ao-skills Claude Code plugin published.

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

## 3. AO CLI — v0.0.11 Release + Self-Healing Model Pipeline

**Repo:** `ao-cli`
**Owner:** Shooksie
**Status:** Active — v0.0.11 release PR open, infrastructure improvements ongoing

The AO CLI is being upgraded with self-healing and multi-owner agent team capabilities. A significant release milestone is in progress.

**Release milestone:**
- PR #94 opened 2026-03-18: Release v0.0.11 — pending review and merge

**Recent highlights:**
- Auto-detect and re-route failing model pipelines (reconciler + workflow-optimizer)
- Reconciler: failing oai-runner tasks auto-rerouted to Claude
- Workflow-optimizer: tracks per-model success rates, creates bugfix tasks on 0% success
- Multi-owner agent team: 6 Product Owners, 2 architects, 2 researchers, master reviewer
  - po-oai-runner: oai-runner/model routing (every 2hr)
  - po-web: web UI, GraphQL, React app (hourly)

---

## 4. Launchpad SDK Consistency — Cross-Repo Standards Remediation (New)

**Repos:** All `launchpad-*-sdk` repos (identity, payments, storage, realtime, workflows, push, db, email, secrets)
**Owner:** Shooksie
**Status:** New initiative — 10 issues filed 2026-03-18

A new cross-repo workstream was started to bring all Launchpad BaaS SDKs up to a consistent standard. 10 `[SDK-CONSISTENCY]` issues were filed across the `launchpad-*-sdk` repos on 2026-03-18, signaling a structured remediation effort.

**Scope:**
- Standardize SDK conventions, interfaces, and patterns across all Launchpad BaaS SDKs
- Likely covers: naming conventions, error handling patterns, TypeScript types, versioning, documentation, and test coverage
- Affects: `launchpad-identity-sdk`, `launchpad-payments-sdk`, `launchpad-storage-sdk`, `launchpad-realtime-sdk`, `launchpad-workflows-sdk`, `launchpad-push-sdk`, `launchpad-db-sdk`, and related repos

**Status as of 2026-03-18:**
- 10 issues filed; none closed yet — remediation work not yet started
- Issues labeled `[SDK-CONSISTENCY]` for tracking

---

## 5. Brain — Org-Wide AI Workforce Command Center (Active)

**Repo:** `brain`
**Owner:** Shooksie
**Status:** Operating at scale — 44+ commits since launch (2026-03-18 to 2026-03-19)

The brain repo is the active org-wide coordination layer. Since launch it has processed 6 rounds of product ideation and strategic analysis.

**Cumulative output (as of 2026-03-19):**
- **61 repo docs** in `knowledge/repos/` covering the full launchapp-dev portfolio
- **93 product ideas** across 4 rounds in `knowledge/ideas/`
- **51+ strategic questions** across 6 rounds in `knowledge/questions/`
- **34 action items** extracted and filed in `knowledge/actions/`
- **32 architecture diagrams** verified against source code (2026-03-19)
- Revenue analysis refreshed to incorporate 93-idea portfolio
- GTM strategies created for LaunchPad, AO, Better Auth, and LaunchApp Templates
- Conductor workflow strengthened: deduplication and stale-task cleanup added (#36)
- Conflict recovery improved: rebase-and-retry workflow added

**Infrastructure:**
- Conductor runs every 5 minutes (replaced brain-planner)
- All brain-writing workflows use standard push/PR/merge with conflict recovery
- MCP servers: context7, sequential-thinking, github, firecrawl, playwright

---

## 6. launchapp-lite-v2 — Turborepo Conversion

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

- **Launchpad BaaS repos** — Last significant pushes were Dec 2025 – Jan 2026. No active code development, but 10 `[SDK-CONSISTENCY]` issues filed 2026-03-18 signal pending remediation work (see workstream 4 above).
- **launchapp-landing-v2** — Static landing page, last push Jan 2026.
- **launchapp.dev** — Marketing site, last push Feb 2026.
- **mymoku.net** — Personal/product site, last push Mar 12 2026.

---

## 7. ao-skills — Claude Code Plugin for AO CLI (New, Active)

**Repo:** `ao-skills`
**Owner:** Shooksie
**Status:** New — created 2026-03-17, 11 commits through 2026-03-19

The `ao-skills` repo was launched as the official Claude Code plugin for AO CLI. It has been restructured from a raw markdown knowledge base into a proper Claude Code plugin with a machine-readable manifest.

**Recent highlights (2026-03-17 to 2026-03-19):**
- Initial 7 skills added: getting-started, task-management, workflow-authoring, daemon-operations, queue-management, mcp-tools, troubleshooting
- 3 new production-pattern skills added: workflow-patterns, agent-personas, mcp-servers-for-agents (distilled from 150+ autonomous PR sessions)
- 2 new config skills added: mcp-setup, configuration
- setup-ao command added with step-by-step AI agent install prompt
- Restructured into `.claude-plugin/plugin.json` format with `skills/<name>/SKILL.md` layout
- `marketplace.json` added with `source` field for Claude Code plugin discovery
- `pack-authoring` and `skill-authoring` skills added
- Fixed `plugin.json`: author must be an object (not a string)
- Org metadata updated: renamed from AudioGenius-ai → launchapp-dev

**Total skills:** 15 (as of 2026-03-19)

---

## AO Plugin Packs Ecosystem

**Repos:** `aws-pack`, `firebase-pack`, `pdf-pack`, + 12 more
**Status:** Scaffolded (2026-03-16 to 2026-03-17), likely awaiting content

All plugin packs were created in bulk on 2026-03-16 to 2026-03-17. Each follows the same scaffold pattern with workflows, hooks, skills, agents, and setup. The `claude-plugin-marketplace` indexes all packs.
