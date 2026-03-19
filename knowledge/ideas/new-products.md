# New Product Ideas

## 1. LaunchPad Realtime — Managed Real-time Backend Service

**Problem:** Developers building collaborative, real-time apps (chat, multiplayer, dashboards) face complex infrastructure decisions. Supabase Realtime exists but is tightly coupled to their ecosystem. Firebase RTDB is aging. Standalone real-time solutions like Ably/Pusher are expensive and don't integrate with a full BaaS.

**Target audience:** Indie hackers, startups, and teams building SaaS dashboards, collaborative tools, live notification systems, and multiplayer experiences.

**Proposed solution:** A standalone real-time service built on top of `launchpad-db-engine`'s multi-tenancy. Provides WebSocket channels, presence tracking, broadcast messaging, and database change subscriptions — all with built-in auth via Better Auth. Ship as both a self-hosted package and a managed offering.

**Leverage:**
- `launchpad-db-engine` (multi-tenancy, migrations, type generation)
- `supabase-to-hooks` (event-driven architecture patterns)
- Better Auth integration for channel authorization

**Effort:** Large (months) — requires WebSocket infrastructure, scaling layer, client SDKs

**Revenue potential:** Freemium — free tier for hobby projects, usage-based pricing for production (connections/messages)

**Priority score:** 7/10 — High impact (real-time is a core BaaS feature competitors all have), high effort

---

## 2. LaunchPad Functions — Serverless Edge Functions Runtime

**Problem:** Every major BaaS (Supabase Edge Functions, Firebase Cloud Functions, Appwrite Functions) ships a serverless compute layer. Without one, LaunchPad cannot serve as a complete backend platform — developers have to glue in Vercel/Cloudflare Workers separately.

**Target audience:** Full-stack developers who want a unified backend platform without managing multiple serverless providers.

**Proposed solution:** A serverless functions runtime that deploys alongside LaunchPad. TypeScript-first, with built-in access to the database engine, auth context, and storage. Support both HTTP triggers and database event triggers. Target Deno/V8 isolates for fast cold starts.

**Leverage:**
- `launchpad-db-engine` (database triggers, type generation)
- `openapi-gen` (auto-generate API docs for functions)
- Existing TypeScript toolchain and patterns

**Effort:** Large (months) — runtime isolation, deployment pipeline, cold start optimization

**Revenue potential:** Usage-based — free tier with invocation limits, pay per execution beyond threshold

**Priority score:** 8/10 — Critical gap vs competitors; essential for LaunchPad to be a complete BaaS

---

## 3. AO Cloud — Hosted Agent Orchestration Platform

**Problem:** The AO agent orchestrator (`ao-cli`, `ao-skills`) currently runs locally. Multi-agent orchestration is the defining trend of 2026, with every major tool (Claude Code, Cursor, Codex) shipping multi-agent capabilities. But there's no managed platform for teams to run persistent agent workflows in the cloud, share task queues, and monitor agent execution across a team.

**Target audience:** Development teams, agencies, and enterprises using AI agents for code generation who want centralized orchestration, shared task queues, and observability.

**Proposed solution:** A hosted SaaS version of AO that provides: cloud-hosted daemon with team-shared task queues, a web dashboard for monitoring agent runs/workflows/decisions, GitHub integration for auto-dispatching agents on issues/PRs, usage analytics and cost tracking across models, and RBAC for team-based access control.

**Leverage:**
- `ao-cli` and `ao-skills` (entire existing orchestration engine)
- `worktree-manager` (parallel execution infrastructure)
- `pr-review-responder` (GitHub webhook handling patterns)
- Existing workflow/phase definitions

**Effort:** Large (months) — cloud infrastructure, multi-tenancy, web dashboard, billing

**Revenue potential:** SaaS subscription — free for solo devs (limited agents), team/enterprise tiers with seat-based + usage-based pricing. High revenue potential given the AI agent tooling market growth.

