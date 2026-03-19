# launchpad-ecosystem

**Package:** `worktree-manager` (internal name)
**Version:** 1.0.0
**Repo:** launchapp-dev/launchpad-ecosystem (private)
**Language:** TypeScript
**Last pushed:** 2026-01-19
**Status:** Active (orchestration workspace)

## Purpose

Orchestration workspace for Launchpad BaaS platform development. Despite the repo name "launchpad-ecosystem", the package.json name is `worktree-manager` and the README describes an AI-powered parallel development template using git worktrees. This is the internal development environment / monorepo orchestration tool used to coordinate work across the Launchpad SDK repos with multiple AI agents.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Protocol:** MCP SDK (`@modelcontextprotocol/sdk`)
- **Validation:** Zod
- **No build toolchain** listed (devDependencies is empty)

## Key Dependencies

| Dependency | Role |
|---|---|
| `@modelcontextprotocol/sdk` | MCP server for agent tool integration |
| `zod` | Tool schema validation |

## MCP Tools Provided

| Tool | Description |
|---|---|
| `git_init_repo` | Initialize a repository |
| `git_list_repos` | List all initialized repositories |
| `git_create_worktree` | Create isolated worktree for a branch |
| `git_list_worktrees` | List worktrees (filter by repo) |
| `git_remove_worktree` | Remove worktree |
| `git_sync` | Sync repo(s) with remote |
| `git_worktree_status` | Get worktree status |
| `git_commit` | Commit changes |
| `git_push` | Push to remote |

## Agent Roles

- **Claude Code** — Orchestrator, reads CLAUDE.md, delegates tasks
- **Codex CLI** — Backend logic, API development (model: gpt-5.1-codex-max)
- **Gemini CLI** — UI design, frontend, analysis (model: gemini-3-pro-preview)

## Maturity

Active. Most recent commit (Jan 2026) updated workflow state for TASK-432 (architecture → implementation phase). This repo is actively used as the development workspace for coordinating Launchpad SDK development across multiple AI agents.

## Notes

- The repo name "launchpad-ecosystem" vs package name "worktree-manager" indicates this may be a fork/evolution of a separate worktree-manager template repo
- Most recent activity involves AO workflow state management, suggesting this workspace is being used with the AO Agent Orchestrator
- No npm build setup — this is a workspace template, not a publishable package
- Likely the internal tool the team uses to build all the other `@launchpad/*` packages
