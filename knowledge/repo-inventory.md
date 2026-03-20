# Repository Inventory

> Last updated: 2026-03-20 by knowledge-curator agent.
> Snapshot: 113 repos in `launchapp-dev`; 25 pushed in the last 30 days, 23 created since 2026-03-12, 15 public, 98 private, and 1 archived repo (`agent-orchestrator`). Verified with authenticated GitHub CLI on 2026-03-20 against live org metadata including 2026-03-20 update cycle across ao-cli, design-system, saas-template-launch-app-test, and launchapp-sveltekit.

## Notable Changes

| Change | Detail |
|---|---|
| New repos | 23 repos were created in the last 7 days, including `brain`, `design-system`, `saas-template-launch-app-test`, `launchapp-lite`, `launchapp-lite-v2`, `ao-skills`, `ao-bundled-packs`, `claude-plugin-marketplace`, and the 15 AO plugin-pack repos |
| Archived repo | `agent-orchestrator` is now archived in GitHub metadata even though it saw a 2026-03-19 push; `ao-cli` remains the active AO runtime |
| Significant refactors | `saas-template-launch-app-test` added project references + `tsc --build` hardening around `@repo/jobs`; `design-system` expanded AO workflows with lint/typecheck/CI gates, design-token generation, and monthly adoption metrics |
| Repo coverage | Purpose in the full ledger below comes from GitHub repo descriptions when present; deeper hand-written repo docs live under `knowledge/repos/` |

## Velocity Leaders

| Repo | Recent merged PR count | Current note |
|---|---|---|
| `saas-template-launch-app-test` | 200+ merged PRs since 2026-03-12 | Flagship template trunk/canary; 2FA/OTP auth expansion, billing hardening, Cloudflare deployment docs removed |
| `design-system` | 80+ merged PRs since 2026-03-12 | Phase 4 complete with Timeline block & CLI scaffolding; Chromatic visual testing, NPM publishing pipeline, changelog automation |
| `ao-cli` | 60+ merged PRs since 2026-03-12 | v0.0.11 release plus post-release stability improvements (daemon tests, workflow YAML alignment, orphan tracker fixes) |
| `launchapp-sveltekit` | 4 merged PRs since 2026-03-20 | Emerging SvelteKit template variant with multi-tier billing and org schema support |
| `brain` | 55+ merged PRs since creation on 2026-03-19 | Structured data + MCP platform expanded into operator workflows; daily knowledge refresh cycle now active |

## Full Inventory

Canonical source for repo purpose/status is GitHub metadata plus the per-repo docs under `knowledge/repos/`. Status is based on current repo metadata as of 2026-03-19.

### High Velocity Repos

