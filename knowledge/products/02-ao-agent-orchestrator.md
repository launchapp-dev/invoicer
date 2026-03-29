# AO Agent Orchestrator

> AI agent orchestration system — ao-cli (Rust) + ao-dashboard (Tauri) + ao-fleet (control plane) + skills + packs

## Purpose

AO (Agent Orchestrator) is an autonomous software development platform that manages tasks, requirements, multi-phase workflows, and concurrent AI agent execution. It enables "autonomous PRs" where AI agents plan, implement, review, and merge code changes with minimal human intervention.

The system consists of:
1. **ao-cli** — a Rust CLI/daemon for orchestrating agent workflows (the engine)
2. **ao-dashboard** — a Tauri desktop app for fleet monitoring and visualization
3. **ao-fleet** — a Rust control plane for company-wide AO team/project orchestration
4. **ao-desktop** — a Tauri desktop wrapper for the AO CLI, prepared as an AO-first build target
5. **ao-projects** — standalone task/requirements management for AI-driven pipelines
6. **ao-skills** — Claude Code plugin skills for interacting with AO
7. **ao-core-packs / ao-bundled-packs / ao-fleet-pack** — workflow extension packs for AO
8. **ao-examples / ao-workflow-examples** — example workflow configs and real-world AO patterns

## Maturity: Active Development (very highly active)

The `ao-cli` is under very heavy active development with multiple commits per day. The `ao-dashboard` and `ao-fleet` repos were heavily active throughout March 2026 as the fleet control plane matured. `ao-projects` is a newly extracted Rust crate (2026-03-24) also seeing daily commits.

## Visibility

- **ao** — Public distribution channel
- **ao-cli** — Public Rust implementation
- **ao-dashboard** — Public Tauri desktop app
- **ao-fleet** — Public Rust control plane
- **ao-desktop** — Public Tauri desktop wrapper
- **ao-docs** — Public documentation site
- **ao-projects** — Public task/requirements CLI + MCP
- **ao-skills** — Public Claude Code plugin
- **ao-starter** — Public create-ao CLI
- **ao-examples / ao-workflow-examples** — Public example repos
- **ao-fleet-tools / ao-fleet-pack / ao-core-packs** — Public fleet/script packs
- **ao-skill-*** — Public framework-specific skill packs
- **agent-orchestrator** — Private + Archived (legacy desktop app)
- **ao-bundled-packs** — Private workflow extensions
- **ao-sync** — Private sync backend

---

## `ao` (public)

- **Purpose**: Installation and distribution point for AO binaries
- **Created**: 2026-03-19 (newly launched public release channel)
- **Contents**: `install.sh` script + README
- **Platforms**: macOS (M1+/Intel), Linux x86_64, Windows x86_64
- **What it distributes**: Compiled binaries from ao-cli (`ao`, `agent-runner`, `llm-cli-wrapper`)
- **Installation**: `curl -fsSL https://raw.githubusercontent.com/launchapp-dev/ao/main/install.sh | bash`
- **Target audience**: End users and external consumers of AO

---

## `ao-cli` (public)

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
|-------|----------|
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

---

## `ao-dashboard` (public)

- **Language**: TypeScript + Rust (Tauri v2)
- **Version**: 0.1.0
- **Type**: Desktop application
- **Status**: Active development
- **Last updated**: 2026-03-29

### Purpose

Fleet monitoring and management desktop app for AO. Provides a god's-eye view of AO daemons, workflows, and agents streaming in real time.

### Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| Charts | Recharts |
| Flow graphs | React Flow (`@xyflow/react`) |
| Desktop | Tauri 2, Rust, tokio |
| Persistence | `tauri-plugin-store` |
| Data Source | AO CLI (`ao daemon health`, `ao daemon stream --json`) |

### Features

- **Fleet Overview** — Health status, agent counts, task distribution charts, per-project drill-down
- **Flow View** — React Flow graph of project → workflow → phase topology
- **Event Stream** — Real-time log viewer with level/project/text filtering
- **Project Detail** — Filter logs by workflow, model, or active run with live streaming
- **Founder Command Center** — Fleet controls, team detail, policy overrides

### AO Integration

The dashboard discovers AO projects from `~/.ao/`, polls `ao daemon health`, and streams `ao daemon stream --json` for each project in parallel. Recently switched to use `ao-fleet` as its control plane backend instead of direct AO CLI spawning.

---

## `ao-fleet` (public)

- **Language**: Rust (100%)
- **Version**: 0.1.0
- **Type**: CLI + MCP server + control plane
- **Status**: Active development
- **Last updated**: 2026-03-29

### Purpose

Company-level control plane above AO teams. Manages team and project inventory, schedule policy, daemon intent, fleet audit history, knowledge capture, and fleet-native MCP tools.

### Stack

