---
title: "Brain — Data Flow"
product: brain
type: data-flow
status: current
source_repos:
  - brain
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How data flows through the brain's AI workforce — from scheduled planner runs that identify knowledge gaps, through task execution by specialized agents, to knowledge base updates and GitHub operations across the org.

## Diagram

```mermaid
sequenceDiagram
    participant CRON as Cron (every 3h)
    participant PLANNER as brain-planner
    participant QUEUE as Task Queue
    participant AGENT as Specialized Agent
    participant KB as Knowledge Base
    participant GH as GitHub (90+ repos)
    participant MCP as MCP Servers
    participant EXT as External Sources

    Note over CRON,EXT: Knowledge Gap Assessment (3h cycle)
    CRON->>PLANNER: Trigger scheduled run
    PLANNER->>KB: Read knowledge/products/, repos/, questions/
    PLANNER->>GH: Check recent activity across org repos
    PLANNER->>PLANNER: Identify gaps and priorities
    PLANNER->>QUEUE: Queue tasks for agents

    Note over QUEUE,EXT: Product Cataloging
    QUEUE->>AGENT: product-cataloger task
    AGENT->>GH: Read repo structure, package.json, README
    AGENT->>MCP: Context7 for framework docs
    AGENT->>KB: Write/update knowledge/repos/*.md
    AGENT->>KB: Write/update knowledge/products/*.md

    Note over QUEUE,EXT: Architecture Diagramming
    QUEUE->>AGENT: architecture-diagrammer task
    AGENT->>GH: Read source code via gh CLI
    AGENT->>KB: Read existing diagrams
    AGENT->>KB: Create/update knowledge/architecture/*.md
    AGENT->>GH: Commit changes via PR

    Note over QUEUE,EXT: Competitive Research
    QUEUE->>AGENT: competitive-researcher task
    AGENT->>EXT: Firecrawl web scraping
    AGENT->>EXT: Playwright browser automation
    AGENT->>KB: Write knowledge/competitive/*.md

    Note over QUEUE,EXT: Security & Quality
    QUEUE->>AGENT: security-monitor task
    AGENT->>GH: Scan repos for vulnerabilities
    AGENT->>QUEUE: Create remediation tasks
    QUEUE->>AGENT: doc-auditor task
    AGENT->>KB: Audit knowledge freshness
    AGENT->>QUEUE: Queue stale doc updates
```

## Notes

- The 3-hour planner cycle is the heartbeat — it continuously identifies gaps and queues work
- Agents read from GitHub (source of truth for code) and write to the knowledge base (this repo)
- MCP servers provide external capabilities: Context7 for docs, Firecrawl for web scraping
- The knowledge base is version-controlled in git — all changes go through PRs
- Feedback loop: planner reads knowledge → identifies gaps → queues agents → agents fill gaps → planner reads updated knowledge
- The stale-detector agent monitors knowledge freshness and flags outdated content
- All agent output is structured Markdown with YAML frontmatter for machine readability
