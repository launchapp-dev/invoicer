# launchpad-task-orchestrator

**Package:** `@launchpad/task-orchestrator`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-task-orchestrator (private)
**Language:** TypeScript
**Last pushed:** 2025-12-20
**Status:** Stable

## Purpose

Machine-consumable task queue and orchestration system designed specifically for AI agent workflows. Unlike human-focused project management tools (Jira, Linear), tasks are structured with machine-verifiable acceptance criteria, agent assignment, and priority-based scheduling. Includes a built-in MCP server exposing 17 task management tools.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Protocol:** MCP SDK (`@modelcontextprotocol/sdk`)
- **Validation:** Zod
- **Build:** tsup
- **Testing:** Vitest

## Key Dependencies

| Dependency | Role |
|---|---|
| `@modelcontextprotocol/sdk` | MCP server for AI agent access |
| `zod` | Task schema validation |

## API Surface

### Core Task Operations
- Task CRUD (create, read, update, delete)
- Priority queues: P0 (critical) → P3 (low)
- Task status lifecycle: `pending → queued → assigned → running → completed/failed`
- Structured input/output for machine consumption
- Acceptance criteria with programmatic verification

### Scheduling Strategies
- FIFO, priority, round-robin, least-loaded

### Agent Management
- Agent registration with capability matching
- Task assignment based on agent capabilities
- Retry with exponential backoff
- Rate limiting / concurrency controls

### MCP Server (17 tools)
- `task_create`, `task_enqueue`, `task_claim`, `task_start`, `task_complete`, `task_fail`, `task_cancel`
- `task_add_note`, `task_add_file`, `task_check_criterion`
- Queue management tools

## Maturity

Stable. Most recent work (Dec 2025) added the MCP server layer — a key capability for AI agent access. The core task orchestration model is complete. This is a direct predecessor/complement to the AO Agent Orchestrator product.

## Notes

- This is the lower-level task primitive that AO Agent Orchestrator builds on
- MCP interface makes it directly accessible to Claude and other AI agents without custom integration
- Acceptance criteria verification is the key differentiator — tasks define what "done" looks like in a verifiable format
