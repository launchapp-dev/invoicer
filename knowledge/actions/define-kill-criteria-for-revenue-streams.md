---
title: "Define 90-day kill criteria for each revenue stream"
priority: medium
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/can-a-solo-founder-execute-nine-revenue-streams-simultaneously.md
owner: unassigned
target_repos: []
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The revenue roadmap lists 9 revenue streams but no failure criteria for any of them. Without explicit kill criteria, underperforming initiatives become zombies — consuming attention and resources without producing results, but never formally killed because "maybe it just needs more time." This is especially dangerous for a small founding team where every hour of attention is scarce.

Derived from: "Can a solo founder realistically execute 9 revenue streams simultaneously?"

## Scope

1. For each of the 9 revenue streams, define measurable 90-day success/failure thresholds:
   - SaaS template sales: X sales or Y revenue in 90 days, or kill
   - GitHub Sponsors: X sponsors in 90 days, or stop promoting
   - AO Pro early access: X waitlist signups in 90 days, or defer
   - AO CLI Pro/Team: X paying teams in 90 days post-launch, or simplify
   - Design System Pro: X license purchases in 90 days, or make free
   - Consulting services: X inbound inquiries in 90 days, or stop listing
   - Premium plugin marketplace: X free installs before paid launch, or pivot
   - Hosted AO platform: defer unless AO CLI Pro hits threshold
   - Video course: defer unless template has X paying customers first
2. Document these thresholds in knowledge/revenue/roadmap.md
3. Set calendar reminders for 90-day review dates
4. When a stream hits its kill criteria, formally archive it and redirect effort

## Dependencies

- Should follow the focus-single-revenue-stream decision (kill criteria apply to the deferred streams for when they're eventually attempted)

## Success Criteria

- Every revenue stream has a documented, measurable 90-day threshold
- Kill criteria are specific enough to be unambiguous (not "sufficient traction" but "$500 MRR")
- Review dates are set

## Notes

- Kill criteria should be generous enough to account for slow starts but strict enough to prevent zombie initiatives
- The primary revenue stream (from focus-single-revenue-stream) should have the most detailed criteria with weekly check-ins
- Consider "pause" as an intermediate state before "kill" — some streams may be worth revisiting after others succeed
