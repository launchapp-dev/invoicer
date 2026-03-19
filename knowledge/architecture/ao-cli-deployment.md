---
title: "AO CLI — Deployment Architecture"
product: ao-cli
type: deployment
status: current
source_repos:
  - ao-cli
  - agent-orchestrator
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How AO CLI is built, distributed, and deployed. The Rust binary runs locally as both a CLI and a background daemon. The desktop app embeds it as a Tauri sidecar. No cloud deployment — AO runs entirely on the developer's machine.

## Diagram

```mermaid
graph TD
    subgraph "Build"
        CARGO[cargo build<br/>Rust workspace]
        CARGO --> AOBIN["ao binary<br/>(orchestrator-cli)"]
        CARGO --> ARBIN["agent-runner binary"]
        CARGO --> LLMBIN["llm-cli-wrapper binary"]
        CARGO --> OAIBIN["oai-runner binary"]
        CARGO --> WFBIN["ao-workflow-runner binary"]
    end

    subgraph "Local Machine"
        subgraph "CLI Mode"
            AOCLI["ao CLI<br/>Direct user commands"]
        end

        subgraph "Daemon Mode"
            AODAEMON["ao daemon start<br/>Background service"]
            CRON["Cron Scheduler<br/>(croner)"]
            QUEUE["Task Queue"]
            AODAEMON --> CRON
            AODAEMON --> QUEUE
        end

        subgraph "Web UI Mode"
            WEBUI["ao web<br/>Axum server + embedded UI<br/>localhost:port"]
        end

        subgraph "Worktrees"
            WT1[".ao/worktrees/task-001"]
            WT2[".ao/worktrees/task-002"]
            WT3[".ao/worktrees/task-003"]
        end

        AOCLI --> AODAEMON
        AODAEMON --> WT1
        AODAEMON --> WT2
        AODAEMON --> WT3
    end

    subgraph "Desktop App (agent-orchestrator)"
        TAURI["Tauri v2 Shell"]
        REACT["React 19 Frontend"]
        SIDECAR["ao binary (sidecar)"]
        TAURI --> REACT
        TAURI --> SIDECAR
    end

    subgraph "Project Integration"
        AODIR[".ao/ directory<br/>config.json, workflows/, state/"]
        MCPJSON[".mcp.json<br/>MCP server config"]
    end

    AOBIN --> AOCLI
    AOBIN --> AODAEMON
    AOBIN --> WEBUI
    AOBIN --> SIDECAR

    AOCLI --> AODIR
    AODAEMON --> AODIR
```

## Notes

- AO is a local-only tool — no cloud deployment, all state in .ao/ directory
- Five build targets: orchestrator-cli (ao), agent-runner, llm-cli-wrapper, oai-runner (ao-oai-runner), workflow-runner-v2 (ao-workflow-runner)
- The daemon runs as a background process, managing worktrees and executing workflows on schedule
- The Tauri desktop app builds ao-cli via `scripts/prepare-sidecar.mjs` and bundles it
- Each project configures AO via .ao/config.json and .ao/workflows/*.yaml
- MCP server connections configured in .mcp.json at the project root
- Git worktrees provide filesystem isolation for concurrent agent execution
