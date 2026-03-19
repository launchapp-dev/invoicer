---
title: "Are revenue projections double-counting by listing the same capability as both a standalone product and a paid feature?"
priority: high
status: open
category: revenue
source_files:
  - knowledge/revenue/overview.md
  - knowledge/revenue/opportunities.md
  - knowledge/ideas/round-1-new-products.md
  - knowledge/ideas/round-2-features-integrations.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The refreshed revenue analysis evaluates 25 new product ideas alongside 23 feature proposals, projecting combined MRR of $30K–$120K. However, several capabilities appear in both lists — once as a standalone product with its own revenue projection, and again as a feature enhancement to an existing product. If customers buy the feature within the parent product, they are unlikely to also pay for the standalone version. This creates a risk of overstating total addressable revenue.

## What We Know

- **AO Observability** (#9, $5K–$30K/mo standalone) overlaps significantly with **F11 Cost Analytics & Budget Controls** (feature of AO CLI, included in Pro/Team tiers).
- **AO Autopilot** (#14, premium tier add-on) and **F16 Agent Memory & Context Persistence** (AO feature) address the same underlying need — agents that learn and improve — from different angles.
- **Better Auth Admin Dashboard** (F23, $29/mo Pro) is listed as both a standalone revenue line and a natural extension of Better Auth's open-source ecosystem.
- **Workflow Marketplace** (F17) and **LaunchApp Marketplace** (#4) and **Plugin Marketplace** are three marketplace concepts with overlapping inventory and buyer pools (already noted in existing question #22, but the revenue double-count is not addressed there).
- The revenue overview sums individual product MRR ranges without adjusting for overlap or cannibalization between products sharing the same capability.

## What We Don't Know

- What is the net revenue after deduplicating overlapping products/features? Could the $30K–$120K range shrink by 15–25%?
- For each overlap, which monetization path is primary — standalone product or feature within parent product?
- Whether customers would perceive standalone observability (AO Observability) as distinct from in-product analytics (F11) enough to pay separately.
- How the pricing team (if one exists) plans to bundle vs. unbundle these capabilities.
- Whether the revenue model intentionally counts both paths as hedging (either path generates revenue) or accidentally double-counts.

## Suggested Investigation

1. Map every standalone product to its feature-level counterpart and identify exact overlaps.
2. For each overlap, decide: is this a standalone product OR a feature of the parent product? Eliminate the duplicate from revenue projections.
3. Re-calculate the MRR range with deduplicated products to get a realistic floor.
4. Design a bundling strategy: which capabilities are included in base tiers vs. sold as add-ons vs. standalone products?
5. Survey the pricing approach of comparable multi-product dev tool companies (Vercel, Supabase, Datadog) to see how they handle feature vs. product boundaries.

## Answer

_To be filled in by the team or an investigating agent._
