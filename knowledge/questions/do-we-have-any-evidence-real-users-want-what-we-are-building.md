---
title: "Do we have any evidence that real users want what we're building?"
priority: critical
status: open
category: product-strategy
source_files:
  - knowledge/active-workstreams.md
  - knowledge/revenue/opportunities.md
  - knowledge/revenue/roadmap.md
  - knowledge/products/overview.md
  - knowledge/gtm/overview.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The org has shipped an impressive amount of code — 180+ AI-merged PRs on the flagship SaaS template in 7 days, 15+ plugin packs, a design system through Phase 3-4, and a sophisticated AO CLI with self-healing pipelines. Revenue projections estimate $15K-$60K MRR at 12 months across 9 revenue streams.

However, across the entire knowledge base there is zero mention of: actual users, paying customers, download counts, npm install metrics, GitHub stars on key repos, waitlist signups, user interviews, beta testers, or any form of demand validation. The GTM strategy references "social proof" and "testimonials from early buyers" as things to collect — implying none exist yet.

## What We Know

- The flagship SaaS template is feature-complete with auth, billing, email, storage, admin, i18n, Docker deployment
- The AO CLI is sophisticated with multi-model routing, self-healing, and workflow automation
- The design system is progressing through advanced component phases
- 15 plugin packs were scaffolded in a 2-day batch
- Revenue projections assume 200-800 template sales/year and 100-500 AO Pro subscribers
- Competitor products (ShipFast, Makerkit, Supastarter) have established customer bases

## What We Don't Know

- Has anyone outside the org used any of these products?
- What are the actual npm download numbers for public packages (ao-cli, design-system, better-auth fork, openapi-gen)?
- Are there any GitHub stars, issues, or discussions from external users?
- Has anyone expressed interest in paying for a SaaS template built on React Router 7 + Hono (vs. the dominant Next.js ecosystem)?
- Is the "not Next.js" positioning a differentiator or a limitation? (85%+ of SaaS templates use Next.js/App Router)
- Do developers actually want a local-first CLI orchestrator, or do they prefer cloud-hosted solutions like Devin ($20/month)?

## Suggested Investigation

1. **Check public repo metrics now**: GitHub stars, forks, issues, and npm downloads for ao-cli, design-system, better-auth, worktree-manager, openapi-gen
2. **Run a demand test before building checkout**: Create a landing page with pricing for the flagship template and measure click-through on "Buy Now" before implementing payment infrastructure
3. **Survey the React Router community**: Post in React Router Discord/GitHub Discussions asking if developers want a production SaaS template for RR7 + Hono
4. **Identify 5 potential beta users**: Reach out to indie hackers or startup founders who might use the template — get real feedback before optimizing revenue projections
5. **Track the "build vs. validate" ratio**: How much time is spent shipping features vs. talking to potential users? If it's 99/1, the revenue projections are speculative

## Answer

_To be filled in by the team or an investigating agent._
