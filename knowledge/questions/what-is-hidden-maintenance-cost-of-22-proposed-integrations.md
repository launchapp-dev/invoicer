---
title: "What is the hidden maintenance cost of 22 proposed integration packages?"
priority: high
status: open
category: operations
source_files:
  - knowledge/ideas/integrations.md
  - knowledge/active-workstreams.md
  - knowledge/sdk-matrix.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The ideas backlog proposes 22 integration packages (I1-I22), each described as "Small" or "Medium" effort to build. But integrations are maintenance liabilities, not one-time builds. Each integration couples LaunchPad to an external API that the org doesn't control. When Stripe ships v2025-12-01 breaking changes, when Inngest releases v3, when Polar.sh pivots their API, when PostHog deprecates endpoints — each requires investigation, update, testing, and release. The flagship template already upgraded 8 packages in 7 days (orval v7→v8, hono-rate-limiter, i18next, react-email, posthog-node, tailwindcss, turbo). That's the ongoing cost for just one product.

## What We Know

- 8 dependency upgrades were needed in the flagship template in a single week. Extrapolating to 22 integration packages means potentially dozens of breaking change responses per month.
- The SDK-CONSISTENCY initiative (10 issues filed 2026-03-18) proves that even existing packages aren't maintained to a consistent standard — before adding 22 more.
- Integration packages need: initial build, documentation, tests, examples, version compatibility matrix, and ongoing maintenance for upstream API changes.
- AO agents can help with upgrades but also introduce bugs at volume (per existing question about blast radius).
- Many proposed integrations have free alternatives already (Sentry integration exists for Hono, PostHog has their own React SDK, Stripe has official Node SDK).

## What We Don't Know

- What is the actual maintenance cost per integration package per month? (engineer hours or agent runs)
- At what point does the integration portfolio become a maintenance burden that slows down core product development?
- Which of the 22 integrations do users actually need pre-built vs. can wire up themselves in an afternoon?
- Would a "recipes" documentation approach (showing users how to integrate) be more sustainable than maintained packages?

## Suggested Investigation

- Audit the maintenance history of the 3-4 integrations that already exist in the flagship template (Stripe, Resend, PostHog, Upstash). How many hours/week do they consume in upgrades, bug fixes, and compatibility work?
- Study how other BaaS platforms handle integrations: Does Supabase maintain 22 first-party integration packages, or do they provide guides and let the community build?
- For each proposed integration, determine: (a) does the external service's own SDK already work with Hono/LaunchPad, and (b) what value does a LaunchPad wrapper add beyond the native SDK?
- Estimate the total "integration tax" — if each package needs 2 hours/month of maintenance, 22 packages = 44 hours/month = one full-time engineer just on integrations.

## Answer

_To be filled in by the team or an investigating agent._
