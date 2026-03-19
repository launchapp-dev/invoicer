---
title: "Should we sunset, open-source, or revive the LaunchPad BaaS SDKs?"
priority: high
status: answered
answered_by: Sami (Shooksie)
answered_at: 2026-03-19
category: product-strategy
source_files:
  - knowledge/products/01-launchpad-baas.md
  - knowledge/products/dependency-graph.md
  - knowledge/competitive/launchpad-baas.md
  - knowledge/revenue/opportunities.md
  - knowledge/active-workstreams.md
  - knowledge/sdk-matrix.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The LaunchPad BaaS platform represents a significant engineering investment: 19+ SDKs, 7+ backend servers, a custom database engine with 191 tests, and a full multi-tenant architecture. All packages are at v0.1.0. Yet the last significant activity was December 2025-January 2026 — over 2 months of inactivity. The active workstreams document explicitly lists "Launchpad BaaS repos" under "Stale / Lower Priority."

The revenue analysis calls this "Opportunity 6" (ranked last) and recommends deprioritizing it, noting the BaaS market is dominated by Supabase ($5B valuation, 4M+ developers) and Firebase. However, the analysis also suggests the SDKs could be "bundled into the SaaS template as value-add," "open-sourced for community goodwill," or "licensed to enterprises needing self-hosted BaaS."

No decision has been made. The code sits in limbo — not actively developed, not archived, not open-sourced, not monetized. This consumes cognitive overhead every time the knowledge base is reviewed.

## What We Know

- 19+ SDK repos, 7+ server repos, all at v0.1.0, all private (except launchpad-db-engine)
- Last meaningful updates: December 2025 - January 2026
- The flagship SaaS template (saas-template-launch-app-test) does NOT use LaunchPad SDKs — it has its own internal packages (@repo/auth, @repo/billing, etc.)
- The older launchpad-saas-template DOES depend on @launchpad/core, @launchpad/auth, @launchpad/db, @launchpad/payments
- Supabase has 4M+ developers, $500M raised, and is aggressively expanding into AI-native tooling
- The GTM strategy suggests repositioning BaaS "as the SDK layer beneath templates rather than standalone BaaS"
- launchpad-db-engine is the only public repo and has 191 tests — potentially the most standalone-valuable piece

## What We Don't Know

- How much total engineering time was invested in LaunchPad BaaS?
- Are any of the SDKs actually used in production by anyone (including the org itself)?
- Would open-sourcing the SDKs generate community interest, or would they be ignored?
- Does the launchpad-saas-template (which depends on BaaS SDKs) have any users?
- Is there a niche market for self-hosted BaaS that Supabase doesn't serve well?
- What's the maintenance cost of keeping these repos in limbo? (Renovate PRs, security alerts, cognitive overhead)

## Suggested Investigation

1. **Make the decision**: The worst outcome is continued limbo. Pick one of three options and execute:
   - **Sunset**: Archive all BaaS repos, remove from knowledge base, redirect any links. Free up cognitive space
   - **Open-source**: Make all BaaS repos public, write a blog post, see if community interest materializes. Low effort, high learning
   - **Revive selectively**: Identify the 2-3 most valuable SDKs (likely db-engine, payments, storage) and integrate them into the flagship template
2. **Check if the flagship template already reimplemented BaaS features**: Compare @repo/auth vs @launchpad/auth, @repo/billing vs @launchpad/payments — if the flagship template already has equivalents, the BaaS SDKs are redundant
3. **Calculate the maintenance cost**: Count open Renovate PRs, Dependabot alerts, and security advisories across all BaaS repos. This is the ongoing cost of indecision
4. **Test open-source viability**: Open-source launchpad-db-engine (already public) and 2-3 other SDKs. Measure GitHub stars, npm downloads, and issues over 30 days

## Answer

**Revive — but open to replanning the architecture.**

LaunchPad BaaS is core to the vision of making it easy to launch apps. The SDKs provide the backend primitives (auth, db, storage, realtime, payments) that templates need. Without them, every template reinvents the wheel with `@repo/*` packages.

However, the current architecture may need rethinking. The SDKs depend on `@launchpad/core` via GitHub git references (not npm), the flagship template uses its own `@repo/*` packages instead of `@launchpad/*`, and several SDKs haven't been touched since Dec 2025.

**Decision**: Revive, but with a re-architecture phase first. The goal is to make `@launchpad/*` SDKs the foundation that templates build on — not a parallel stack competing with `@repo/*`.
