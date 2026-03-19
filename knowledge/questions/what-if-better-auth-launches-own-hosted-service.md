---
title: "What if Better Auth launches its own hosted service and directly competes with LaunchPad Auth Cloud?"
priority: high
status: open
category: product-strategy
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/competitive/better-auth.md
  - knowledge/revenue/overview.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

LaunchPad Auth Cloud (#19) proposes building a managed hosting service for Better Auth, pricing it at 1/3 to 1/5 of Clerk/Auth0. But Better Auth just raised $5M from Peak XV and YC, and is the fastest-growing JS auth library. Well-funded open-source companies almost always launch hosted offerings — it's the standard open-core monetization playbook. Supabase did it, PlanetScale did it, Neon did it. If Better Auth launches their own hosted service, LaunchPad Auth Cloud would be competing against its own upstream dependency.

## What We Know

- Better Auth raised $5M with YC backing — strong signal they'll build a business, not just a library.
- The existing question "what is our risk if Better Auth diverges from our needs" addresses technical divergence, but not competitive divergence.
- LaunchPad Auth Cloud's value proposition (#19) is "same features as Clerk at 1/5 the price" — but Better Auth could undercut this by offering their own hosted tier with native integrations no downstream wrapper can match.
- The org's deep Better Auth expertise is real but replicable — Better Auth's own team obviously has deeper expertise.
- Revenue analysis projects LaunchPad Auth Cloud at $4K–$50K/month — meaningful enough to be painful if disrupted.

## What We Don't Know

- Whether Better Auth has plans for a hosted offering (their fundraise strongly suggests yes, but no public announcement exists).
- How quickly they could ship one — a well-funded team with full codebase ownership could move faster than a downstream wrapper.
- Whether the org's admin dashboard (F23) and migration tooling create enough differentiation to survive competition from upstream.
- What contractual or licensing protections exist if Better Auth changes their open-source license (the Redis/Terraform precedent).

## Suggested Investigation

- Review Better Auth's license terms for any hosted-service restrictions or competitor clauses.
- Monitor Better Auth's job postings, GitHub discussions, and investor communications for signals about a hosted product.
- Assess whether LaunchPad Auth Cloud's differentiation (admin dashboard, migration tools, LaunchPad integration) is defensible if Better Auth ships native equivalents.
- Consider whether the investment in Auth Cloud would be better spent on owning the auth layer entirely (fork or build) vs. wrapping a dependency.
- Evaluate the Supabase Auth precedent — they built their own auth layer rather than depending on an external library.

## Answer

_To be filled in by the team or an investigating agent._
