---
title: "AO CLI — Dependency Graph"
product: ao-cli
type: dependency
status: current
source_repos:
  - ao-cli
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

Internal crate dependency graph for the ao-cli 16-crate Rust workspace. Derived from reading each crate's Cargo.toml. Shows how the protocol crate is the foundation, orchestrator-core provides domain logic, and higher-level crates compose the CLI, daemon, and web server.

## Diagram

```mermaid
graph BT
    PROTO["protocol<br/>Wire types"]
    CONFIG["orchestrator-config"]
    STORE["orchestrator-store"]
    PROVIDERS["orchestrator-providers"]
    CORE["orchestrator-core"]
    GITOPS["orchestrator-git-ops"]
    NOTIF["orchestrator-notifications"]
    LLM["llm-cli-wrapper"]
    OAI["oai-runner"]
    RUNNER["agent-runner"]
    WFC["orchestrator-web-contracts"]
    WFV2["workflow-runner-v2"]
    DAEMON["orchestrator-daemon-runtime"]
    WEBAPI["orchestrator-web-api"]
    WEBSVR["orchestrator-web-server"]
    CLI["orchestrator-cli"]

    PROVIDERS --> PROTO
    STORE --> PROTO
    RUNNER --> PROTO
    RUNNER --> LLM
    OAI --> PROTO
    CONFIG --> PROTO

    CORE --> PROTO
    CORE --> PROVIDERS
    CORE --> STORE
    CORE --> CONFIG
    CORE --> LLM

    WFV2 --> RUNNER
    WFV2 --> PROTO
    WFV2 --> CORE
    WFV2 --> CONFIG

    DAEMON --> CORE
    DAEMON --> PROTO
    DAEMON --> WFV2

    WEBAPI --> CORE
    WEBAPI --> PROTO
    WEBAPI --> CONFIG
    WEBAPI --> DAEMON
    WEBAPI --> WFC

    WEBSVR --> CORE
    WEBSVR --> WEBAPI
    WEBSVR --> WFC

    CLI --> CORE
    CLI --> PROTO
    CLI --> WEBAPI
    CLI --> WEBSVR
    CLI --> DAEMON
    CLI --> NOTIF
    CLI --> WFV2
    CLI --> CONFIG
    CLI --> LLM

    style PROTO fill:#f9e2af,stroke:#f5c211
    style CORE fill:#89b4fa,stroke:#1e66f5
    style CLI fill:#cba6f7,stroke:#8839ef
    style DAEMON fill:#a6e3a1,stroke:#40a02b
    style WEBSVR fill:#a6e3a1,stroke:#40a02b
```

## Notes

- `protocol` is the leaf crate — shared wire types with no internal deps
- `orchestrator-core` is the hub: domain logic, ServiceHub DI, depends on config, store, providers, llm-cli-wrapper
- `orchestrator-cli` is the root: depends on most other crates to compose the full binary
- `llm-cli-wrapper` is standalone (no internal deps); `oai-runner` depends only on protocol
- `oai-runner` uses rmcp (MCP client), tiktoken-rs (token counting), and OpenAI-compatible streaming APIs
- `workflow-runner-v2` composes agent-runner + core for multi-phase execution
- Default workspace members: orchestrator-cli, agent-runner, llm-cli-wrapper, oai-runner
- External deps: axum 0.8 (web), async-graphql 7 (API), croner 3 (scheduling), tokio (async), clap (CLI), serde (serialization)
