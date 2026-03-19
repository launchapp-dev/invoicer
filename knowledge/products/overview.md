# LaunchApp Product Overview

> Last updated: 2026-03-18. Maintained by the brain's AI workforce.

## Organization

**GitHub org:** `launchapp-dev` (previously also `AudioGenius-ai`)
**Total repos:** ~90+ (including experiments, demos, and archived work)

## Product Lines

| # | Product Line | Repos | Status |
|---|---|---|---|
| 1 | LaunchPad BaaS | 25+ (core platform + SDKs + servers) | Active development |
| 2 | AO Agent Orchestrator | 3 (ao-cli, agent-orchestrator, ao-skills, ao-bundled-packs) | Active development |
| 3 | LaunchApp Templates | 3 (launchapp-lite, launchapp-lite-v2, launchpad-saas-template) | Active development |
| 4 | Developer Tools | 4 (better-auth, launchapp-studio, worktree-manager, openapi-gen) | Mixed (stable to maintenance) |
| 5 | Claude Code Plugin Packs | 15+ packs + marketplace | Active development |
| 6 | Websites | 3 (launchapp.dev, codeby.ai, lostcause.com) | Mixed |
| 7 | Design System | 1 (design-system) | Active development |

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

- **Public repos**: ao-cli, ao-skills, launchpad-db-engine, worktree-manager, better-auth, openapi-gen, create-launchpad, create-launchapp, launchapp-studio, pr-review-responder, react-router-presets, supabase-to-hooks, figma-tailwind-plugin, supabase-railway-template
- **Private repos**: Everything else (most of the BaaS platform, templates, websites, plugin packs)
