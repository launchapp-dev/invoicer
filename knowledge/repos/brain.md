# brain

## Purpose
The org-wide AI workforce command center for launchapp-dev. This repository IS the current repo — it hosts AO (Agent Orchestrator) configuration, agents, workflows, and a growing knowledge base about the entire launchapp-dev product portfolio. It serves as the strategic intelligence layer: agents run here to catalog products, generate questions, extract actions, review PRs, triage issues, and manage the development pipeline.

## Repository
- **Repo**: launchapp-dev/brain (private)
- **Last Pushed**: 2026-03-19 (most recently active repo in the org)

## Structure
```
.ao/
  config.json          — AO project config (project_name: brain, version: 1)
  workflows/
    custom.yaml        — All agents and workflow definitions
knowledge/
  products/            — Product line documentation (7 product lines)
  repos/               — Per-repo docs (this directory)
  questions/           — Strategic questions generated from knowledge gaps
  actions/             — Action items extracted from answered questions
  active-workstreams.md
  architecture.md
  competitive/
  gtm/
  ideas/
  revenue/
  sdk-matrix.md
  repo-inventory.md
tools/                 — Shared tooling scripts
.mcp.json              — MCP server connections
```

## AO Configuration
The `.ao/workflows/custom.yaml` defines the full agent roster and workflow pipelines:

### MCP Servers Connected
- context7 — library documentation lookup
- sequential-thinking — chain-of-thought reasoning
- github — GitHub API operations
- firecrawl — web scraping
- playwright — browser automation

### Agent Roster
- **default** — claude-sonnet-4-6, general purpose
- **issue-triager** — scans all org repos for new/unlabeled issues, assigns priority (P0–P3) and category labels, creates AO tasks for P0/P1
- **pr-reviewer-org** — reviews open PRs across all repos for code quality, correctness, and security

### Workflow Pipelines
- **catalog-products** — catalogs all launchapp-dev repos, documents knowledge base, commits changes
- **question-generator** — scans knowledge base for gaps, risks, and blind spots, creates strategic questions
- **action-extractor** — reviews answered questions, extracts concrete action items with priority/effort scoring
- **planner** — queues and coordinates the above workflows

## Knowledge Base (as of 2026-03-19)
- **products/**: Complete documentation for all 7 product lines
- **repos/**: Per-repo docs for 21+ repos
- **questions/**: 5 strategic questions from knowledge gap analysis
- **revenue/**: Monetization analysis with pricing benchmarks and 12-month roadmap
- **competitive/**: Competitor landscape research

## Relationship to Other Products
- Orchestrates work across all launchapp-dev repos using AO CLI
- Directly drives product documentation, strategic planning, and issue management
- The knowledge base is the primary source of truth for org-level context for all AI agents

## Maturity / Status
**Core infrastructure** — actively used and updated as the primary coordination layer for the entire org's AI workforce. The most recently pushed repo in the organization.
