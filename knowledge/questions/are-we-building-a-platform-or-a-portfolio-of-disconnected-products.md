---
title: "Are we building a platform or a portfolio of disconnected products?"
priority: critical
status: answered
answered_by: Sami (Shooksie)
answered_at: 2026-03-19
category: product-strategy
source_files:
  - knowledge/products/overview.md
  - knowledge/products/dependency-graph.md
  - knowledge/architecture.md
  - knowledge/revenue/overview.md
  - knowledge/gtm/overview.md
  - knowledge/ideas/overview.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The org operates 7 product lines across ~90 repos: LaunchPad BaaS, AO Agent Orchestrator, LaunchApp Templates, Developer Tools, Claude Code Plugin Packs, Websites, and Design System. The dependency graph shows some connections (Better Auth used across products, design system shared), but each product line has its own GTM strategy, pricing model, competitive landscape, and target audience. There is no unified product identity, no single account system, no cross-sell path documented, and no shared analytics. This raises a fundamental strategic question: are these products stronger together as an integrated platform, or are they better positioned as independent offerings?

## What We Know

- 7 product lines serve different audiences: BaaS targets app developers, AO targets AI-first teams, templates target indie hackers, plugins target Claude Code users
- Some shared infrastructure exists: Better Auth (auth), design system (UI), AO (development automation)
- Revenue roadmap treats each product as independent line item with separate pricing
- GTM plans are product-specific with different launch channels
- The "brain" repo attempts to coordinate across all products but focuses on development operations, not product integration
- Bundle pricing is mentioned in revenue/opportunities ($499 AI Dev Toolkit, $999 Enterprise Suite) but not developed
- No unified dashboard, account system, or customer portal exists across products
- Competitors increasingly bundle: Supabase (BaaS + Auth + Storage + AI), Vercel (Hosting + Analytics + KV + Postgres)

## What We Don't Know

- Whether customers of one product would naturally want another (e.g., do template buyers want AO?)
- What the cross-sell conversion rate might be between product lines
- Whether a unified "launchapp.dev" platform identity would be stronger than individual product brands
- If bundling would increase perceived value or just confuse positioning
- Whether the org's limited resources are better spent deepening one product or broadening the portfolio
- What a shared account/billing system would cost to build vs. the revenue it would unlock
- Whether the current fragmentation is a strategic advantage (modularity) or a weakness (dilution)

## Suggested Investigation

1. Map customer personas across all 7 product lines — how much overlap exists?
2. Design a hypothetical unified product page and test whether the narrative is coherent
3. Evaluate whether AO + Templates is a natural bundle ("AI-maintained SaaS starter") vs. AO standalone
4. Decide on brand architecture: branded house (all under "LaunchApp") vs. house of brands (separate identities)
5. Calculate the cost of a shared Stripe customer portal + license management system
6. Study how Vercel evolved from Next.js hosting to a platform (Hosting → Analytics → KV → Postgres → AI) — is there a comparable path?
7. Run a prioritization exercise: if forced to pick 2 of 7 product lines, which two generate the most revenue and learning?

## Answer

**A cohesive portfolio — not disconnected, but not a monolithic platform either.**

The vision is: **make it easy to launch apps. Rocket-launch businesses through software enablement.**

Every product in the org exists to serve that mission:
- **LaunchApp templates** — the starting point for launching an app
- **LaunchPad BaaS/SDKs** — the backend infrastructure that powers those apps
- **AO** — the AI workforce that builds, maintains, and ships those apps
- **Better Auth** — the auth layer across all of them
- **Design System** — the UI layer across all of them
- **Plugin packs** — extend the AI workforce's capabilities

The portfolio of repos is either: (a) the team attempting to build parts of this vision, or (b) early client/project work from LaunchApp's first engagements.

Products should be cohesive — they reinforce each other. But they're not one giant monolith. Each can stand alone while being better together.
