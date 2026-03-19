---
title: "Verify plugin pack implementations are functional, not just scaffolds"
priority: high
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/do-plugin-packs-contain-working-implementations-or-empty-scaffolds.md
owner: unassigned
target_repos:
  - ao-bundled-packs
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

15 plugin packs were created in a 2-day batch (2026-03-16/17), all following identical scaffold structure. The bulk creation pattern strongly suggests these are generated scaffolds, not iteratively developed implementations. Revenue projections ($10K-$50K/month) depend on these packs providing real value, but no one has verified whether the agent prompts, workflows, skill definitions, or MCP server connections actually work. This is a prerequisite to the existing audit-and-test-plugin-pack-viability action — you can't test market viability of empty shells.

Derived from: "Do the 15 Claude Code plugin packs contain working implementations or empty scaffolds?"

## Scope

1. Pick 3 representative packs: one connector (e.g., `aws-pack`), one capability (e.g., `pdf-pack`), one productivity (e.g., `slack-pack`)
2. For each pack, audit:
   - Agent definitions: do system prompts contain meaningful instructions or placeholder text?
   - Workflows: do they reference real tools and produce expected outputs when executed?
   - Skills: do command implementations contain logic or just echo stubs?
   - MCP server connections: are they configured for real service endpoints?
3. Attempt `ao pack install` and execute at least one command from each pack
4. Categorize all 15 packs into: **functional** (works end-to-end), **partial** (structure present, some logic works), or **scaffold** (empty templates only)
5. For each scaffold pack, estimate hours to bring to "partial" and "functional" status
6. Document findings in a pack-quality-matrix (table in the repo or knowledge base)

## Dependencies

- Requires a working AO daemon to test pack installation and execution
- MCP server connection tests require API credentials (AWS, Slack, Stripe, etc.) — at minimum, verify config structure is correct even without live credentials
- Should be completed before the existing audit-and-test-plugin-pack-viability action, which tests market viability

## Success Criteria

- All 15 packs categorized as functional, partial, or scaffold
- At least 3 packs tested with real execution (install + run a command)
- A clear effort estimate exists for bringing each scaffold pack to functional status
- Findings inform whether to invest in deepening existing packs or cutting scope to fewer, higher-quality packs

## Notes

- If most packs are pure scaffolds, the revenue projections need immediate revision
- The effort-to-production estimate is the key output — it determines whether the pack strategy is viable at current headcount
- Consider whether AI-assisted pack development (using AO itself) could accelerate the fill-in process
- Quality of 3 packs beats quantity of 15 scaffolds — users will judge the ecosystem by the first pack they try
