---
title: "Do we have customer support and documentation infrastructure ready for paying users?"
priority: high
status: open
category: operations
source_files:
  - knowledge/revenue/roadmap.md
  - knowledge/revenue/opportunities.md
  - knowledge/products/overview.md
  - knowledge/gtm/launchapp-templates.md
  - knowledge/gtm/ao-agent-orchestrator.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The revenue roadmap targets paying customers within weeks (Phase 1: Weeks 1-4), with SaaS template sales and AO Pro early access as quick wins. The GTM strategies reference distribution channels, pricing tiers, and marketing tactics in detail. But nowhere in the entire knowledge base is there mention of: user-facing documentation, API docs, setup guides, onboarding flows, support channels (email, Discord, helpdesk), refund policies, terms of service, or SLAs.

Selling a $149-$1,199 SaaS template without setup documentation turns a product into a liability. Selling a $29-$499/mo AI orchestration tool without support creates churn. The existing question about "do users want what we're building" highlights we have no users yet — but when we do get them, what happens on day 2?

## What We Know

- Revenue Phase 1 targets $2K-$8K/mo within 4 weeks
- Template pricing goes up to $1,199 (Agency tier), implying professional buyers who expect support
- AO Enterprise tier at $499/mo implies SLA-level expectations
- GTM strategies mention YouTube tutorials, blog posts, and comparison content — but these are marketing, not support docs
- The design system has Storybook (component documentation), but end-user docs are a different thing
- 90+ repos exist with varying levels of READMEs
- No helpdesk, ticketing, or support tool is mentioned anywhere
- No onboarding flow or getting-started guide for template buyers is documented

## What We Don't Know

- Where would a paying customer go to get help if they're stuck?
- Is there a setup guide that takes a buyer from purchase to running app?
- What's the expected support volume per 100 template sales?
- Who handles support — the solo founder, an AI agent, or nobody?
- Are there terms of service and refund policies drafted?
- What's the expected time-to-value for a template buyer? (minutes? hours? days?)
- Could AO itself be used to auto-generate documentation from the codebase?

## Suggested Investigation

1. **Audit existing docs**: Check each product repo for README quality, setup instructions, and inline documentation
2. **Define minimum viable support**: Before first sale, establish at minimum: setup guide, FAQ, email support address, refund policy
3. **Benchmark competitor support**: Check what ShipFast, Makerkit, and Supastarter offer buyers (Discord access, email support, video walkthroughs, documentation sites)
4. **AO-generated docs experiment**: Test whether AO can generate and maintain documentation from the codebase — this could be a unique selling point ("docs that update themselves")
5. **Support channel decision**: Choose a support model: Discord community (free, scalable), email (personal, slower), or helpdesk tool (professional, costs money)
6. **Draft terms of service**: Before accepting payment, have basic legal terms — license scope, refund window, support expectations

## Answer

_To be filled in by the team or an investigating agent._
