---
title: "Claude Code Plugin Packs — Deployment"
product: plugin-packs
type: deployment
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

How the plugin packs are deployed and distributed. Claude Code packs are GitHub-hosted YAML/Markdown repos installed via Claude Code's plugin system. AO bundled packs are distributed via pack.toml manifests installed into AO projects.

## Diagram

```mermaid
graph TD
    subgraph "GitHub (Source of Truth)"
        subgraph "AudioGenius-ai org"
            MKT_REPO["claude-plugin-marketplace<br/>Registry index repo"]
            PACK_REPOS["15 pack repos<br/>aws-pack, stripe-pack,<br/>postgres-pack, etc."]
        end
        subgraph "launchapp-dev org"
            AOSKILLS_REPO["ao-skills<br/>Claude Code plugin"]
            AOBUNDLE_REPO["ao-bundled-packs<br/>AO workflow packs"]
        end
    end

    subgraph "Developer Machine"
        subgraph "Claude Code Plugin System"
            PLUGIN_DIR["~/.claude/plugins/<br/>Installed pack definitions"]
            CC["Claude Code Runtime<br/>Loads commands/ + agents/"]
        end

        subgraph "AO Project (if using AO)"
            AO_PACKS[".ao/packs/<br/>Installed AO packs"]
            AO_CONFIG[".ao/config.json<br/>Pack references"]
        end
    end

    MKT_REPO -->|"claude plugin marketplace add"| PLUGIN_DIR
    PACK_REPOS -->|"claude plugin add"| PLUGIN_DIR
    AOSKILLS_REPO -->|"claude plugin add"| PLUGIN_DIR

    AOBUNDLE_REPO -->|"ao pack install"| AO_PACKS
    AO_PACKS --> AO_CONFIG

    PLUGIN_DIR --> CC

    style MKT_REPO fill:#f9e2af,stroke:#f5c211
    style PLUGIN_DIR fill:#a6e3a1,stroke:#40a02b
    style AO_PACKS fill:#89b4fa,stroke:#1e66f5
```

## Notes

- No build step, no compilation, no CI/CD — packs are raw YAML/Markdown installed directly from GitHub
- Two distinct distribution channels:
  - **Claude Code plugins**: installed via `claude plugin add` from GitHub repos
  - **AO bundled packs**: installed via `ao pack install` using pack.toml manifests
- The marketplace repo is a meta-package — installing it gives access to a discovery interface
- Packs are currently private (AudioGenius-ai org) but MIT-licensed (planned public release)
- Updates require re-running the plugin add command — no auto-update mechanism
- ao-skills bridges both systems: it's a Claude Code plugin that provides AO-specific slash commands
- No versioning system yet — packs track HEAD of their respective repos
- All 15 Claude Code packs were released in a coordinated batch on 2026-03-16/17
