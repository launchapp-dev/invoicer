# launchpad-mcp-server

**Package:** `@launchpad/mcp-server`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-mcp-server (private)
**Language:** TypeScript
**Last pushed:** 2026-01-01
**Status:** Stable

## Purpose

MCP (Model Context Protocol) server that exposes Launchpad platform operations to AI coding agents. Provides a unified MCP interface over git, task queue, templates, and database operations — enabling AI agents in Claude Desktop or other MCP-compatible clients to interact with the Launchpad infrastructure.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Protocol:** MCP SDK (`@modelcontextprotocol/sdk`)
- **Validation:** Zod
- **Containerization:** Docker + docker-compose
- **CI/CD:** GitHub Actions
- **Build:** tsup
- **Testing:** Vitest

## Key Dependencies

| Dependency | Role |
|---|---|
| `@modelcontextprotocol/sdk` | MCP server implementation |
| `zod` | Tool parameter schema validation |

## API Surface (MCP Tools)

- **Git operations:** Worktree create/delete/list, branch ops, commit, push, pull
- **Task operations:** Task queue management, claim/complete tasks, add notes
- **Template operations:** Access Launchpad templates and patterns
- **Database operations:** Schema management, migrations, queries

## Usage

```json
{
  "mcpServers": {
    "launchpad": {
      "command": "npx",
      "args": ["@launchpad/mcp-server"]
    }
  }
}
```

## Maturity

Stable. Most recent work added Docker and CI/CD support. This is the MCP bridge layer over `launchpad-git-server` and `launchpad-task-orchestrator` — aggregating multiple platform operations into a single MCP endpoint for AI agents.

## Notes

- No direct dependency on `launchpad-git-server` or `launchpad-task-orchestrator` in package.json — likely connects via API/env config at runtime
- Docker support enables cloud-hosted MCP server deployments
- Pairs with `launchpad-git-server` for git ops and `launchpad-task-orchestrator` for task management
