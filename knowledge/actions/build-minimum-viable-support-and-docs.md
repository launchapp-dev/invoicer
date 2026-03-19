---
title: "Build minimum viable support infrastructure and documentation before first sale"
priority: high
status: proposed
effort: medium
category: operations
source_question: knowledge/questions/do-we-have-customer-support-and-docs-infrastructure-for-paying-users.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The revenue roadmap targets paying customers within weeks, but the knowledge base contains zero mention of user-facing documentation, setup guides, support channels, refund policies, or terms of service. Selling a $149-$1,199 template without a setup guide turns a product into a support burden. Selling a $499/mo enterprise tier without SLA documentation is a non-starter. Professional buyers at the Agency ($1,199) and Enterprise ($499/mo) tiers will expect documentation and support as table stakes.

Derived from: "Do we have customer support and docs infrastructure ready for paying users?"

## Scope

1. **Setup guide**: Write a step-by-step getting-started guide for the flagship template — from purchase to running app in under 30 minutes
2. **Support channel**: Set up a Discord server with a support channel (free, scalable, builds community) and a support email address
3. **FAQ**: Create a FAQ document covering the top 10 questions a buyer would have (deployment, customization, updates, what's included)
4. **Terms of service**: Draft basic legal terms covering license scope, refund window (14-30 days), and support expectations per tier
5. **Refund policy**: Publish a clear refund policy before accepting any payments
6. **Documentation site**: Set up a basic docs site (Mintlify, Docusaurus, or similar) — even a single-page site is better than nothing

## Dependencies

- Template must be stable and buildable before setup guide can be written (depends on audit-ao-generated-code-quality)
- Terms of service should be reviewed by someone with legal knowledge
- Pricing must be finalized before tier-specific support expectations can be documented

## Success Criteria

- A buyer can go from purchase to running application by following the setup guide without external help
- A support channel exists and is linked from the purchase flow
- Terms of service and refund policy are published and linked from the checkout page
- Documentation site is live with at least: setup guide, FAQ, and architecture overview

## Notes

- Consider using AO itself to generate and maintain documentation from the codebase — this could be a unique selling point
- Discord is the standard for dev tool communities and doubles as a marketing channel
- Competitor benchmarks: ShipFast offers Discord + email support; Makerkit has full docs site; Supastarter has docs + Discord
- Don't over-invest in docs infrastructure — a well-written README and a Discord is the minimum viable version
