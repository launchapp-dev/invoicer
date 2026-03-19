---
title: "Which MCP server should agents connect to when four implementations compete for overlapping surface area?"
priority: high
status: open
category: architecture
source_files:
  - knowledge/repos/launchpad-mcp-server.md
  - knowledge/repos/launchpad-task-orchestrator.md
  - knowledge/repos/worktree-manager.md
  - knowledge/repos/ao-skills.md
  - knowledge/repos/ao-cli.md
  - knowledge/repos/ao-plugin-packs-overview.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The org has built at least four distinct MCP server implementations, each exposing tools for AI agents to interact with infrastructure. As the brain repo now orchestrates agents across the entire org, and plugin packs declare MCP server connections, the lack of a clear MCP hierarchy creates real integration confusion. An agent trying to manage tasks, git operations, or workflows has multiple overlapping entry points with no documented guidance on which to use.

## What We Know

- **`launchpad-task-orchestrator`**: MCP server with 17 tools for machine-consumable task queue operations. Stable, last updated Dec 2025.
- **`launchpad-mcp-server`**: Aggregation layer over git + task operations. Bridges `launchpad-git-server` and `launchpad-task-orchestrator`. Stable, last updated Jan 2026.
- **`worktree-manager`**: MCP system with 47 tools for git worktree orchestration. Public, v1.0.0. Last updated Dec 2025.
- **`ao-skills`**: Claude Code plugin that wraps `ao-cli` commands as MCP-accessible skills. Actively updated.
- **`ao-cli`** itself: The Rust daemon exposes its own MCP server for direct agent integration.
- Plugin packs declare MCP server connections in their `pack.toml` manifests.
- The brain repo's `.mcp.json` connects to AO's MCP server, but there's no documented decision on why this server over others.

## What We Don't Know

- Is there a designed hierarchy (e.g., ao-cli MCP is canonical, others are legacy)?
- Do any of these MCP servers share tool names that could conflict when multiple are connected?
- Which MCP servers are actively maintained vs. effectively abandoned?
- When a new agent or plugin pack needs task management capabilities, which server should it declare as a dependency?
- Has the `worktree-manager` MCP (47 tools) been superseded by `ao-cli`'s built-in worktree management?
- Are the Launchpad MCP servers (task-orchestrator, mcp-server) part of the Launchpad BaaS product or the AO ecosystem?

## Suggested Investigation

1. Create a tool-surface comparison matrix: list every tool exposed by each MCP server and identify overlaps.
2. Determine which MCP servers are actively used by the brain repo, ao-cli, and plugin packs today.
3. Classify each server as: (a) canonical and maintained, (b) legacy but still needed, or (c) deprecated.
4. Document the recommended MCP server for each use case (task management, git operations, workflow execution, agent orchestration).
5. Update plugin pack `pack.toml` templates to reference the canonical server.

## Answer

_To be filled in by the team or an investigating agent._
