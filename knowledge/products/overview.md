# LaunchApp Product Overview

> Last updated: 2026-03-29. Maintained by the brain's AI workforce.

## Organization

**GitHub org:** `launchapp-dev` (previously also `AudioGenius-ai`)
**Total repos:** 100 (as of 2026-03-29 conductor cycle)
- Active / recently updated: ~65
- Experimental / legacy / archived: ~35

## Product Lines

| # | Product Line | Repos | Status |
|---|---|---|---|
| 1 | LaunchPad BaaS | 35+ (core platform + SDKs + servers) | Active development |
| 2 | AO Agent Orchestrator | 15+ (ao, ao-cli, ao-dashboard, ao-fleet, ao-desktop, ao-projects, skills, packs) | Active development |
| 3 | LaunchApp Templates | 10+ (launchapp-lite, launchapp-lite-v2, launchpad-saas-template, launchapp-react-router, launchapp-nextjs, launchapp-nuxt, launchapp-sveltekit, launchapp-crm, bluelight-poc) | Active development |
| 4 | Developer Tools | 4 (worktree-manager, ai-model-registry, renovate-config, openapi-gen*) | Mixed (stable to maintenance) |
| 5 | Claude Code Plugin Packs | 15+ packs + marketplace | Active development |
| 6 | Websites / Product Apps | 7 (launchapp.dev, mymoku.net, codeby.ai, lostcause.com, wyman-launchapp, launchapp-landing-v2) | Mixed |
| 7 | Design System | 1 (design-system) | Active development |
| 8 | AO-Built Showcase Apps | 4 (invoicer, postpilot, condohub, launchapp-crm) | Active development |
| 9 | Legacy / Experiments | ~25 repos (aethris-*, demos, job tools, content experiments) | Abandoned / Maintenance |

## Summary

LaunchApp (launchapp-dev) is a full-stack developer platform organization building:
1. A BaaS platform (Launchpad) providing backend primitives (auth, db, storage, realtime, payments, etc.)
2. An AI agent orchestration system (AO) for autonomous software development workflows
3. SaaS starter templates that leverage the BaaS and AO ecosystem
4. Developer tools for the broader ecosystem
5. Claude Code plugin packs for extending AI coding workflows

The primary technology stack is TypeScript (Node.js/Bun), with Rust used for the AO CLI core and fleet control plane. Most products target v0.1.0 (pre-1.0) and are under active development as of early 2026.

## AO-Built Showcase Applications

Built autonomously by the AO Agent Orchestrator (demonstrating end-to-end autonomous development):

| App | Description | Stack | Visibility | Last Push |
|---|---|---|---|---|
| `invoicer` | AI-built invoice generator with expense tracking, payment history, tax presets | Next.js + @launchapp/design-system | Public | 2026-03-29 |
| `postpilot` | AI-native social media automation platform | Next.js 15 + SQLite + Drizzle | Public | 2026-03-29 |
| `condohub` | Modern condominium management platform with i18n | Next.js + @launchapp/design-system | Public | 2026-03-29 |
| `launchapp-crm` | Production CRM SaaS (single-conductor AO) | TypeScript | Private | 2026-03-29 |

## Key Technical Themes

- **TypeScript-first**: All SDKs, servers, templates, and showcase apps are TypeScript
- **Hono framework**: Used extensively for API servers across BaaS and templates
- **Better Auth**: The org's own auth library used across products
- **Drizzle ORM**: Database layer across most TypeScript products
- **React Router v7**: Preferred frontend framework for lightweight templates
- **Next.js 15 App Router**: Used for showcase apps and complex products
- **Tauri v2**: Desktop apps (ao-dashboard, ao-desktop, agent-orchestrator legacy)
- **Rust**: Core of AO CLI, ao-fleet control plane, and ao-projects
- **pnpm + Turborepo**: Monorepo tooling of choice

## Visibility

- **Public repos** (22+): ao, ao-cli, ao-dashboard, ao-docs, ao-examples, ao-fleet, ao-fleet-pack, ao-fleet-tools, ao-projects, ao-skill-devops, ao-skill-nextjs, ao-skill-nuxt, ao-skill-react-router, ao-skill-security, ao-skill-sveltekit, ao-skill-testing, ao-skills, ao-starter, ao-workflow-examples, ai-model-registry, condohub, design-system, invoicer, launchpad-db-engine, postpilot, worktree-manager
- **Private repos** (75+): most of the BaaS platform, some templates, websites, plugin packs, legacy experiments, storyforge, launchapp-crm, ao-sync, ao-bundled-packs
- **Archived repos** (1): agent-orchestrator (legacy Tauri desktop app)

## Notable Legacy Context

The org has ~25 repos predating the current LaunchApp focus. These include:
- **Aethris era** (late 2024): `aetheris-site`, `aethris-landing`, `aethris_client`, `the_store` — a prior product called "AethrisLabs"
- **Content/blog tools** (2024-2025): `blog_generator`, `content-canvas-kit`, `crafted-blog-scapes`, `neuron-hive-discover`
- **Job tools** (early 2025): `job-scraper-with-proxy`, `job_miner`, `my_resume_ai`
- **Site Inspector** (early 2025): `audits_pro`, `landing-siteinspector-pro`, `site-inspector-landing`
- **Moku demos** (mid 2025): `moku-demo`, `mymoku-demo` — precursors to `mymoku.net`
- **React Router experiments** (2025): `react-router-vercel`, `react-router-vercel-test`
- **Wyman project** (mid 2025): `wyman-demo`, `wyman-launchapp` — client or side project
