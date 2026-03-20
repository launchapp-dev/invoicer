# ao-cli

**Repo**: `launchapp-dev/ao-cli`
**Visibility**: Private
**Language**: Rust
**Last updated**: 2026-03-20 (very active)

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
- Historically used by `agent-orchestrator` (the desktop sidecar repo is now archived)

## Current Status: Active Development

Recent commits show:
- `Release v0.0.11` merged on 2026-03-19, followed by same-day workflow tuning on the default branch
- `.ao/workflows/custom.yaml` is now the main control surface for model routing and agent specialization
- `4d2694f` routes most low/medium/high work to Codex GPT-5.4 during the doubled-rate-limit window through 2026-04-02
- `67d7e4e` rebalances routing by task type: features → Sonnet, bugfix/refactor → Codex, UI → Gemini
- `baeeaea` moves PR review, code review, reconciler, and workflow-optimizer onto Codex GPT-5.4
- Self-healing/failover logic from 2026-03-18 remains active under the new routing policy
- Recent merged PRs also cover agent-runner process leak fixes, rustfmt cleanup, and a cargo test gate in CI
- **2026-03-20 post-16:27Z merges (PRs #117-#119):**
  - PR #117: DeepSeek routing and model provider fixes
  - PR #118: Cargo test CI gate hardening for rust-workspace CI
  - PR #119: Agent-runner process leak fix
- `7f43dfe` (2026-03-19): docs: document `replace_linked_architecture_entities` in `ao.task.update` (#58) — clarifies the parameter in the task mutation API surface

## Workflow Direction (verified 2026-03-19)

The repo is no longer best summarized as just "multi-model routing." It now uses task-specialized routing plus analytical-role specialization:

- **Default throughput path:** Codex GPT-5.4 for most everyday coding work
- **Feature/build work:** Claude Sonnet
- **UI work:** Gemini
- **Analytical/system judgment:** Codex GPT-5.4 for PR review, code review, reconciler, and workflow-optimizer
- **Fallback behavior:** failover/re-routing remains active for failing providers and exhausted routes

## API Surface

24 top-level CLI commands across groups: task, workflow, daemon, agent, vision, requirements, execute, architecture, runner, output, errors, history, git, model, skill, mcp, web, and more.
