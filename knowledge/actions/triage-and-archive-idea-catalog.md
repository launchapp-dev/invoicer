---
title: "Triage the 93-idea catalog and archive non-essential ideas"
priority: high
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/what-decision-framework-selects-from-93-ideas-and-who-decides.md
owner: unassigned
target_repos:
  - brain
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

93 product ideas have accumulated across 4 rounds of AI generation. The founder's answer clarifies these are a "catalog of possibilities, not a backlog of commitments" and that founders will pick 3-5 aligned with the core vision. Until this triage happens, the 93 ideas create analysis paralysis and a false impression that all are in-scope. Most should be explicitly archived.

Derived from: "What decision framework selects from 93 ideas — and who decides?"

## Scope

1. Founders (Sami and/or Rafael) review the 93 ideas against the core vision: making it easy to launch apps / rocket-launching businesses through software enablement
2. Approve 3-5 ideas for near-term execution — these get queued as tasks
3. Mark 5-10 ideas as "deferred" with a revisit condition (e.g., "revisit after first $1K MRR" or "revisit if a customer requests this")
4. Archive the remaining ~80 ideas with `status: archived` — they remain readable but are explicitly not commitments
5. Create a "NOT building" list in `knowledge/ideas/not-building.md` documenting the top 10+ rejected ideas and why, providing strategic clarity

## Dependencies

- Ideally happens after [implement-founder-review-gate-for-ideas](implement-founder-review-gate-for-ideas.md) so the status fields exist
- Should inform [focus-single-revenue-stream](focus-single-revenue-stream.md) — the 3-5 approved ideas should align with the chosen revenue stream

## Success Criteria

- Every one of the 93 ideas has an explicit status: `approved`, `deferred`, or `archived`
- 3-5 ideas are approved and have corresponding tasks created
- A "NOT building" list exists with clear reasoning for rejected ideas
- The backlog feels actionable rather than overwhelming

## Notes

- The 93 ideas were generated in ~2 days — the triage should take no more than 1-2 hours for a founder to complete
- Priority scores (7-10/10) assigned by AI are not useful for differentiation — founders should use gut + external signal instead
- This is a one-time cleanup; the founder review gate (separate action) prevents future accumulation