**Priority score:** 9/10 — Highest impact opportunity. AO is already differentiated; cloud offering would compete in the rapidly growing multi-agent orchestration market ($500M+ ARR Cursor alone demonstrates the demand)

---

## 4. LaunchApp Marketplace — Template & Plugin Marketplace

**Problem:** The SaaS boilerplate market has exploded (ShipFast, MakerKit, Supastarter generating $500K+ revenue). MCP has created a plugin ecosystem with 5000+ servers. But discovery is fragmented — developers can't easily find, evaluate, or purchase templates and plugins in one place.

**Target audience:** Indie hackers looking for SaaS templates, developers searching for MCP servers and Claude Code skills, and creators who want to sell their own templates/plugins.

**Proposed solution:** A marketplace platform at launchapp.dev for: curated SaaS templates (vertical-specific: healthcare, education, e-commerce), Claude Code skill packs and MCP server bundles, LaunchPad plugin modules (auth plugins, payment integrations, analytics), community-contributed components and starter kits. Revenue share model for community creators.

**Leverage:**
- `launchapp.dev` website
- `create-launchapp` CLI (install marketplace items via CLI)
- `ao-skills` (existing skills catalog)
- `figma-tailwind-plugin` (design-to-code pipeline)

**Effort:** Medium (weeks) — web marketplace UI, payment processing, CLI integration

**Revenue potential:** Marketplace fees (15-30% commission on sales) + featured listings. Recurring revenue from subscriptions to premium template collections.

**Priority score:** 8/10 — Strong leverage on existing assets, proven revenue model (ShipFast alone does $500K+), creates network effects

---

## 5. LaunchPad Storage — Object Storage with CDN

**Problem:** File storage is a table-stakes BaaS feature. Supabase Storage, Firebase Storage, and Appwrite all provide managed object storage with CDN. Without it, LaunchPad users must integrate S3 or Cloudflare R2 separately.

**Target audience:** Any developer using LaunchPad who needs to handle user uploads, images, documents, or media.

**Proposed solution:** An S3-compatible object storage layer with: built-in CDN for asset delivery, image transformation (resize, crop, format conversion), access control policies tied to Better Auth, presigned upload URLs for client-side uploads, and storage buckets with per-tenant isolation.

**Leverage:**
- `launchpad-db-engine` (multi-tenancy model)
- Better Auth (access policies)
- Can wrap S3/R2 with a thin LaunchPad-native SDK

**Effort:** Medium (weeks) — wrapper over cloud storage with auth integration and image pipeline

**Revenue potential:** Usage-based — free tier (1GB), paid tiers by storage + bandwidth

**Priority score:** 7/10 — Essential for completeness but less differentiating than compute or real-time

---

## 6. CodeBy.ai — AI Code Review & Audit SaaS

**Problem:** AI code review is becoming mainstream. 55% of developers use AI agents regularly. But current tools (GitHub Copilot code review, Cursor review) are tied to specific IDEs. There's no standalone AI code review platform that works across any Git workflow with deep understanding of security, performance, and architecture.

**Target audience:** Teams that want automated code review as part of their CI/CD pipeline, regardless of which IDE or AI agent they use for writing code.

**Proposed solution:** A SaaS at codeby.ai that provides: GitHub App for automated PR reviews, security vulnerability scanning powered by LLMs, architecture consistency checking (does this PR follow the codebase patterns?), performance regression detection, configurable review rules and team standards. Ships as both a GitHub App and a CLI tool.

**Leverage:**
- `codeby.ai` domain (already owned)
- `pr-review-responder` (existing PR review webhook infrastructure)
- `openapi-gen` (API surface understanding)
- AO workflow engine (multi-phase review pipeline)

**Effort:** Medium (weeks) — LLM integration, GitHub App, review rule engine

**Revenue potential:** Freemium — free for public repos, paid for private repos. Team/enterprise pricing. $10-50/seat/month.

