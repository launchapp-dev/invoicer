# launchpad-git-server

**Package:** `@launchpad/git-server`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-git-server (private)
**Language:** TypeScript
**Last pushed:** 2026-01-01
**Status:** Stable

## Purpose

Agent-optimized git server with worktree-based isolation designed for AI coding agent workflows. Unlike GitHub for humans, this is an API-first git server where each AI task gets an isolated branch/worktree. Provides webhook support for CI/CD triggers and agent tracking to know which agent is working on which branch.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **HTTP:** Hono + `@hono/node-server`
- **Git operations:** isomorphic-git (pure JS, no native git binary dependency)
- **Containerization:** Docker + docker-compose
- **CI/CD:** GitHub Actions
- **Build:** tsup
- **Testing:** Vitest

## Key Dependencies

| Dependency | Role |
|---|---|
| `isomorphic-git` | Pure-JS git implementation |
| `hono` + `@hono/node-server` | REST API server |

## API Surface

- REST API via Hono
- Repository CRUD (create, delete, list)
- Worktree management (create isolated worktrees per task/agent)
- Branch operations (create, delete, protect)
- Commit, push, pull, fetch, clone
- PR workflow with conflict detection
- Webhook module for GitHub event handling
- Agent assignment tracking (which agent owns which branch)
- Stale worktree cleanup

## Architecture

```
Git Server API (Hono REST)
├── Repository Storage (bare/non-bare repos on filesystem)
├── Worktree Manager (per-agent isolation)
├── Git Protocol Handlers (push/pull/fetch)
└── Webhooks (CI/CD triggers)
     └── isomorphic-git (core)
          └── File System
```

## Maturity

Stable. Most recent work added Docker support and webhook handling. Core worktree isolation model is complete. No npm registry dependency — uses isomorphic-git to avoid native git binary requirements.

## Notes

- Intentionally no web UI — pure API/MCP access
- Key differentiator: worktree-per-task isolation optimized for parallel AI agent workflows
- Pairs with `launchpad-mcp-server` which exposes git operations via MCP protocol
- Uses isomorphic-git (not native git) — runs in any environment without git installed
