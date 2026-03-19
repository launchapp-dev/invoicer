# LaunchApp Vision

## Mission

**Make it easy to launch apps. Rocket-launch businesses through software enablement.**

## What This Means

LaunchApp exists to remove every barrier between "I have an idea" and "I have a running business." We build the tools, templates, infrastructure, and AI workforce that lets founders ship production software in days, not months.

## The Core Product: AO Agent Orchestrator

**AO is the product. Everything else proves it works.**

The SaaS templates, the design system, the plugin packs — these are not standalone products. They are **test runs and demonstrations** of what AO can do. The "180+ PRs in 7 days" story isn't about the template being good — it's about AO being capable of autonomously building and maintaining a production codebase.

AO is the only product with real external demand signal (Reddit users reaching out, job offers based on the demo). The competitive landscape validates the market (Devin, Factory, Sweep), but none of them do what AO does: local-first, BYOK, multi-model orchestration with worktree isolation and self-healing.

## How We Do It

### The Stack (in priority order)

1. **AO Agent Orchestrator** — The AI workforce that builds, tests, reviews, and ships code autonomously. This is the core product. Everything else is built BY AO to prove AO works.
2. **LaunchApp Templates** — SaaS starters built and maintained by AO. These are test cases / demos that show AO's capability, not the primary revenue product.
3. **LaunchPad BaaS** — Backend primitives (auth, db, storage, realtime, payments). The SDK layer that templates use. Being revived with re-architecture.
4. **Better Auth** — Authentication that you own. Part of the stack, used across products.
5. **Design System** — Radix + Tailwind components. Built by AO agents as a capability proof.

### The Philosophy

- **AO-first** — AO builds the products. The products prove AO works. Customers buy AO.
- **Zero vendor lock-in** — self-hosted, own your database, bring your own AI keys
- **Modern TypeScript** — React Router 7, Hono, Drizzle, Biome
- **Ships daily** — AO agents maintain everything 24/7

## Product Evolution

### Phase 1: Foundation (Current)
- Prove AO can autonomously build and maintain production codebases
- The SaaS template and design system are the test cases
- Validate demand (Reddit response confirmed interest in AO, not the templates)

### Phase 2: Revenue
- AO Pro/Team for developers who want orchestration — this is the primary revenue stream
- Template sales as secondary revenue (the product exists, needs checkout)
- Open-source what should be open, monetize AO's unique capabilities

### Phase 3: Platform
- AO Cloud for teams who don't want to self-host
- LaunchPad becomes the SDK layer that all templates share
- Marketplace for AO plugins, agent personas, and workflow packs

### Phase 4: Ecosystem
- Third-party AO workflows and skill packs
- Third-party templates built on LaunchPad (powered by AO)
- LaunchApp becomes the platform others build on — AO is the engine

## The Portfolio

Every repo in launchapp-dev serves the mission:
- **The product** — AO CLI, ao-skills, agent-orchestrator (archived, superseded by ao-cli)
- **Proof of capability** — SaaS templates, design system (built by AO to demonstrate AO)
- **Infrastructure** — LaunchPad BaaS SDKs, Better Auth, worktree-manager
- **Ecosystem** — Claude Code plugin packs, brain repo
- **Early client work** — projects from LaunchApp's first engagements
- **Experiments** — explorations that may or may not become products

The templates are not the business. AO is the business. The templates are the demo.
