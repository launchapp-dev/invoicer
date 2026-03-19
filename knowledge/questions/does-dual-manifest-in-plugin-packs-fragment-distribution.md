---
title: "Does the dual pack.toml + .claude-plugin manifest in all 15 plugin packs fragment the distribution and install story?"
priority: medium
status: open
category: architecture
source_files:
  - knowledge/repos/ao-plugin-packs-overview.md
  - knowledge/products/05-claude-code-plugin-packs.md
  - knowledge/products/02-ao-agent-orchestrator.md
  - knowledge/repos/ao-bundled-packs.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The newly cataloged plugin packs reveal that all 15 packs ship with two distinct manifest systems: `pack.toml` (AO pack system, schema `ao.pack.v1`) and `.claude-plugin` (Claude Code plugin system). Each pack also includes AO workflow YAML files, agent runtime overlays, and Claude Code hooks — straddling two different ecosystems with different install paths, different runtimes, and different user audiences.

## What We Know

- **Claude Code install path**: `claude plugin add AudioGenius-ai/<pack-name>` — targets 5.2M Claude Code users.
- **AO install path**: `ao pack install <pack-name>` — targets AO CLI users (much smaller audience).
- The `ao-bundled-packs` repo uses the same `pack.toml` format but is described as a *different system* from Claude Code packs.
- AO workflows in plugin packs (e.g., `aws/security-audit`, `docker/deploy`) require AO CLI to execute.
- Claude Code commands/agents in the same packs work without AO CLI.
- The `claude-plugin-marketplace` indexes all 15 packs, but the AO pack registry is separate.
- Idea #27 (Universal Skill Packs) proposes expanding to 11 compatible tools — adding a third distribution vector.

## What We Don't Know

- When a user installs via `claude plugin add`, do the AO-specific files (pack.toml, workflows/, runtime/) silently break or get ignored?
- When a user installs via `ao pack install`, do the Claude Code files (.claude-plugin, hooks/) silently break or get ignored?
- Is there a use case where someone needs both AO and Claude Code features from the same pack simultaneously?
- Does the dual-manifest approach double the maintenance burden for every pack update?
- Would users be better served by separate "claude-aws-pack" and "ao-aws-pack" that are focused and tested for their respective runtime?

## Suggested Investigation

- Test the install experience from each path: does `claude plugin add` work cleanly without AO installed? Does `ao pack install` work cleanly without Claude Code?
- Survey whether any user has installed packs via the AO path vs the Claude Code path.
- Consider whether the AO workflow exports should be a separate pack layer (install the Claude Code pack first, then optionally add AO workflows).
- If pursuing Universal Skill Packs (#27), define a single canonical manifest format rather than accumulating more manifests per pack.

## Answer

_To be filled in by the team or an investigating agent._
