# Integration Ideas

## I1. Stripe Connect Integration for LaunchPad

**Problem:** SaaS platforms frequently need marketplace-style payments (platform takes a cut, vendors get paid). Supabase just shipped one-click Stripe Sync Engine. LaunchPad should have first-class Stripe integration that goes beyond sync — enabling Stripe Connect for multi-tenant billing.

**Target audience:** SaaS founders building marketplaces, agency tools, or any multi-vendor platform on LaunchPad.

**Proposed solution:** A `@launchpad/stripe` package that provides: Stripe Connect onboarding flow for tenants, subscription management tied to LaunchPad tenants, usage-based billing metering via database triggers, webhook handling with automatic database sync, and pre-built pricing table and checkout components.

**Leverage:**
- `launchpad-db-engine` (multi-tenancy maps directly to Stripe Connect accounts)
- Better Auth (user-to-tenant mapping)
- `supabase-to-hooks` (webhook patterns)

**Effort:** Medium (weeks)

**Revenue potential:** Core feature (increases platform stickiness and enables users to monetize)

**Priority score:** 9/10 — Payments are the #1 feature after auth in every SaaS template survey; Stripe Connect is underserved

---

## I2. Vercel / Netlify Deploy Integration

**Problem:** LaunchPad apps need to deploy somewhere. The standard flow for Supabase/Firebase developers is to deploy the frontend to Vercel/Netlify and connect the backend. LaunchPad should make this a one-click experience.

**Target audience:** All LaunchPad users deploying to Vercel or Netlify.

**Proposed solution:** Deploy integrations that: auto-configure environment variables on Vercel/Netlify, set up preview deployments linked to LaunchPad database branches (ties into F3), provide a `launchpad deploy` CLI command, and support Vercel's integration marketplace listing.

**Leverage:**
- `create-launchpad` CLI (already scaffolds projects)
- `launchpad-db-engine` (connection string management)

**Effort:** Small (days)

**Revenue potential:** Free (adoption driver)

**Priority score:** 8/10 — Essential developer workflow integration, removes friction from getting started

---

## I3. Resend / Email Integration

**Problem:** Transactional email (welcome emails, password resets, notifications) is needed by every SaaS. Currently developers must integrate Resend/SendGrid/Postmark manually. Supabase has basic email via their auth system but no rich transactional email.

**Target audience:** All LaunchPad users who need to send emails from their apps.

**Proposed solution:** A `@launchpad/email` package that provides: Resend integration as the default provider (with pluggable adapters for SendGrid, Postmark), React Email component templates matching the LaunchPad design system, database-triggered emails (e.g., send welcome email on user creation), email template management with variable interpolation, and delivery tracking stored in LaunchPad database.

**Leverage:**
- `launchpad-db-engine` (triggers, template storage)
- Better Auth (auth-related email flows)
- Radix UI design system (email component styling)

**Effort:** Small (days)

**Revenue potential:** Free tier (100 emails/day), paid usage beyond threshold

**Priority score:** 7/10 — Nice-to-have integration, not a primary differentiator

---

## I4. Claude Code / Cursor Rules for LaunchPad

**Problem:** Supabase published "30 rules across 8 categories teaching AI agents to write correct Postgres code" for Claude Code, Cursor, and Copilot. This simple act drives enormous adoption because developers can now use AI to build Supabase apps more effectively. LaunchPad needs the same.

**Target audience:** Developers using Claude Code or Cursor who want AI to understand LaunchPad's patterns.

**Proposed solution:** Publish official AI rules/context files for: `launchpad-db-engine` query patterns and type usage, Better Auth integration patterns, `create-launchapp` project structure conventions, AO workflow and skill authoring patterns, and LaunchPad SDK best practices. Distribute as `.claude/` rules, `.cursor/rules/`, and CLAUDE.md templates.

**Leverage:**
- All existing products (document their patterns)
- `ao-skills` (skill authoring is a key AI use case)

**Effort:** Small (days)

**Revenue potential:** Free (adoption driver, increases developer productivity with the platform)

**Priority score:** 9/10 — Near-zero effort, massive adoption impact. If AI agents can write LaunchPad code correctly, developers will choose LaunchPad.

---

## I5. Figma-to-LaunchApp Pipeline

**Problem:** Design-to-code is a persistent pain point. The org already has `figma-tailwind-plugin`. Extending it into a full pipeline that generates LaunchApp-compatible components would be a strong differentiator vs competitors who offer no design tooling.

**Target audience:** Designers and frontend developers who want to go from Figma designs to production React components.

**Proposed solution:** Extend `figma-tailwind-plugin` into a full pipeline: Figma plugin exports design tokens and component specs, CLI tool generates React components using the LaunchPad design system (Radix UI), components are auto-registered in the project's component library, and supports both one-time export and continuous sync.

**Leverage:**
- `figma-tailwind-plugin` (existing Figma integration)
- Radix UI design system
- `create-launchapp` (component scaffolding)

**Effort:** Medium (weeks)

**Revenue potential:** Freemium — free for basic export, paid for continuous sync and team features

**Priority score:** 7/10 — Niche but defensible; no BaaS competitor offers this

---

## I6. AO + GitHub Issues Sync

**Problem:** Teams use GitHub Issues for project management but want AO to orchestrate AI agents on those issues. Currently there's no bidirectional sync — you either use AO tasks or GitHub Issues, not both.

**Target audience:** Teams using GitHub Issues who want AI agents to automatically work on issues.

