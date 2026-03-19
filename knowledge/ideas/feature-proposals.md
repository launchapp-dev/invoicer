# Feature Proposals for Existing Products

## LaunchPad BaaS

### F1. Row-Level Security (RLS) Policy Builder

**Problem:** Supabase's RLS is powerful but notoriously hard to get right — it's the #1 source of security misconfigurations. Supabase themselves added an "AI-assisted RLS" feature in 2025 to address this. LaunchPad needs an equivalent but can differentiate by making it simpler.

**Target audience:** Developers using LaunchPad's database engine who need per-user/per-tenant data isolation.

**Proposed solution:** A declarative policy DSL in `launchpad-db-engine` that generates SQL-level RLS policies from readable TypeScript/YAML config. Example: `allow('read', 'posts').where(row => row.org_id === ctx.user.org_id)`. Ship with a visual policy tester that shows which rows are visible for a given user context.

**Leverage:** `launchpad-db-engine` (already has multi-tenancy and migrations)

**Effort:** Medium (weeks)

**Revenue potential:** Core feature (increases platform stickiness)

**Priority score:** 8/10 — Security is a baseline requirement; doing it better than Supabase is a strong differentiator

---

### F2. TypeScript SDK with Type-Safe Queries

**Problem:** Supabase's auto-generated TypeScript types from the database schema is one of their most loved features. `launchpad-db-engine` already does type generation — but needs a client SDK that makes queries fully type-safe with autocomplete.

**Target audience:** TypeScript-first full-stack developers.

