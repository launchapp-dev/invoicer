---
title: "Run competitive pricing research and raise launch price for SaaS template Lite tier"
priority: high
status: proposed
effort: small
category: revenue
source_question: knowledge/questions/are-we-underpricing-products-relative-to-competitor-benchmarks.md
owner: unassigned
target_repos: []
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The Lite template tier is priced at $149 while the closest competitor (ShipFast) charges $199 for a simpler product and premium competitors charge $299-$1,499. With near-100% gross margins (BYOK model), there's no cost-based reason for floor pricing. Low pricing risks signaling low quality to professional buyers (agencies, teams) who associate price with production-readiness and support. It's always easier to discount from a higher price than to raise prices after launch.

Derived from: "Are we underpricing our products relative to competitor benchmarks?"

## Scope

1. Research competitor revenue signals: ShipFast testimonial count, Makerkit team size, Supastarter public metrics — estimate what prices the market actually bears
2. Compare feature depth side-by-side: list what our template includes vs ShipFast ($199) and Makerkit ($349/yr) to justify premium pricing
3. Raise Lite tier launch price to $249 (minimum) — document the pricing rationale
4. Research AO pricing against DevOps/CI infrastructure tools ($50-$200/seat/mo) rather than code assistants ($20/mo) — AO's value proposition is closer to infrastructure automation
5. Consider raising AO Pro from $29/mo to $49/mo to avoid positioning as a budget tool against VC-subsidized competitors
6. Update all pricing references in knowledge/revenue/ and knowledge/gtm/ docs

## Dependencies

- Should be decided before payment infrastructure is live and prices are public
- Demand validation results (run-demand-validation-saas-template) can inform but should not block — launch higher and adjust based on data

## Success Criteria

- Launch pricing is documented and justified with competitive benchmarks
- Lite tier is priced at or above $249
- AO Pro pricing decision is documented with rationale
- A pricing experiment plan exists for post-launch (e.g., test $299 vs $249 after 30 days)

## Notes

- With zero current customers, there's no installed base to upset with higher prices
- "Launch high, discount strategically" is lower-risk than "launch low, try to raise later"
- Enterprise buyers often have minimum price thresholds for procurement — $149 may not even enter their evaluation
- The BYOK model is a strong margin story that justifies premium positioning
