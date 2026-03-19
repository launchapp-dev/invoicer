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
