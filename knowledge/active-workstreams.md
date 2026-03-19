# Active Workstreams

> Last updated: 2026-03-19 by knowledge-curator agent.
> Verified with authenticated GitHub CLI access across private repos. Status below reflects the current default-branch and merged-PR state as of 2026-03-19, including the post-19:30 merge cluster that landed after the earlier knowledge snapshot.

## Summary

As of 2026-03-19, the org has 4 very high-velocity workstreams (`saas-template-launch-app-test`, `design-system`, `ao-cli`, `brain`), 25 repos pushed in the last 30 days, 23 repos created in the last 7 days, and 1 archived desktop-shell repo (`agent-orchestrator`). The fastest-moving narrative shifts since the previous snapshot are the flagship template's build-graph refactor, the design-system workflow expansion, and `brain`'s move into operator workflows.

---

## 1. saas-template-launch-app-test — Flagship Template Hardening + Incremental Build Graph

**Repo:** `saas-template-launch-app-test`
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation/review/merge pipeline on top of the repo's custom workflow
**Status:** Extremely active — 188 merged PRs since 2026-03-12

This repo is no longer best described as a "test/staging" copy. It is the primary launchapp-lite trunk/canary where new platform capabilities land first.

**Current focus:**
- Add async/background processing primitives.
- Make `tsc --build` and project references reliable across the workspace.
- Decouple over-coupled API responsibilities.
- Harden admin/API security and deployment health.
- Tighten types and monitoring around the dashboard + API surface.

**Recent highlights (verified 2026-03-19):**
- `@repo/jobs` landed, then moved from Trigger.dev v3 to v4 the same day.
- `@repo/jobs` now has a dedicated `tsc --build` build script and participates in the project-reference graph.
- TypeScript project references plus `composite: true` were wired across the internal package graph to support topological incremental builds.
- `packages/jobs/tsconfig.json` now extends the shared base config and keeps `jsx: "react-jsx"` because it depends on `@repo/email`'s TSX templates.
- `@repo/api` gained a QStash-backed jobs route for enqueueing async work.
- `/enqueue` was tightened so only admin sessions or API keys can use it.
- Waitlist join flow moved out of `@repo/api` into a web action to reduce API/email coupling.
- ALB health check path was fixed from `/health` to `/api/health`.
- Dashboard API key typing was corrected by serializing/mapping Better-Auth date fields instead of using unsafe casts.
- Sentry monitoring, in-app notifications, and Vitest-based test setup all landed the same day.
- `@repo/api-hooks` was removed from the live monorepo as dead code.

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

**Recent highlights (verified 2026-03-19):**
- Ecommerce blocks landed: `ProductCard`, `ProductCardGrid`, `ShoppingCart`, and `CheckoutForm`.
- Docs-site work added live previews, corrected component prop mismatches, and replaced raw HTML controls with design-system primitives for accessibility.
- Blocks barrel exports were fixed so all block categories are available from the package root.
- The earlier dependency-update phase/workflow/cron remains in place in `.ao/workflows/custom.yaml`.
- TASK-062 added `lint-check`, `typecheck`, and `wait-for-ci` phases to the component, standard, scaffold, and quick-fix workflows.
- TASK-062 also added `token-generator` and `adoption-analyst` agents plus `design-token-generation` and monthly `adoption-metrics` workflows.
- A post-19:30 accessibility sweep added ARIA/semantics fixes across `DataTable`, `DatePicker`, `MultiSelect`, `Combobox`, `KPICard`, and `ChartContainer`.

---

## 3. AO CLI — v0.0.11 + Model Routing Overhaul

**Repo:** `ao-cli`
**Owner:** Shooksie
**Who is doing the work:** AO's own planner/reconciler/reviewer/workflow stack plus direct maintainer commits
**Status:** Very active — 53 merged PRs since 2026-03-12

The release train moved from self-healing failover work into a same-day workflow-routing overhaul on 2026-03-19.

**Current focus:**
- Raise throughput by shifting more work to Codex GPT-5.4.
- Split task classes by model strengths instead of one default route.
- Keep analytical/reconciliation phases on the provider best suited to code-critical judgment.

**Recent highlights (verified 2026-03-19):**
- `Release v0.0.11` merged earlier in the day.
- Commit `4d2694f` routed most low/medium/high work to Codex GPT-5.4 during the doubled-rate-limit window through 2026-04-02.
- Commit `67d7e4e` rebalanced routing to features → Sonnet, bugfix/refactor → Codex, and UI → Gemini.
- Commit `baeeaea` moved PR review, code review, reconciler, and workflow-optimizer to Codex GPT-5.4.
- Process-leak fixes, rustfmt cleanup, and a cargo-test CI gate landed around the release.
- The latest default-branch work then added session-resume preflight fallback and an orphan-tracker data-loss fix.

---

## 4. brain — Structured Knowledge Platform

**Repo:** `brain`
**Owner:** Shooksie
**Who is doing the work:** conductor + knowledge-curator/product-doc-writer/toolmaker/reviewer workflows
**Status:** Extremely active — 55 merged PRs since the repo was created on 2026-03-19

The brain repo moved beyond markdown curation into structured data + typed MCP access, and then into explicit operator workflows, on 2026-03-19.

**Current focus:**
- Keep the knowledge base aligned with same-day org changes.
- Add machine-readable access paths for repo and product data.
- Add operator workflows for quality, decisions, and cross-repo execution.
- Stabilize conductor scheduling and writing workflows.

**Recent highlights:**
- SQLite-backed structured data layer added.
- `brain-knowledge-mcp` and `brain-products-mcp` servers added for typed access to knowledge/product data.
- Repo catalog expanded to cover previously undocumented repos.
- Conductor deduplication, stale-task cleanup, and idempotent PR phases were strengthened.
- `Brain v2` added `quality-audit`, `decision-pipeline`, and `cross-repo-execute` workflows, and the conductor now runs every 10 minutes instead of every 5.

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

## Archived / Lower Priority

- `agent-orchestrator` is now archived. AO's active engine is `ao-cli`; the desktop shell remains historical.
- Launchpad BaaS repos remain lower-velocity. Most last substantive pushes are from December 2025 to January 2026.
- Marketing/landing repos remain materially less active than the four core workstreams above, with `mymoku.net` the only one that saw a push during this 7-day window.
