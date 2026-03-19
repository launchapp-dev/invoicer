# ao-bundled-packs

**Repo:** launchapp-dev/ao-bundled-packs
**Description:** Community and first-party extension packs for AO CLI
**Last pushed:** 2026-03-18
**Visibility:** Public
**Maturity:** Active development

## Purpose

Repository hosting bundled extension packs that ship with or can be installed into the AO CLI agent orchestrator. Packs extend AO agents with new workflows, MCP server integrations, and automation patterns. The first pack is `ao.reddit` — a Reddit discovery and engagement workflow.

## Structure

```
ao-bundled-packs/
├── README.md
└── packs/
    └── ao.reddit/           # Reddit scanner pack
        ├── pack.toml        # AO pack manifest (schema: ao.pack.v1, mode: bundled)
        ├── workflows/       # Workflow YAML definitions
        ├── runtime/
        │   └── agent-runtime.overlay.yaml
        └── mcp/
            ├── servers.toml
            └── tools.toml
```

## Available Packs

### ao.reddit
- **Version:** 0.1.0
- **Kind:** connector-pack
- **Purpose:** Scans Reddit for relevant discussions on given topics, drafts helpful comments, and creates engagement tasks with human review gates
- **Required secrets:** `TAVILY_API_KEY`
- **Exported workflows:**
  - `ao.reddit/scan` — quick recon, discovers and ranks relevant threads
  - `ao.reddit/engage` — full 6-phase cycle with human review gate
  - `ao.reddit/monitor` — unattended scanning that builds a comment backlog
- **MCP tools used:** Tavily search, browser (Playwright)

## Installation

```bash
# Clone and install a pack
git clone https://github.com/AudioGenius-ai/ao-bundled-packs.git
ao pack install --path ./ao-bundled-packs/packs/ao.reddit --activate
```

## Pack Schema

All packs follow `ao.pack.v1` schema with `mode = "bundled"` (vs. `mode = "installed"` for the 15 Claude Code plugin packs). Bundled packs use the full `[mcp]`, `[secrets]`, and `[subjects]` sections, making them more capable than the Claude Code plugin packs.

## Dependencies

- **ao-cli** — required runtime (`ao_core = ">=0.1.0"`)
- Tavily MCP server (Node.js)
- Playwright MCP server (Node.js)

## Relationship to Other Plugin Ecosystems

- This repo is for AO CLI packs (`ao pack install`), distinct from the Claude Code plugin packs in individual repos like `aws-pack`, `docker-pack`, etc.
- The `claude-plugin-marketplace` indexes the 15 Claude Code plugin packs; this repo is for AO-native packs.
