---
title: "AO CLI — Data Flow"
product: ao-cli
type: data-flow
status: current
source_repos:
  - ao-cli
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How data flows through the AO CLI during task execution — from task creation through workflow phases, agent execution, and PR creation. Shows the daemon's queue-based scheduling and the self-healing model routing pipeline.

## Diagram

```mermaid
sequenceDiagram
    participant U as User / Cron
    participant CLI as ao CLI
    participant D as Daemon Runtime
    participant Q as Task Queue
    participant WF as Workflow Runner v2
    participant AR as Agent Runner
    participant LLM as LLM CLI (Claude/Codex/Gemini)
    participant GIT as Git Ops
    participant GH as GitHub

    Note over U,GH: Task Creation & Queueing
    U->>CLI: ao task create "Feature X"
    CLI->>Q: Enqueue task
    Q-->>D: Task available

    Note over D,GH: Workflow Execution
    D->>WF: Execute workflow phases
    WF->>WF: Phase: plan
    WF->>AR: Spawn agent for phase
    AR->>LLM: Execute via CLI IPC
    LLM-->>AR: Phase output
    AR-->>WF: Phase complete

    Note over WF,GH: Self-Healing Pipeline
    WF->>AR: Phase: implement (model: codex)
    AR->>LLM: Execute Codex CLI
    LLM--xAR: Failure
    AR->>AR: Self-heal: reroute to Claude
    AR->>LLM: Execute Claude CLI
    LLM-->>AR: Success
    AR-->>WF: Phase complete (fallback used)

    Note over WF,GH: Git & PR Flow
    WF->>GIT: Create worktree (ao/task-*)
    WF->>AR: Execute in isolated worktree
    AR-->>WF: Code changes ready
    WF->>GIT: Commit changes
    WF->>GH: Create PR via gh CLI
    GH-->>WF: PR URL

    Note over D,Q: Retry/Rework
    WF-->>D: Phase verdict: rework
    D->>Q: Re-enqueue with rework priority
    Q-->>D: Rework task (high priority)
    D->>WF: Re-execute failed phase
```

## Notes

- The daemon polls the queue continuously, executing tasks by priority: rework > rebase > review > new work
- Each workflow phase runs in an isolated git worktree to prevent conflicts between concurrent agents
- Agent-runner manages LLM CLI processes via IPC (stdin/stdout/stderr pipes)
- The self-healing pipeline tracks per-model success rates in .ao/state/
- oai-runner handles OpenAI-compatible streaming API calls as an alternative to CLI tools
- Workflow phases can emit verdicts: pass, fail, rework — rework re-enters the queue at high priority
