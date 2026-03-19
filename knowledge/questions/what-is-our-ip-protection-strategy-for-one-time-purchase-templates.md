---
title: "What is our IP protection strategy for one-time-purchase digital products?"
priority: high
status: open
category: revenue
source_files:
  - knowledge/revenue/pricing-analysis.md
  - knowledge/revenue/opportunities.md
  - knowledge/gtm/launchapp-templates.md
  - knowledge/products/03-launchapp-templates.md
  - knowledge/products/05-claude-code-plugin-packs.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The revenue model relies heavily on one-time purchases for templates ($149-$1,199) and design system licenses ($149-$349). These are source-code products — once purchased, the buyer has the full codebase. There is no mention of license enforcement, terms of service, EULA, or anti-piracy measures anywhere in the knowledge base. Competitors like ShipFast and Makerkit face the same challenge but use Lemon Squeezy or Gumroad with license key verification. At projected volumes of 10-50 sales/month, even modest piracy rates significantly impact revenue.

## What We Know

- Template pricing: Lite $149, Pro $299, Team $599, Agency $1,199 (one-time)
- Design system: $149 one-time (Pro), $349 one-time (Team)
- Revenue Phase 1 targets 10-30 template sales/month ($1.5K-$9K/month)
- Products are source code delivered as git repos — inherently copiable
- Competitors use platforms with built-in license management (Lemon Squeezy, Gumroad, Paddle)
- No checkout system is documented yet — revenue Phase 1 "needs checkout" setup
- Plugin marketplace plans 70/30 revenue split — requires payment infrastructure
- Agency tier at $1,199 implies multiple team members using one purchase

## What We Don't Know

- Whether a license key system is planned or if products will be honor-system
- What payment/checkout platform will be used (Stripe direct, Lemon Squeezy, Paddle, Polar.sh)
- How updates will be delivered post-purchase (private GitHub repo access, npm registry, download portal)
- What the EULA/license terms will be (per-project, per-developer, per-organization)
- Whether the Agency tier includes a team license or is single-developer with agency rights
- How competitors handle piracy and what their observed piracy rates are
- Whether a subscription model (access to updates) would be more sustainable than one-time purchase
- Legal requirements for selling digital products in different jurisdictions (VAT, refund policies)

## Suggested Investigation

1. Research how ShipFast, Makerkit, and Supastarter handle license enforcement and delivery
2. Evaluate checkout platforms: Lemon Squeezy (built for digital products), Paddle (handles VAT/tax), Polar.sh (already integrated in template)
3. Define license tiers: what exactly does Lite vs Pro vs Team vs Agency entitle the buyer to?
4. Decide on update delivery: private repo invite, npm scope, download portal, or CLI-based updates
5. Draft a EULA covering redistribution, derivative works, and team usage
6. Consider a hybrid model: one-time purchase for current version + optional subscription for updates
7. Research EU Digital Products Directive requirements for refund policies

## Answer

_To be filled in by the team or an investigating agent._