**Proposed solution:** A bidirectional sync between AO tasks and GitHub Issues: GitHub Issue created → AO task auto-created, AO task status changes → GitHub Issue updated, labels/assignees sync bidirectionally, AO workflow completion → auto-close GitHub Issue with summary comment, and support for GitHub Issue templates that map to AO workflow types.

**Leverage:**
- AO task system (already has full CRUD)
- `pr-review-responder` (GitHub webhook patterns)
- AO workflow engine (auto-dispatch on new issues)

**Effort:** Medium (weeks)

**Revenue potential:** Free for open-source (community growth), part of AO Cloud paid tier

**Priority score:** 8/10 — Bridges the gap between existing project management and AI agent orchestration

---

## I7. LaunchPad MCP Server

**Problem:** MCP is becoming the universal interface for AI tools. Any BaaS that ships an MCP server instantly becomes accessible to every AI agent (Claude, GPT, Cursor, etc.). Supabase already supports MCP for building ChatGPT apps on Edge Functions.

**Target audience:** Developers building AI agents that need to interact with their LaunchPad backend.

**Proposed solution:** An official `@launchpad/mcp-server` that exposes: database CRUD operations as MCP tools, auth management (create users, assign roles), storage operations (upload, list, delete files), schema introspection as MCP resources, and migration management tools. Ship as both an npm package and a pre-built Docker container.

**Leverage:**
- `launchpad-db-engine` (database operations)
- `openapi-gen` (API surface → MCP tool mapping)
- Better Auth (auth operations)

**Effort:** Medium (weeks)

**Revenue potential:** Free (massive ecosystem adoption driver)

**Priority score:** 9/10 — MCP support is becoming table stakes. Any BaaS without it will be invisible to the AI agent ecosystem.

---

## I8. Better Auth Plugin Ecosystem

**Problem:** Better Auth is positioned as the "Swiss Army knife of authentication" with a plugin architecture. But the plugin ecosystem is still small compared to what's possible. Expanding it with pre-built integrations would accelerate adoption.

**Target audience:** Developers using Better Auth who need specific auth integrations.

**Proposed solution:** A collection of Better Auth plugins: `@better-auth/stripe` — sync user roles with Stripe subscriptions, `@better-auth/saml` — enterprise SSO via SAML, `@better-auth/rbac-ui` — pre-built role management dashboard components, `@better-auth/audit-log` — auth event logging and compliance, `@better-auth/mfa-push` — push notification-based MFA. Publish as individual npm packages with a unified documentation site.

**Leverage:**
- Better Auth plugin architecture
- LaunchPad design system (for UI plugins)
- `launchpad-db-engine` (storage for audit logs, session data)

**Effort:** Small per plugin (days each), Medium for the collection (weeks)

**Revenue potential:** Free/open-source core plugins, premium enterprise plugins (SAML, audit log) as paid add-ons

**Priority score:** 8/10 — Builds moat around Better Auth, enterprise plugins have clear revenue potential

---

## I9. AO + Linear/Jira Bidirectional Sync

**Problem:** Not all teams use GitHub Issues. Many engineering teams, especially at scale, use Linear or Jira for project management. AO's task system needs to meet developers where they already work — not force them to switch to a new task tracker.

**Target audience:** Teams using Linear or Jira who want AI agents to automatically pick up and work on tickets.

**Proposed solution:** Bidirectional sync adapters for Linear and Jira that: map Linear/Jira tickets to AO tasks (status, priority, assignee), auto-dispatch AO workflows when tickets reach specific states (e.g., "Ready for Dev"), post agent progress and results back as ticket comments, sync labels/tags for workflow routing, and support custom field mapping via configuration.

**Leverage:**
- AO task system (full CRUD with status, priority, checklists)
- I6 GitHub Issues Sync (same sync architecture, different API)
- AO workflow engine (auto-dispatch patterns)

**Effort:** Medium (weeks) — per-platform adapter, but shared sync framework with I6

**Revenue potential:** Part of AO Cloud paid tier; enterprise feature

**Priority score:** 8/10 — Removes the biggest adoption blocker for teams already invested in Linear/Jira

---

## I10. PostHog / Analytics Integration for LaunchPad

**Problem:** Every SaaS needs product analytics. Developers using LaunchPad currently have to manually integrate PostHog, Mixpanel, or Amplitude — setting up event tracking, user identification, and feature flags from scratch. A first-class analytics integration would save days of setup.

**Target audience:** SaaS builders on LaunchPad who need product analytics and feature flags.

