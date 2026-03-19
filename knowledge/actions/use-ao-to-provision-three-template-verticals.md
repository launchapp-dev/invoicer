---
title: "Use AO to provision three sellable template verticals from one shared foundation"
priority: high
status: proposed
effort: large
category: product-strategy
source_question: knowledge/questions/are-we-building-a-platform-or-a-portfolio-of-disconnected-products.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
  - launchapp-lite
  - launchapp-lite-v2
  - brain
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The answered portfolio question says the org is building a cohesive portfolio: templates are the starting point, LaunchPad SDKs provide the backend primitives, and AO is the workforce that builds and maintains them. A concrete way to operationalize that answer is to use AO to turn one shared template foundation into multiple sellable verticals instead of maintaining disconnected products.

## Scope

1. Designate one canonical template foundation with the shared primitives every vertical needs: auth, billing, admin, email, storage, docs, and deployment
2. Define the three initial verticals explicitly:
   - AI SaaS
   - Marketplace
   - E-commerce
3. Identify what is shared versus what is vertical-specific for each one so the org does not create three long-lived forks
4. Build AO workflows, prompts, and playbooks that can provision each vertical from the common foundation with predictable output
5. Generate one demo instance of each vertical, smoke-test the flows, and document what still requires manual work
6. Turn the resulting output into sellable template packages with clear positioning, feature tables, and upgrade path

## Dependencies

- Should follow [consolidate-saas-template-repos.md](consolidate-saas-template-repos.md) so there is one canonical base
- Strongly benefits from [decide-launchpad-baas-fate.md](decide-launchpad-baas-fate.md), which now serves as the LaunchPad SDK re-architecture track
- Checkout for any template sale depends on [set-up-checkout-and-license-system.md](set-up-checkout-and-license-system.md)

## Success Criteria

- One canonical template foundation exists with documented shared modules
- AO can provision all three verticals from the same base workflow
- Each vertical has a demo build and a feature matrix showing what is shared and what is specific
- Shared code remains dominant; the vertical strategy does not create three near-identical maintenance burdens

## Notes

- The point is leverage, not volume
- If a vertical requires major bespoke infrastructure, it should be dropped rather than maintained as a special case
- AO should generate repeatable variants, not one-off marketing demos
