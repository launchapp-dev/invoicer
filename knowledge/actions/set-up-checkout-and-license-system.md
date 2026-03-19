---
title: "Set up checkout platform and license key system for digital products"
priority: high
status: proposed
effort: medium
category: revenue
source_question: knowledge/questions/what-is-our-ip-protection-strategy-for-one-time-purchase-templates.md
owner: unassigned
target_repos:
  - launchapp-lite
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The revenue model relies on one-time purchases for templates ($149-$1,199) and design system licenses ($149-$349), but no checkout system, license enforcement, or delivery mechanism is documented. Source-code products are inherently copiable — without a license key system, the org relies on honor-system compliance. At projected volumes of 10-50 sales/month, even modest piracy significantly impacts revenue. Competitors use Lemon Squeezy or Gumroad with built-in license management.

Derived from: "What is our IP protection strategy for one-time-purchase digital products?"

## Scope

1. Evaluate checkout platforms: Lemon Squeezy (built for digital products, handles VAT), Paddle (tax compliance), Polar.sh (already referenced in templates), Stripe direct (most control, most work)
2. Choose a platform and integrate checkout for template purchases
3. Implement license key generation: one key per purchase, tied to buyer email
4. Set up product delivery: private GitHub repo invite or download portal gated by license key
5. Define license tiers explicitly:
   - Lite ($149): 1 developer, 1 project
   - Pro ($299): 1 developer, unlimited projects
   - Team ($599): up to 5 developers, unlimited projects
   - Agency ($1,199): unlimited developers within one organization
6. Build a simple license verification: CLI command or env var check that validates the key on first setup (not runtime DRM)
7. Create a customer portal for license management, downloads, and update access

## Dependencies

- Must decide on single vs. multiple template repos first (consolidate-saas-template-repos)
- Revenue focus decision (focus-single-revenue-stream) determines urgency
- Need legal review for EULA terms (see draft-eula-for-digital-products action)

## Success Criteria

- A working checkout flow exists: landing page → payment → license key → product delivery
- License keys are generated and tracked per purchase
- Buyers can access product downloads via a portal or automated repo invite
- License tiers are documented and enforced in the checkout flow
- VAT/tax compliance is handled by the chosen platform

## Notes

- Don't over-invest in anti-piracy — source code products are inherently leaky. Focus on making the legitimate purchase experience frictionless
- Lemon Squeezy is the strongest option for digital product sellers (handles VAT, license keys, and product delivery natively)
- Consider a hybrid model: one-time purchase for current version + optional $49/year subscription for updates
- The checkout system is a prerequisite for any revenue — this blocks Phase 1 revenue targets