**Proposed solution:** A `@launchpad/analytics` package that provides: PostHog as the default provider (open-source, self-hostable — aligned with LaunchPad's values), automatic user identification via Better Auth session, pre-built event tracking for common SaaS events (signup, subscription, feature usage), feature flag SDK with server-side evaluation, and A/B testing helpers integrated with LaunchPad's API layer.

**Leverage:**
- Better Auth (user identification and session data)
- `launchpad-db-engine` (server-side feature flag evaluation)
- `create-launchapp` templates (pre-wire analytics in scaffolded projects)

**Effort:** Small (days)

**Revenue potential:** Free (adoption driver, increases template value)

**Priority score:** 7/10 — Nice quality-of-life integration; not a primary differentiator but reduces setup friction

---

## I11. Slack/Discord Notifications for AO Workflows

**Problem:** When AO agents complete workflows, encounter errors, or need human decisions, the notification goes... nowhere useful. Developers have to check the CLI or dashboard. In team environments, workflow events need to surface in the communication tools teams already use.

**Target audience:** Teams using AO in collaborative settings who want real-time awareness of agent activity.

**Proposed solution:** Notification integrations for Slack and Discord that: post workflow completion summaries to configured channels, alert on failures, rework cycles, and stuck workflows, provide interactive buttons for approval phases (approve/reject directly from Slack), support per-workflow channel routing (e.g., deploy workflows → #deployments), and include cost summaries in completion notifications.

**Leverage:**
- AO daemon events (already emits lifecycle events)
- AO workflow decisions (already has approval/reject flow)

**Effort:** Small (days)

**Revenue potential:** Free for basic notifications, part of AO Cloud team tier for interactive approvals

**Priority score:** 8/10 — Low effort, high team utility; essential for AO Cloud's team-oriented value proposition

---

## I12. Terraform/Pulumi Provider for LaunchPad

**Problem:** Infrastructure-as-Code is standard practice for production deployments. DevOps teams manage Supabase, PlanetScale, and other databases via Terraform providers. Without a Terraform/Pulumi provider, LaunchPad can't fit into enterprise IaC workflows.

**Target audience:** DevOps engineers and platform teams managing LaunchPad infrastructure in production.

**Proposed solution:** Official Terraform and Pulumi providers for LaunchPad that manage: project creation and configuration, database provisioning and migrations, auth provider configuration, storage bucket setup, environment variable management, and backup/restore policies.

**Leverage:**
- `launchpad-db-engine` (already has programmatic API for all operations)
- `openapi-gen` (API spec can auto-generate provider resources)

**Effort:** Medium (weeks)

**Revenue potential:** Free (enterprise adoption driver), positions LaunchPad for enterprise deals

**Priority score:** 7/10 — Required for enterprise adoption but limited immediate user base

---

## I13. Stripe Sync Engine for LaunchPad (One-Click)

**Problem:** Supabase just shipped a one-click Stripe Sync Engine integration — developers can query customers, subscriptions, invoices, and payments using standard SQL directly in their database. This goes beyond I1's Stripe Connect (which is about multi-tenant payments) — this is about having Stripe data queryable alongside your app data for analytics, dashboards, and business logic.

**Target audience:** Any SaaS builder who uses Stripe and wants to query billing data alongside their application data.

**Proposed solution:** A one-click integration in `launchpad-studio` that: syncs Stripe objects (customers, subscriptions, invoices, payments, products) to LaunchPad tables, keeps data in sync via Stripe webhooks with automatic retry, provides pre-built SQL views for common queries (MRR, churn, LTV), includes dashboard widgets for revenue metrics, and supports type-safe queries via the `@launchpad/client` SDK.

**Leverage:**
- `launchpad-db-engine` (table creation, migrations, type generation)
- `supabase-to-hooks` (webhook handling patterns)
- Better Auth (user ↔ Stripe customer mapping)
- `launchpad-studio` (dashboard UI for one-click setup)

**Effort:** Medium (weeks)

**Revenue potential:** Free tier (basic sync), paid for real-time sync and advanced analytics views

**Priority score:** 9/10 — Supabase just shipped this and it's getting significant attention; LaunchPad needs parity. Billing data access is universally needed by SaaS builders.

---

## Summary Table

| # | Integration | Connects | Effort | Priority |
|---|-------------|----------|--------|----------|
| I1 | Stripe Connect | LaunchPad ↔ Stripe | Medium | 9/10 |
| I2 | Vercel/Netlify Deploy | LaunchPad ↔ Deploy platforms | Small | 8/10 |
| I3 | Resend Email | LaunchPad ↔ Email providers | Small | 7/10 |
| I4 | AI Agent Rules | All products ↔ Claude/Cursor | Small | 9/10 |
| I5 | Figma Pipeline | Design ↔ LaunchApp | Medium | 7/10 |
| I6 | GitHub Issues Sync | AO ↔ GitHub | Medium | 8/10 |
| I7 | LaunchPad MCP Server | LaunchPad ↔ AI agents | Medium | 9/10 |
| I8 | Better Auth Plugins | Better Auth ↔ Enterprise tools | Small-Medium | 8/10 |
| I9 | Linear/Jira Sync | AO ↔ Linear/Jira | Medium | 8/10 |
| I10 | PostHog Analytics | LaunchPad ↔ Analytics | Small | 7/10 |
| I11 | Slack/Discord Notifications | AO ↔ Communication | Small | 8/10 |
| I12 | Terraform/Pulumi Provider | LaunchPad ↔ IaC tools | Medium | 7/10 |
| I13 | Stripe Sync Engine | LaunchPad ↔ Stripe Data | Medium | 9/10 |

---

## New Integration Ideas — Round 2 (2026-03-18)

> Generated from comprehensive knowledge base analysis including 40+ repo docs,
> revenue analysis, GTM strategies, and March 2026 market research.

---

## I14. Polar.sh Deep Integration for LaunchApp

**Problem:** The LaunchApp template already has basic Polar.sh support (added via recent PRs). But Polar.sh offers much more than payments — it provides sponsorship tiers, benefit fulfillment, newsletter, file downloads, Discord access grants, and license key management. For open-source-first SaaS products (which LaunchApp targets), Polar.sh is increasingly preferred over Stripe for its developer-friendly UX and lower fees.

**Target audience:** Indie hackers and open-source maintainers building SaaS products who prefer Polar.sh's open-source-native billing over raw Stripe integration.

**Proposed solution:** A `@launchapp/polar` package that provides: full Polar.sh subscription lifecycle management (create, upgrade, cancel, pause), benefit fulfillment hooks (auto-grant access to features based on Polar tier), license key generation and validation for distributed software, sponsorship tier display components (pricing tables, sponsor walls), webhook handling for subscription events, and seamless switching between Polar.sh and Stripe via config.

**Leverage:**
- `saas-template-launch-app-test` (already has basic Polar.sh integration)
- Better Auth (map Polar subscriptions to auth roles)
- Existing Stripe integration patterns (parallel implementation)

**Effort:** Small (days) — Polar.sh integration exists; this extends it to feature parity with Stripe

**Revenue potential:** Free (adoption driver — makes LaunchApp the best template for open-source SaaS)

**Priority score:** 8/10 — Polar.sh is growing rapidly in the indie hacker space; first-class support differentiates LaunchApp from competitors locked to Stripe

---

## I15. Sentry / Error Tracking Integration for LaunchPad

**Problem:** Every production app needs error tracking. Developers currently set up Sentry, Bugsnag, or Datadog manually. LaunchPad apps have no built-in error boundary or reporting. A pre-wired integration would save hours of setup and provide better error context (which user, which tenant, which API endpoint).

**Target audience:** LaunchPad and LaunchApp developers deploying to production who need error monitoring.

**Proposed solution:** A `@launchpad/errors` package that provides: Sentry as the default provider (open-source, self-hostable), automatic error context enrichment (user ID, org ID, tenant from Better Auth session), API route error boundaries with structured error responses, React error boundary components from the design system, source map upload automation for Hono SSR, and environment-aware configuration (dev: console, staging: Sentry, prod: Sentry + alerts).

**Leverage:**
- Better Auth (user/session context for error enrichment)
- Hono middleware (API error capture)
- React Router v7 (error boundary patterns)
- Design system (error UI components)

**Effort:** Small (days)

**Revenue potential:** Free (adoption driver, reduces support burden)

**Priority score:** 7/10 — Quality-of-life integration; not differentiating but reduces setup friction significantly

---

## I16. Cloudflare Workers + R2 Integration for LaunchPad

**Problem:** Cloudflare Workers and R2 are increasingly the default edge compute and storage choice for cost-conscious developers — R2 has zero egress fees (vs S3's expensive egress). LaunchPad uses S3 for storage but has no edge compute story. A Cloudflare integration would provide both edge functions (complementing the proposed LaunchPad Functions) and cheaper storage.

**Target audience:** Cost-conscious developers who want edge-deployed LaunchPad apps with zero-egress storage.

**Proposed solution:** Integration providing: R2 as an alternative storage backend for `@launchpad/storage` (alongside S3), Cloudflare Workers deployment target for Hono API routes (Hono already has first-class Cloudflare support), KV namespace for session storage and caching, D1 as an alternative SQLite-based database for lightweight apps, and Cloudflare Tunnel for local development exposure.

**Leverage:**
- Hono (native Cloudflare Workers adapter — zero additional work for API routes)
- `launchpad-db-engine` (abstract storage backend)
- Docker + Railway deploy (add Cloudflare as alternative deploy target)

**Effort:** Small-Medium (days to weeks) — Hono's Cloudflare support does the heavy lifting

**Revenue potential:** Free (adoption driver — unlocks a large developer segment)

**Priority score:** 8/10 — Cloudflare is the fastest-growing edge platform; Hono's native support makes this unusually low-effort for high impact

---

## I17. n8n / Zapier / Make Integration for AO

**Problem:** Not every workflow needs AI agents. Many AO users also use no-code automation tools (n8n, Zapier, Make) for integrations — syncing CRM data, sending notifications, updating spreadsheets. Currently there's no bridge between AO's AI agent workflows and these no-code automation platforms.

**Target audience:** Teams using both AO and no-code automation who want AI agent results to flow into their existing automation pipelines (and vice versa).

**Proposed solution:** Bidirectional integration providing: AO webhook triggers (trigger n8n/Zapier workflows when AO tasks complete), AO actions for n8n/Zapier (trigger AO workflows from no-code automations), pre-built n8n nodes for common AO operations (create task, run workflow, check status), Zapier triggers and actions published to the Zapier app marketplace, and webhook-based event forwarding for any automation platform.

**Leverage:**
- AO daemon events (already emits lifecycle events)
- AO workflow webhooks (extend existing webhook support)
- `ao-skills` (skill definitions can map to Zapier action schemas)

**Effort:** Small-Medium (days to weeks) — webhook-based integration is straightforward

**Revenue potential:** Free basic webhooks, AO Cloud tier for managed integrations and Zapier marketplace listing

**Priority score:** 7/10 — Bridges AI agent workflows with the broader automation ecosystem; expands AO's reach to non-developer users

---

## I18. OpenTelemetry Integration for LaunchPad

**Problem:** Production observability is shifting to OpenTelemetry as the universal standard. Supabase exposes metrics via OpenTelemetry. Any BaaS that doesn't emit OTel traces and metrics is invisible to modern observability stacks (Grafana, Datadog, New Relic, Honeycomb).

**Target audience:** DevOps engineers and platform teams running LaunchPad in production who need observability in their existing monitoring stack.

**Proposed solution:** Built-in OpenTelemetry instrumentation for LaunchPad: automatic tracing for all Hono API routes (request → middleware → handler → DB → response), database query spans with duration and row count, auth operation spans (login, token refresh, session validation), storage operation spans (upload, download, delete), configurable exporters (OTLP, Jaeger, Zipkin), and health check endpoints for load balancer integration.

**Leverage:**
- Hono (OpenTelemetry middleware available)
- `launchpad-db-engine` (instrument query pipeline)
- Better Auth (instrument auth flows)

**Effort:** Small-Medium (days to weeks) — Hono has OTel middleware; extend to other LaunchPad services

**Revenue potential:** Free (enterprise adoption driver — required for production deployments)

**Priority score:** 8/10 — Non-negotiable for enterprise adoption; relatively low effort given Hono's existing middleware support

---

## I19. Turborepo Remote Cache Integration

**Problem:** The org uses Turborepo extensively (LaunchApp template, design system, launchapp-lite-v2). Turborepo's remote cache dramatically speeds up CI builds by sharing build artifacts across team members and CI runners. Vercel offers hosted remote cache, but it requires a Vercel account. Self-hosted alternatives exist but require setup.

**Target audience:** All developers working on LaunchApp monorepo projects who want faster builds.

**Proposed solution:** A pre-configured remote cache solution for LaunchApp projects: one-command setup (`launchpad cache setup`), self-hosted option via S3/R2 (zero vendor lock-in), pre-configured cache policies per package type, CI pipeline templates with cache integration (GitHub Actions, Railway), and cache analytics (hit rate, storage usage, time saved).

**Leverage:**
- Turborepo (already the build system for all monorepos)
- S3/R2 (storage for cache artifacts)
- GitHub Actions (CI integration)

**Effort:** Small (days)

**Revenue potential:** Free self-hosted, $9/month for managed cache hosting

**Priority score:** 7/10 — Developer productivity improvement; nice-to-have but not essential

---

## I20. AO + Cursor / Windsurf Interop

**Problem:** AO currently orchestrates Claude Code agents. But many developers use Cursor (29.3B valuation, 500M ARR) or Windsurf (acquired by Cognition/Devin). AO is locked to a single AI coding tool. True orchestration should support dispatching tasks to any agent — including Cursor and Windsurf instances.

**Target audience:** Teams with mixed AI tooling who want unified orchestration regardless of which AI coding tool individual developers prefer.

**Proposed solution:** Agent adapter layer for AO that: supports dispatching tasks to Cursor via its CLI/API, supports Windsurf/Devin task dispatch, normalizes task results across agent types, tracks cost and quality metrics per agent type (enabling apples-to-apples comparison), and allows per-workflow agent selection (some tasks go to Claude Code, others to Cursor).

**Leverage:**
- AO workflow engine (already has agent abstraction)
- AO multi-model routing (extend from model-level to tool-level routing)
- AO daemon (agent process management)

**Effort:** Medium (weeks) — depends on Cursor/Windsurf API availability

**Revenue potential:** AO Pro/Team feature — strong differentiator for enterprise teams with diverse tooling

**Priority score:** 8/10 — True multi-agent orchestration across tools is unique in the market; positions AO as the universal orchestrator, not just a Claude Code wrapper

---

## I21. Firebase Migration Accelerator

**Problem:** Firebase removed its free storage tier and is increasingly pushing developers toward Gemini/Vertex AI lock-in. Developers are actively looking for alternatives (Firebase vs Supabase comparisons are the most searched BaaS topic in 2026). But Firebase migration is particularly painful because of its NoSQL → SQL schema translation, Firebase Auth → alternative auth migration, and Cloud Functions → alternative functions porting.

**Target audience:** Firebase developers frustrated by pricing changes, vendor lock-in, or NoSQL limitations who want to move to a relational, open-source backend.

**Proposed solution:** A `launchpad migrate firebase` command (extends idea #16) with: Firestore document collections → PostgreSQL table mapping with schema inference, Firebase Auth user export → Better Auth import (preserving password hashes, OAuth connections), Firebase Cloud Functions → Hono API route translation guide (AI-assisted), Firebase Storage → S3/R2 migration with URL redirect mapping, and real-time migration progress dashboard.

**Leverage:**
- `launchpad-db-engine` (target database)
- Better Auth (auth import)
- Hono (API route target — same runtime model as Cloud Functions)
- `supabase-to-hooks` (migration pattern expertise)

**Effort:** Medium (weeks)

**Revenue potential:** Free (adoption driver — directly converts Firebase users). $199 for assisted migration service.

**Priority score:** 9/10 — Firebase pricing backlash is creating a migration wave right now; being the easiest off-ramp captures high-intent users

---

## I22. Inngest / Trigger.dev Integration for LaunchPad

**Problem:** Background job processing is complex to build from scratch (proposed in new product #11). Inngest and Trigger.dev are established platforms specifically for this — durable functions, event-driven workflows, cron jobs, retries. Rather than building LaunchPad Jobs from scratch, integrating with an existing solution gets 80% of the value in 10% of the time.

**Target audience:** LaunchPad developers who need background jobs immediately without waiting for a native LaunchPad Jobs product.

**Proposed solution:** A `@launchpad/inngest` adapter that: pre-configures Inngest/Trigger.dev with LaunchPad event sources (database triggers, auth events, webhook receipts), provides type-safe event definitions matching LaunchPad's schema, includes pre-built function templates (send welcome email, sync Stripe, generate report), offers a dashboard widget in `launchpad-studio` for job monitoring, and supports both hosted (Inngest Cloud) and self-hosted (Trigger.dev) options.

**Leverage:**
- `launchpad-db-engine` (event source for triggers)
- Better Auth (auth events as trigger sources)
- Hono (API routes to serve Inngest functions)

**Effort:** Small (days) — thin adapter over existing platforms

**Revenue potential:** Free (adoption driver — unblocks production use cases immediately)

**Priority score:** 8/10 — Faster path to background jobs than building native; validates demand before investing in LaunchPad Jobs (#11)

---

## Updated Summary Table

| # | Integration | Connects | Effort | Priority |
|---|-------------|----------|--------|----------|
| I1 | Stripe Connect | LaunchPad ↔ Stripe | Medium | 9/10 |
| I2 | Vercel/Netlify Deploy | LaunchPad ↔ Deploy platforms | Small | 8/10 |
| I3 | Resend Email | LaunchPad ↔ Email providers | Small | 7/10 |
| I4 | AI Agent Rules | All products ↔ Claude/Cursor | Small | 9/10 |
| I5 | Figma Pipeline | Design ↔ LaunchApp | Medium | 7/10 |
| I6 | GitHub Issues Sync | AO ↔ GitHub | Medium | 8/10 |
| I7 | LaunchPad MCP Server | LaunchPad ↔ AI agents | Medium | 9/10 |
| I8 | Better Auth Plugins | Better Auth ↔ Enterprise tools | Small-Medium | 8/10 |
| I9 | Linear/Jira Sync | AO ↔ Linear/Jira | Medium | 8/10 |
| I10 | PostHog Analytics | LaunchPad ↔ Analytics | Small | 7/10 |
| I11 | Slack/Discord Notifications | AO ↔ Communication | Small | 8/10 |
| I12 | Terraform/Pulumi Provider | LaunchPad ↔ IaC tools | Medium | 7/10 |
| I13 | Stripe Sync Engine | LaunchPad ↔ Stripe Data | Medium | 9/10 |
| **I14** | **Polar.sh Deep Integration** | **LaunchApp ↔ Polar.sh** | **Small** | **8/10** |
| **I15** | **Sentry Error Tracking** | **LaunchPad ↔ Sentry** | **Small** | **7/10** |
| **I16** | **Cloudflare Workers + R2** | **LaunchPad ↔ Cloudflare** | **Small-Medium** | **8/10** |
| **I17** | **n8n/Zapier/Make** | **AO ↔ No-code automation** | **Small-Medium** | **7/10** |
| **I18** | **OpenTelemetry** | **LaunchPad ↔ Observability** | **Small-Medium** | **8/10** |
| **I19** | **Turborepo Remote Cache** | **LaunchApp ↔ CI/CD** | **Small** | **7/10** |
| **I20** | **Cursor/Windsurf Interop** | **AO ↔ AI coding tools** | **Medium** | **8/10** |
| **I21** | **Firebase Migration** | **Firebase → LaunchPad** | **Medium** | **9/10** |
| **I22** | **Inngest/Trigger.dev** | **LaunchPad ↔ Background jobs** | **Small** | **8/10** |

---

## New Integration Ideas — Round 3 (2026-03-19)

> Generated from refreshed revenue analysis, March 2026 MCP/agent ecosystem research,
> strategic question analysis, and competitive landscape gaps.

---

## I23. Anthropic Agent SDK Native Integration for AO

**Problem:** Anthropic released the Claude Agent SDK, providing a structured way to build agent applications with tool use, multi-turn conversations, and orchestration primitives. AO currently wraps Claude Code CLI for agent execution, but the Agent SDK offers a more direct, programmatic API for agent control — lower latency, finer-grained tool management, and native streaming. As Anthropic evolves the SDK, AO should be a first-class consumer.

**Target audience:** AO users who want more granular control over agent behavior, custom tool definitions, and direct API-level agent interaction without the CLI overhead.

**Proposed solution:** A native Anthropic Agent SDK adapter for AO that: uses the Agent SDK directly for agent task execution (alongside the existing Claude Code CLI path), exposes Agent SDK tool definitions as first-class AO skill primitives, supports custom tool registrations per workflow phase, enables streaming agent output in the AO dashboard and CLI, provides lower-latency execution for simple tasks (skip CLI bootstrap), and maintains backward compatibility (users can choose CLI or SDK execution per workflow).

**Leverage:**
- AO workflow engine (agent abstraction layer already exists)
- AO skills (map to Agent SDK tool definitions)
- AO daemon (manage SDK agent processes alongside CLI agents)
- Claude API integration patterns (from plugin packs)

**Effort:** Medium (weeks) — Agent SDK is well-documented; integration with AO's phase/workflow system is the work

**Revenue potential:** Core AO Pro feature — enables advanced use cases that justify subscription

**Priority score:** 9/10 — Anthropic's own SDK is the canonical way to build Claude agents; native support positions AO as the premium orchestrator for Anthropic's ecosystem

---

## I24. Neon Serverless Postgres Integration for LaunchPad

**Problem:** Neon is the fastest-growing serverless Postgres platform — branching, auto-scaling, scale-to-zero, and a generous free tier. LaunchPad uses traditional Postgres (via Railway/Docker), which means always-on infrastructure costs and no database branching. For developers building on LaunchPad who want serverless economics and instant preview environments, Neon is the natural backend. The org's proposed Database Branching feature (F3) could be achieved largely for free by integrating with Neon's existing branching.

**Target audience:** Cost-conscious developers who want LaunchPad with serverless Postgres (pay only for active usage) and instant database branches for PR previews.

**Proposed solution:** A `@launchpad/neon` adapter that: configures `launchpad-db-engine` to use Neon's serverless driver (HTTP or WebSocket), auto-creates Neon database branches from Git branches (solves F3 with zero infrastructure), supports scale-to-zero for development/staging databases (zero idle cost), provides connection pooling via Neon's proxy, includes migration tooling that works with Neon's branching, and supports one-click setup from `create-launchpad` CLI.

**Leverage:**
- `launchpad-db-engine` (Drizzle ORM already supports Neon's serverless driver)
- Database Branching (F3) — Neon does this natively, reducing effort from "Large" to "Small"
- `create-launchpad` CLI (add Neon as a database provider option)

**Effort:** Small (days) — Drizzle + Neon is a documented setup; the value is in wiring it into LaunchPad's provisioning

**Revenue potential:** Free (adoption driver — reduces LaunchPad's infrastructure cost for users, makes DB branching free)

**Priority score:** 8/10 — Solves database branching (F3) at a fraction of the effort; Neon's serverless model is increasingly the default for new projects

---

## I25. Supabase SDK Compatibility Layer

**Problem:** Supabase has 4M+ developers. Many have existing codebases using `@supabase/supabase-js`. Migrating to LaunchPad requires rewriting every database query, auth call, and storage operation. The proposed LaunchPad Migrate (#16) handles schema and data, but doesn't address the application code. A Supabase-compatible SDK would let developers switch backends without rewriting their app code — the ultimate migration accelerator.

**Target audience:** Supabase developers who want to migrate to LaunchPad with minimal application code changes. Also developers evaluating BaaS platforms who want portability guarantees.

**Proposed solution:** A `@launchpad/supabase-compat` SDK that: implements the `@supabase/supabase-js` API surface on top of LaunchPad's backend, supports the most-used Supabase patterns (`.from('table').select('*').eq('col', val)`), handles auth methods (signIn, signUp, signOut, onAuthStateChange), provides storage operations (upload, download, list), includes real-time subscriptions (when LaunchPad Realtime ships), and clearly documents which Supabase features are supported and which need migration.

**Leverage:**
- `supabase-to-hooks` (already understands Supabase patterns — can inform the compat layer)
- `launchpad-db-engine` (target for all operations)
- Better Auth (implements Supabase auth API surface)
- LaunchPad Migrate (#16) (schema migration handles the backend; this handles the frontend)

**Effort:** Medium (weeks) — map Supabase API surface to LaunchPad equivalents; 80/20 rule (cover the 20% of API that 80% of apps use)

**Revenue potential:** Free (migration accelerator — converts Supabase's 4M users into potential LaunchPad users)

**Priority score:** 9/10 — The combination of Migrate (#16) + Supabase Compat SDK creates the lowest-friction BaaS migration path in the market. Supabase's own users are the largest addressable audience.

---

## I26. Starlight/Astro Documentation Site Generator

**Problem:** The strategic question "do we have customer support and docs infrastructure for paying users" is critical. Before launching paid products, the org needs professional documentation. But spinning up docs from scratch is a distraction from product work. Starlight (Astro's docs framework) is the new standard for developer docs — it's fast, SEO-optimized, and supports content collections. A LaunchPad-aware docs generator could auto-populate API references from the codebase.

**Target audience:** The org itself (immediate need for product documentation before launch) and LaunchPad/LaunchApp users who need docs for their SaaS products.

**Proposed solution:** A `@launchpad/docs` package that: scaffolds a Starlight documentation site from `create-launchpad` or `create-launchapp`, auto-generates API reference pages from `openapi-gen` output, includes pre-built content sections (Getting Started, API Reference, SDK Guides, Changelog), supports versioned documentation (per release), integrates with the design system for consistent branding, and includes a search API powered by the LaunchPad Vector (#10) embeddings.

**Leverage:**
- `openapi-gen` (API documentation generation)
- Design system (consistent styling)
- LaunchPad Vector (#10) (semantic search for docs)
- `create-launchapp` CLI (scaffold docs alongside app)

**Effort:** Small (days) — Starlight does the heavy lifting; auto-generation from openapi-gen is the value-add

**Revenue potential:** Free (essential infrastructure for launching paid products). Indirectly enables all revenue streams by providing professional documentation.

**Priority score:** 9/10 — Documentation is a hard prerequisite for paid product launches. Without docs, template buyers and AO Pro subscribers will churn immediately. Near-zero cost with Starlight + openapi-gen.

---

## I27. Railway One-Click Deploy Templates

**Problem:** Railway is the deployment platform used across the org (LaunchPad, templates, AO). Railway supports one-click deploy buttons and templates that appear in their marketplace. Deploying LaunchPad or LaunchApp projects currently requires manual Railway configuration. A one-click template would: appear in Railway's marketplace (free distribution), reduce setup from 30 minutes to 30 seconds, and serve as the best possible demo for potential customers.

**Target audience:** All developers evaluating LaunchPad or LaunchApp who want to see a working deployment instantly.

**Proposed solution:** Railway template configurations for: LaunchApp Pro template (full SaaS with auth, billing, email), LaunchPad standalone backend (database + auth + API), AO daemon (for teams wanting hosted AO without AO Cloud), and a combined template (LaunchApp + LaunchPad backend). Each template includes: `railway.toml` with optimized build settings, environment variable templates with descriptions, health check endpoints, and automatic database provisioning.

**Leverage:**
- Railway (already the org's deployment platform — all Dockerfiles exist)
- `supabase-railway-template` (already have a Railway template repo)
- Docker configurations across all products

**Effort:** Small (days) — Docker configs exist; Railway templates need `railway.toml` and variable mappings

**Revenue potential:** Free (distribution channel — Railway marketplace has 100K+ developers). Drives template sales and AO adoption.

**Priority score:** 8/10 — Near-zero effort for significant distribution. Railway marketplace is a free customer acquisition channel.

---

## I28. Vanta/Drata SOC 2 Integration for LaunchPad

**Problem:** Every B2B SaaS eventually needs SOC 2 compliance. Vanta and Drata have become the standard platforms for continuous compliance monitoring. But connecting a custom backend to Vanta/Drata requires manual integration — mapping auth events, access logs, and infrastructure changes to compliance controls. A pre-built integration would make LaunchPad the first BaaS that's SOC 2-ready out of the box.

**Target audience:** B2B SaaS builders on LaunchPad who need to achieve SOC 2 certification for enterprise sales.

**Proposed solution:** A `@launchpad/compliance` adapter that: auto-maps Better Auth events (login, logout, role change, MFA enrollment) to Vanta/Drata evidence, exports audit logs in the format compliance platforms expect, provides infrastructure evidence collection (uptime, backup, encryption status), includes pre-built security policies and controls documentation, and supports automated evidence refreshes via webhook.

**Leverage:**
- Better Auth (comprehensive auth event logging)
- `@launchpad/audit-log` SDK (already exists)
- LaunchPad's database encryption and backup capabilities
- AO Compliance Engine (#20) (shares compliance domain)

**Effort:** Small-Medium (days to weeks) — Vanta/Drata have well-documented APIs; mapping auth events is straightforward

**Revenue potential:** Premium feature ($49/month) — SOC 2 compliance is a gating requirement for enterprise sales. Any SaaS selling to enterprises will pay for this.

**Priority score:** 8/10 — Differentiates LaunchPad for B2B SaaS builders; compliance is a hard gate for enterprise revenue; relatively low effort with existing audit logging

---

## Updated Summary Table (All Rounds)

| # | Integration | Connects | Effort | Priority |
|---|-------------|----------|--------|----------|
| I1 | Stripe Connect | LaunchPad ↔ Stripe | Medium | 9/10 |
| I2 | Vercel/Netlify Deploy | LaunchPad ↔ Deploy platforms | Small | 8/10 |
| I3 | Resend Email | LaunchPad ↔ Email providers | Small | 7/10 |
| I4 | AI Agent Rules | All products ↔ Claude/Cursor | Small | 9/10 |
| I5 | Figma Pipeline | Design ↔ LaunchApp | Medium | 7/10 |
| I6 | GitHub Issues Sync | AO ↔ GitHub | Medium | 8/10 |
| I7 | LaunchPad MCP Server | LaunchPad ↔ AI agents | Medium | 9/10 |
| I8 | Better Auth Plugins | Better Auth ↔ Enterprise tools | Small-Medium | 8/10 |
| I9 | Linear/Jira Sync | AO ↔ Linear/Jira | Medium | 8/10 |
| I10 | PostHog Analytics | LaunchPad ↔ Analytics | Small | 7/10 |
| I11 | Slack/Discord Notifications | AO ↔ Communication | Small | 8/10 |
| I12 | Terraform/Pulumi Provider | LaunchPad ↔ IaC tools | Medium | 7/10 |
| I13 | Stripe Sync Engine | LaunchPad ↔ Stripe Data | Medium | 9/10 |
| I14 | Polar.sh Deep Integration | LaunchApp ↔ Polar.sh | Small | 8/10 |
| I15 | Sentry Error Tracking | LaunchPad ↔ Sentry | Small | 7/10 |
| I16 | Cloudflare Workers + R2 | LaunchPad ↔ Cloudflare | Small-Medium | 8/10 |
| I17 | n8n/Zapier/Make | AO ↔ No-code automation | Small-Medium | 7/10 |
| I18 | OpenTelemetry | LaunchPad ↔ Observability | Small-Medium | 8/10 |
| I19 | Turborepo Remote Cache | LaunchApp ↔ CI/CD | Small | 7/10 |
| I20 | Cursor/Windsurf Interop | AO ↔ AI coding tools | Medium | 8/10 |
| I21 | Firebase Migration | Firebase → LaunchPad | Medium | 9/10 |
| I22 | Inngest/Trigger.dev | LaunchPad ↔ Background jobs | Small | 8/10 |
| **I23** | **Anthropic Agent SDK** | **AO ↔ Claude Agent SDK** | **Medium** | **9/10** |
| **I24** | **Neon Serverless Postgres** | **LaunchPad ↔ Neon** | **Small** | **8/10** |
| **I25** | **Supabase Compat SDK** | **LaunchPad ↔ Supabase apps** | **Medium** | **9/10** |
| **I26** | **Starlight Docs Generator** | **All products ↔ Docs** | **Small** | **9/10** |
| **I27** | **Railway One-Click Deploy** | **All products ↔ Railway** | **Small** | **8/10** |
| **I28** | **Vanta/Drata SOC 2** | **LaunchPad ↔ Compliance** | **Small-Medium** | **8/10** |
