---
title: "Why is LaunchPad BaaS still maintained if templates use @repo/* packages instead?"
priority: high
status: open
category: product-strategy
source_files:
  - knowledge/products/01-launchpad-baas.md
  - knowledge/sdk-matrix.md
  - knowledge/architecture.md
  - knowledge/active-workstreams.md
  - knowledge/questions/should-we-sunset-open-source-or-revive-launchpad-baas.md
generated_by: question-generator
generated_at: 2026-03-30
---

## Context

The flagship template (launchapp-react-router) and all framework variants use internal `@repo/*` packages (auth, billing, database, storage) instead of the LaunchPad BaaS SDKs (`@launchpad/*`). LaunchPad BaaS has 19+ SDKs but "lower activity" status. This creates parallel infrastructure with unclear strategic intent.

## What We Know

- LaunchPad BaaS has 19+ SDKs (auth, db, storage, payments, realtime, push, etc.) at v0.1.0
- Flagship template uses `@repo/auth`, `@repo/database`, `@repo/billing`—not `@launchpad/*`
- LaunchPad BaaS repos show "lower activity" with last substantive pushes from Dec 2025-Jan 2026
- LaunchPad had a coordinated npm publishing milestone on 2026-03-20, but no template adoption
- 10 of 11 LaunchPad client SDKs still have open SDK-CONSISTENCY issues (missing READMEs, tsconfig deviations)
- Vision.md mentions LaunchPad as "SDK layer that templates use" and "being revived with re-architecture"
- Templates use Better Auth, Drizzle, Stripe directly—not through LaunchPad abstractions
- Only `launchpad-db-engine` is public; all other packages are private

## What We Don't Know

- Is there an actual plan to migrate templates from `@repo/*` to `@launchpad/*`, or are they permanently diverged?
- What is the cost of maintaining LaunchPad BaaS (20+ repos) while templates ignore it?
- Does "revive with re-architecture" mean LaunchPad will replace `@repo/*` or coexist indefinitely?
- Are we building LaunchPad for external customers (BaaS platform) or internal use (template foundation)?
- What is the opportunity cost of LaunchPad maintenance vs. AO Pro development?

## Suggested Investigation

1. **Dependency Audit**: Map exact functional overlap between `@repo/*` packages and `@launchpad/*` SDKs
2. **Migration Cost Analysis**: Estimate effort to replace `@repo/auth` with `@launchpad/auth` in flagship template
3. **Strategic Intent Clarification**: Document explicit decision: sunset LaunchPad, merge with templates, or maintain parallel tracks
4. **Customer Validation**: Verify if any external users exist for LaunchPad BaaS (npm download stats, GitHub issues)
5. **Consolidation Proposal**: Design path to either (a) retire LaunchPad and focus on `@repo/*` or (b) merge `@repo/*` into LaunchPad and migrate
6. **Resource Reallocation**: Calculate developer/agent hours spent on LaunchPad vs. ROI

## Answer

_To be filled in by the team or an investigating agent._
