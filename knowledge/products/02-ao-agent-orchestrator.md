# AO Agent Orchestrator

> AI agent orchestration system — ao-cli (Rust) + agent-orchestrator desktop app + skills + packs

## Purpose

AO (Agent Orchestrator) is an autonomous software development platform that manages tasks, requirements, multi-phase workflows, and concurrent AI agent execution. It enables "autonomous PRs" where AI agents plan, implement, review, and merge code changes with minimal human intervention.

The system consists of:
1. **ao-cli** — a Rust CLI/daemon for orchestrating agent workflows (the engine)
2. **agent-orchestrator** — a Tauri desktop app wrapping ao-cli with a visual UI
3. **ao-skills** — Claude Code plugin skills for interacting with AO
4. **ao-bundled-packs** — community extension packs for AO workflows

## Maturity: Active Development (highly active)

The ao-cli is under very heavy active development with multiple commits per day. Latest commit (2026-03-18) implements self-healing model pipeline routing. The desktop app is at v0.1.0.

## Visibility: ao-cli is Private, ao-skills is Public

---

## `ao-cli` (private)

- **Language**: Rust (100%)
- **Version**: pre-release
- **Binary**: `ao`
- **Architecture**: 16-crate Rust workspace

### Crates

| Crate | Purpose |
|-------|---------|
| `orchestrator-cli` | Main `ao` binary — clap CLI with 24 top-level commands |
| `orchestrator-core` | Domain logic, state management, ServiceHub DI |
| `orchestrator-web-api` | Web API business logic |
| `orchestrator-web-server` | Axum web server + embedded static assets |
| `orchestrator-web-contracts` | Shared web types |
| `protocol` | Wire protocol types shared across all crates |
| `agent-runner` | Standalone daemon managing LLM CLI processes via IPC |
| `llm-cli-wrapper` | Abstraction over AI CLI tools (claude, codex, gemini) |
| `oai-runner` | OpenAI-compatible streaming API client |
| `orchestrator-daemon-runtime` | Background daemon runtime |
| `orchestrator-notifications` | Notifications system |
| `orchestrator-git-ops` | Git operations |
| `orchestrator-config` | Configuration management |
| `orchestrator-store` | State persistence |
| `orchestrator-providers` | LLM provider routing |
| `workflow-runner-v2` | Workflow execution engine v2 |

### Command Groups

| Group | Commands |
|-------|---------|
| Core | `task`, `workflow`, `daemon`, `agent` |
| Planning | `vision`, `requirements`, `execute`, `architecture` |
| Operations | `runner`, `output`, `errors`, `history` |
| Infrastructure | `git`, `model`, `skill`, `mcp`, `web` |

### State Storage

- `project-root/.ao/core-state.json` — core domain state
- `.ao/state/*` — CLI-managed artifacts (history, QA, review, model, git metadata)

### Key Features

- Multi-phase workflow execution with retry/rework loops
- Background daemon with queue-based task scheduling
- Model routing (Claude, Codex, Gemini, OpenAI-compatible models)
- Self-healing pipeline: auto-reroutes failing model pipelines
- Git worktree management for isolated agent execution
- MCP server integration
- Web UI (Axum-based, embedded)

---

## `agent-orchestrator` (private)

- **Language**: TypeScript + Rust (Tauri)
- **Version**: 0.1.0 (private)
- **Type**: Desktop application (Tauri v2)
- **Last updated**: 2026-02-22

### Stack

- **UI**: React 19, React Router v7, TailwindCSS
- **Desktop**: Tauri v2 (Rust shell, TypeScript frontend)
- **State**: Zustand, TanStack Query
- **Visualization**: ReactFlow (workflow graphs)
- **Backend**: ao-cli binary (sidecar)

### Architecture

The desktop app embeds `ao-cli` as a Tauri sidecar. The frontend communicates via Tauri's IPC layer to invoke ao commands and display results. The web app at `apps/ao-web` is also embedded.

---

## `ao-skills` (public)

- **Language**: YAML/Markdown (Claude Code plugin format)
- **Version**: not versioned
- **Purpose**: Claude Code plugin providing slash commands for AO workflows

### Slash Commands

| Command | Description |
|---------|-------------|
| `/setup-ao` | Set up AO in the current project |
| `/getting-started` | Install AO, core concepts, first task and workflow |
| `/mcp-setup` | Create `.mcp.json` and connect AI tools to AO |
| `/workflow-authoring` | Write custom workflow YAML |
| `/pack-authoring` | Build workflow packs for AO |
| `/skill-authoring` | Build AO skills |
| `/troubleshooting` | Common AO issues and fixes |

### Auto-Invoked Skills

`configuration`, `task-management`, `daemon-operations`, `queue-management`, `mcp-tools`, `workflow-patterns`, `agent-personas`, `mcp-servers-for-agents`, `pack-authoring`, `skill-authoring`

---

## `ao-bundled-packs` (private)

- **Purpose**: Community and first-party workflow extension packs for AO CLI
- **Available packs**: `ao.reddit` — Reddit monitoring, discussion engagement, task creation
- **Dependencies**: Tavily API (for web search), Playwright (for browser automation)

---

## Internal Dependencies

- `agent-orchestrator` embeds `ao-cli` as a Tauri sidecar
- `ao-skills` references `ao-cli` commands and MCP tools
- `ao-bundled-packs` extends `ao-cli` workflow capabilities
- AO itself manages the `brain` repo tasks and workflows
