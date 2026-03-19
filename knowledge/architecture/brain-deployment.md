---
title: "Brain — Deployment"
product: brain
type: deployment
status: current
source_repos:
  - brain
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

Deployment architecture for the brain repo. The brain runs entirely on a local developer machine via the AO CLI daemon. There is no cloud deployment — agents execute locally, read/write to the knowledge base via git, and interact with external services through CLI tools and MCP servers.

## Diagram

```mermaid
graph TD
    subgraph "Local Machine"
        subgraph "AO Daemon (Background Process)"
            DAEMON["ao daemon start<br/>Persistent background process"]
            SCHEDULER["Cron Scheduler<br/>croner — 2 schedules"]
            QUEUE["Task Queue<br/>Priority-based dispatch"]
            RUNNER["Agent Runner<br/>Concurrent agent execution"]
        end

        subgraph "Worktree Isolation"
            MAIN["brain/ (main checkout)<br/>Master branch"]
            WT1[".ao/brain-*/worktrees/task-*<br/>Agent worktree 1"]
            WT2[".ao/brain-*/worktrees/task-*<br/>Agent worktree 2"]
            WTN["...<br/>N concurrent worktrees"]
        end

        subgraph "Agent Execution"
            CLAUDE["Claude CLI process<br/>Per-agent subprocess"]
            MCP["MCP Servers<br/>5 servers via npx"]
        end
    end

    subgraph "External (Cloud)"
        GITHUB["GitHub<br/>launchapp-dev org<br/>Push branches, create PRs"]
        ANTHROPIC["Anthropic API<br/>Claude model inference"]
    end

    SCHEDULER -->|"brain-planner: every 3h<br/>architecture-diagrams: Thu 7am"| QUEUE
    QUEUE --> RUNNER
    RUNNER --> CLAUDE
    CLAUDE --> MCP

    RUNNER -->|Creates isolated worktree| WT1
    RUNNER -->|Creates isolated worktree| WT2

    WT1 -->|git push -u origin HEAD| GITHUB
    WT2 -->|gh pr create --fill| GITHUB
    GITHUB -->|gh pr merge --squash| MAIN

    CLAUDE --> ANTHROPIC

    style DAEMON fill:#a6e3a1,stroke:#40a02b
    style SCHEDULER fill:#f9e2af,stroke:#f5c211
    style MAIN fill:#89b4fa,stroke:#1e66f5
```

## Notes

- Entirely local deployment — no cloud infrastructure, containers, or CI/CD pipelines
- AO daemon runs as a persistent background process (`ao daemon start`)
- Two scheduled workflows: brain-planner (every 3h) and architecture-diagrams (Thursdays 7am)
- Each agent task gets an isolated git worktree for safe parallel execution
- Workflow pipeline: agent writes to worktree → git push → gh pr create → gh pr merge --squash
- All changes to the brain repo flow through PRs for traceability
- MCP servers are ephemeral — launched per-agent via npx, no persistent server processes
- No build step, no compilation — the brain is just YAML config and Markdown
