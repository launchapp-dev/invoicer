---
title: "Brain — Dependency Graph"
product: brain
type: dependency
status: current
source_repos:
  - brain
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-18
---

## Overview

Dependency graph for the brain repo — the org-wide AI workforce command center. The brain has no application code; its dependencies are the AO CLI runtime, MCP servers, and external services that agents connect to.

## Diagram

```mermaid
graph BT
    subgraph "Brain Repo"
        CONFIG[".ao/workflows/custom.yaml<br/>18 agents, 30+ phases,<br/>12 workflows, 2 schedules"]
        KB["knowledge/<br/>Products, repos, architecture,<br/>competitive, GTM, revenue,<br/>questions, actions, ideas"]
        MCP_JSON[".mcp.json<br/>AO MCP server config"]
    end

    subgraph "Runtime Dependencies"
        AO["ao-cli<br/>Rust binary — daemon,<br/>task queue, workflow runner"]
        CLAUDE_CLI["Claude CLI<br/>LLM agent executor"]
        GH["gh CLI<br/>GitHub operations"]
        GIT["git<br/>Version control"]
        NODE["Node.js / npx<br/>MCP server runtime"]
    end

    subgraph "MCP Servers (npx)"
        CTX7["@upstash/context7-mcp<br/>Documentation lookup"]
        SEQTHINK["@modelcontextprotocol/server-sequential-thinking<br/>Structured reasoning"]
        GITHUB_MCP["@modelcontextprotocol/server-github<br/>GitHub API"]
        FIRECRAWL["firecrawl-mcp<br/>Web scraping"]
        PLAYWRIGHT["@playwright/mcp<br/>Browser automation"]
    end

    subgraph "External Services"
        GITHUB_API["GitHub API<br/>launchapp-dev org"]
        ANTHROPIC["Anthropic API<br/>Claude models"]
        WEB["Public Web<br/>Competitor sites, docs"]
    end

    CONFIG --> AO
    MCP_JSON --> AO
    AO --> CLAUDE_CLI
    AO --> GH
    AO --> GIT

    CTX7 --> NODE
    SEQTHINK --> NODE
    GITHUB_MCP --> NODE
    FIRECRAWL --> NODE
    PLAYWRIGHT --> NODE

    CLAUDE_CLI --> ANTHROPIC
    GH --> GITHUB_API
    GITHUB_MCP --> GITHUB_API
    FIRECRAWL --> WEB
    PLAYWRIGHT --> WEB

    style CONFIG fill:#f9e2af,stroke:#f5c211
    style AO fill:#a6e3a1,stroke:#40a02b
    style KB fill:#89b4fa,stroke:#1e66f5
```

## Notes

- The brain has zero npm/cargo dependencies — it's pure YAML config and Markdown knowledge
- AO CLI (Rust binary) is the only hard runtime dependency
- All MCP servers are installed on-the-fly via npx — no local installation required
- Claude CLI is the agent executor — all 18 agents run through it
- gh CLI provides GitHub operations for agents that read/write across the org
- The brain depends on 5 MCP servers, each providing distinct capabilities to agents
- External service dependencies: Anthropic API (LLM), GitHub API (org data), public web (research)
