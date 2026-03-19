---
title: "Define brand architecture: unified platform vs. independent product brands"
priority: high
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/are-we-building-a-platform-or-a-portfolio-of-disconnected-products.md
owner: unassigned
target_repos: []
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The org uses multiple brand names across products: LaunchPad (BaaS), LaunchApp (templates, studio), AO (orchestrator), plus unnamed plugin packs and design system. There is no documented brand architecture — no decision on whether everything should live under one umbrella (branded house like "LaunchApp") or remain as separate brands (house of brands). This affects domain strategy, marketing spend, customer trust accumulation, and SEO.

Derived from: "Are we building a platform or a portfolio of disconnected products?"

## Scope

1. Document the current brand landscape: list all product names, domains, and social accounts
2. Evaluate two options:
   - **Branded house** ("LaunchApp"): AO becomes "LaunchApp AO," templates become "LaunchApp Templates," all under launchapp.dev
   - **House of brands**: AO stays independent (ao.dev or similar), LaunchApp for templates, LaunchPad sunsetted
3. For each option, assess: domain availability, SEO impact, marketing simplicity, customer confusion risk
4. Make a decision and document it in knowledge/products/overview.md
5. If branded house: create a brand guidelines doc covering naming conventions, visual identity, and tone
6. If house of brands: ensure each product has its own clear positioning without competing for attention

## Dependencies

- Should follow the platform coherence assessment (run-platform-coherence-assessment)
- Informed by the revenue focus decision (focus-single-revenue-stream)
- If LaunchPad BaaS is sunsetted (decide-launchpad-baas-fate), that simplifies the brand landscape

## Success Criteria

- Brand architecture is documented with rationale
- All product names and domains are consistent with the chosen architecture
- Marketing materials and READMEs reflect the decided naming convention
- No customer-facing brand confusion between products

## Notes

- The "LaunchPad" vs "LaunchApp" naming is already confusing — resolving this is overdue
- A solo founder benefits from a single brand (one social account, one blog, one newsletter) over multiple
- The brand decision should be made before any Product Hunt or Show HN launch to avoid fragmenting launch buzz
- AO has the strongest standalone identity ("180 PRs in 7 days") — it may warrant its own brand regardless of the overall decision
