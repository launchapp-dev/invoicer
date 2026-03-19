---
title: "Claude Code Plugin Packs — Data Flow"
product: plugin-packs
type: data-flow
status: current
source_repos:
  - claude-plugin-marketplace
  - ao-skills
  - ao-bundled-packs
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

How data flows through the Claude Code plugin pack ecosystem — from user invocation of slash commands, through the plugin system, to external service APIs. Also covers the ao-bundled-packs system which follows a different flow through AO's workflow engine.

## Diagram

```mermaid
sequenceDiagram
    participant USER as Developer
    participant CC as Claude Code
    participant MKT as Marketplace Registry
    participant PACK as Plugin Pack
    participant AGENT as Pack Subagent
    participant API as External Service API

    Note over USER,API: Discovery & Installation
    USER->>CC: /plugin marketplace add AudioGenius-ai/claude-plugin-marketplace
    CC->>MKT: Fetch pack index
    MKT->>CC: List of 15+ available packs
    USER->>CC: /plugin add AudioGenius-ai/stripe-pack
    CC->>PACK: Install commands/ + agents/

    Note over USER,API: Slash Command Execution
    USER->>CC: /stripe webhook-debug
    CC->>PACK: Load command definition (YAML/MD)
    PACK->>CC: Command prompt + context
    CC->>API: Stripe API calls (list webhooks, check logs)
    API->>CC: Webhook event data
    CC->>USER: Formatted debug output

    Note over USER,API: Subagent Delegation
    USER->>CC: /playwright e2e-test
    CC->>AGENT: Spawn pack subagent
    AGENT->>API: Playwright browser automation
    API->>AGENT: Screenshots, DOM snapshots, test results
    AGENT->>CC: Test report
    CC->>USER: E2E test results + screenshots

    Note over USER,API: AO Bundled Packs (Different System)
    participant AO as AO CLI Daemon
    participant WF as Workflow Runner

    AO->>WF: Execute ao.reddit workflow
    WF->>API: Tavily API (search Reddit)
    API->>WF: Reddit posts/comments
    WF->>AO: Engagement task created
```

## Notes

- Claude Code packs are YAML/Markdown definitions — no compiled code, just prompts and configs
- Each pack provides two types of extensions: slash commands (user-invoked) and subagents (delegated tasks)
- The marketplace acts as a discovery layer — packs are installed individually from GitHub repos
- Data flows: user → Claude Code → pack definition → Claude reasoning → external API → user
- ao-bundled-packs follow a completely different flow: AO daemon → workflow runner → external API
- Pack commands provide domain context to Claude but don't execute code themselves
- Subagents run as separate Claude processes with specific tool permissions
- research-pack supports multiple search backends: Tavily, Brave Search, Context7