| Layer | Technology |
|-------|------------|
| Language | Rust (edition 2024) |
| CLI | clap v4 |
| Persistence | SQLite (`rusqlite`) |
| Async | tokio |
| HTTP | reqwest |
| MCP | stdio-first transport |

### Crates

- `ao-fleet-ao` — AO integration
- `ao-fleet-cli` — Main CLI binary
- `ao-fleet-core` — Domain logic
- `ao-fleet-knowledge` — Knowledge base operations
- `ao-fleet-mcp` — MCP server implementation
- `ao-fleet-scheduler` — Schedule and policy engine
- `ao-fleet-store` — SQLite persistence layer

### Key Commands

- `team-create`, `project-create`, `project-discover`
- `host-create`, `project-host-assign`
- `schedule-create`, `daemon-reconcile`
- `knowledge-source-upsert`, `knowledge-document-create`, `knowledge-search`
- `mcp-serve`

### Relationship to Other Repos

- `ao-cli` — execution kernel inside individual repos
- `ao-dashboard` — visual client consuming `ao-fleet` data
- `brain` — private operator workspace that proved the model

---

## `ao-desktop` (public)

- **Language**: TypeScript + Rust (Tauri)
- **Type**: Desktop application (Tauri v2)
- **Status**: Active development
- **Last updated**: 2026-03-29

AO-first Tauri desktop wrapper for the AO CLI, prepared as a build target for distributing AO with a native desktop shell.

---

## `agent-orchestrator` (private, archived)

- **Language**: TypeScript + Rust (Tauri)
- **Version**: 0.1.0 (private)
- **Type**: Desktop application (Tauri v2)
- **Status**: Archived (verified via GitHub metadata on 2026-03-19)
- **Last updated**: 2026-03-19

Legacy desktop app. AO's active control surface is now the `ao-cli` daemon + `ao-dashboard` + `ao-fleet` stack, not this desktop wrapper.

---

## `ao-projects` (public)

- **Language**: Rust (100%)
- **Version**: 0.1.0
- **Description**: Standalone task and requirements management for AI-driven development pipelines
- **Type**: CLI + MCP server + sync client
- **Last updated**: 2026-03-29

Extracted from AO orchestrator — same data model, same wire format, zero dependencies on the AO daemon or workflow engine. Provides 15 typed MCP tools for tasks, requirements, priorities, dependencies, and bidirectional traceability.

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

---

## `ao-starter` (public)

- **Purpose**: `create-ao` CLI — scaffold AO workflows for any project
- **Language**: TypeScript
- **Last updated**: 2026-03-29

---

## `ao-docs` (public)

- **Purpose**: Documentation site for AO Agent Orchestrator
- **Last updated**: 2026-03-29

---

## `ao-examples` & `ao-workflow-examples` (public)

- **Purpose**: Example workflow configs, starter YAMLs, and real-world AO workflow patterns
- **Last updated**: 2026-03-25

---

## `ao-fleet-tools` & `ao-fleet-pack` (public)

- **Purpose**: Fleet monitoring scripts, conductor/watchdog/syncer/reconciler agent patterns, and fleet workflow packs
- **Last updated**: 2026-03-23

---

## `ao-skill-*` packs (public)

Framework-specific and domain-specific Claude Code skill packs for AO:

| Pack | Purpose |
|------|---------|
| `ao-skill-nextjs` | Next.js App Router projects |
| `ao-skill-nuxt` | Nuxt 4 projects |
| `ao-skill-sveltekit` | SvelteKit projects |
| `ao-skill-react-router` | React Router 7 projects |
| `ao-skill-devops` | CI/CD, Docker, and deployment |
| `ao-skill-testing` | Automated test generation |
| `ao-skill-security` | Security scanning and auditing |

---

## `ao-bundled-packs` (private)

- **Purpose**: Community and first-party workflow extension packs for AO CLI
- **Available packs**: `ao.reddit` — Reddit monitoring, discussion engagement, task creation
- **Dependencies**: Tavily API (for web search), Playwright (for browser automation)

---

## `ao-sync` (private)

- **Purpose**: Sync backend for AO tasks and requirements — multi-machine state sync with PostgreSQL
- **Language**: TypeScript
- **Last updated**: 2026-03-24

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

- `ao-cli` is the execution kernel used by `ao-dashboard` (via `ao-fleet` proxy) and historically by `agent-orchestrator`
- `ao-dashboard` consumes `ao-fleet` for fleet data and control operations
- `ao-fleet` orchestrates `ao-cli` instances across projects without vendoring AO internals
- `ao-skills` references `ao-cli` commands and MCP tools
- `ao-bundled-packs` extends `ao-cli` workflow capabilities
- `ao-projects` is a standalone extraction but shares the AO wire protocol
- AO itself manages the `brain` repo tasks and workflows
