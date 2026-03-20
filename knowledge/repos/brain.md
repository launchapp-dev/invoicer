# brain

## Purpose
The org-wide AI workforce command center for launchapp-dev. This repository IS the current repo — it hosts AO (Agent Orchestrator) configuration, agents, workflows, and a growing knowledge base about the entire launchapp-dev product portfolio. It serves as the strategic intelligence layer: agents run here to catalog products, generate questions, extract actions, review PRs, triage issues, and manage the development pipeline.

## Repository
- **Repo**: launchapp-dev/brain (private)
- **Last Pushed**: 2026-03-20 (most recently active repo in the org)

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

### Agent Roster (as of 2026-03-20)
- **default** — claude-sonnet-4-6, general purpose
- **planner** — task planning and decomposition
- **triager** — issue triage and priority assignment
- **reviewer** — code and PR review
- **doc-auditor** — documentation quality and consistency
- **security-monitor** — security scanning and vulnerability detection
- **sdk-auditor** — SDK API consistency and quality
- **release-coordinator** — release management and coordination
- **impact-analyzer** — change impact assessment
- **stale-detector** — identifies stale tasks and knowledge
- **competitive-researcher** — competitive landscape analysis
- **product-cataloger** — product documentation and cataloging
- **product-doc-writer** — product documentation authoring
- **toolmaker** — utility script development
- **knowledge-curator** — knowledge base maintenance and updates
- **workflow-optimizer** — workflow performance and reliability
- **gtm-strategist** — go-to-market strategy and planning
- **product-ideator** — new product and feature ideation
- **revenue-analyst** — revenue and monetization analysis
- **brain-reviewer** — PR review and merge gating (NEW 2026-03-20) — reviews all open PRs in brain repo, verifies diff matches requirements, prevents premature task completion
- **brain-pr-sweep** — continuous PR sweeper (NEW 2026-03-20) — runs every 3 minutes, handles conflicting PRs, change requests, and stale PR reconciliation

### Workflow Pipelines
- **catalog-products** — catalogs all launchapp-dev repos, documents knowledge base, commits changes
- **question-generator** — scans knowledge base for gaps, risks, and blind spots, creates strategic questions
- **action-extractor** — reviews answered questions, extracts concrete action items with priority/effort scoring
- **planner** — queues and coordinates the above workflows

## Knowledge Base (as of 2026-03-20)
- **products/**: Complete documentation for all 7 product lines
- **repos/**: Per-repo docs for 61+ repos
- **ideas/**: 93 product ideas across 4 rounds (`new-products.md`, `feature-proposals.md`, `integrations.md`, `overview.md`)
- **questions/**: 51+ strategic questions across 6 rounds
- **actions/**: 34 action items extracted from strategic questions
- **architecture/**: 32 architecture diagrams (system, data-flow, deployment, dependency) — verified 2026-03-19
- **revenue/**: Monetization analysis refreshed to incorporate 93-idea portfolio
- **competitive/**: Competitor landscape research
- **gtm/**: GTM strategies for LaunchPad, AO, Better Auth, LaunchApp Templates

## Recent Updates (2026-03-20)
- **brain-reviewer agent** (2026-03-20 06:26Z): New dedicated PR review agent that verifies diff matches task requirements, prevents task completion until PR is merged, requests changes if work is incomplete
- **brain-pr-sweep workflow** (2026-03-20 06:28Z): New continuous sweep running every 3 minutes to handle conflicting/requested-changes PRs, merge ready-to-go PRs, and reconcile task states
- **ao-cli quality audit** (2026-03-20 04:27Z+): Post-release stability improvements including planner MCP crash fix, macOS codesign fix, bundled packs embedding
- **LaunchPad SDK catalog refresh** (2026-03-20): Documented npm publishing milestones and SDK consistency tracking

## Relationship to Other Products
- Orchestrates work across all launchapp-dev repos using AO CLI
- Directly drives product documentation, strategic planning, and issue management
- The knowledge base is the primary source of truth for org-level context for all AI agents

## Maturity / Status
**Core infrastructure** — actively used and updated as the primary coordination layer for the entire org's AI workforce. The most recently pushed repo in the organization.