**Proposed solution:** A `@launchpad/client` SDK that reads generated types and provides: type-safe query builder (similar to Drizzle/Prisma but for LaunchPad's API), real-time subscription helpers, auth-aware client initialization, and framework-specific wrappers (React hooks via `supabase-to-hooks` patterns).

**Leverage:**
- `launchpad-db-engine` (type generation)
- `supabase-to-hooks` (React hooks patterns)
- `openapi-gen` (API surface generation)

**Effort:** Medium (weeks)

**Revenue potential:** Core feature (essential for developer adoption)

**Priority score:** 9/10 — Type safety is non-negotiable for modern TS developers; this is the SDK they'll evaluate first

---

### F3. Database Branching & Preview Environments

**Problem:** Supabase launched database branching in 2024-2025. Neon has this as a core feature. Developers want to create isolated database copies for feature branches and PR previews without manual migration management.

**Target audience:** Teams using LaunchPad with CI/CD pipelines who want per-PR preview environments.

**Proposed solution:** Extend `launchpad-db-engine` to support: branch-level database isolation (copy-on-write), automatic branch creation from Git branch webhooks, migration diffing between branches, and CLI commands for branch management (`launchpad db branch create feature-x`).

**Leverage:** `launchpad-db-engine` (migrations), `create-launchpad` CLI

**Effort:** Large (months)

**Revenue potential:** Paid feature (team/pro tier)

**Priority score:** 7/10 — Strong differentiator but technically complex

---

## AO Agent Orchestrator

### F4. AO Skill Marketplace & Discovery

**Problem:** `ao-skills` exists but discovery is manual. The MCP ecosystem has 5000+ servers with marketplaces like MCP.so for discovery. AO skills need the same discoverability — a registry where teams can publish, share, and install skills.

**Target audience:** Developers using AO who want to extend their agent workflows without writing custom skills from scratch.

**Proposed solution:** A skill registry (hosted at a web URL or via CLI) with: `ao skill search <query>`, `ao skill install <name>`, skill metadata (description, author, compatibility, ratings), versioning and dependency management, and community contribution workflow via GitHub.

**Leverage:**
- `ao-skills` (existing skills catalog)
- `ao-cli` (CLI infrastructure for install commands)

**Effort:** Small (days) for CLI registry, Medium (weeks) for web discovery UI

**Revenue potential:** Free/open-source (community growth), premium skills packs as paid add-ons

**Priority score:** 8/10 — Low effort for high ecosystem value; skills marketplace creates lock-in and network effects

---

### F5. AO GitHub Actions Integration

**Problem:** Teams want to run AI agent workflows as part of their CI/CD pipeline — auto-fix lint errors, auto-generate tests for new code, auto-respond to PR review comments. Currently requires manual setup with `pr-review-responder`.

**Target audience:** Teams using GitHub Actions who want to automate AI-powered code tasks in their pipeline.

**Proposed solution:** A published GitHub Action (`launchapp-dev/ao-action`) that: runs AO workflows on PR events (opened, review_requested, comment), supports configurable workflow templates (review, fix, test-gen), integrates with AO's existing phase/workflow system, and reports results as PR comments and check statuses.

**Leverage:**
- `pr-review-responder` (existing webhook + AI review patterns)
- AO workflow engine (phases, decisions, checkpoints)
- `ao-skills` (reusable skill definitions)

**Effort:** Small (days)

**Revenue potential:** Free (drives AO adoption), upsell to AO Cloud for persistent workflows

**Priority score:** 9/10 — Extremely high leverage, low effort, directly drives adoption

---

### F6. AO Multi-Model Routing

**Problem:** Different AI coding tasks benefit from different models — Claude Opus for architecture, Sonnet for implementation, Haiku for simple fixes, GPT for certain tasks. Currently AO defaults to a single model. Smart model routing could cut costs 60-70% while maintaining quality.

**Target audience:** Teams and individuals running many AI agent tasks who want to optimize cost vs quality.

**Proposed solution:** A model routing layer in AO that: automatically selects models based on task complexity and type, allows per-phase model configuration in workflow definitions, tracks cost and quality metrics per model per task type, supports fallback chains (try Haiku → escalate to Sonnet → escalate to Opus), and exposes a cost dashboard.

**Leverage:** AO workflow engine (already has per-phase configuration)

**Effort:** Medium (weeks)

**Revenue potential:** Core feature (reduces user costs, increases retention)

**Priority score:** 8/10 — Significant cost savings for users, competitive differentiator vs single-model tools

---

## LaunchApp Templates

### F7. Vertical SaaS Template Collection

**Problem:** Generic SaaS templates are commoditized (ShipFast, MakerKit, etc. all do auth + billing + dashboard). The opportunity is vertical-specific templates that include domain logic, data models, and UI tailored to specific industries.

**Target audience:** Founders building SaaS in specific verticals who want more than a generic boilerplate.

**Proposed solution:** A collection of vertical-specific templates built on `create-launchapp`:
- **Healthcare SaaS** — HIPAA-ready with patient records, appointment scheduling, telehealth hooks
- **EdTech SaaS** — course management, student progress, quiz engine, LMS integrations
- **Agency/Freelancer SaaS** — project tracking, client portals, invoicing, time tracking
- **AI SaaS** — LLM integration boilerplate, prompt management, usage metering, model routing
- **E-commerce SaaS** — multi-vendor marketplace, inventory, Stripe Connect

**Leverage:**
- `create-launchapp` CLI (scaffolding engine)
- `launchpad-db-engine` (data models, multi-tenancy)
- Better Auth (role-based access per vertical)
- `react-router-presets` (routing patterns)

**Effort:** Medium (weeks per template)

**Revenue potential:** Paid templates ($99-299 each) or subscription bundle ($49/month for all verticals)

**Priority score:** 8/10 — Proven revenue model, differentiates from generic competitors, each template is a focused product

---

### F8. create-launchapp AI Mode

**Problem:** CLI scaffolding tools ask developers to make choices upfront (auth provider, database, payments). In 2026, developers expect AI to understand their project description and make these choices for them.

**Target audience:** Developers starting new projects who want an AI-guided setup experience.

**Proposed solution:** Add an `--ai` flag to `create-launchapp` that: takes a natural language project description, selects the appropriate template and configuration, pre-configures auth roles, database schema, and API routes based on the description, generates a project README with architecture decisions explained, and optionally creates initial AO tasks for remaining implementation work.

**Leverage:**
- `create-launchapp` (existing CLI)
- AO task system (auto-generate tasks)
- Template collection (AI picks the right one)

**Effort:** Small (days)

**Revenue potential:** Free (adoption driver), upsell to premium templates

**Priority score:** 7/10 — Good DX differentiator but not revenue-generating directly

---

## Developer Tools

### F9. OpenAPI-to-MCP Generator

**Problem:** MCP is becoming the universal interface for AI tool integration. Any service with an OpenAPI spec should be accessible as an MCP server, but creating MCP servers manually is tedious. An automated generator would be valuable to the entire ecosystem.

**Target audience:** API developers who want their services accessible to AI agents via MCP.

**Proposed solution:** Extend `openapi-gen` to generate MCP server implementations from OpenAPI specs. Given a spec, output: a fully functional MCP server (TypeScript), tool definitions mapped from API endpoints, resource definitions from data models, authentication handling (API keys, OAuth), and a Docker container for easy deployment.

**Leverage:**
- `openapi-gen` (existing OpenAPI parsing and code generation)
- MCP ecosystem knowledge

**Effort:** Medium (weeks)

**Revenue potential:** Free/open-source (community tool, drives ecosystem adoption), premium features (managed hosting of generated MCP servers)

**Priority score:** 8/10 — High community value, positions org as MCP ecosystem leader

---

## AO Agent Orchestrator (continued)

### F10. AO Agent-to-Agent Protocol (A2A) Support

**Problem:** Google's Agent-to-Agent Protocol (A2A) is establishing itself alongside MCP as a foundational standard for multi-agent systems in 2026. A2A enables agents to discover each other's capabilities, negotiate tasks, and collaborate across organizational boundaries. AO currently orchestrates agents within a single system — A2A would allow AO-managed agents to interoperate with external agent ecosystems.

**Target audience:** Teams building multi-agent systems that need to integrate AO workflows with external AI agents (customer support bots, data pipeline agents, third-party SaaS agents).

**Proposed solution:** Add A2A protocol support to AO that provides: agent capability advertisement (AO agents expose their skills via A2A), task delegation across agent boundaries, secure inter-agent communication with authentication, discovery endpoint for external agents to find AO capabilities, and A2A-compatible task format translation.

**Leverage:**
- AO workflow engine (already has task/phase orchestration)
- `ao-skills` (skill definitions can map to A2A capability cards)
- AO daemon (can serve as A2A endpoint)

**Effort:** Medium (weeks)

**Revenue potential:** Core feature for AO Cloud; differentiator for enterprise tier

**Priority score:** 8/10 — A2A is emerging fast alongside MCP; early support positions AO as the interoperable orchestrator

---

### F11. AO Cost Analytics & Budget Controls

**Problem:** Teams running AI agents burn through API credits with no visibility. A single runaway workflow can spend hundreds of dollars. There's no built-in way to set spending limits, track cost per workflow, or compare model efficiency. With 82% of enterprises creating dedicated AI orchestration budgets in 2026, cost governance is a top-3 purchasing criterion.

**Target audience:** Engineering managers and finance teams who need to control and forecast AI agent spending.

**Proposed solution:** Built-in cost tracking and budget controls for AO: per-workflow and per-agent cost tracking (tokens × model pricing), configurable budget limits with auto-pause when exceeded, cost comparison dashboards (which model/workflow delivers best ROI), daily/weekly cost reports and anomaly alerts, and budget allocation per team/project in multi-user setups.

**Leverage:**
- AO daemon (already logs model usage per phase)
- AO workflow engine (phase-level granularity for cost attribution)

**Effort:** Small-Medium (days to weeks)

**Revenue potential:** Free in CLI, premium analytics in AO Cloud

**Priority score:** 9/10 — Directly addresses the #1 concern of teams scaling AI agent usage; low effort, high retention impact

---

## LaunchPad BaaS (continued)

### F12. LaunchPad Dashboard Query Console with AI Assistant

**Problem:** Supabase's dashboard includes an SQL editor with "Explain/Analyze" diagrams and AI-assisted query generation. Back4app has a full AI Agent in the dashboard. LaunchPad Studio needs a query console that helps developers explore and manipulate their data — with AI assistance for complex queries.

**Target audience:** Developers using LaunchPad who need to explore data, debug issues, and write complex queries.

**Proposed solution:** Add to `launchpad-studio`: an interactive query console with syntax highlighting and autocomplete, AI-assisted query generation from natural language ("show me all users who signed up this week but haven't created a project"), query explain/analyze with visual execution plans, saved query library with sharing, and schema visualization with relationship diagrams.

**Leverage:**
- `launchpad-studio` (existing dashboard)
- `launchpad-db-engine` (schema introspection, type generation)
- `openapi-gen` (API-level query translation)

**Effort:** Medium (weeks)

**Revenue potential:** Core feature (pro/team tier)

**Priority score:** 8/10 — Essential for developer experience parity with Supabase

---

### F13. LaunchPad Performance Insights (PostgREST v14-level)

**Problem:** Supabase upgraded to PostgREST v14 with ~20% throughput improvements and reduced schema cache loading from 7 minutes to 2 seconds. LaunchPad needs equivalent performance tooling — not just a fast engine, but observability into query performance, slow queries, and optimization suggestions.

**Target audience:** Teams scaling LaunchPad apps to production workloads.

**Proposed solution:** Built-in performance monitoring for `launchpad-db-engine`: slow query logging with automated indexing suggestions, connection pool monitoring and auto-scaling, query plan caching with invalidation controls, performance regression alerts between deployments, and dashboard widgets in `launchpad-studio` for real-time metrics.

**Leverage:**
- `launchpad-db-engine` (query pipeline)
- `launchpad-studio` (dashboard UI)

**Effort:** Medium (weeks)

**Revenue potential:** Pro/team tier feature

**Priority score:** 7/10 — Important for production readiness but less urgent than SDK and security features

---

## Claude Code Plugin Packs

### F14. Plugin Pack Generator CLI

**Problem:** The org has 15+ Claude Code plugin packs, but creating new ones requires manual boilerplate — copying directory structures, writing manifests, testing hooks. As the plugin ecosystem grows (both internal and community), a scaffolding tool would accelerate development.

**Target audience:** Internal team and community contributors building Claude Code plugins.

**Proposed solution:** A `create-plugin-pack` CLI that: scaffolds a new plugin pack with correct directory structure, generates manifest files from interactive prompts, includes testing harness for hook validation, supports publishing to the LaunchApp Marketplace (ties into product idea #4), and provides templates for common plugin types (linter, formatter, workflow, skill).

**Leverage:**
- Existing 15+ plugin packs (patterns to codify)
- `create-launchapp` CLI (scaffolding patterns)

**Effort:** Small (days)

**Revenue potential:** Free (ecosystem growth driver)

**Priority score:** 7/10 — Accelerates ecosystem growth, low effort

---

## Summary Table

| # | Feature | Product | Effort | Priority |
|---|---------|---------|--------|----------|
| F1 | RLS Policy Builder | LaunchPad | Medium | 8/10 |
| F2 | Type-Safe SDK | LaunchPad | Medium | 9/10 |
| F3 | Database Branching | LaunchPad | Large | 7/10 |
| F4 | Skill Marketplace | AO | Small-Medium | 8/10 |
| F5 | GitHub Actions | AO | Small | 9/10 |
| F6 | Multi-Model Routing | AO | Medium | 8/10 |
| F7 | Vertical Templates | LaunchApp | Medium | 8/10 |
| F8 | AI Scaffolding Mode | LaunchApp | Small | 7/10 |
| F9 | OpenAPI-to-MCP Gen | Dev Tools | Medium | 8/10 |
| F10 | A2A Protocol Support | AO | Medium | 8/10 |
| F11 | Cost Analytics & Budgets | AO | Small-Medium | 9/10 |
| F12 | AI Query Console | LaunchPad | Medium | 8/10 |
| F13 | Performance Insights | LaunchPad | Medium | 7/10 |
| F14 | Plugin Pack Generator | Claude Code | Small | 7/10 |

---

## New Feature Proposals — Round 2 (2026-03-18)

> Generated from comprehensive knowledge base analysis including 40+ repo docs,
> revenue analysis, GTM strategies, and March 2026 market research.

---

## AO Agent Orchestrator

### F15. AO Workflow Visual Editor

**Problem:** AO workflows are defined in YAML — powerful but opaque. Competitors like n8n, Temporal, and Inngest all ship visual DAG editors where you can see the flow of phases, decisions, and branches. As workflow complexity grows (the brain repo has 14+ workflows), text-based authoring becomes a bottleneck for understanding and debugging.

**Target audience:** Teams building and maintaining complex AO workflows who need visual understanding of phase dependencies, decision branches, and execution flow.

**Proposed solution:** A visual workflow editor (web-based or in `agent-orchestrator` Tauri app) that: renders AO YAML workflows as interactive DAG diagrams, supports drag-and-drop phase creation and connection, shows live execution state overlaid on the DAG (running, completed, failed phases), allows editing phase configs inline with auto-generated YAML, and provides workflow templates as starting points.

**Leverage:**
- `agent-orchestrator` Tauri app (embed as a tab)
- AO workflow YAML schema (already well-defined)
- Design system (UI components)
- React Flow or similar DAG library

**Effort:** Medium (weeks)

**Revenue potential:** Part of AO Pro tier; strong differentiator for AO Cloud dashboard

**Priority score:** 8/10 — Visual tooling dramatically reduces barrier to workflow authoring; essential for AO Cloud's web dashboard

---

### F16. AO Agent Memory & Context Persistence

**Problem:** Each AO agent task starts with a blank slate. The agent doesn't know that it fixed a similar bug last week, that a specific test is flaky, or that the reviewer prefers a certain code style. Claude Code has memory (CLAUDE.md files), but AO doesn't propagate learned context across task executions within a workflow or across workflows.

**Target audience:** Teams running recurring AO workflows where agents repeatedly encounter the same codebase patterns, reviewer preferences, and common issues.

**Proposed solution:** A structured memory layer for AO agents: per-repo memory store (key patterns, common failures, reviewer preferences), automatic memory extraction from completed workflows (what worked, what was reworked), memory injection into agent prompts at task start, memory decay/refresh policies (stale memories expire), and memory dashboard showing what agents have learned.

**Leverage:**
- AO daemon events and decision logs (raw material for memory extraction)
- AO workflow checkpoints (capture decision context)
- CLAUDE.md patterns (extend to AO-managed memory files)

**Effort:** Medium (weeks)

**Revenue potential:** AO Pro/Team feature

**Priority score:** 9/10 — Directly improves agent output quality over time; unique capability no competitor offers; reduces rework cycles which is the biggest cost driver

---

### F17. AO Workflow Marketplace

**Problem:** The org has `ao-bundled-packs` with workflow extension packs (e.g., Reddit monitoring with Tavily). But there's no discovery mechanism. Teams building AO workflows are starting from scratch when common patterns exist — PR review pipelines, documentation generators, dependency update workflows, security audit flows. The Claude Code plugin ecosystem has proven that pre-built workflows drive adoption.

**Target audience:** AO users who want pre-built, tested workflows for common engineering tasks rather than authoring YAML from scratch.

**Proposed solution:** A workflow marketplace within the AO CLI and web dashboard: `ao workflow install <name>` for CLI installation, categorized workflow templates (code quality, security, docs, deployment, monitoring), community contribution via GitHub PRs to a registry repo, configurable parameters (each workflow has sensible defaults but is customizable), and usage analytics and ratings.

**Leverage:**
- `ao-bundled-packs` (existing workflow packs)
- `ao-skills` marketplace patterns
- AO CLI (install/update infrastructure)

**Effort:** Small (days) for CLI registry, Medium (weeks) for web discovery

**Revenue potential:** Free community workflows + premium enterprise workflows ($5-15/workflow/month)

**Priority score:** 8/10 — Low effort for high ecosystem value; workflow templates are the fastest path to AO adoption

---

## LaunchPad BaaS

### F18. LaunchPad Webhooks — Managed Webhook Delivery

**Problem:** Every SaaS needs to send webhooks — notifying external systems when events occur (user signed up, payment processed, record updated). Building reliable webhook delivery (retries, signature verification, delivery logs, dead letter queue) is surprisingly complex. Svix raised $17M to solve just this problem. LaunchPad should have it built in.

**Target audience:** Developers building LaunchPad apps that need to notify external systems of events.

**Proposed solution:** A `@launchpad/webhooks` package providing: declarative webhook endpoint registration, automatic retry with exponential backoff, HMAC signature verification for security, delivery logs with request/response inspection in `launchpad-studio`, dead letter queue for failed deliveries, and webhook testing tools (replay, simulate).

**Leverage:**
- `launchpad-db-engine` (database triggers as webhook event sources)
- `supabase-to-hooks` (event-driven patterns)
- Better Auth (webhook endpoint authentication)
- Upstash (queue for retry delivery)

**Effort:** Medium (weeks)

**Revenue potential:** Free tier (1000 deliveries/month), usage-based paid tier

**Priority score:** 8/10 — Webhooks are infrastructure every B2B SaaS needs; managed delivery is a strong value proposition

---

### F19. LaunchPad Local Development Suite

**Problem:** Supabase CLI provides a full local development environment (local Postgres, Auth, Storage, Edge Functions). Firebase has the emulator suite. LaunchPad has no unified local dev experience — developers must manually set up Postgres, configure services, and hope their local setup matches production.

**Target audience:** All LaunchPad developers who need a reliable local development environment.

**Proposed solution:** A `launchpad dev` CLI command that: spins up a local Postgres with pre-configured extensions (pgvector, pg_cron), runs local auth service matching Better Auth production config, provides local S3-compatible storage (MinIO), includes a local dashboard (mini `launchpad-studio`), seeds database from production snapshots, and supports hot-reload on schema changes.

**Leverage:**
- `create-launchpad` CLI (extend with dev command)
- Docker (local service orchestration — already in templates)
- `launchpad-db-engine` (schema management)
- Better Auth (local auth service)

**Effort:** Medium (weeks)

**Revenue potential:** Free (core developer experience — essential for adoption)

**Priority score:** 9/10 — Local dev experience is a gating factor for developer adoption; every major BaaS competitor has this

---

## LaunchApp Templates

### F20. LaunchApp White-Label Kit

**Problem:** Agencies and freelancers don't just want a SaaS template — they want a template they can reskin and sell as custom builds to multiple clients. The template market has an untapped segment: white-label-ready templates with theming, multi-tenant branding, and client-specific customization built in.

**Target audience:** Agencies, freelancers, and studios who build SaaS products for clients and need to deliver branded solutions quickly.

**Proposed solution:** A white-label extension to LaunchApp that: supports per-tenant branding (logo, colors, fonts, domain), includes a theme editor dashboard for non-technical client admins, provides email template customization per tenant, supports custom domain mapping per tenant, and bundles deployment automation per client.

**Leverage:**
- `saas-template-launch-app-test` (multi-tenant org model already exists)
- Design system (theming via CSS variables/Tailwind config)
- Better Auth (multi-tenant auth with custom domains)
- Turborepo (shared packages for white-label builds)

**Effort:** Medium (weeks)

**Revenue potential:** Premium template tier — Agency license $599-1,199 (already in pricing plan). Recurring $49/month for managed white-label hosting.

**Priority score:** 8/10 — Directly targets the highest-paying template buyer segment (agencies); template architecture already supports multi-tenancy

---

### F21. LaunchApp AI SaaS Vertical Template

**Problem:** The most common SaaS being built in 2026 is an "AI wrapper" — apps that provide a UI over LLM capabilities (document analysis, chatbots, content generation, code assistance). Every AI SaaS needs the same plumbing: API key management, usage metering, prompt management, streaming responses, cost tracking. None of the existing SaaS boilerplates specialize in this.

**Target audience:** Founders building AI-powered SaaS products who need LLM integration boilerplate beyond basic auth + billing.

**Proposed solution:** A specialized LaunchApp template for AI SaaS that includes: multi-provider LLM integration (OpenAI, Anthropic, local models via Ollama), streaming chat UI with markdown rendering, API key management per user (already being built in the template), token usage metering and cost attribution per user, prompt template management with version history, RAG pipeline with document upload and vector search, and rate limiting per user/plan tier (already has rate limiter).

**Leverage:**
- `saas-template-launch-app-test` (API key management already in progress)
- Upstash (rate limiting — already integrated)
- AI SDK wrapper (already exists in template packages)
- Better Auth (user-scoped API keys)

**Effort:** Small-Medium (days to weeks) — many building blocks exist; needs assembly + AI-specific features

**Revenue potential:** Premium template — $299 standalone. Addresses the largest segment of new SaaS builders in 2026.

**Priority score:** 9/10 — AI SaaS is the hottest startup category; this template would have zero direct competitors in the RR7+Hono stack; leverages existing template work

---

## Design System

### F22. Design System Figma Community Kit

**Problem:** Design systems with Figma kits see 3-5x higher adoption than code-only systems. Shadcn/UI's popularity partly comes from community Figma files. The org's design system has Radix UI primitives + Tailwind but no Figma counterpart — designers can't use it without a Figma kit.

**Target audience:** Designers working on LaunchApp projects who need Figma components that match the code design system 1:1.

**Proposed solution:** A Figma community file containing: all design system components as Figma components with auto-layout, design tokens (colors, spacing, typography) as Figma variables, dark mode variants, responsive breakpoints, and a template starter file with common page layouts.

**Leverage:**
- Design system (Phase 1-4 components as source of truth)
- `figma-tailwind-plugin` (keep Figma ↔ code in sync)
- Tailwind CSS v4 design tokens

**Effort:** Small-Medium (days to weeks)

**Revenue potential:** Free community version (adoption), Pro version with advanced components $149 one-time (already in revenue plan)

**Priority score:** 7/10 — Increases design system adoption; enables the Figma-to-code pipeline (I5)

---

## Better Auth

### F23. Better Auth Admin Dashboard

**Problem:** Auth0, Clerk, and WorkOS all ship admin dashboards for managing users, sessions, roles, and permissions. Better Auth is code-first with no built-in admin UI. For production deployments, engineering and support teams need a dashboard to manage users without writing code — reset passwords, revoke sessions, assign roles, view audit logs.

**Target audience:** Teams using Better Auth in production who need a non-technical interface for user management.

**Proposed solution:** A pre-built, embeddable admin dashboard for Better Auth: user search, filter, and management (create, edit, disable, delete), session management (active sessions, revoke), role and permission management (assign/revoke roles, view permissions matrix), OAuth connection management per user, audit log viewer with filtering, and ships as a React component library or standalone mountable app.

**Leverage:**
- Better Auth plugin architecture (admin API endpoints)
- Design system (UI components)
- LaunchApp template (embed as an admin section)

**Effort:** Medium (weeks)

**Revenue potential:** Free basic dashboard (adoption driver for Better Auth), Pro dashboard with advanced features (bulk operations, export, SSO admin) $29/month

**Priority score:** 9/10 — The #1 complaint about code-first auth libraries is "no admin UI"; this alone could drive significant Better Auth adoption

---

## Updated Summary Table

| # | Feature | Product | Effort | Priority |
|---|---------|---------|--------|----------|
| F1 | RLS Policy Builder | LaunchPad | Medium | 8/10 |
| F2 | Type-Safe SDK | LaunchPad | Medium | 9/10 |
| F3 | Database Branching | LaunchPad | Large | 7/10 |
| F4 | Skill Marketplace | AO | Small-Medium | 8/10 |
| F5 | GitHub Actions | AO | Small | 9/10 |
| F6 | Multi-Model Routing | AO | Medium | 8/10 |
| F7 | Vertical Templates | LaunchApp | Medium | 8/10 |
| F8 | AI Scaffolding Mode | LaunchApp | Small | 7/10 |
| F9 | OpenAPI-to-MCP Gen | Dev Tools | Medium | 8/10 |
| F10 | A2A Protocol Support | AO | Medium | 8/10 |
| F11 | Cost Analytics & Budgets | AO | Small-Medium | 9/10 |
| F12 | AI Query Console | LaunchPad | Medium | 8/10 |
| F13 | Performance Insights | LaunchPad | Medium | 7/10 |
| F14 | Plugin Pack Generator | Claude Code | Small | 7/10 |
| **F15** | **Workflow Visual Editor** | **AO** | **Medium** | **8/10** |
| **F16** | **Agent Memory** | **AO** | **Medium** | **9/10** |
| **F17** | **Workflow Marketplace** | **AO** | **Small-Medium** | **8/10** |
| **F18** | **Managed Webhooks** | **LaunchPad** | **Medium** | **8/10** |
| **F19** | **Local Dev Suite** | **LaunchPad** | **Medium** | **9/10** |
| **F20** | **White-Label Kit** | **LaunchApp** | **Medium** | **8/10** |
| **F21** | **AI SaaS Template** | **LaunchApp** | **Small-Medium** | **9/10** |
| **F22** | **Figma Community Kit** | **Design System** | **Small-Medium** | **7/10** |
| **F23** | **Admin Dashboard** | **Better Auth** | **Medium** | **9/10** |

---

## New Feature Proposals — Round 3 (2026-03-19)

> Generated from refreshed revenue analysis, March 2026 market research,
> strategic question analysis (36 questions), and MCP/agent ecosystem trends.

---

## AO Agent Orchestrator

### F24. AO Dry-Run Mode — Preview Agent Actions Before Commit

**Problem:** The strategic question "what is blast radius if ao daemon introduces systematic bugs" highlights a real risk. When AO agents process 180+ PRs/week, a misconfigured workflow or prompt regression can introduce systematic defects across the entire codebase. There's no way to preview what an agent will do before it commits changes. This is the equivalent of running database migrations without `--dry-run` — unacceptable in production.

**Target audience:** Teams using AO at scale who need confidence that workflow changes won't introduce regressions across multiple repos.

**Proposed solution:** A `--dry-run` flag for AO workflows that: executes the full workflow pipeline in an isolated worktree, generates a diff preview of all changes without committing, runs configured test suites against the changes, produces a risk assessment (files changed, tests affected, blast radius estimate), supports approval gates where a human reviews the dry-run before the real execution, and logs dry-run results for comparison with actual executions.

**Leverage:** AO workflow engine (already has worktree isolation), `worktree-manager` (isolated execution), AO Guard (#12) (quality check on dry-run output)

**Effort:** Small-Medium (days to weeks) — worktree isolation exists; need diff capture and preview UI

**Revenue potential:** Core AO Pro feature (increases trust, reduces rework)

**Priority score:** 9/10 — Directly addresses the #1 operational risk of AI agent orchestration at scale; low effort, high trust impact

---

### F25. AO Agent Personas Library — Pre-Built Specialized Agents

**Problem:** The brain repo internally uses 14+ specialized agent personas (product owner, architect, auditor, docs-writer, DevOps, researcher). These are battle-tested but not available to AO users outside the org. Setting up effective agent personas from scratch requires deep prompt engineering expertise that most teams don't have.

**Target audience:** Teams adopting AO who want immediately productive agents without spending weeks on prompt engineering.

**Proposed solution:** A library of pre-built agent personas shipped with `ao-skills`: ready-to-use personas covering common engineering roles (reviewer, implementer, tester, docs writer, security auditor, refactoring specialist), each persona with optimized system prompts, tool configurations, and workflow templates, customizable via YAML overrides (add domain-specific context without rewriting prompts), performance benchmarks per persona (expected quality, cost per task, typical rework rate), and `ao persona install <name>` CLI command.

**Leverage:** Brain repo's 14+ existing personas (reference implementations), `ao-skills` (distribution mechanism), AO workflow engine (persona-aware task routing)

**Effort:** Small (days) — personas exist internally; need packaging, documentation, and CLI integration

**Revenue potential:** Free community personas (adoption driver), premium enterprise personas (domain-specific: fintech reviewer, healthcare compliance auditor) at $15-29/persona/month

**Priority score:** 9/10 — Extremely low effort (personas already exist), dramatically reduces time-to-value for new AO users, creates upsell path to premium personas

---

## LaunchPad BaaS

### F26. LaunchPad Schema Marketplace — Pre-Built Database Schemas

**Problem:** Every SaaS builder starts by designing the same database schemas — users, organizations, subscriptions, invoices, projects, comments, notifications. Supabase has community schema templates. Prisma has a schema catalog. But no BaaS offers one-click installable, production-ready schemas with RLS policies, seed data, and type-safe SDK integration already wired up.

**Target audience:** Developers starting new projects on LaunchPad who want to skip the schema design phase for common SaaS patterns.

**Proposed solution:** A schema registry within `launchpad-studio` and CLI that: offers pre-built schemas for common SaaS patterns (multi-tenant org, e-commerce, CMS, project management, social network, analytics dashboard), includes RLS policies, indexes, and seed data, auto-generates type-safe SDK methods for the schema, supports `launchpad schema install <name>` via CLI, allows community contributions with review process, and composes — install multiple schemas that work together.

**Leverage:** `launchpad-db-engine` (migration system, type generation), `create-launchpad` CLI, Better Auth (auth-aware schema patterns), vertical templates (F7) — schemas extracted from template data models

**Effort:** Small-Medium (days to weeks) — extract schemas from existing templates, package them

**Revenue potential:** Free core schemas (adoption driver), premium schemas for complex verticals ($29-49 one-time)

**Priority score:** 8/10 — Reduces time-to-first-query from hours to minutes; schemas are the entry point for LaunchPad adoption

---

## LaunchApp Templates

### F27. LaunchApp Internationalization Kit — Production i18n

**Problem:** The flagship template has i18n mentioned in its SDK list (`@launchpad/i18n`) but SaaS templates notoriously ship with token i18n support — a translation file and a hook, with no actual production workflow. For SaaS products targeting global markets (which is most of them), proper i18n requires: translation management, locale detection, RTL support, number/date formatting, and pluralization rules. No SaaS boilerplate does this well.

**Target audience:** SaaS builders targeting international markets who need production-grade i18n from day one, not an afterthought.

**Proposed solution:** A complete i18n module for LaunchApp templates that: ships with a translation management dashboard (admin can edit translations), supports AI-powered translation suggestions (via Claude API — translate UI strings on demand), includes locale detection with user preference persistence, provides RTL layout support in the design system, handles number, date, and currency formatting per locale, supports namespace-based translation loading (only load what's needed), and includes CI checks for missing translations.

**Leverage:** `@launchpad/i18n` SDK (already exists), design system (RTL-aware components), Better Auth (user locale preference), Claude API (translation suggestions)

**Effort:** Medium (weeks)

**Revenue potential:** Included in Pro template tier (increases template value), standalone i18n module at $49 one-time

**Priority score:** 7/10 — Important for global market reach; differentiates from competitors that treat i18n as an afterthought

---

## Claude Code Plugin Packs

### F28. Plugin Pack Analytics Dashboard — Usage & Impact Metrics

**Problem:** The org has 15+ Claude Code plugin packs, but there's no way to know which ones are actually used, how often, or whether they improve developer productivity. Without usage data, pack development is guided by intuition rather than evidence. The strategic question "do plugin packs contain working implementations or empty scaffolds" highlights this visibility gap.

**Target audience:** Internal team (for prioritizing pack development) and enterprise customers who need to measure AI tool ROI.

**Proposed solution:** An analytics layer for Claude Code plugin packs that: tracks pack activation, command usage, and error rates (opt-in telemetry), measures productivity impact (time saved, rework reduction — requires baseline comparison), provides a dashboard showing most/least used packs and commands, identifies common error patterns to guide pack improvements, supports A/B testing of pack variations, and feeds data into AO Observability (#9) for unified AI tool analytics.

**Leverage:** AO Observability (#9) (analytics infrastructure), AO daemon events (telemetry pipeline), Claude Code plugin hooks (instrumentation points)

**Effort:** Small-Medium (days to weeks) — telemetry collection is straightforward; dashboard is the main effort

**Revenue potential:** Free for basic metrics, part of AO Cloud Team tier for advanced analytics

**Priority score:** 8/10 — Data-driven pack development produces better packs; enterprise customers need ROI measurement for AI tools

---

## Better Auth

### F29. Better Auth Passkey-First Authentication Flow

**Problem:** Passkeys (WebAuthn) are now supported by all major browsers and platforms (Apple, Google, Microsoft). Auth.js v5 still lacks native passkey support. Clerk added passkeys but charges premium for it. The FIDO Alliance reports 15B+ accounts can now use passkeys. A passkey-first auth flow would be a strong differentiator for Better Auth — most auth libraries treat passkeys as an add-on, not the primary flow.

**Target audience:** Security-conscious developers building apps where passwordless authentication is preferred or required (fintech, healthcare, enterprise).

**Proposed solution:** A `@better-auth/passkeys` plugin providing: passkey registration and authentication as the primary flow (not an add-on), fallback to password/magic link for devices without passkey support, cross-device passkey sync (leverage platform passkey providers), passkey management UI components (list, rename, delete registered devices), conditional UI mediation (auto-suggest passkey on login), and enterprise attestation support for hardware security keys.

**Leverage:** Better Auth plugin architecture, design system (passkey management UI), LaunchApp templates (integrate as default auth flow option)

**Effort:** Small-Medium (days to weeks) — WebAuthn libraries exist; integration with Better Auth plugin system is the work

**Revenue potential:** Free (drives Better Auth adoption), premium enterprise attestation as paid plugin ($19/month)

**Priority score:** 8/10 — Passkeys are the future of authentication; first-class support in Better Auth cements its position as the most modern auth library

---

## Updated Summary Table (All Rounds)

| # | Feature | Product | Effort | Priority |
|---|---------|---------|--------|----------|
| F1 | RLS Policy Builder | LaunchPad | Medium | 8/10 |
| F2 | Type-Safe SDK | LaunchPad | Medium | 9/10 |
| F3 | Database Branching | LaunchPad | Large | 7/10 |
| F4 | Skill Marketplace | AO | Small-Medium | 8/10 |
| F5 | GitHub Actions | AO | Small | 9/10 |
| F6 | Multi-Model Routing | AO | Medium | 8/10 |
| F7 | Vertical Templates | LaunchApp | Medium | 8/10 |
| F8 | AI Scaffolding Mode | LaunchApp | Small | 7/10 |
| F9 | OpenAPI-to-MCP Gen | Dev Tools | Medium | 8/10 |
| F10 | A2A Protocol Support | AO | Medium | 8/10 |
| F11 | Cost Analytics & Budgets | AO | Small-Medium | 9/10 |
| F12 | AI Query Console | LaunchPad | Medium | 8/10 |
| F13 | Performance Insights | LaunchPad | Medium | 7/10 |
| F14 | Plugin Pack Generator | Claude Code | Small | 7/10 |
| F15 | Workflow Visual Editor | AO | Medium | 8/10 |
| F16 | Agent Memory | AO | Medium | 9/10 |
| F17 | Workflow Marketplace | AO | Small-Medium | 8/10 |
| F18 | Managed Webhooks | LaunchPad | Medium | 8/10 |
| F19 | Local Dev Suite | LaunchPad | Medium | 9/10 |
| F20 | White-Label Kit | LaunchApp | Medium | 8/10 |
| F21 | AI SaaS Template | LaunchApp | Small-Medium | 9/10 |
| F22 | Figma Community Kit | Design System | Small-Medium | 7/10 |
| F23 | Admin Dashboard | Better Auth | Medium | 9/10 |
| **F24** | **AO Dry-Run Mode** | **AO** | **Small-Medium** | **9/10** |
| **F25** | **Agent Personas Library** | **AO** | **Small** | **9/10** |
| **F26** | **Schema Marketplace** | **LaunchPad** | **Small-Medium** | **8/10** |
| **F27** | **Internationalization Kit** | **LaunchApp** | **Medium** | **7/10** |
| **F28** | **Plugin Analytics Dashboard** | **Claude Code** | **Small-Medium** | **8/10** |
| **F29** | **Passkey-First Auth** | **Better Auth** | **Small-Medium** | **8/10** |
