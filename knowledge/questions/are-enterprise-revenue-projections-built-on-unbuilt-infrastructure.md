---
title: "Are enterprise revenue projections built on infrastructure that doesn't exist yet?"
priority: critical
status: open
category: revenue
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/ideas/overview.md
  - knowledge/ideas/feature-proposals.md
  - knowledge/ideas/integrations.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

Round 3 projects $160K+/month in combined enterprise revenue across three products (Auth Cloud $50K, Compliance Engine $100K, MCP Gateway at scale). These projections assume infrastructure layers that are currently unbuilt: multi-tenant hosting, edge session distribution, audit trail storage, compliance report generation, managed gateway routing, and SSO integration. The revenue timeline places Auth Cloud in months 4–8 and Compliance Engine in months 8–18.

But the infrastructure these products require is itself months of work — and that infrastructure has its own dependencies. Auth Cloud needs `launchpad-db-engine` multi-tenancy (exists) + Better Auth Admin Dashboard F23 (unbuilt) + edge session distribution (unbuilt) + billing integration (unbuilt). Each layer adds time and risk. If the infrastructure takes longer than projected, the revenue timeline shifts right, potentially creating a cash gap between Phase 1 template/plugin revenue and Phase 3 enterprise revenue.

## What We Know

- Revenue timeline has 4 phases: Immediate (weeks 1–4), Short-term (months 2–4), Medium-term (months 4–8), Long-term (months 8–18)
- Phase 1 revenue (templates, plugins) is achievable with existing infrastructure
- Phase 2–4 products require infrastructure that doesn't exist: hosting, multi-tenancy, enterprise auth, compliance pipelines
- The org has 6 active workstreams already — adding infrastructure work competes for the same execution capacity
- No existing product generates recurring revenue — all current revenue is from one-time template sales
- The "does Phase 1 revenue fund Phase 3 products or create cash gap" question exists but focuses on funding, not on whether the infrastructure itself can be built on the projected timeline
- SDK consistency work (prerequisite for LaunchPad products) hasn't started despite issues being filed

## What We Don't Know

- How long the infrastructure build-out actually takes — "Large (months)" is imprecise
- Whether the org has experience deploying and operating multi-tenant hosted services
- What the hosting and operational costs are for running Auth Cloud / MCP Gateway as managed services
- Whether Phase 1 revenue (template sales) generates enough cash to fund months of infrastructure development
- If the timeline can be compressed by using managed infrastructure providers (e.g., deploy Auth Cloud on Railway/Fly.io instead of building custom hosting)
- Whether any enterprise customer has expressed willingness to pay for these products at projected prices

## Suggested Investigation

- Break down each enterprise product into its infrastructure dependencies and estimate build time for each layer independently
- Calculate the total "infrastructure debt" — hours of foundational work required before any enterprise product can ship its v1
- Identify which infrastructure layers can be shared across products (e.g., multi-tenant hosting serves both Auth Cloud and MCP Gateway)
- Model the cash flow gap: when does Phase 1 revenue start, when do infrastructure costs peak, and when does enterprise revenue begin?
- Validate pricing assumptions by researching what similar products actually charge and what buyers report paying (not competitor list prices, but actual market rates)
- Consider whether a "managed hosting" approach (deploy customer Better Auth instances on Fly.io/Railway) could ship Auth Cloud in weeks instead of months

## Answer

_To be filled in by the team or an investigating agent._
