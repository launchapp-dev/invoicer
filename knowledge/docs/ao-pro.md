---
title: AO Pro - Agent Orchestrator Platform
description: AI-powered autonomous software development platform for teams
product: ao-pro
version: 1.0
created: 2026-03-29
---

# AO Pro — Agent Orchestrator Platform

> AI-powered autonomous software development. AO plans, codes, tests, reviews, and ships code 24/7.

## What is AO Pro?

AO Pro is an autonomous software development platform that manages AI agents to build, test, review, and deploy code with minimal human intervention. It is the orchestration layer that enables "autonomous PRs" — complete feature implementations delivered by AI agents.

The 180+ PRs merged in 7 days across the LaunchApp organization demonstrate AO's capability: multiple AI agents working in parallel, coordinated through intelligent task routing, worktree isolation, and self-healing workflows.

## Core Concepts

### Autonomous Workflows

AO workflows are multi-phase pipelines that guide AI agents through complete development tasks:

- **Plan** — Analyze requirements, break down work, identify dependencies
- **Code** — Implement features across the stack
- **Test** — Validate functionality, catch regressions
- **Review** — Quality gates before merge
- **Ship** — Merge and deploy

Each phase can route to different AI models based on the task type, cost, and success history.

### Worktree Isolation

Every task runs in its own Git worktree — a complete, isolated checkout of the repository. This enables:

- **Parallel execution** — Multiple agents work on different tasks simultaneously
- **Clean rollback** — Failed tasks don't contaminate the main codebase
- **Conflict-free branching** — Each task has its own branch space

### Model Routing

AO intelligently routes tasks to the optimal AI model:

| Model | Best For | Routing Priority |
|-------|----------|------------------|
| Claude Sonnet | Feature work, complex architecture | High-value creative work |
| Codex GPT-5.4 | Throughput, bug fixes, refactors | Bulk coding tasks |
| Gemini | UI work, visual components | Design implementation |
| o3-mini | Analysis, code review | Cost-effective validation |

The router tracks per-model success rates and automatically reroutes failing pipelines.

### Self-Healing Pipelines

AO monitors task execution and responds to failures:

- **Auto-reroute** — Switch to backup models when primary providers exhaust rate limits
- **Bugfix tasks** — Automatically create fix tasks for detected regressions
- **Retry with backoff** — Transient failures trigger intelligent retry logic

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AO CLI (Rust)                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Task Queue  │  │   Workflow   │  │   Model Router       │  │
│  │              │  │   Engine     │  │   (Claude/Codex/...) │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Git Worktree │  │   MCP        │  │   Web Dashboard      │  │
│  │ Manager      │  │   Servers    │  │   (Axum/Embedded)    │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌──────────┐
   │  Local  │          │  LLM    │          │  GitHub  │
   │  Repos  │          │  APIs   │          │  API     │
   └─────────┘          └─────────┘          └──────────┘
```

## Components

### ao-cli

The Rust-based CLI and daemon. Core commands:

| Command | Purpose |
|---------|---------|
| `ao task` | Create, list, manage tasks |
| `ao workflow` | Run and monitor workflows |
| `ao daemon` | Background task scheduling |
| `ao agent` | Agent execution and monitoring |
| `ao git` | Worktree and branch management |
| `ao model` | Model configuration and routing |

### ao-skills

Claude Code plugin providing slash commands for AO workflows:

| Command | Description |
|---------|-------------|
| `/setup-ao` | Initialize AO in a project |
| `/workflow-authoring` | Write custom workflow YAML |
| `/daemon-operations` | Manage background daemons |
| `/troubleshooting` | Debug common AO issues |

### Web Dashboard

Embedded Axum web server provides:

- Real-time task and workflow status
- Agent activity monitoring
- Queue depth and throughput metrics
- Model routing statistics

## Quickstart

### Installation

```bash
# Install AO CLI
curl -fsSL https://raw.githubusercontent.com/launchapp-dev/ao/main/install.sh | bash

# Verify installation
ao --version
```

### Initialize a Project

```bash
# Enter your project directory
cd my-project

# Initialize AO
ao init

# Or use the Claude Code skill
# In Claude Code: /setup-ao
```

### Create Your First Task

```bash
# Create a task
ao task create "Add user authentication" \
  --description "Implement login/logout with session management" \
  --priority high

# List tasks
ao task list

# Watch the daemon process tasks
ao daemon logs --follow
```

### Run a Workflow

```bash
# Execute a complete development workflow
ao workflow run feature \
  --task-id TASK-123 \
  --phases plan,code,test,review,ship
```

## Workflow YAML

Workflows are defined in `.ao/workflows/`:

```yaml
# .ao/workflows/feature.yaml
name: feature
version: 1

phases:
  - name: plan
    prompt: |
      Analyze the task requirements and create an implementation plan.
      Break down the work into discrete, testable steps.
    model: claude-sonnet

  - name: code
    prompt: |
      Implement the feature according to the plan.
      Follow the project's coding standards and patterns.
    model: codex-gpt-5.4

  - name: test
    prompt: |
      Write and run tests for the implemented feature.
      Ensure coverage for edge cases.
    model: claude-sonnet

  - name: review
    prompt: |
      Review the implementation for quality, security, and correctness.
    model: o3-mini

  - name: ship
    prompt: |
      Create a PR with a clear description and mark ready for merge.
    model: claude-sonnet
```

## MCP Integration

AO integrates with MCP (Model Context Protocol) servers for extended capabilities:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-github"]
    },
    "browser": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-playwright"]
    }
  }
}
```

## Pricing Tiers

| Tier | Price | Best For |
|------|-------|----------|
| **AO Open Source** | Free | Individual developers |
| **AO Pro** | $29-49/seat/mo | Indie hackers, small teams |
| **AO Team** | $99-149/seat/mo | Startups, growing teams |
| **AO Enterprise** | Custom | Companies, regulated industries |

See [AO Pro Pricing](ao-pro-pricing.md) for detailed feature comparison.

## Use Cases

### Indie Hackers

Ship features while you sleep. AO maintains your micro-SaaS, fixes bugs, and keeps dependencies current.

### Small Teams

Multiply your engineering capacity. One senior engineer + AO agents = output of a 4-5 person team.

### Startups

Move fast without breaking things. AO handles the maintenance burden while your team focuses on product-market fit.

### Enterprises

Deploy AO on-premise with full audit trails, SSO/SAML, and compliance controls. Keep sensitive code in-house.

## The AO Story

AO built the LaunchApp organization — 180+ PRs in 7 days across multiple repositories. This isn't a demo; it's the daily reality of AO-managed development.

The flywheel:
1. AO builds products to prove it works
2. Products generate revenue to fund AO development
3. Better AO builds better products faster
4. More proof → more customers → better AO

## Documentation

- [AO CLI Reference](https://github.com/launchapp-dev/ao-cli)
- [Workflow Authoring Guide](https://github.com/launchapp-dev/ao-skills)
- [MCP Server Integration](https://github.com/launchapp-dev/ao-skills/blob/main/skills/mcp-servers-for-agents/SKILL.md)
- [Troubleshooting](https://github.com/launchapp-dev/ao-skills/blob/main/skills/troubleshooting/SKILL.md)

## Support

- **Discord**: [LaunchApp Community](https://discord.gg/launchapp)
- **Email**: support@launchapp.dev
- **GitHub Issues**: [launchapp-dev/ao](https://github.com/launchapp-dev/ao)

---

*AO Pro: Ship code while you sleep.*
