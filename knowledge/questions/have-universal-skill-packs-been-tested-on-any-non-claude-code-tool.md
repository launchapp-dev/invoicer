---
title: "Have universal skill packs been tested on any non-Claude Code tool?"
priority: critical
status: open
category: product-strategy
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/ideas/feature-proposals.md
  - knowledge/products/05-claude-code-plugin-packs.md
  - knowledge/competitive/claude-code-plugins.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

Universal Skill Packs (#27) is rated 9/10 priority with "Small (days)" effort, based on the assumption that the org's 15+ existing plugin packs can be distributed across all 11 compatible AI coding tools (Claude Code, Codex CLI, Gemini CLI, Cursor, Aider, Windsurf, Kilo Code, OpenCode, Augment, Antigravity, OpenClaw) with minimal changes. This is the highest-leverage idea in Round 4 by effort-to-impact ratio. But the knowledge base contains zero evidence that any pack has been tested on any tool other than Claude Code. The Cross-Tool Compatibility Testing Framework (F34) was proposed specifically to solve this gap — but rating #27 as "Small effort" before F34 exists means the effort estimate assumes compatibility that hasn't been verified. If cross-tool compatibility is significantly harder than assumed, the entire Universal Skill Packs thesis collapses.

## What We Know

- The Agent Skills specification (Anthropic, Dec 2025) is adopted across 11 tools.
- The org has 15+ plugin packs branded as "Claude Code Plugin Packs."
- All 15+ packs were scaffolded in bulk on 2026-03-16 to 2026-03-17.
- The existing question "do plugin packs contain working implementations or empty scaffolds" is still open.
- F34 (Cross-Tool Compatibility Testing Framework) was proposed to address this exact gap.
- Each tool has "subtly different execution environments, hook behaviors, and MCP handling" per the F34 description.
- No test results, compatibility reports, or cross-tool validation data exists in the knowledge base.

## What We Don't Know

- Whether any single pack works correctly on Cursor, Codex CLI, or any non-Claude Code tool.
- What "subtly different execution environments" means in practice — are the differences trivial (metadata format) or fundamental (hook execution model)?
- Whether the skill spec's cross-tool promise holds in reality or if each tool implements the spec differently enough to require per-tool adaptations.
- The actual effort to make a Claude Code pack work on Cursor vs Codex vs Gemini CLI.
- Whether "Small (days)" effort for #27 is accurate or should be "Medium (weeks)" or "Large (months)" after testing reveals incompatibilities.

## Suggested Investigation

1. Pick the simplest, most self-contained plugin pack and manually test it on Cursor, Codex CLI, and Gemini CLI this week. Document what works and what breaks.
2. Categorize the 15+ packs by complexity: which use only CLAUDE.md rules (likely portable) vs which use hooks, MCP servers, or tool-specific features (likely not portable).
3. Read the Agent Skills spec implementation guides for at least 3 non-Claude-Code tools to identify known compatibility gaps.
4. Revise the effort estimate for #27 based on actual test results — this could change the priority calculation significantly.
5. Determine if F34 (testing framework) should be built BEFORE #27 launches, not after.

## Answer

_To be filled in by the team or an investigating agent._
