---
title: "Should LaunchPad integrate existing solutions before building custom BaaS components?"
priority: critical
status: open
category: product-strategy
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/ideas/integrations.md
  - knowledge/active-workstreams.md
  - knowledge/products/01-launchpad-baas.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The ideas backlog proposes building 6 major LaunchPad BaaS components from scratch: Realtime (#1, Large effort), Functions (#2, Large), Storage (#5, Medium), Jobs (#11, Medium), Vector (#10, Medium), and Webhooks (F18, Medium). Simultaneously, integration idea I22 explicitly states that integrating Inngest/Trigger.dev "gets 80% of the value in 10% of the time" compared to building LaunchPad Jobs from scratch. This logic applies to every proposed BaaS component but is only acknowledged for one.

## What We Know

- LaunchPad BaaS repos have been stale since Dec 2025-Jan 2026 with no active code development.
- The flagship template (`saas-template-launch-app-test`) already uses third-party solutions: S3 for storage, Upstash for rate limiting, Resend for email, PostHog for analytics.
- Existing integrations prove the "wrap existing services" approach works and ships faster.
- Supabase raised $100M and has 4M+ developers building these same features with large engineering teams.
- The org has a solo founder with an AI workforce — custom infrastructure is the highest-risk, highest-effort category.
- 10 SDK-CONSISTENCY issues were just filed (2026-03-18) for existing Launchpad SDKs, meaning even the current SDKs aren't consistent yet.

## What We Don't Know

- What is the actual cost of maintaining 6 custom BaaS components vs 6 thin integration wrappers?
- Does "owning the full stack" provide meaningful differentiation, or do users just want things that work?
- If LaunchPad wraps S3, Inngest, Ably, and pgvector — is it still a BaaS or just a SDK aggregator? Does that distinction matter to buyers?
- How many of the 25+ LaunchPad repos would become unnecessary if the strategy shifted to integrate-first?

## Suggested Investigation

- Audit which LaunchPad BaaS features the flagship template actually uses vs which it bypasses with third-party services. The template is the real product — if it doesn't use LaunchPad SDKs, no one else will either.
- Calculate the maintenance burden of custom BaaS components by looking at Supabase's team size for equivalent features (storage team, realtime team, functions team — each is 3-5 engineers).
- Prototype one "integrate-first" approach (e.g., wrap Inngest for Jobs) and one "build" approach (e.g., custom Jobs on Upstash) — compare time-to-ship and user experience.
- Talk to 5 SaaS template buyers and ask: do they care whether storage is "LaunchPad Storage" or "@launchpad/s3-wrapper"?

## Answer

_To be filled in by the team or an investigating agent._