| Repo | Visibility | Language | Created | Last Push | Status | Purpose |
|---|---|---|---|---|---|---|
| `brain` | Private | JavaScript | 2026-03-19 | 2026-03-19 | High velocity | No GitHub description set |
| `saas-template-launch-app-test` | Private | TypeScript | 2026-03-17 | 2026-03-19 | High velocity | LaunchApp Lite - Lightweight SaaS template built with React Router 7 |
| `design-system` | Private | TypeScript | 2026-03-17 | 2026-03-19 | High velocity | Radix UI based design system for AudioGenius |
| `ao-cli` | Private | Rust | 2026-02-24 | 2026-03-19 | High velocity | No GitHub description set |
| `ao-skills` | Public | - | 2026-03-17 | 2026-03-19 | High velocity | AI skills for the AO agent orchestrator CLI |
| `ao-bundled-packs` | Private | - | 2026-03-18 | 2026-03-18 | High velocity | Community and first-party extension packs for AO CLI |
| `launchapp-lite-v2` | Private | TypeScript | 2026-03-17 | 2026-03-17 | High velocity | Lightweight SaaS starter - React Router 7, Hono, Better Auth, Drizzle, Supabase, Stripe |
| `launchapp-lite` | Private | TypeScript | 2026-03-17 | 2026-03-17 | High velocity | Lightweight SaaS starter template - React Router 7, Hono, Better Auth, Drizzle, Supabase, Stripe, Tailwind CSS 4 |
| `claude-plugin-marketplace` | Private | - | 2026-03-17 | 2026-03-17 | High velocity | AudioGenius plugin marketplace - indexes all plugin packs |
| `firebase-pack` | Private | Shell | 2026-03-16 | 2026-03-17 | High velocity | Claude Code plugin pack: firebase-pack |
| `aws-pack` | Private | Shell | 2026-03-16 | 2026-03-17 | High velocity | Claude Code plugin pack: aws-pack |
| `pdf-pack` | Private | Shell | 2026-03-16 | 2026-03-17 | High velocity | Claude Code plugin pack: pdf-pack |
| `monitoring-pack` | Private | Shell | 2026-03-16 | 2026-03-17 | High velocity | Claude Code plugin pack: monitoring-pack |
| `ollama-pack` | Private | Shell | 2026-03-16 | 2026-03-17 | High velocity | Claude Code plugin pack: ollama-pack |
| `postgres-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: postgres-pack |
| `figma-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: figma-pack |
| `stripe-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: stripe-pack |
| `slack-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: slack-pack |
| `playwright-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: playwright-pack |
| `linear-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: linear-pack |
| `research-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: research-pack |
| `docker-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: docker-pack |
| `google-workspace-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: google-workspace-pack |
| `supabase-pack` | Private | Shell | 2026-03-16 | 2026-03-16 | High velocity | Claude Code plugin pack: supabase-pack |
| `mymoku.net` | Private | TypeScript | 2025-06-16 | 2026-03-12 | High velocity | My Moku.net repo |

### Dormant Repos

| Repo | Visibility | Language | Created | Last Push | Status | Purpose |
|---|---|---|---|---|---|---|
| `launchapp.dev` | Private | TypeScript | 2025-03-27 | 2026-02-04 | Dormant | No GitHub description set |
| `launchpad-ecosystem` | Private | TypeScript | 2025-12-10 | 2026-01-19 | Dormant | Orchestration workspace for Launchpad BaaS platform development |
| `launchpad-baas` | Private | TypeScript | 2025-12-10 | 2026-01-14 | Dormant | Launchpad Backend-as-a-Service platform |
| `launchpad-payments` | Private | TypeScript | 2025-12-11 | 2026-01-14 | Dormant | Standalone payments SDK with Stripe support, subscriptions, invoices, and metered billing |
| `launchpad-db-engine` | Public | TypeScript | 2025-12-10 | 2026-01-14 | Dormant | Custom database engine with built-in multi-tenancy, migrations, and type generation |
| `launchapp-landing-v2` | Private | TypeScript | 2025-06-27 | 2026-01-13 | Dormant | No GitHub description set |
| `launchpad-storage` | Private | TypeScript | 2025-12-11 | 2026-01-04 | Dormant | Standalone storage SDK with S3 support, presigned URLs, and multi-tenant file management |
| `launchpad-email` | Private | TypeScript | 2025-12-11 | 2026-01-04 | Dormant | Standalone email SDK with Resend integration, templates, and tracking |
| `launchpad-payments-sdk` | Private | TypeScript | 2025-12-10 | 2026-01-03 | Dormant | Payments SDK for Launchpad BaaS - Stripe integration, subscriptions, and billing |
| `launchpad-workflows` | Private | TypeScript | 2025-12-11 | 2026-01-03 | Dormant | Standalone workflow engine SDK with built-in actions, circuit breaker, and state management |
| `launchpad-db-sdk` | Private | TypeScript | 2025-12-10 | 2026-01-03 | Dormant | Database SDK for Launchpad BaaS - React hooks for data querying with TanStack Query |
| `launchpad-git-server` | Private | TypeScript | 2025-12-19 | 2026-01-01 | Dormant | Agent-optimized git server with worktree-based isolation for AI coding agents |
| `launchpad-mcp-server` | Private | TypeScript | 2025-12-19 | 2026-01-01 | Dormant | MCP server exposing Launchpad platform operations for AI coding agents |
| `launchpad-saas-template` | Private | TypeScript | 2025-12-30 | 2026-01-01 | Dormant | Production-ready SaaS template with auth, billing, and teams - includes .launchpad/ manifest for AI agent extensibility |
| `launchpad-secrets` | Private | HTML | 2025-12-11 | 2025-12-30 | Dormant | Standalone secrets management SDK with AES-256-GCM encryption, versioning, and rotation |
| `renovate-config` | Private | - | 2025-12-30 | 2025-12-30 | Dormant | Shared Renovate configuration preset for AudioGenius-ai organization |
| `worktree-manager` | Public | JavaScript | 2025-12-09 | 2025-12-22 | Dormant | AI-powered parallel development using git worktrees with Claude, Codex, and Gemini |
| `launchpad-task-orchestrator` | Private | TypeScript | 2025-12-20 | 2025-12-20 | Dormant | Machine-consumable task queue and orchestration system for AI agents |
| `launchpad-realtime-server` | Private | TypeScript | 2025-12-11 | 2025-12-19 | Dormant | Real-time backend service with PostgreSQL LISTEN/NOTIFY, Redis pub/sub, and SSE endpoints |
| `launchpad-workflows-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Workflows SDK for Launchpad BaaS - background jobs, scheduled tasks, and workflow automation |
| `launchpad-storage-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Storage SDK for Launchpad BaaS - file uploads, downloads, and management |
| `launchpad-realtime-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Realtime SDK for Launchpad BaaS - WebSocket subscriptions and live data |
| `launchpad-push-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Push Notifications SDK for Launchpad BaaS - web and mobile push notifications |
| `launchpad-identity-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Identity SDK for Launchpad BaaS - user directory, SSO, RBAC, and organization management |
| `launchpad-customers-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Customers SDK for Launchpad BaaS - customer management, CRM, segmentation, and engagement |
| `launchpad-auth-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Auth SDK for Launchpad BaaS - Authentication hooks and components for React |
| `launchpad-cms-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | CMS SDK for Launchpad BaaS - headless CMS with content types, localization, and versioning |
| `launchpad-core-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-18 | Dormant | Core SDK for Launchpad BaaS - HTTP client, session management, and React integration |
| `launchpad-push-server` | Private | TypeScript | 2025-12-11 | 2025-12-18 | Dormant | Push notification service with FCM, APNs, and Web Push support |
| `launchpad-server` | Private | TypeScript | 2025-12-15 | 2025-12-16 | Dormant | Type-safe HTTP server framework with OpenAPI and Zod support for Launchpad BaaS |
| `launchpad-ai` | Private | TypeScript | 2025-12-11 | 2025-12-12 | Dormant | Standalone AI SDK with provider abstraction, streaming, tool execution, and function calling |
| `launchpad-analytics` | Private | TypeScript | 2025-12-11 | 2025-12-12 | Dormant | @launchpad/analytics - Pluggable analytics package for event tracking and feature flags |
| `launchpad-audit-log` | Private | TypeScript | 2025-12-11 | 2025-12-12 | Dormant | Audit logging service for tracking system events and user actions |
| `launchpad-i18n` | Private | TypeScript | 2025-12-11 | 2025-12-11 | Dormant | Internationalization and localization utilities for Launchpad applications |
| `launchpad-appstores` | Private | TypeScript | 2025-12-11 | 2025-12-11 | Dormant | App store integrations with Apple App Store Connect and Google Play for receipt validation, subscriptions, and in-app purchases |
| `launchpad-payments-server` | Private | TypeScript | 2025-12-11 | 2025-12-11 | Dormant | Backend payments server with Stripe webhooks, subscription management API, and usage-based billing endpoints |
| `offline-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-10 | Dormant | @launchpad/offline SDK - Offline-first capabilities for Launchpad applications |
| `testing-sdk` | Private | TypeScript | 2025-12-10 | 2025-12-10 | Dormant | @launchpad/testing SDK - Testing utilities for Launchpad applications |
| `launchpad` | Private | TypeScript | 2025-11-09 | 2025-12-10 | Dormant | No GitHub description set |
| `wyman-launchapp` | Private | TypeScript | 2025-06-04 | 2025-12-01 | Dormant | No GitHub description set |
| `bluelight-poc` | Private | TypeScript | 2025-11-22 | 2025-11-23 | Dormant | Production-ready full-stack TypeScript monorepo for SaaS applications |
| `create-launchpad` | Public | JavaScript | 2025-11-10 | 2025-11-10 | Dormant | No GitHub description set |
| `codeby.ai` | Private | TypeScript | 2025-06-11 | 2025-10-20 | Dormant | No GitHub description set |
| `lostcause.com` | Private | TypeScript | 2025-06-15 | 2025-09-15 | Dormant | No GitHub description set |
| `create-launchapp` | Public | TypeScript | 2025-05-31 | 2025-07-12 | Dormant | CLI script to get a lunchapp project launched |
| `mymoku-demo` | Private | TypeScript | 2025-06-16 | 2025-07-05 | Dormant | No GitHub description set |
| `project-management` | Private | TypeScript | 2025-07-05 | 2025-07-05 | Dormant | A place to manage our projects |
| `launchapp-images` | Private | TypeScript | 2025-06-28 | 2025-06-30 | Dormant | No GitHub description set |
| `launchapp-studio` | Public | TypeScript | 2025-06-21 | 2025-06-23 | Dormant | The IDE of the future |
| `launchapp-registry` | Private | - | 2025-06-23 | 2025-06-23 | Dormant | The place where the packages will be stored for the launch app registry |
| `code-pilot-studio` | Private | TypeScript | 2025-06-05 | 2025-06-21 | Dormant | No GitHub description set |
| `moku-demo` | Private | - | 2025-06-12 | 2025-06-12 | Dormant | No GitHub description set |
| `neuron-hive-discover` | Private | TypeScript | 2025-06-09 | 2025-06-09 | Dormant | No GitHub description set |
| `openapi-gen` | Public | TypeScript | 2025-06-01 | 2025-06-04 | Dormant | A generator for openapi |
| `wyman-demo` | Private | TypeScript | 2025-06-04 | 2025-06-04 | Dormant | No GitHub description set |
| `launchapp.dev-landing` | Private | TypeScript | 2025-04-30 | 2025-05-23 | Dormant | No GitHub description set |
| `pr-review-responder` | Public | - | 2025-05-19 | 2025-05-19 | Dormant | a local task that runs whenever a comment is added on github and passes it to codex |
| `react-router-presets` | Public | - | 2025-05-05 | 2025-05-05 | Dormant | A place where I will storing different presets for react router v7 |
| `react-router-vercel-test` | Private | TypeScript | 2025-05-01 | 2025-05-01 | Dormant | No GitHub description set |
| `crafted-blog-scapes` | Private | TypeScript | 2025-04-24 | 2025-04-24 | Dormant | No GitHub description set |
| `better-auth` | Public | TypeScript | 2025-04-18 | 2025-04-17 | Dormant | The most comprehensive authentication framework for TypeScript |
| `content-canvas-kit` | Private | TypeScript | 2025-04-16 | 2025-04-16 | Dormant | No GitHub description set |
| `supabase-to-hooks` | Public | TypeScript | 2025-03-12 | 2025-04-10 | Dormant | No GitHub description set |
| `figma-tailwind-plugin` | Public | TypeScript | 2025-03-08 | 2025-04-10 | Dormant | A figma plugin, to generate tailwind react components, based on all the variables contained in the file. |
| `neon-edge-incubator` | Private | TypeScript | 2025-04-09 | 2025-04-09 | Dormant | No GitHub description set |
| `react-router-vercel` | Private | TypeScript | 2025-04-08 | 2025-04-08 | Dormant | No GitHub description set |
| `streamlined-saas-console` | Private | TypeScript | 2025-03-31 | 2025-04-01 | Dormant | No GitHub description set |
| `audits_pro` | Private | TypeScript | 2025-03-07 | 2025-03-20 | Dormant | A palce to do audits |
| `site-inspector-landing` | Private | TypeScript | 2025-03-17 | 2025-03-17 | Dormant | No GitHub description set |
| `landing-siteinspector-pro` | Private | - | 2025-03-12 | 2025-03-12 | Dormant | Landing for site inspector pro |
| `supabase-railway-template` | Public | - | 2025-03-10 | 2025-03-10 | Dormant | A place where I will be setting up supabase for my railway projects |
| `aethris-landing` | Private | TypeScript | 2025-03-05 | 2025-03-06 | Dormant | No GitHub description set |
| `job_miner` | Private | Python | 2025-02-06 | 2025-02-06 | Dormant | No GitHub description set |
| `my_resume_ai` | Private | TypeScript | 2025-01-02 | 2025-01-23 | Dormant | No GitHub description set |
| `job-scraper-with-proxy` | Private | - | 2025-01-23 | 2025-01-23 | Dormant | No GitHub description set |
| `aetheris-site` | Private | TypeScript | 2025-01-18 | 2025-01-18 | Dormant | site to host the atheris website |
| `mental-health-agent` | Private | TypeScript | 2025-01-01 | 2025-01-01 | Dormant | No GitHub description set |
| `ats_applicant_setup` | Private | TypeScript | 2024-12-08 | 2024-12-13 | Dormant | No GitHub description set |
| `cursor_rules` | Private | - | 2024-12-12 | 2024-12-12 | Dormant | No GitHub description set |
| `blog_generator` | Private | TypeScript | 2024-12-05 | 2024-12-05 | Dormant | blog_generator |
| `aethris_client_plugins` | Public | - | 2024-11-23 | 2024-11-23 | Dormant | No GitHub description set |
| `aethris_client` | Private | TypeScript | 2024-11-23 | 2024-11-23 | Dormant | aethris Clinet |
| `the_store` | Private | - | 2024-11-20 | 2024-11-20 | Dormant | the app store for AethrisLabs |

### Archived Repos

| Repo | Visibility | Language | Created | Last Push | Status | Purpose |
|---|---|---|---|---|---|---|
| `agent-orchestrator` | Private | Rust | 2026-01-06 | 2026-03-19 | Archived | AI-powered desktop application for orchestrating software development agents |
