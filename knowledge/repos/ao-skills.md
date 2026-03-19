# ao-skills

**Repo**: `launchapp-dev/ao-skills`
**Visibility**: Public
**Language**: YAML / Markdown (Claude Code plugin format)
**Last updated**: 2026-03-19 (active)

## Purpose

Claude Code plugin providing slash commands and auto-invoked reference skills for interacting with the AO Agent Orchestrator CLI. The bridge between Claude Code (the AI IDE) and `ao-cli` (the orchestration daemon).

## Tech Stack

- Claude Code plugin format (YAML + Markdown)
- No build step — pure configuration files

## Slash Commands

| Command | Description |
|---------|-------------|
| `/setup-ao` | Set up AO in a project — init, MCP, first workflow |
| `/getting-started` | Install AO, core concepts, first task and workflow |
| `/mcp-setup` | Create `.mcp.json` and connect AI tools to AO |
| `/workflow-authoring` | Write custom workflow YAML — agents, phases, crons |
| `/pack-authoring` | Build workflow packs — manifest, agents, phases, marketplace |
| `/skill-authoring` | Build AO skills — prompts, tool policies, capabilities |
| `/troubleshooting` | Common AO issues and fixes |

## Auto-Invoked Reference Skills

Automatically loaded by Claude when contextually relevant:

| Skill | Description |
|-------|-------------|
| `configuration` | Project config, daemon config, agent runtime, state layout |
| `task-management` | Full task lifecycle — create, list, update, block/unblock |
| `daemon-operations` | Start, monitor, and troubleshoot the daemon |
| `queue-management` | Dispatch queue operations |
| `mcp-tools` | Complete `ao.*` MCP tool reference |
| `workflow-patterns` | Battle-tested pipeline patterns from 150+ autonomous PRs |
| `agent-personas` | Product lifecycle agents — PO, architect, auditor, docs-writer |
| `mcp-servers-for-agents` | Connect agents to Context7, package-version, memory, GitHub |
| `pack-authoring` | Build workflow packs with pack.toml, agent overlays, MCP descriptors |
| `skill-authoring` | Build AO skills with YAML definitions, tool policies, adapters |

## Installation

```bash
/plugin marketplace add launchapp-dev/ao-skills
# or local:
claude --plugin-dir ~/ao-skills
```

## Dependencies on Org Products

- References `ao-cli` commands and MCP tools
- Designed to work with `ao-cli` daemon

## What Depends On This

- Any Claude Code session using AO workflows
- The `brain` repo (this repo uses ao-skills for all AO interactions)

## Current Status: Active Development

Created 2026-03-17, last pushed 2026-03-19. Actively maintained alongside `ao-cli`.