**Priority score:** 8/10 — Strong market timing (AI code review is exploding), leverages existing domain and PR review tooling, clear SaaS revenue model

---

## 7. LaunchPad AI Agent — Natural Language Backend Builder

**Problem:** Back4app now ships a built-in AI Agent that generates backends from natural language descriptions. Developers describe what they want ("a multi-tenant project management app with role-based access") and the system auto-configures databases, APIs, auth, and functions. This is the emerging standard for BaaS in 2026 — "infrastructure as conversation" is replacing manual configuration. LaunchPad has no equivalent.

**Target audience:** Solo developers, early-stage founders, and hackathon teams who want to go from idea to working backend in minutes rather than hours.

**Proposed solution:** An AI-powered backend builder integrated into `launchpad-studio` and the CLI that: takes a natural language project description and generates the full database schema with migrations, auto-configures Better Auth roles and policies based on the described user types, generates type-safe API endpoints via `openapi-gen`, creates RLS policies from the described access patterns, and outputs a ready-to-use `@launchpad/client` SDK. Powered by Claude API with LaunchPad-specific system prompts.

**Leverage:**
- `launchpad-db-engine` (schema generation, migrations, type generation)
- `openapi-gen` (API endpoint generation)
- Better Auth (role/policy configuration)
- `launchpad-studio` (visual UI for the builder)
- Claude Code plugin packs (AI integration patterns)

**Effort:** Medium (weeks) — the underlying primitives exist; the AI layer orchestrates them

**Revenue potential:** Freemium — free for basic generation, paid for iteration/refinement and production deployment. Strong upsell to managed hosting.

**Priority score:** 9/10 — Competitors are shipping this NOW. Back4app and Supabase both have AI-assisted features. This is becoming table stakes for BaaS in 2026.

---

## 8. LaunchPad Platform — White-Label BaaS for Platforms

**Problem:** Supabase is building a "Platform" product that enables companies to white-label Supabase and provision backends for their own users (think: Shopify providing databases to app developers, or education platforms giving each school its own backend). This is a massive enterprise opportunity that no open-source BaaS has fully captured.

**Target audience:** Platform companies, agencies, and SaaS builders who want to offer backend infrastructure to their own customers without building it from scratch.

**Proposed solution:** A white-label version of LaunchPad that provides: multi-level tenancy (platform → organization → project), API for programmatic project provisioning, custom domain support per tenant, usage metering and billing integration per tenant, admin dashboard for platform operators, and isolation guarantees between tenants.

**Leverage:**
- `launchpad-db-engine` (already has multi-tenancy primitives)
- Better Auth (hierarchical org/tenant model)
- Existing SDK matrix (19+ SDKs available to platform users)

**Effort:** Large (months) — multi-level tenancy, isolation, billing metering

**Revenue potential:** Enterprise licensing — $5K-50K/month per platform customer. Very high revenue per customer.

**Priority score:** 8/10 — High revenue potential, leverages existing infrastructure, but requires enterprise sales motion

---

## 9. AO Observability — Agent Analytics & Cost Dashboard

**Problem:** Teams running AI agents at scale (via AO, Claude Code, Cursor, etc.) have no unified way to track: how much they're spending across models, which workflows are most/least efficient, where agents get stuck or produce poor results, and aggregate team productivity metrics. The AI coding market is spending blindly — 46% of developers don't fully trust AI results, yet they have no data to validate ROI.

**Target audience:** Engineering managers and team leads who need to justify AI tooling spend and optimize agent workflows.

**Proposed solution:** A standalone analytics product (web dashboard + CLI) that: tracks token usage, cost, and latency across all AI model providers, visualizes workflow completion rates, rework cycles, and bottlenecks, provides per-developer and per-project cost breakdowns, alerts on anomalous spending or stuck workflows, benchmarks AI-assisted vs manual task completion, and exports data to existing BI tools.

