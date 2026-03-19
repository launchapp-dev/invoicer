---
title: "Why does the flagship template use its own @repo/* packages instead of @launchpad/* SDKs — are we building two competing stacks?"
priority: critical
status: open
category: product-strategy
source_files:
  - knowledge/repos/saas-template-launch-app-test.md
  - knowledge/repos/launchpad-saas-template.md
  - knowledge/repos/launchpad-ecosystem.md
  - knowledge/sdk-matrix.md
  - knowledge/active-workstreams.md
  - knowledge/repos/launchpad-auth-sdk.md
  - knowledge/repos/launchpad-payments-sdk.md
  - knowledge/repos/launchpad-storage-sdk.md
  - knowledge/repos/launchpad-db-sdk.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The most active repo in the org — `saas-template-launch-app-test` with 180+ PRs in 7 days — uses its own internal `@repo/auth`, `@repo/database`, `@repo/billing`, `@repo/storage`, `@repo/email` packages. Meanwhile, the Launchpad BaaS ecosystem has dedicated SDKs covering the exact same domains: `@launchpad/auth`, `@launchpad/db`, `@launchpad/payments`, `@launchpad/storage`, `@launchpad/email`. The two stacks appear to solve the same problems independently, with no documented integration path between them.

## What We Know

- `saas-template-launch-app-test` is the flagship template receiving all active AO-driven development. It uses `@repo/*` internal monorepo packages built directly on Better Auth, Drizzle, Stripe, Resend, and AWS S3.
- `launchpad-saas-template` (last pushed Jan 2026) is the older template that was designed to showcase the `@launchpad/*` SDKs.
- The `@launchpad/*` SDKs wrap similar primitives (auth, DB, payments, storage) but add their own abstraction layers.
- The two stacks use different dependency strategies: `@repo/*` packages use direct npm dependencies; `@launchpad/*` SDKs route through `@launchpad/core` via GitHub git refs.
- All active development effort is flowing into `@repo/*` packages, not `@launchpad/*` SDKs.

## What We Don't Know

- Is this divergence intentional (two products for two markets) or accidental (organic drift)?
- If the Launchpad SDKs are meant to be the platform layer, why doesn't the flagship template consume them?
- Will features built in `@repo/*` packages ever be backported to `@launchpad/*` SDKs, or are they diverging permanently?
- Does the GTM strategy account for this split — are we selling "LaunchApp templates" and "LaunchPad BaaS" as separate products, or is LaunchPad supposed to power LaunchApp?
- What happens to customers who buy a template and later want BaaS SDK features?

## Suggested Investigation

1. Map the feature overlap: for each `@repo/*` package, identify the corresponding `@launchpad/*` SDK and document what each provides that the other doesn't.
2. Interview the founder: was this split a deliberate architectural decision or did the template evolve independently?
3. Make a strategic choice: either (a) migrate the flagship template to consume `@launchpad/*` SDKs, making them the proven foundation, or (b) formally deprecate the `@launchpad/*` SDKs and extract any unique value into the `@repo/*` packages.
4. Update the GTM strategy to reflect whichever path is chosen.

## Answer

_To be filled in by the team or an investigating agent._
