# AO Agent Orchestrator

> Autonomous software delivery with AI agents — turn YAML into self-managing development pipelines.

## What Is AO?

AO (Agent Orchestrator) is a Rust-based platform that turns a single YAML configuration into an autonomous software delivery pipeline. It dispatches tasks to AI agents across isolated git worktrees, manages quality gates, and merges results automatically.

Think of AO as "an entire product organization in a box" — with planners, builders, reviewers, product owners, architects, and operations agents working together.

---

## Installation

### macOS (Apple Silicon/Intel)

```bash
curl -fsSL https://raw.githubusercontent.com/launchapp-dev/ao/main/install.sh | bash
```

Options:
- `AO_VERSION=v0.0.11` — install specific version
- `AO_INSTALL_DIR=/usr/local/bin` — custom install path

### Linux x86_64 / Windows

Download release archives from [GitHub releases](https://github.com/launchapp-dev/ao/releases) or build from source.

### Prerequisites

AO requires at least one AI coding CLI:

```bash
# Recommended: Claude Code
npm install -g @anthropic-ai/claude-code

# Alternative: OpenAI Codex
npm install -g @openai/codex

# Alternative: Gemini CLI
npm install -g @google/gemini-cli
```

---

## Quick Start

### 1. Initialize a Project

```bash
cd your-project
ao doctor          # Check prerequisites
ao setup           # Initialize .ao/ directory
```

### 2. Create Your First Task

```bash
ao task create \
  --title "Add rate limiting" \
  --task-type feature \
  --priority high
```

### 3. Run a Workflow

```bash
ao workflow run --task-id TASK-001
```

### 4. Start Autonomous Mode

```bash
ao daemon start --autonomous
```

---

## Core Concepts

### Agents

Named profiles that bind models, tools, MCP servers, and system prompts:

```yaml
agents:
  planner:
    model: claude-opus-4-6
    system_prompt: prompts/planner.md
    mcp_servers: [github, brain-products]

  builder:
    model: codex-gpt-5.4
    system_prompt: prompts/builder.md
```

### Phases

Reusable execution units with three modes:

| Mode | Purpose |
|------|---------|
| `agent` | AI execution with decision contracts |
| `command` | Shell command execution |
| `manual` | Human approval gate |

```yaml
phases:
  plan:
    mode: agent
    agent: planner
    decision_contract:
      verdicts: [advance, rework, skip]
      max_rework_attempts: 3

  build:
    mode: agent
    agent: builder
```

### Workflows

Compose phases into pipelines:

```yaml
workflows:
  feature-delivery:
    phases:
      - plan
      - build
      - review
      - qa
    on_success:
      - create_pull_request
```

### Decision Contracts

Every agent phase returns a typed verdict:

- `advance` — Continue to next phase
- `rework` — Retry current phase (up to `max_rework_attempts`)
- `skip` — Skip remaining phases
- `fail` — Mark workflow as failed

---

## CLI Commands

| Command | Purpose |
|---------|---------|
| `ao task` | Create, list, update tasks |
| `ao workflow` | Run and manage workflows |
| `ao daemon` | Start/stop background scheduler |
| `ao queue` | Inspect dispatch queue |
| `ao agent` | Control agent runner processes |
| `ao output` | Stream agent output |
| `ao doctor` | Health checks and auto-remediation |
| `ao requirements` | Manage product requirements |
| `ao mcp` | Run AO as MCP server |
| `ao web` | Launch embedded web dashboard |
| `ao status` | Project overview |

---

## Model Routing

AO routes tasks by complexity and type:

| Task Type | Model | Example |
|-----------|-------|---------|
| Low-priority bugfixes | GLM-5-Turbo | typo fixes |
| Throughput work | Codex GPT-5.4 | most coding |
| Feature work | Claude Sonnet | new features |
| UI work | Gemini | styling, components |
| Critical architecture | Claude Opus | system design |

---

## Architecture

AO is 108k lines of Rust across 16 crates:

| Crate | Lines | Purpose |
|-------|-------|---------|
| `orchestrator-cli` | 30k | CLI commands and dispatch |
| `orchestrator-core` | 18k | Domain logic, state management |
| `workflow-runner-v2` | 9k | Phase execution engine |
| `agent-runner` | 6k | LLM CLI process management |
| `llm-cli-wrapper` | — | Abstraction over AI CLIs |
| `protocol` | — | Wire types |

### State Storage

- `project-root/.ao/core-state.json` — core domain state
- `.ao/state/*` — CLI-managed artifacts

### Platforms

- macOS (Apple Silicon, Intel)
- Linux x86_64
- Windows x86_64

---

## MCP Integration

AO can run as an MCP server for AI agent integration:

```json
{
  "ao": {
    "command": "/path/to/ao",
    "args": ["mcp"]
  }
}
```

Tools exposed: `tasks_list`, `task_get`, `workflows_list`, `workflow_run`, `requirements_list`, `agent_dispatch`.

---

## ao-projects Integration

AO works with [ao-projects](https://github.com/launchapp-dev/ao-projects) for task/requirements management:

```bash
# Create task in ao-projects
ao-projects task create --title "Add OAuth" --priority high

# AO will pick it up and run workflows
ao daemon start
```

---

## Related Products

| Product | Relationship |
|---------|--------------|
| [ao-cli](./ao-agent-orchestrator.md) | Core orchestration engine |
| [ao-projects](./ao-projects.md) | Task/requirements management |
| [ao-fleet](./ao-fleet.md) | Fleet control plane for multiple AO instances |
| [ao-skills](https://github.com/launchapp-dev/ao-skills) | Claude Code plugin |

---

## License

Elastic License 2.0 (ELv2) — use and modify freely, but no hosted/managed service redistribution.
