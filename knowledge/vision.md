# LaunchApp Vision

## Mission

**Streamline the process for founders to launch businesses and for businesses to grow and manage themselves.**

## What This Means

LaunchApp solves two problems:

1. **Launch** — Getting from "I have an idea" to "I have a running business" in days, not months. We eliminate the technical barriers that slow founders down: infrastructure, auth, payments, deployment, CI/CD.

2. **Grow & Manage** — Once launched, the business runs and improves itself. AO agents maintain the codebase, ship features, fix bugs, review PRs, and keep dependencies current — 24/7, autonomously. The founder focuses on customers and growth, not code maintenance.

This is the full lifecycle: **launch fast → grow autonomously → scale with AI.**

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
- **AO Pro** for indie devs and small teams — primary recurring revenue
- Use AO to provision 3-5 template verticals rapidly
- Open-source what should be open, monetize AO's unique capabilities

### Phase 3: Platform + Enterprise
- **AO Enterprise** — on-prem/private cloud deployment for companies that can't use SaaS
  - SSO/SAML, audit logs, RBAC, compliance controls
  - Fleet management across org repos (what the brain does, but for their org)
  - Custom model routing policies (approved models only, cost controls)
  - SLA-backed support
- AO Cloud for teams who don't want to self-host
- LaunchPad becomes the SDK layer that all templates share
- Template marketplace — AO-built templates for every vertical

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

## AO Product Tiers

| Tier | Target | Price | Key Features |
|------|--------|-------|--------------|
| **AO Open Source** | Individual devs | Free | CLI, single-repo, community workflows |
| **AO Pro** | Indie hackers, small teams | $29-49/seat/mo | Multi-repo, scheduled workflows, priority model routing, brain-like planner |
| **AO Team** | Startups, small companies | $99-149/seat/mo | Fleet management, shared workflow library, team dashboards, plugin marketplace access |
| **AO Enterprise** | Companies, regulated industries | Custom pricing | On-prem/private cloud, SSO/SAML, audit logs, RBAC, compliance controls, SLA support, custom model policies |
| **AO Cloud** | Everyone (managed) | Usage-based | Hosted orchestration, no CLI needed, API access, integrations |

## Content & Tutorials

Tutorials serve two purposes: **acquisition** (free content brings developers in) and **revenue** (paid content for advanced use cases).

### Free Tutorials (Acquisition)
- Getting started with AO CLI
- Your first autonomous workflow
- Setting up AO in an existing repo
- How AO worktrees keep parallel agents safe
- Building a brain repo for your org
- AO + Claude Code integration guide

### Paid Tutorials / Courses
- **"Ship a SaaS in a Weekend with AO"** — full course ($49-99)
- **"Enterprise AO: Fleet Management at Scale"** — advanced course ($149-299)
- **"Building Custom AO Workflows"** — deep-dive ($79)
- **"AO + LaunchPad: Full-Stack AI Development"** — comprehensive ($199)

### Content Strategy
- Blog posts and tutorials on launchapp.dev
- YouTube/video walkthroughs of AO building things live
- "AO built this" case studies showing real repos
- Community guides contributed by users

The brain can generate tutorial drafts via the product-doc-writer agent. AO itself can be used to maintain and update tutorials as features change.

## The Portfolio

Every repo in launchapp-dev serves the mission:
- **The product** — AO CLI, ao-skills, brain repo
- **Revenue bootstrap** — SaaS templates (built by AO, sold to fund AO development)
- **Infrastructure** — LaunchPad BaaS SDKs, Better Auth, worktree-manager
- **Capability proofs** — design system, plugin packs (built by AO to demonstrate AO)
- **Early client work** — projects from LaunchApp's first engagements
- **Experiments** — explorations that may or may not become products

AO is the business. Templates are the bootstrap revenue AND the demo. The brain orchestrates it all.
