---
title: "What is our legal and compliance readiness to accept payments from customers?"
priority: critical
status: open
category: operations
source_files:
  - knowledge/revenue/opportunities.md
  - knowledge/active-workstreams.md
  - knowledge/products/03-launchapp-templates.md
  - knowledge/questions/do-we-have-customer-support-and-docs-infrastructure-for-paying-users.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The revenue roadmap targets quick wins "within weeks" — selling SaaS templates ($149–$1,199), AO Pro early access ($29/month), and GitHub Sponsors. These involve accepting real money from real people. But the knowledge base contains zero documentation about business entity structure, terms of service, privacy policy, GDPR compliance, refund policy, tax handling, or payment processor setup.

The existing question about "support and docs infrastructure" covers operational readiness. This question specifically addresses legal and regulatory readiness — the things that create liability exposure if missing when money changes hands.

## What We Know

- Revenue Phase 1 targets template sales and AO Pro subscriptions as quick wins
- Pricing is defined ($149–$1,199 for templates, $29/month for AO Pro)
- Stripe and Polar.sh are referenced as payment processors in the flagship template
- The template itself includes billing integration — but for end-users of the template, not for selling the template
- No terms of service, EULA, or license agreement is documented in the knowledge base
- No privacy policy is documented (required by GDPR for any EU user data, required by most payment processors)
- No business entity structure is documented (sole proprietorship? LLC? International implications?)
- No tax handling strategy is documented (digital goods sales tax varies by jurisdiction — EU VAT, US state nexus)
- 15 plugin packs are scaffolded with revenue projections but no license terms
- The IP protection question identifies the need for license enforcement but not the underlying legal framework

## What We Don't Know

- What business entity exists to accept payments (and in which jurisdiction)
- Whether a lawyer has reviewed the planned revenue model for digital goods
- What refund policy will apply (payment processors require one)
- How sales tax / VAT will be handled (Stripe Tax? Manual? Ignored?)
- Whether GDPR applies (it does if any EU-based developer purchases)
- What license terms govern template purchases (perpetual? Updates included? Seats?)
- Whether the "lifetime updates" promise in pricing has legal implications
- What happens if a paying customer's production app breaks due to a template bug — is there liability?
- Whether Lemon Squeezy or Gumroad (commonly used by template sellers) handle more of this than Stripe

## Suggested Investigation

1. **Entity audit:** Document current business entity structure, jurisdiction, and tax status
2. **Legal checklist:** Create a pre-revenue legal checklist: ToS, privacy policy, EULA, refund policy, cookie policy
3. **Platform comparison:** Evaluate Lemon Squeezy vs. Stripe vs. Gumroad — which handles the most legal/tax burden for digital goods sellers?
4. **Competitor templates:** Download the ToS/EULA from ShipFast, Makerkit, and Supastarter as reference models
5. **GDPR assessment:** Determine if personal data is collected (email for license keys = yes) and create a minimal compliant privacy policy
6. **Tax strategy:** Decide on sales tax approach — Stripe Tax automates US + EU, or use a merchant of record (Paddle, Lemon Squeezy) to offload entirely

## Answer

_To be filled in by the team or an investigating agent._
