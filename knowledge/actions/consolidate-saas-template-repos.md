---
title: "Consolidate SaaS template repos into a single canonical product"
priority: high
status: proposed
effort: medium
category: product-strategy
source_question: knowledge/questions/is-parallel-development-of-multiple-saas-template-variants-diluting-effort.md
owner: unassigned
target_repos:
  - launchapp-lite
  - launchapp-lite-v2
  - saas-template-launch-app-test
  - launchpad-saas-template
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

Four SaaS template repos serve overlapping purposes with the same core stack (RR7 + Hono + Better Auth + Drizzle). AO is generating 180+ PRs/week into saas-template-launch-app-test, but it's unclear how (or if) features propagate to launchapp-lite variants. For a solo founder, maintaining multiple near-identical products multiplies support, documentation, and update burden. The pricing model implies tiers (Lite $149, Pro $299, Team $599, Agency $1,199) but the relationship between repos and tiers is undefined.

Derived from: "Is parallel development of 3+ SaaS template variants diluting engineering effort?"

## Scope

1. Diff feature sets across launchapp-lite, launchapp-lite-v2, and saas-template-launch-app-test to quantify divergence
2. Designate ONE repo as the canonical sellable product — likely saas-template-launch-app-test given it has the most active development
3. Map pricing tiers to feature flags or config within the single repo (not separate repos per tier)
4. Archive launchpad-saas-template (Next.js variant) — it uses a different stack and is tied to the declining LaunchPad BaaS line
5. Merge any unique features from launchapp-lite and launchapp-lite-v2 into the canonical repo
6. Archive non-canonical repos after merge is complete
7. Update AO workflows to target only the canonical repo
8. Create a build/export process that generates tier-appropriate bundles from the single codebase

## Dependencies

- Depends on decide-launchpad-baas-fate for the launchpad-saas-template decision
- Should align with the focus-single-revenue-stream decision (if templates are the focus, this becomes urgent)
- Requires understanding which features differentiate tiers

## Success Criteria

- One canonical template repo exists with clear tier differentiation via config/flags
- All AO development flows into the single canonical repo
- Pricing tiers map to documented feature sets within the single codebase
- Non-canonical repos are archived with redirects in their READMEs
- No feature regression — all unique features from variants are preserved in canonical repo

## Notes

- The Turborepo conversion in launchapp-lite-v2 and Tailwind v4 upgrade should be evaluated as features to merge, not reasons to maintain a separate repo
- This consolidation also simplifies documentation, support, and onboarding
- Consider using git subtree or a migration script to preserve commit history from merged repos
