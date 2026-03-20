# Active Workstreams

> Last updated: 2026-03-20 by knowledge-curator agent (through 2026-03-20T16:27:00Z).
> Verified with authenticated GitHub CLI access across private repos. Status below reflects the current default-branch and merged-PR state as of 2026-03-20T16:27:00Z, including post-13:17Z merged activity across ao-cli (PRs #117-#119), saas-template-launch-app-test (PRs #361-#367), and design-system (PR #132). Full 2026-03-20 update cycle verified for ao-cli, design-system, saas-template-launch-app-test, launchapp-sveltekit, launchapp-nextjs, launchapp-nuxt, and brain.

## Summary

As of 2026-03-20, the org has 4 very high-velocity workstreams (`saas-template-launch-app-test`, `design-system`, `ao-cli`, `brain`), plus emerging velocity in framework variants (`launchapp-sveltekit`, `launchapp-nextjs`, `launchapp-nuxt`). Key narrative shifts in 2026-03-20 cycle (through 12:43Z): brain repo added PR review gating (brain-reviewer) and continuous PR sweep (brain-pr-sweep) to prevent incomplete work and handle conflicts; ao-cli released v0.0.11 and stabilized post-release with planner MCP crash fix, macOS codesign fix, and bundled packs embedding; design-system completed Phase 4 with Timeline block, CLI scaffolding, layout transitions, palettes documentation, and landing/blog/error blocks; saas-template-launch-app-test expanded auth (2FA/OTP), billing capabilities, and added @ai-sdk/mistral provider support; launchapp-sveltekit added Vitest test suite plus multi-tier pricing and org schema migration; launchapp-nextjs integrated billing/subscription email workflows; launchapp-nuxt added cookie consent and GDPR compliance. All products are now AO-native with continuous delivery pipelines.

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

**Recent highlights (verified through 2026-03-20T13:02:54Z):**
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

**Recent highlights (verified through 2026-03-20T13:05:48Z):**
- **Phase 4 completion (2026-03-20):** Timeline data block added (TASK-093) completing Phase 4 advanced patterns.
- **CLI tooling (2026-03-20):** Design system CLI scaffolding tool added (TASK-094) for rapid component generation.
- **Layout transitions (2026-03-20):** New animation utilities for route/page transitions completed.
- **Documentation (2026-03-20):** Palettes documentation page added covering all design tokens and color systems.
- **Page blocks (2026-03-20):** Landing page, blog, and error page composition blocks completed for e-commerce + marketing use.
- **Accessibility hardening (2026-03-20, post-12:43Z):** NavigationMenuTrigger updated with focus-visible ring for WCAG 2.4.7 (TASK-134), warning variant role updated to "alert" for WCAG 4.1.3 (TASK-135).
- **Docs infrastructure upgrade (2026-03-20, 13:04:53Z):** Storybook docs site upgraded from Next.js 14 to 16.2.0 for better compatibility and performance.
- **Component dependency sync (2026-03-20, 13:05:48Z):** PR #132 merged with component dependency synchronization and refinement.
- **Distribution (2026-03-19-20):** Visual regression testing integrated with Chromatic for automated screenshot diffs.
- **Distribution (2026-03-19-20):** Changelog automation set up with conventional commits and release-it for versioning.
- **Distribution (2026-03-19-20):** NPM publishing pipeline via GitHub Actions for automated package releases.
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

**Recent highlights (verified through 2026-03-20T16:27:00Z):**
- **v0.0.11 release (2026-03-19):** Completed and merged, followed by post-release stability improvements on 2026-03-20.
- **Critical fixes (2026-03-20, 04:11Z-04:27Z):**
  - Fixed planner MCP crash preventing workflow state transitions (commit 04:11Z).
  - Fixed macOS codesign process for proper Darwin binary distribution (commit 04:19Z).
  - Embedded bundled packs into AO binary for offline pack access (commit 04:27Z).
- **Post-release fixes (2026-03-20, through 04:27Z):**
  - Fixed failing daemon_run tests: notification delivery, selection source, task state change events (TASK-1040).
  - Aligned workflow YAML docs, parser, and validation; rejected unsupported authored keys (TASK-999).
  - Added fallback and pre-flight validation for session resume in agent-runner (TASK-1015).
  - Fixed orphan tracker data loss when cleanup removes the entire tracker file (TASK-990).
  - Added cargo test gate to rust-workspace-ci pull request checks (TASK-980).
  - Standardized task MCP input structs to use `id` field name across all task operations.
- **Follow-up merges (2026-03-20, 16:27:00Z, PRs #117-#119):**
  - PR #117: DeepSeek routing and model provider fixes for improved model selection
  - PR #118: Cargo test CI gate hardening for rust-workspace CI robustness
  - PR #119: Agent-runner process leak fix for stability in long-running daemon scenarios
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

**Recent highlights (verified through 2026-03-20T02:38Z):**
- **Testing (2026-03-20):** Vitest test suite infrastructure added for unit and integration testing.
- **Test fixes (2026-03-20):** Related test-adjacent fixes applied across billing, auth, and routing components.
- **Billing (2026-03-20):** Multi-plan pricing tiers implemented (Starter/Pro/Enterprise) with Stripe integration.
- **Frontend (2026-03-20):** Tailwind CSS 4 styling, root layout structure for page organization.
- **Auth (2026-03-20):** Auth middleware integrated for protected routes and role-based access control.
- **Organization (2026-03-20):** Org schema migration added for multi-tenant support.

---

## 4b. launchapp-nextjs — Next.js App Router Variant

**Repo:** `launchapp-nextjs`
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation workflows
**Status:** Active — Phase 1 template development

Next.js App Router-based SaaS template, completing parity with flagship template capabilities.

**Recent highlights (verified 2026-03-20T03:34Z):**
- **Billing & Email (2026-03-20):** Billing and subscription email workflows integrated (PRs at 03:31Z, 03:34Z).
- Aligns launchapp-nextjs with the flagship template's billing/email capabilities.

---

## 4c. launchapp-nuxt — Nuxt 4 Variant

**Repo:** `launchapp-nuxt`
**Owner:** Shooksie
**Who is doing the work:** AO-managed implementation workflows
**Status:** Active — Phase 1 template development

Nuxt 4-based SaaS template with privacy-first focus.

**Recent highlights (verified 2026-03-20T03:10Z):**
- **Privacy & Compliance (2026-03-20):** Cookie consent and GDPR compliance work integrated (through 03:10Z).
- Establishes privacy-first approach aligned with launchapp-nuxt's target market in EU.

---

## 5. brain — Structured Knowledge Platform

**Repo:** `brain`
**Owner:** Shooksie
**Who is doing the work:** conductor + 20-agent roster (knowledge-curator/product-doc-writer/toolmaker/reviewer/brain-reviewer/brain-pr-sweep and others)
**Status:** Extremely active — 58+ merged PRs since the repo was created on 2026-03-19

The brain repo moved beyond markdown curation into structured data + typed MCP access, and then into explicit operator workflows, on 2026-03-19. On 2026-03-20, it added a dedicated PR review layer to prevent premature task completion and continuous PR sweep to handle conflicts and stale work.

**Current focus:**
- Keep the knowledge base aligned with same-day org changes (running knowledge-update workflows continuously).
- Add machine-readable access paths for repo and product data.
- Add operator workflows for quality, decisions, and cross-repo execution.
- Stabilize conductor scheduling and writing workflows.
- Prevent incomplete/conflicting work from being marked done (new brain-reviewer gate).

**Recent highlights (verified through 2026-03-20T12:43Z):**
- **PR review gating (2026-03-20, 06:26Z):** `brain-reviewer` agent added to verify all PRs match task requirements before merge; prevents marking tasks done if diff is incomplete or knowledge files are placeholders.
- **Continuous PR sweeping (2026-03-20, 06:28Z):** `brain-pr-sweep` workflow added, runs every 3 minutes, handles conflicting PRs (queue rebase), change requests (queue rework), and reconciles stale task states.
- **ao-cli quality audit (2026-03-20):** Post-release stability tracking for ao-cli v0.0.11 with crash fix, macOS codesign fix, and bundled packs.
- **LaunchPad SDK catalog refresh (2026-03-20):** Documented SDK consistency initiative and npm publishing milestones.
- Earlier highlights: SQLite-backed data layer, `brain-knowledge-mcp` and `brain-products-mcp` servers, conductor deduplication, quality-audit/decision-pipeline/cross-repo-execute workflows.

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
