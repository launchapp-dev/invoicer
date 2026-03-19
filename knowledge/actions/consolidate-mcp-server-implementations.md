---
title: "Consolidate MCP server implementations and document canonical hierarchy"
priority: high
status: proposed
effort: medium
category: architecture
source_question: knowledge/questions/which-mcp-server-should-agents-use-when-four-compete-for-same-surface.md
owner: unassigned
target_repos:
  - launchpad-mcp-server
  - launchpad-task-orchestrator
  - worktree-manager
  - ao-skills
  - ao-cli
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The org has built at least four distinct MCP server implementations with overlapping tool surfaces: `launchpad-task-orchestrator` (17 task tools), `launchpad-mcp-server` (aggregation layer), `worktree-manager` (47 git worktree tools), `ao-skills` (CLI wrapper), and `ao-cli`'s built-in MCP server. When a new agent or plugin pack needs task management or git operations, there's no documented guidance on which MCP server to connect to. Tool name conflicts are possible if multiple servers are connected simultaneously. The brain repo uses AO's MCP server, but this choice isn't documented or justified.

Derived from: "Which MCP server should agents connect to when four implementations compete for overlapping surface area?"

## Scope

1. **Tool surface matrix**: List every tool exposed by each MCP server and identify overlaps (same or similar tool names/purposes)
2. **Usage audit**: Determine which MCP servers are actively referenced in:
   - Brain repo's `.mcp.json`
   - Plugin pack `pack.toml` manifests
   - AO agent configurations
   - Any CI/CD or workflow definitions
3. **Classify each server**:
   - **Canonical**: actively maintained, recommended for new integrations
   - **Legacy**: still needed for specific use cases, not recommended for new work
   - **Deprecated**: should be removed or archived
4. **Document recommended MCP server per use case**:
   - Task management → ?
   - Git/worktree operations → ?
   - Workflow execution → ?
   - Agent orchestration → ?
5. **Update plugin pack templates**: Ensure all `pack.toml` templates reference canonical servers
6. **Deprecation plan**: For servers classified as deprecated, create migration guides and set archive dates

## Dependencies

- No hard dependencies — this is an audit and documentation task
- Should be done before creating new plugin packs or agent configurations
- Results inform the decide-launchpad-baas-fate action (if Launchpad MCP servers are deprecated, that's a signal)

## Success Criteria

- A published tool-surface comparison matrix exists
- Each MCP server is classified as canonical, legacy, or deprecated
- A one-page "which MCP server to use" guide exists for agent and pack authors
- No new agents or packs reference deprecated MCP servers
- Plugin pack templates are updated to reference canonical servers only

## Notes

- `ao-cli`'s built-in MCP server is likely the canonical choice given active development, but this needs verification
- `worktree-manager` (47 tools, v1.0.0, public) may have been superseded by `ao-cli`'s worktree management — check for feature parity
- `launchpad-task-orchestrator` and `launchpad-mcp-server` may be Launchpad BaaS-era artifacts — their fate ties to the BaaS decision
- Tool name conflicts are a real risk: if two servers expose `create_task` with different schemas, agents will break silently
