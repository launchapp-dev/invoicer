---
title: "Draft EULA and license terms for template and design system products"
priority: high
status: proposed
effort: small
category: revenue
source_question: knowledge/questions/what-is-our-ip-protection-strategy-for-one-time-purchase-templates.md
owner: unassigned
target_repos: []
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

No EULA, terms of service, or license agreement exists for the org's digital products. Before selling templates at $149-$1,199, buyers need to know what they're purchasing: Can they redistribute? Build derivative works? Use on client projects? Share with their team? Without explicit terms, the org has no legal recourse against piracy or misuse, and buyers lack clarity on what they're entitled to.

Derived from: "What is our IP protection strategy for one-time-purchase digital products?"

## Scope

1. Research competitor license terms: ShipFast, Makerkit, Supastarter, Tailwind UI — what do their EULAs allow and prohibit?
2. Draft a EULA covering:
   - Permitted use per tier (personal, commercial, client projects, agency)
   - Redistribution prohibition (cannot resell or share the source code)
   - Derivative works (allowed for end products, not for competing templates)
   - Team usage rights per tier (1 dev, 5 devs, unlimited within org)
   - Update entitlements (lifetime updates, 1 year of updates, etc.)
   - Refund policy (14-day refund per EU Digital Products Directive)
   - Support terms (community only, email support, priority support per tier)
3. Have the EULA reviewed by a legal professional or service (e.g., Termly, iubenda)
4. Publish the EULA on the product website and include in checkout flow
5. Include a LICENSE.md in the template repos that references the full EULA

## Dependencies

- License tiers must be defined (aligns with set-up-checkout-and-license-system)
- Should be completed before first template sale
- May need legal counsel for jurisdiction-specific requirements (EU Digital Products Directive)

## Success Criteria

- A complete EULA exists covering all license tiers
- EULA is published on the website and included in checkout flow
- Buyers must accept the EULA before purchase
- License terms are clear enough that a buyer knows exactly what they can and cannot do
- EU refund policy compliance is addressed

## Notes

- Tailwind UI's license is a good reference — they handle the "template/component license" model well
- Don't over-complicate the EULA — clarity matters more than legal density
- Consider using a service like Termly or iubenda to generate a legally sound base, then customize
- The EULA should be written in plain English, not legalese, to build trust with indie developer buyers
