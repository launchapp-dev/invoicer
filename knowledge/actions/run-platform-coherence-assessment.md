---
title: "Run platform coherence assessment across all 7 product lines"
priority: critical
status: proposed
effort: medium
category: product-strategy
source_question: knowledge/questions/are-we-building-a-platform-or-a-portfolio-of-disconnected-products.md
owner: unassigned
target_repos: []
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The org operates 7 product lines across ~90 repos with no unified product identity, no single account system, no cross-sell path, and no shared analytics. Competitors like Supabase and Vercel have evolved into platforms by bundling related products under a unified identity. The org needs to decide whether it is building a platform or a portfolio — and either way, make the decision explicit and act on it. Without this decision, effort is scattered across products that may never reinforce each other.

Derived from: "Are we building a platform or a portfolio of disconnected products?"

## Scope

1. Map customer personas for each product line — who buys templates, who uses AO, who needs BaaS, who buys plugins
2. Identify persona overlaps: do template buyers want AO? Do AO users want templates?
3. Evaluate two architectures:
   - **Platform**: unified "LaunchApp" brand, shared account/billing, cross-sell paths, bundled pricing
   - **Portfolio**: independent products, separate brands, each with own GTM and pricing
4. For the platform option: estimate cost of shared Stripe customer portal + license management
5. For the portfolio option: identify which 2 products to focus on (informed by focus-single-revenue-stream action)
6. Document the decision in knowledge/products/overview.md with rationale
7. If platform: define a phased integration roadmap (shared auth → shared billing → unified dashboard)
8. If portfolio: explicitly kill or defer products outside the top 2

## Dependencies

- Should be informed by the demand validation action (run-demand-validation-saas-template)
- Should be decided in conjunction with focus-single-revenue-stream action
- Better Auth coupling audit informs shared auth feasibility

## Success Criteria

- A clear "platform" or "portfolio" decision is documented with rationale
- Product lines are either integrated (platform) or triaged (portfolio — keep, defer, or kill)
- Brand architecture is defined (branded house vs. house of brands)
- If platform: integration roadmap exists with milestones
- If portfolio: deferred products are explicitly paused

## Notes

- The "portfolio" option is safer for a solo founder — fewer integration costs, clearer focus
- The "platform" option has higher ceiling but requires shared infrastructure investment
- This decision should be made before investing in checkout, billing, or marketplace infrastructure
- Vercel's evolution (Next.js → hosting → analytics → KV → Postgres → AI) took years and hundreds of millions in funding — the org should be realistic about what's achievable at current scale
