---
title: "Consolidate three marketplace proposals into a single unified marketplace"
priority: high
status: proposed
effort: medium
category: product-strategy
source_question: knowledge/questions/do-three-proposed-marketplaces-cannibalize-each-other.md
owner: unassigned
target_repos:
  - launchapp-marketplace
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The ideas backlog proposes three separate marketplace products: LaunchApp Marketplace (templates/plugins, priority 8/10), AO Skill Marketplace (AO skills, 8/10), and AO Workflow Marketplace (workflow packs, 8/10) — plus Claude Code Skill Studio implies a fourth. Each requires payment infrastructure, discovery UI, search, creator tools, review systems, and version management. Building even one marketplace to critical mass takes years with dedicated teams. A solo-founder org cannot staff three simultaneously, and splitting inventory across three surfaces makes each one feel empty.

Derived from: "Do three proposed marketplaces cannibalize each other and exceed our capacity to build?"

## Scope

1. **Kill the three-marketplace plan.** Document that LaunchApp Marketplace, AO Skill Marketplace, and AO Workflow Marketplace are consolidated into a single storefront
2. **Design a single unified marketplace** at launchapp.dev that sells templates, skills, and workflow packs under one payment system with category-based navigation
3. **Define minimum viable catalog**: determine the minimum number of items per category needed to launch (likely 10 quality items per category = 30 total)
4. **Validate demand first**: before building any marketplace infrastructure, check whether any AO CLI users or template buyers have ever requested a marketplace — if this is a supply-push idea with zero demand signal, deprioritize entirely
5. **Build shared infrastructure once**: single payment integration (Stripe), single review system, single creator onboarding flow
6. **Set a launch gate**: marketplace only launches when at least one category has 10+ quality items with real content (not scaffolds)

## Dependencies

- Depends on verify-plugin-pack-implementations — marketplace needs real content, not scaffolds
- Depends on audit-and-test-plugin-pack-viability — free adoption should be tested before paid marketplace
- Depends on focus-single-revenue-stream — marketplace may be deferred entirely if templates or AO Pro is the chosen focus

## Success Criteria

- A single marketplace architecture document replaces three separate marketplace proposals
- One payment integration handles all product types
- Catalog has minimum viable content in at least one category before launch
- At least one demand signal (user request, waitlist signup) validates that buyers exist

## Notes

- Study comparable marketplaces: Vercel templates, Raycast extensions, VS Code marketplace — how long to reach 50+ community items?
- The combined catalog (templates + skills + workflows) may feel richer than three empty marketplaces
- Consider whether the marketplace is even needed at all — direct sales of a curated bundle might outperform a discovery platform with sparse inventory
- This consolidation reduces engineering effort by roughly 2/3 compared to three separate builds
