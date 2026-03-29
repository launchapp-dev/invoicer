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

The `ao-cli` is under very heavy active development with multiple commits per day. On 2026-03-19 it merged `Release v0.0.11`, then immediately retuned default-branch routing so Codex GPT-5.4 carries more throughput work, Sonnet stays on feature delivery, and Gemini handles UI-heavy work. Latest version is v0.2.35 (2026-03-29) with self-healing model pipeline routing. The desktop app is at v0.1.0. `ao-projects` is a newly extracted Rust crate (2026-03-24) also seeing daily commits.

## Visibility

- **ao** — Public distribution channel (newly launched 2026-03-19)
- **ao-cli** — Private Rust implementation
- **ao-skills** — Public Claude Code plugin
- **agent-orchestrator** — Private + Archived (desktop app)
- **ao-bundled-packs** — Private workflow extensions

---

## `ao` (public)

- **Purpose**: Installation and distribution point for AO binaries
- **Created**: 2026-03-19 (newly launched public release channel)
- **Contents**: `install.sh` script + README
- **Platforms**: macOS (M1+/Intel), Linux x86_64, Windows x86_64
- **What it distributes**: Compiled binaries from ao-cli (`ao`, `agent-runner`, `llm-cli-wrapper`)
- **Installation**: `curl -fsSL https://raw.githubusercontent.com/launchapp-dev/ao/main/install.sh | bash`
- **Target audience**: End users and external consumers of AO

This is the primary public distribution channel for AO, complementing the public `ao-skills` plugin and private `ao-cli` implementation.

---

## `ao-cli` (private)

- **Language**: Rust (100%)
- **Version**: v0.2.35
- **Binary**: `ao`
- **Architecture**: 16-crate Rust workspace
- **Last updated**: 2026-03-29

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
- Task-specialized routing across Claude, Codex GPT-5.4, Gemini, and cheaper monitoring paths
- Self-healing pipeline: auto-reroutes failing model pipelines and exhausted providers
- Git worktree management for isolated agent execution
- MCP server integration
- Web UI (Axum-based, embedded)

### Current Routing Posture (verified 2026-03-19)

- **Throughput default:** Codex GPT-5.4 for most low/medium/high coding work
- **Feature work:** Claude Sonnet
- **Bugfix/refactor work:** Codex GPT-5.4
- **UI work:** Gemini
- **Analytical phases:** PR review, code review, reconciler, and workflow-optimizer now run on Codex GPT-5.4
- **Recent release/ops follow-up:** v0.0.11, process leak fixes, and a cargo test gate all landed on the same day

---

## `agent-orchestrator` (private)

- **Language**: TypeScript + Rust (Tauri)
- **Version**: 0.1.0 (private)
- **Type**: Desktop application (Tauri v2)
- **Status**: Archived (verified via GitHub metadata on 2026-03-19)
- **Last updated**: 2026-03-19

### Stack

- **UI**: React 19, React Router v7, TailwindCSS
- **Desktop**: Tauri v2 (Rust shell, TypeScript frontend)
- **State**: Zustand, TanStack Query
- **Visualization**: ReactFlow (workflow graphs)
- **Backend**: ao-cli binary (sidecar)

### Architecture

The desktop app embeds `ao-cli` as a Tauri sidecar. The frontend communicates via Tauri's IPC layer to invoke ao commands and display results. The web app at `apps/ao-web` is also embedded.

As of 2026-03-19 this repo is historical rather than primary. AO's active control surface is the CLI/daemon stack, not the desktop wrapper.

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

## `ao-projects` (public)

- **Language**: Rust (100%)
- **Version**: 0.1.0
- **Description**: Standalone task and requirements management for AI-driven development pipelines
- **Type**: CLI + MCP server + sync client
- **Last updated**: 2026-03-29

Extracted from AO orchestrator — same data model, same wire format, zero dependencies on the AO daemon or workflow engine. Provides 15 typed MCP tools for tasks, requirements, priorities, dependencies, and bidirectional traceability.

---

## AO-Built Showcase Applications

The AO system has autonomously built and ships to the following production-quality applications:

| App | Description | Stack | Visibility | Last Push |
|---|---|---|---|---|
| `invoicer` | AI-built invoice generator showcase | Next.js + @launchapp/design-system | Public | 2026-03-29 |
| `postpilot` | AI-native social media automation platform | Next.js 15 + SQLite + Drizzle | Public | 2026-03-29 |
| `condohub` | Modern condominium management platform | Next.js + @launchapp/design-system | Public | 2026-03-29 |
| `launchapp-crm` | Production CRM SaaS (single-conductor AO) | TypeScript | Private | 2026-03-29 |

---

## Internal Dependencies

- `agent-orchestrator` historically embeds `ao-cli` as a Tauri sidecar, but that repo is now archived
- `ao-skills` references `ao-cli` commands and MCP tools
- `ao-bundled-packs` extends `ao-cli` workflow capabilities
- `ao-projects` is a standalone extraction but shares the AO wire protocol
- AO itself manages the `brain` repo tasks and workflows
