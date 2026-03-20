# Active Workstreams

> Last updated: 2026-03-20 by knowledge-curator agent.
> Verified with authenticated GitHub CLI access across private repos. Status below reflects the current default-branch and merged-PR state as of 2026-03-20, including the full 2026-03-20 update cycle for ao-cli, design-system, saas-template-launch-app-test, and launchapp-sveltekit.

## Summary

As of 2026-03-20, the org has 4 very high-velocity workstreams (`saas-template-launch-app-test`, `design-system`, `ao-cli`, `brain`), plus emerging velocity in `launchapp-sveltekit`. Key narrative shifts in 2026-03-20 cycle: ao-cli released v0.0.11 and stabilized post-release with test fixes and orphan tracking improvements; design-system completed Phase 4 with Timeline block and CLI scaffolding; saas-template-launch-app-test expanded auth (2FA/OTP) and billing capabilities; launchapp-sveltekit added multi-tier pricing and org schema migration. All four products are now AO-native with continuous delivery pipelines.

---

## 1. saas-template-launch-app-test — Flagship Template Hardening + Incremental Build Graph

**Repo:** `saas-template-launch-app-test`
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

**Recent highlights (verified 2026-03-20):**
- **Auth expansion (2026-03-20):** Two-factor authentication (TOTP) added to Better-Auth for enhanced security.
- **Auth expansion (2026-03-20):** Email OTP passwordless login plugin integrated into Better-Auth.
- **Package integration (2026-03-20):** @repo/ui-kit fully integrated into apps/web for shared component access.
- **Internationalization (2026-03-20):** @repo/i18n wired into apps/web with English/Spanish support.
- **Dependency updates (2026-03-20):** AWS SDK bumped to 3.1013.0; Polar.sh SDK upgraded to 0.46.5.
- **Security (2026-03-20):** ajv ReDoS vulnerability resolved via pnpm override.
- **Deployment shift (2026-03-20):** Cloudflare deployment documentation removed; focus moved to Railway and Vercel.
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

**Recent highlights (verified 2026-03-20):**
- **Phase 4 completion (2026-03-20):** Timeline data block added (TASK-093) completing Phase 4 advanced patterns.
- **CLI tooling (2026-03-20):** Design system CLI scaffolding tool added (TASK-094) for rapid component generation.
- **Distribution (2026-03-19-20):** Visual regression testing integrated with Chromatic for automated screenshot diffs.
- **Distribution (2026-03-19-20):** Changelog automation set up with conventional commits and release-it for versioning.
- **Distribution (2026-03-19-20):** NPM publishing pipeline via GitHub Actions for automated package releases.
- **Documentation (2026-03-19):** Design tokens documentation page added to Storybook.
- **Accessibility (2026-03-19):** Comprehensive variant/viewport coverage added for all components and blocks.
- **Automation (2026-03-19):** `lint-check`, `typecheck`, and `wait-for-ci` phases added to component delivery workflows.
- **Analytics (2026-03-19):** `token-generator` and `adoption-analyst` agents added for design-token auditing and HEART-style adoption reporting.
- **Ecommerce blocks:** ProductCard, ProductCardGrid, ShoppingCart, and CheckoutForm all implemented and tested.

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

**Recent highlights (verified 2026-03-20):**
- **v0.0.11 release (2026-03-19):** Completed and merged, followed by post-release stability improvements on 2026-03-20.
- **Post-release fixes (2026-03-20):**
  - Fixed failing daemon_run tests: notification delivery, selection source, task state change events (TASK-1040).
  - Aligned workflow YAML docs, parser, and validation; rejected unsupported authored keys (TASK-999).
  - Added fallback and pre-flight validation for session resume in agent-runner (TASK-1015).
  - Fixed orphan tracker data loss when cleanup removes the entire tracker file (TASK-990).
  - Added cargo test gate to rust-workspace-ci pull request checks (TASK-980).
  - Standardized task MCP input structs to use `id` field name across all task operations.
- **Model routing (2026-03-19):**
  - Features route to Claude Sonnet, bugfix/refactor to Codex GPT-5.4, UI to Gemini.
  - PR review, code review, reconciler, and workflow-optimizer all moved to Codex GPT-5.4.
  - Temporary doubled-rate-limit window for Codex extends through 2026-04-02.
- **Earlier improvements:** Process-leak fixes, rustfmt cleanup, test gate additions.

---

## 4. launchapp-sveltekit — Emerging Framework Variant

**Repo:** `launchapp-sveltekit`
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation workflows
**Status:** Emerging velocity — 4 merged PRs since 2026-03-20

This repo represents the org's SvelteKit-based SaaS template offering, built to parallel the flagship React Router 7 template while exploring alternative JavaScript frameworks.

**Current focus:**
- Establish parity with the flagship template in billing and auth capabilities.
- Validate SvelteKit's productivity claims for rapid SaaS prototyping.
- Build a library of framework variants for different developer preferences.
- Ensure org schema supports multi-tenant SvelteKit apps.

**Recent highlights (verified 2026-03-20):**
- **Billing (2026-03-20):** Multi-plan pricing tiers implemented (Starter/Pro/Enterprise) with Stripe integration.
- **Frontend (2026-03-20):** Tailwind CSS 4 styling, root layout structure for page organization.
- **Auth (2026-03-20):** Auth middleware integrated for protected routes and role-based access control.
- **Organization (2026-03-20):** Org schema migration added for multi-tenant support.

---

## 5. brain — Structured Knowledge Platform

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
