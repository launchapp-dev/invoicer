---
title: "Make a definitive decision on LaunchPad BaaS: sunset, open-source, or selectively revive"
priority: high
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/should-we-sunset-open-source-or-revive-launchpad-baas.md
owner: unassigned
target_repos:
  - launchpad-db-engine
  - launchpad-identity-sdk
  - launchpad-payments-sdk
  - launchpad-storage-sdk
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

LaunchPad BaaS represents a significant engineering investment (19+ SDKs, 7+ servers, custom DB engine with 191 tests) but has been inactive since January 2026. It's explicitly listed as "Stale / Lower Priority" and ranked last in revenue opportunities. The flagship SaaS template already has its own internal packages (@repo/auth, @repo/billing, etc.) that don't use BaaS SDKs, making the BaaS code largely redundant. The code sits in limbo — not developed, not archived, not monetized — consuming cognitive overhead on every knowledge base review.

Derived from: "Should we sunset, open-source, or revive the LaunchPad BaaS SDKs?"

## Scope

1. Compare @repo/auth vs @launchpad/auth, @repo/billing vs @launchpad/payments to confirm redundancy
2. Count open Renovate PRs, Dependabot alerts, and security advisories across all BaaS repos (quantify maintenance cost of limbo)
3. Choose one of three paths:
   - **Sunset**: Archive all BaaS repos, remove from knowledge base, redirect any links
   - **Open-source**: Make all repos public, write a brief announcement post, measure community interest over 30 days
   - **Selectively revive**: Pick 2-3 most valuable SDKs (db-engine, payments, storage) and integrate into flagship template
4. Execute the chosen path within 2 weeks
5. Update knowledge base to reflect the decision

## Dependencies

- The focus-single-revenue-stream decision should inform this — if BaaS isn't the chosen focus, sunset or open-source are the only rational options
- If open-sourcing, need to audit repos for any secrets or proprietary content

## Success Criteria

- A documented decision with clear reasoning
- All BaaS repos moved to their chosen state (archived, public, or actively integrated)
- Knowledge base updated — no more "stale" references
- Zero ongoing cognitive overhead from BaaS indecision

## Notes

- The worst outcome is continued limbo — any decision is better than no decision
- Open-sourcing is a low-effort, high-learning option: make repos public and see if anyone cares
- launchpad-db-engine (already public, 191 tests) is the most standalone-valuable piece
- Supabase has 4M+ developers and $5B valuation — competing head-on in BaaS is not viable for a solo founder
