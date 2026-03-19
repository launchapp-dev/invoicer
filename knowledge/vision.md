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

## The Flywheel: AO Builds Templates, Templates Fund AO

AO's superpower isn't just building one template — it can **mass-produce templates** for every vertical. AO provisions a new SaaS starter in days, not months. Each template:

1. **Proves AO works** — "this entire app was built by an AI workforce"
2. **Generates revenue** — template sales bootstrap the business ($149-$299 each)
3. **Expands the catalog** — more verticals = more customers = more proof
4. **Improves AO** — each template stress-tests AO's workflows, surfacing bugs and improvements

The flywheel: AO builds templates → templates sell → revenue funds AO development → AO gets better → AO builds more templates faster.

### Template Verticals AO Can Provision

- SaaS starter (exists — the flagship)
- AI SaaS (LLM integration, RAG, streaming chat)
- Marketplace / two-sided platform
- E-commerce storefront
- Healthcare / HIPAA-compliant
- Fintech / payments-heavy
- Developer tools / API platform
- Community / social platform
- Internal tools / admin dashboard

Each is a `create-launchapp --template <vertical>` that AO can scaffold, customize, and maintain autonomously.

## Product Evolution

### Phase 1: Foundation (Current)
- Prove AO can autonomously build and maintain production codebases
- The SaaS template is the first test case — more verticals coming
- Validate demand (Reddit response confirmed interest in AO)

### Phase 2: Bootstrap Revenue
- Sell templates built by AO ($149-$299 per vertical) — bootstrap cash
- AO Pro/Team for developers who want orchestration — primary recurring revenue
- Use AO to provision 3-5 template verticals rapidly
- Open-source what should be open, monetize AO's unique capabilities

### Phase 3: Platform
- AO Cloud for teams who don't want to self-host
- LaunchPad becomes the SDK layer that all templates share
- Template marketplace — AO-built templates for every vertical
- Marketplace for AO plugins, agent personas, and workflow packs

### Phase 4: Cloud Platform
- **LaunchApp Cloud** — the unified platform combining AO Cloud + LaunchPad BaaS
- Hosted AO orchestration (no self-hosting required)
- Hosted LaunchPad backend (managed auth, db, storage, realtime, payments)
- One-click template deployment — pick a vertical, deploy to cloud, launch
- The full vision: "I have an idea" → click → running business with AI workforce

### Phase 5: Ecosystem
- Third-party AO workflows and skill packs
- Third-party templates built on LaunchPad (powered by AO)
- AO becomes the engine others build on
- "Powered by AO" becomes the quality stamp

## The Portfolio

Every repo in launchapp-dev serves the mission:
- **The product** — AO CLI, ao-skills, brain repo
- **Revenue bootstrap** — SaaS templates (built by AO, sold to fund AO development)
- **Infrastructure** — LaunchPad BaaS SDKs, Better Auth, worktree-manager
- **Capability proofs** — design system, plugin packs (built by AO to demonstrate AO)
- **Early client work** — projects from LaunchApp's first engagements
- **Experiments** — explorations that may or may not become products

AO is the business. Templates are the bootstrap revenue AND the demo. The brain orchestrates it all.
