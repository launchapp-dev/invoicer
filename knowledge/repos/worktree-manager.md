# worktree-manager

**Repo**: `launchapp-dev/worktree-manager`
**Visibility**: Public
**Language**: JavaScript (Node.js)
**Version**: 1.0.0
**License**: MIT
**Last updated**: 2025-12-22

## Purpose

MCP-powered orchestration system for Claude Code. Manages multiple repositories with git worktrees, enforces development workflows with hooks, and coordinates AI agents across parallel feature branches. Predecessor/companion to `ao-cli`.

Think of it as a simpler, template-based version of AO — enforcing a task-first workflow for Claude Code sessions.

## Tech Stack

- JavaScript / Node.js (MCP server)
- JSON configuration
- Claude Code hooks system

## Key Features

- **47 MCP Tools**: Git, GitHub, Tasks, Requirements management
- **Git Worktrees**: Parallel feature development in isolated directories
- **Task Tracking**: Create, track, complete tasks with full traceability
- **Requirements Management**: PRDs, specs, user stories linked to tasks
- **Workflow Hooks**: Enforces rules — Claude cannot edit code without an active task
- **Agent Templates**: code-reviewer, security-auditor, test-writer, doc-generator, pr-manager, qa-tester, architecture-planner
- **GitHub Integration**: PRs, issues, branches, CI checks via MCP
- **Multi-Model Delegation**: Can delegate to Codex CLI and Gemini CLI

## Architecture

```
my-project/
├── repos/                    # All managed repositories (bare + worktrees)
├── tasks/                    # Task management (backlog, in-progress, completed, blocked)
├── requirements/             # Requirements management
├── mcp/                      # MCP server (47 tools)
│   └── modules/
│       ├── git.js            # Git/worktree tools
│       ├── github.js         # GitHub tools
│       ├── tasks.js          # Task management
│       └── requirements.js   # Requirements management
├── .claude/
│   ├── agents/               # Agent templates
│   └── hooks/                # Workflow enforcement
└── .mcp.json
```

## Enforced Workflow

1. Create requirement → req_create
2. Create task → task_create
3. Link them → req_link_task
4. Start task → task_start
5. Create worktree → git_create_worktree
6. Edit code

Hooks block code edits unless there's an active task linked to a requirement.

## Dependencies on Org Products

None (standalone)

## Relationship to AO

`worktree-manager` is the direct predecessor to `ao-cli`. AO provides a more sophisticated, Rust-based, daemon-powered orchestration system with workflow YAML, model routing, and a web UI. `worktree-manager` is a simpler Node.js template-based approach. Both use git worktrees and MCP.

## Current Status: Stable (v1.0.0)

No updates since 2025-12-22. The AO system has superseded it for active development, but it remains useful as a lightweight alternative.
