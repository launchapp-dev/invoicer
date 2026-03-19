---
title: "AO CLI — System Architecture"
product: ao-cli
type: system
status: current
source_repos:
  - ao-cli
  - agent-orchestrator
  - ao-skills
  - ao-bundled-packs
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

High-level system architecture of the AO Agent Orchestrator ecosystem. The core is a 16-crate Rust workspace (ao-cli) that manages tasks, workflows, and concurrent AI agents. The desktop app (agent-orchestrator) wraps it as a Tauri sidecar. Skills and packs extend its capabilities.

## Diagram

```mermaid
graph TD
    subgraph "AO CLI (Rust Binary)"
        CLI["orchestrator-cli<br/>Clap CLI — 24 commands"]
        CORE["orchestrator-core<br/>Domain logic, ServiceHub DI"]
        DAEMON["orchestrator-daemon-runtime<br/>Background daemon"]
        WFV2["workflow-runner-v2<br/>Multi-phase execution"]
        RUNNER["agent-runner<br/>LLM CLI process manager"]
        WEBSVR["orchestrator-web-server<br/>Axum + GraphQL web UI"]
        WEBAPI["orchestrator-web-api<br/>Web API logic"]
        GITOPS["orchestrator-git-ops<br/>Git/worktree management"]
        PROVIDERS["orchestrator-providers<br/>Model routing"]
        STORE["orchestrator-store<br/>State persistence"]
        NOTIF["orchestrator-notifications"]
        CONFIG["orchestrator-config"]
    end

    subgraph "LLM CLI Tools"
        CLAUDE[Claude CLI]
        CODEX[Codex CLI]
        GEMINI[Gemini CLI]
    end

    subgraph "OAI Runner (Standalone Binary)"
        OAIRUNNER["oai-runner<br/>OpenAI-compatible streaming<br/>+ MCP client (rmcp)"]
    end

    subgraph "OpenAI-Compatible APIs"
        OAIAPI[OpenAI API]
        OAICOMPAT[Other OAI-compatible]
    end

    subgraph "Desktop App"
        TAURI["agent-orchestrator<br/>Tauri v2 + React 19"]
        TAURI -->|Sidecar IPC| CLI
    end

    subgraph "Extensions"
        SKILLS["ao-skills<br/>Claude Code plugin"]
        PACKS["ao-bundled-packs<br/>Workflow packs"]
    end

    subgraph "Project State"
        STATE[".ao/core-state.json"]
        ARTIFACTS[".ao/state/*<br/>History, QA, reviews"]
    end

    CLI --> CORE
    CLI --> DAEMON
    CLI --> WFV2
    CLI --> WEBSVR
    CORE --> PROVIDERS
    CORE --> STORE
    CORE --> CONFIG
    DAEMON --> WFV2
    DAEMON --> CORE
    WFV2 --> RUNNER
    WFV2 --> CORE
    RUNNER --> CLAUDE
    RUNNER --> CODEX
    RUNNER --> GEMINI
    OAIRUNNER --> OAIAPI
    OAIRUNNER --> OAICOMPAT
    PROVIDERS --> OAIRUNNER
    WEBSVR --> WEBAPI
    WEBAPI --> CORE
    WEBAPI --> DAEMON
    GITOPS --> CLI
    STORE --> STATE
    STORE --> ARTIFACTS
    SKILLS -.->|Wraps CLI commands| CLI
    PACKS -.->|Extends workflows| DAEMON

    subgraph "MCP Servers"
        MCPGH[GitHub MCP]
        MCPCTX[Context7 MCP]
        MCPSEQ[Sequential Thinking]
    end

    RUNNER -.->|Connects agents to| MCPGH
    RUNNER -.->|Connects agents to| MCPCTX
```

## Notes

- The daemon runs background workflows with queue-based scheduling (croner for cron)
- Self-healing pipeline: failing model routes auto-fallback to Claude
- Workflow optimizer tracks per-model success rates and creates bugfix tasks on failures
- Git worktrees provide isolated execution environments for each agent
- The web UI is Axum-based with async-graphql API and embedded static assets
- oai-runner is a standalone binary for OpenAI-compatible streaming with MCP client support (rmcp)
- State persisted as JSON files in .ao/ directory (no external database)
