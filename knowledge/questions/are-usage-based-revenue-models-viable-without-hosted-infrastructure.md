---
title: "Are usage-based revenue models viable for LaunchPad products without a hosted infrastructure layer?"
priority: critical
status: open
category: revenue
source_files:
  - knowledge/revenue/overview.md
  - knowledge/revenue/opportunities.md
  - knowledge/revenue/pricing-analysis.md
  - knowledge/ideas/round-1-new-products.md
  - knowledge/ideas/round-2-features-integrations.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The refreshed revenue analysis proposes usage-based pricing for at least four new products: LaunchPad Jobs (#11), LaunchPad Vector (#10), LaunchPad Functions (#2), and LaunchPad Storage (#5). Combined, these represent a significant portion of Phase 3–4 revenue. However, usage-based pricing requires metering infrastructure, billing pipelines, hosting, and operational tooling that do not exist today. LaunchPad BaaS is currently a collection of TypeScript SDKs with no managed cloud layer.

## What We Know

- LaunchPad Jobs, Vector, Functions, and Storage are all proposed with usage-based or freemium-plus-usage pricing models.
- LaunchPad has no hosted infrastructure — all SDKs are self-hosted by the developer.
- AO Cloud (#3, Phase 4) is the only proposed hosting product, but it targets agent orchestration, not BaaS workloads.
- Supabase, the primary competitor, has mature infrastructure for all four capabilities (Edge Functions, pgvector, Storage, pg_cron/pg_net).
- The revenue roadmap places these products in Phases 3–4 (months 4–18), suggesting they depend on earlier revenue to fund development.
- 78% of dev tools now use consumption-based models, but these require operational maturity to execute.

## What We Don't Know

- What infrastructure investment is required to host and meter usage-based products (compute, storage, networking, billing)?
- Whether the org intends to build hosting infrastructure, partner with a cloud provider, or pivot these to self-hosted-only models.
- What the unit economics look like — can usage-based LaunchPad products achieve positive margins against AWS/GCP underlying costs?
- Whether self-hosted SDKs with usage-based pricing (a contradiction) is the actual plan, or if "usage-based" assumes a future cloud layer.
- How metering, billing, and rate limiting would work without a managed control plane.

## Suggested Investigation

1. Clarify whether each usage-based product assumes a hosted (managed) or self-hosted deployment model.
2. Estimate infrastructure costs for hosting each product at 100, 1K, and 10K developer scale.
3. Research billing/metering solutions (Stripe Billing, Orb, Lago) and estimate integration effort.
4. Model unit economics: what margin does a $0.001/request pricing achieve against actual compute costs?
5. Evaluate whether converting these to tiered subscription pricing (like Supabase) is simpler and more realistic for a solo-founder org.

## Answer

_To be filled in by the team or an investigating agent._