**Leverage:**
- AO workflow engine (already tracks phases, decisions, checkpoints)
- AO daemon (already has events and logging)
- `worktree-manager` (parallel execution tracking)

**Effort:** Medium (weeks) — data collection exists in AO; needs aggregation layer and dashboard

**Revenue potential:** Freemium SaaS — free for individual dashboards, paid for team analytics and enterprise exports. $20-100/seat/month.

**Priority score:** 8/10 — Unique positioning (no one else offers agent-specific analytics), strong enterprise appeal, leverages existing AO telemetry

---

## 10. LaunchPad Vector — Embedded AI/Vector Database

**Problem:** Every modern app is adding AI features — semantic search, recommendations, RAG pipelines. Supabase has pgvector and just launched Vector Buckets for cold embedding storage. Developers currently need a separate vector DB (Pinecone, Weaviate, Qdrant) alongside their primary database, adding operational complexity.

**Target audience:** Developers building AI-powered features (semantic search, chatbots, recommendation engines) who want vector storage alongside their relational data.

**Proposed solution:** Native vector/embedding support in `launchpad-db-engine` that provides: vector column types with automatic embedding generation (via OpenAI/Claude), similarity search queries in the type-safe SDK, hybrid search combining vector similarity with SQL filters, embedding lifecycle management (auto-re-embed on data changes), and pre-built RAG pipeline helpers for common use cases.

**Leverage:**
- `launchpad-db-engine` (extend with vector column types)
- `@launchpad/client` SDK (type-safe vector queries)
- `openapi-gen` (expose vector search as API endpoints)

**Effort:** Medium (weeks) — pgvector integration is well-documented; the value is in the SDK ergonomics

**Revenue potential:** Usage-based — free tier (10K embeddings), paid by storage + query volume

**Priority score:** 8/10 — AI features are being added to every app; integrated vector support removes a major pain point and matches Supabase's offering

---

## Summary Table

| # | Product | Effort | Revenue Model | Priority |
|---|---------|--------|---------------|----------|
| 1 | LaunchPad Realtime | Large | Freemium/Usage | 7/10 |
| 2 | LaunchPad Functions | Large | Usage-based | 8/10 |
| 3 | AO Cloud | Large | SaaS subscription | 9/10 |
| 4 | LaunchApp Marketplace | Medium | Marketplace fees | 8/10 |
| 5 | LaunchPad Storage | Medium | Usage-based | 7/10 |
| 6 | CodeBy.ai | Medium | Freemium SaaS | 8/10 |
| 7 | LaunchPad AI Agent | Medium | Freemium | 9/10 |
| 8 | LaunchPad Platform | Large | Enterprise licensing | 8/10 |
| 9 | AO Observability | Medium | Freemium SaaS | 8/10 |
| 10 | LaunchPad Vector | Medium | Usage-based | 8/10 |

---

## New Ideas — Round 2 (2026-03-18)

> Generated from comprehensive knowledge base analysis including 40+ repo docs,
> revenue analysis, GTM strategies, and March 2026 market research.

---

## 11. LaunchPad Jobs — Background Task & Cron Service

**Problem:** Every production SaaS needs background job processing — sending email digests, generating reports, syncing data, processing uploads. Supabase has pg_cron and Edge Functions scheduled invocations. Firebase has Cloud Tasks and Cloud Scheduler. LaunchPad has zero background processing capability, forcing developers to bolt on BullMQ, Inngest, or Trigger.dev separately.

**Target audience:** Any developer building production SaaS on LaunchPad who needs scheduled or async work beyond request-response.

