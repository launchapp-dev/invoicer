# LaunchApp Product Overview

> Last updated: 2026-03-19. Maintained by the brain's AI workforce.

## Organization

**GitHub org:** `launchapp-dev` (previously also `AudioGenius-ai`)
**Total repos:** 109 (as of 2026-03-19 conductor cycle)
- Active / recently updated: ~60
- Experimental / legacy / abandoned: ~49

## Product Lines

| # | Product Line | Repos | Status |
|---|---|---|---|
| 1 | LaunchPad BaaS | 30+ (core platform + SDKs + servers) | Active development |
| 2 | AO Agent Orchestrator | 5 (ao, ao-cli, agent-orchestrator, ao-skills, ao-bundled-packs) | Active development |
| 3 | LaunchApp Templates | 7 (launchapp-lite, launchapp-lite-v2, launchpad-saas-template, saas-template-launch-app-test, launchapp-nextjs, launchapp-nuxt, launchapp-sveltekit) | Active development |
| 4 | Developer Tools | 6 (better-auth, launchapp-studio, worktree-manager, openapi-gen, pr-review-responder, renovate-config) | Mixed (stable to maintenance) |
| 5 | Claude Code Plugin Packs | 15 packs + marketplace | Active development |
| 6 | Websites / Product Apps | 6 (launchapp.dev, mymoku.net, codeby.ai, lostcause.com, launchapp.dev-landing, launchapp-landing-v2) | Mixed |
| 7 | Design System | 1 (design-system) | Active development |
| 8 | Legacy / Experiments | ~40 repos (aethris-*, demos, job tools, content experiments) | Abandoned / Maintenance |

## Summary

LaunchApp (launchapp-dev) is a full-stack developer platform organization building:
1. A BaaS platform (Launchpad) providing backend primitives (auth, db, storage, realtime, payments, etc.)
2. An AI agent orchestration system (AO) for autonomous software development workflows
3. SaaS starter templates that leverage the BaaS platform
4. Developer tools for the broader ecosystem
5. Claude Code plugin packs for extending AI coding workflows

The primary technology stack is TypeScript (Node.js/Bun), with Rust used for the AO CLI core. Most products target v0.1.0 (pre-1.0) and are under active development as of early 2026.

## Key Technical Themes

- **TypeScript-first**: All SDKs, servers, and templates are TypeScript
- **Hono framework**: Used extensively for API servers
- **Better Auth**: The org's own auth library used across products
- **Drizzle ORM**: Database layer across most TypeScript products
- **React Router v7**: Preferred frontend framework for new templates
- **Tauri**: Used for desktop apps (agent-orchestrator, launchapp-studio)
- **pnpm + Turborepo**: Monorepo tooling of choice

## Visibility

- **Public repos** (15): ao, ao-skills, launchpad-db-engine, worktree-manager, better-auth, openapi-gen, create-launchpad, create-launchapp, launchapp-studio, pr-review-responder, react-router-presets, supabase-to-hooks, figma-tailwind-plugin, supabase-railway-template
- **Private repos**: Everything else (ao-cli implementation, most of the BaaS platform, templates, websites, plugin packs, legacy experiments)

## Notable Legacy Context

The org has ~40 repos predating the current LaunchApp focus. These include:
- **Aethris era** (late 2024): `aetheris-site`, `aethris-landing`, `aethris_client`, `the_store` — a prior product called "AethrisLabs"
- **Content/blog tools** (2024-2025): `blog_generator`, `content-canvas-kit`, `crafted-blog-scapes`, `neuron-hive-discover`
- **Job tools** (early 2025): `job-scraper-with-proxy`, `job_miner`, `my_resume_ai`
- **Site Inspector** (early 2025): `audits_pro`, `landing-siteinspector-pro`, `site-inspector-landing`
- **Moku demos** (mid 2025): `moku-demo`, `mymoku-demo` — precursors to `mymoku.net`
- **React Router experiments** (2025): `react-router-vercel`, `react-router-vercel-test`
- **Wyman project** (mid 2025): `wyman-demo`, `wyman-launchapp` — client or side project
