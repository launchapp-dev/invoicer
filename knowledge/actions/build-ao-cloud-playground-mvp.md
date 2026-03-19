---
title: "Build AO Cloud playground MVP to capture hosted market demand"
priority: critical
status: proposed
effort: medium
category: competitive
source_question: knowledge/questions/should-ao-cloud-launch-earlier-to-avoid-losing-hosted-agent-market.md
owner: unassigned
target_repos:
  - ao-cli
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

AO Cloud is currently scheduled for Phase 4 (months 8-18) while Devin ($20/mo), Factory, and GitHub Copilot Workspace already offer hosted agent solutions. The self-hosted-first strategy differentiates AO but creates significant friction (Rust toolchain, API keys, local daemon). A lightweight hosted playground — not the full AO Cloud product — could bridge the gap cheaply, let prospects experience the "180 PRs in 7 days" proof point without local setup, and validate hosted demand before committing to full cloud infrastructure.

Derived from: "Should AO Cloud launch earlier to avoid ceding the hosted agent market to Devin and Factory?"

## Scope

1. Estimate per-user infrastructure costs for a minimal hosted AO instance (daemon + API + ephemeral workspace)
2. Design a "playground" tier: free or $5/month, limited to N workflow runs/month, single repo, no team features
3. Deploy using Railway or Fly.io with a one-click template for rapid iteration
4. Implement basic multi-tenancy: isolated workspaces per user, shared daemon infrastructure
5. Build a simple web dashboard showing workflow status, PR activity, and logs (reuse AO MCP output tools)
6. Gate behind waitlist to control infrastructure costs and create urgency
7. Use playground signups as demand validation data for full AO Cloud investment decision

## Dependencies

- AO CLI must be stable enough for multi-tenant use (current production-readiness helps)
- Needs a basic auth system for playground users (could use Better Auth)
- Infrastructure budget must be approved — even a minimal playground has hosting costs
- Should align with focus-single-revenue-stream: if AO is the chosen stream, this becomes the top priority

## Success Criteria

- A working hosted AO playground is accessible via URL with no local setup
- At least 50 users sign up for the waitlist within 30 days of announcement
- Per-user infrastructure cost is estimated and documented
- Conversion funnel data exists: signup → first workflow → engagement
- Data informs the go/no-go decision for full AO Cloud

## Notes

- This is NOT the full AO Cloud product — it's a demand validation vehicle with minimal scope
- Devin's $20/month is VC-subsidized and likely unprofitable; AO doesn't need to match on price, just on ease-of-access
- The playground doubles as a live demo for Show HN and Product Hunt launches
- Consider whether the playground should run on user-provided API keys (BYOK) to reduce per-user costs
- Track Devin and Factory feature releases weekly to calibrate urgency