**Proposed solution:** A `@launchpad/jobs` package built on Upstash (already in the org's stack) providing: cron-scheduled jobs defined in TypeScript, event-triggered jobs (e.g., "run when user.created"), retry policies with exponential backoff, job queue dashboard in `launchpad-studio`, dead letter queue with alerting, and type-safe job definitions with Zod validation.

**Leverage:**
- Upstash (already used in templates for rate limiting — extend to queue/scheduling)
- `launchpad-db-engine` (database triggers for event-driven jobs)
- Better Auth (job authorization — only admins can trigger certain jobs)
- `launchpad-studio` (dashboard for job monitoring)

**Effort:** Medium (weeks)

**Revenue potential:** Freemium — free tier (100 jobs/day), usage-based paid tier

**Priority score:** 9/10 — Table-stakes BaaS feature that every competitor ships; blocks LaunchPad from being production-ready without it

---

## 12. AO Guard — AI Code Quality & Security Gating Service

**Problem:** The org is generating 180+ PRs/week via AI agents. The #1 strategic risk identified in the knowledge base is: "Are we quality-gating AI-generated code at current volume?" This is not just an internal concern — the broader market is experiencing the same problem. 46% of developers don't fully trust AI-generated code (Stack Overflow 2025). AI governance is the hottest investment category in 2026 ($125M+ raises for security/governance startups like Kai and JetStream). No tool exists that specifically gates AI-generated code quality.

**Target audience:** Engineering teams using AI agents (AO, Cursor, Copilot, Codex) at scale who need automated quality enforcement before AI code reaches production.

**Proposed solution:** A standalone SaaS (or self-hosted tool) that: intercepts PRs from AI agents and runs multi-dimensional quality checks (security, correctness, style, test coverage), provides AI-specific linting rules (detects hallucinated imports, phantom APIs, dead code patterns common in LLM output), enforces configurable quality thresholds per-repo, generates quality scores and trend dashboards, and integrates as a GitHub App + AO workflow phase.

**Leverage:**
- AO workflow engine (quality gate as a standard phase)
- `pr-review-responder` (GitHub webhook handling)
- AO's existing code review patterns
- Internal dogfooding (use it on the org's own 180+ PRs/week)

**Effort:** Medium (weeks) — LLM-powered analysis + GitHub App + dashboard

**Revenue potential:** Freemium SaaS — free for public repos (5 PRs/day), Pro $29/seat/month, Team $99/seat/month, Enterprise with custom rules $299/seat/month. Addresses the $7.84B AI agent market's biggest trust gap.

**Priority score:** 10/10 — Solves the org's own critical risk, addresses a market gap with zero competition, AI governance is 2026's hottest investment category, and can be dogfooded immediately

---

## 13. LaunchApp Mobile — React Native SaaS Starter Kit

**Problem:** The SaaS boilerplate market is entirely web-focused. ShipFast, MakerKit, Supastarter — all web-only. Yet 60%+ of SaaS products eventually need a mobile app. The LaunchApp template already has React Native/Expo packages in its monorepo, but they're undeveloped. No competitor offers a unified web + mobile SaaS starter with shared business logic.

**Target audience:** SaaS founders who know they'll need a mobile app and want to start with a monorepo that shares auth, API client, and business logic between web and mobile from day one.

**Proposed solution:** A dedicated mobile starter kit within the LaunchApp ecosystem: pre-built screens (auth, settings, profile, dashboard, notifications), shared packages with the web template (API client, auth hooks, types, validation), push notifications via `@launchpad/push`, deep linking and universal links, app store deployment guides and CI pipeline, and Expo Router navigation with type-safe routes.

**Leverage:**
- `saas-template-launch-app-test` (already has React Native packages in monorepo)
- Better Auth (mobile auth flows — magic links, biometric)
- Turborepo (shared packages between web and mobile)
- Design system (adapt Radix primitives for React Native via Tamagui/NativeWind)

**Effort:** Medium (weeks) — the monorepo structure exists; needs mobile-specific screens and native integrations

**Revenue potential:** Premium add-on — $99 with web template, $199 standalone. Bundle: Web + Mobile $349.

**Priority score:** 9/10 — Zero competition in the "web + mobile SaaS monorepo" space; leverages existing template architecture; mobile adds a premium pricing tier

---

## 14. AO Autopilot — Self-Improving Agent Workforce

**Problem:** Current AI agents treat each task as independent — they don't learn from past successes or failures. When an AO agent encounters a pattern it's seen before (a specific test failure, a common code review comment, a deployment issue), it starts from scratch. The org runs 180+ PRs/week — that's thousands of agent interactions with learnable patterns.

**Target audience:** Teams running persistent AI agent workflows who want agents that get smarter over time — reducing rework cycles, improving first-pass quality, and adapting to codebase-specific patterns.

**Proposed solution:** A memory and learning layer for AO agents: per-repo knowledge base that captures successful patterns, failed approaches, and reviewer feedback; automatic extraction of "lessons learned" from rework cycles; codebase-specific prompt augmentation (agents receive relevant context from past similar tasks); performance trending — track whether agents improve over time on specific task types; and configurable memory retention policies.

**Leverage:**
- AO daemon (already logs phases, decisions, rework cycles)
- AO workflow checkpoints (capture decision points)
- `worktree-manager` (task isolation makes it easy to attribute outcomes)
- LaunchPad Vector (proposed in idea #10 — use embeddings for semantic task matching)

**Effort:** Large (months) — requires embedding pipeline, retrieval system, prompt augmentation layer

**Revenue potential:** Premium AO feature — part of Pro/Team tier. Strong enterprise appeal for teams wanting measurable agent improvement.

**Priority score:** 8/10 — Highly differentiated (no competitor has agent learning loops), but requires LaunchPad Vector or external embedding service

---

## 15. Claude Code Skill Studio — Visual Skill Builder

**Problem:** Claude Code's plugin ecosystem is exploding — the top skill has 89,000+ installs, and the VS Code extension has 5.2M installs. But building skills still requires understanding YAML manifests, hook configurations, and Claude Code internals. The org has 15+ plugin packs but creating each one is manual. A visual builder would let anyone create skills — dramatically expanding the ecosystem.

**Target audience:** Developers and non-developers who want to create Claude Code skills without deep knowledge of the plugin format. Also internal team members who need to rapidly iterate on the 15+ existing packs.

**Proposed solution:** A web-based visual tool for building Claude Code skills: drag-and-drop skill builder with live preview, template gallery (linter, formatter, workflow, domain expert), automatic manifest generation from user inputs, built-in testing sandbox (simulates Claude Code environment), one-click publishing to the LaunchApp Marketplace (ties into product idea #4), and import/export for version control.

**Leverage:**
- 15+ existing plugin packs (patterns to codify into templates)
- `ao-skills` (skill definitions as reference)
- `launchapp.dev` website (host the builder)
- Design system (build the UI)

**Effort:** Medium (weeks)

**Revenue potential:** Freemium — free for basic skills, $9/month Pro for advanced features (custom hooks, private skills, team sharing). Marketplace commission on published paid skills.

**Priority score:** 8/10 — First-mover in Claude Code skill tooling; 5.2M Claude Code users is a massive TAM; creates flywheel with Marketplace

---

## 16. LaunchPad Migrate — Zero-Downtime Migration Tool

**Problem:** Supabase has 4M+ developers. Firebase has even more. Many are dissatisfied — Firebase removed free storage tier, Supabase's RLS is complex, both have lock-in concerns. But migrating between BaaS platforms is terrifying — schema translation, data export/import, auth user migration, API compatibility. No tool makes this easy. Every BaaS switch is a manual, weeks-long project.

**Target audience:** Developers currently on Supabase, Firebase, Appwrite, or Nhost who want to migrate to LaunchPad (or between any BaaS platforms).

**Proposed solution:** A CLI tool (`launchpad migrate`) that: auto-detects source platform (Supabase, Firebase, Appwrite), maps source schema to LaunchPad's `launchpad-db-engine` format, migrates auth users (password hashes, OAuth connections) via Better Auth import, translates RLS policies to LaunchPad's policy format, provides a dry-run mode with migration report, and handles incremental migration for zero-downtime cutover.

**Leverage:**
- `supabase-to-hooks` (already understands Supabase patterns)
- `launchpad-db-engine` (target format for migrations)
- Better Auth (user import capabilities)
- `openapi-gen` (API compatibility layer generation)

**Effort:** Medium (weeks) per source platform

**Revenue potential:** Free for basic migration (adoption driver), paid for enterprise features (incremental sync, rollback, migration support). $99 one-time for assisted migration.

**Priority score:** 9/10 — Directly converts competitor users to LaunchPad users; "supabase-to-hooks" repo shows org already thinks in migration patterns; Firebase removing free tier creates urgency

---

## 17. AO Fleet — Managed Multi-Repo Agent Workforce

**Problem:** The org's "brain" repo manages 14+ specialized agents across 90+ repos. But this setup is hand-configured — there's no productized way for other organizations to run a similar AI workforce across their codebase. The "fleet" knowledge directory suggests this concept is already being explored internally.

**Target audience:** Engineering organizations with 10+ repos who want to deploy a coordinated AI agent workforce — not just per-repo agents, but an org-wide AI engineering team.

**Proposed solution:** A higher-order AO product that: provides pre-configured agent personas (architect, reviewer, security auditor, docs writer — the org already has 14), manages cross-repo task routing and prioritization, offers a fleet dashboard showing agent utilization across repos, supports org-wide coding standards enforcement, and includes scheduled workflows (the brain already runs planner every 3h).

**Leverage:**
- Brain repo (the org's own fleet is the reference implementation)
- AO daemon (multi-agent orchestration)
- `worktree-manager` (parallel repo operations)
- Fleet knowledge directory (existing fleet architecture docs)

**Effort:** Large (months) — productizing the brain's architecture into a configurable, multi-tenant system

**Revenue potential:** Enterprise SaaS — $499/month for small orgs (up to 20 repos), $1,999/month for enterprise (unlimited repos, custom personas, SLA). The org's own 180+ PRs/week story is the best possible sales demo.

**Priority score:** 8/10 — Unique positioning (no competitor offers managed agent fleets), but large effort and requires AO Cloud infrastructure

---

## Updated Summary Table

| # | Product | Effort | Revenue Model | Priority |
|---|---------|--------|---------------|----------|
| 1 | LaunchPad Realtime | Large | Freemium/Usage | 7/10 |
| 2 | LaunchPad Functions | Large | Usage-based | 8/10 |
| 3 | AO Cloud | Large | SaaS subscription | 9/10 |
| 4 | LaunchApp Marketplace | Medium | Marketplace fees | 8/10 |
| 5 | LaunchPad Storage | Medium | Usage-based | 7/10 |
| 6 | CodeBy.ai | Medium | Freemium SaaS | 8/10 |
| 7 | LaunchPad AI Agent | Medium | Freemium | 9/10 |
| 8 | LaunchPad Platform | Large | Enterprise licensing | 8/10 |
| 9 | AO Observability | Medium | Freemium SaaS | 8/10 |
| 10 | LaunchPad Vector | Medium | Usage-based | 8/10 |
| **11** | **LaunchPad Jobs** | **Medium** | **Freemium/Usage** | **9/10** |
| **12** | **AO Guard** | **Medium** | **Freemium SaaS** | **10/10** |
| **13** | **LaunchApp Mobile** | **Medium** | **Premium add-on** | **9/10** |
| **14** | **AO Autopilot** | **Large** | **Premium tier** | **8/10** |
| **15** | **Claude Code Skill Studio** | **Medium** | **Freemium SaaS** | **8/10** |
| **16** | **LaunchPad Migrate** | **Medium** | **Free + paid** | **9/10** |
| **17** | **AO Fleet** | **Large** | **Enterprise SaaS** | **8/10** |
