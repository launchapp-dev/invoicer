# ao-cli

**Repo**: `launchapp-dev/ao-cli`
**Visibility**: Private
**Language**: Rust
**Last updated**: 2026-03-18 (very active)

## Purpose

The core Rust CLI for the AO Agent Orchestrator system. Manages tasks, requirements, multi-phase workflows, and concurrent AI agent execution. The primary engine for autonomous software development workflows.

## Tech Stack

- **Language**: Rust (100%)
- **Key crates**: Axum (web server), Tokio (async), Serde, Clap (CLI), Croner (scheduling)
- **AI integration**: Claude CLI, Codex CLI, Gemini CLI, OpenAI-compatible APIs
- **Architecture**: 16-crate Rust workspace

## Architecture

```
crates/
  orchestrator-cli/         # Main `ao` binary
  orchestrator-core/        # Domain logic, ServiceHub DI
  orchestrator-web-api/     # Web API business logic
  orchestrator-web-server/  # Axum web server + embedded assets
  orchestrator-web-contracts/ # Shared web types
  protocol/                 # Wire protocol types
  agent-runner/             # Daemon managing LLM CLI processes via IPC
  llm-cli-wrapper/          # Abstraction over AI CLI tools
  oai-runner/               # OpenAI-compatible streaming API client
  orchestrator-daemon-runtime/ # Background daemon runtime
  orchestrator-notifications/ # Notifications
  orchestrator-git-ops/     # Git operations
  orchestrator-config/      # Configuration
  orchestrator-store/       # State persistence
  orchestrator-providers/   # LLM provider routing
  workflow-runner-v2/       # Workflow execution engine v2
```

## State Storage

- `{project-root}/.ao/core-state.json` — core domain state
- `.ao/state/*` — artifacts (history, QA, review, model config, git metadata)

## Dependencies on Org Products

- None (standalone Rust binary)
- Integrates with `ao-skills` (Claude Code plugin that wraps ao commands)
- Used by `agent-orchestrator` (desktop app sidecar)

## Current Status: Active Development

Recent commits show:
- Self-healing model pipeline routing (auto-reroutes failing models)
- Multi-owner agent team (6 POs, 2 architects, 2 researchers)
- Workflow optimizer tracking success rates per model

## API Surface

24 top-level CLI commands across groups: task, workflow, daemon, agent, vision, requirements, execute, architecture, runner, output, errors, history, git, model, skill, mcp, web, and more.
