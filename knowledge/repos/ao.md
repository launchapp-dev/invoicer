# ao

**Repo**: `launchapp-dev/ao`
**Visibility**: Public
**Language**: Shell
**Last updated**: 2026-03-19 (newly created)

## Purpose

Public distribution and installation channel for the AO Agent Orchestrator binary suite. Provides installation scripts and documentation for end users and external consumers.

## Tech Stack

- **Language**: Shell (install script)
- **Distribution method**: GitHub raw content delivery
- **Target platforms**: macOS (M1+/Intel), Linux x86_64, Windows x86_64

## Contents

```
ao/
  README.md       # Installation and feature documentation
  install.sh      # Cross-platform install script
```

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/launchapp-dev/ao/main/install.sh | bash
```

Distributes three compiled binaries:
1. `ao` — Main CLI for AO
2. `agent-runner` — IPC daemon managing LLM CLI processes
3. `llm-cli-wrapper` — Abstraction layer over AI CLI tools (Claude, Codex, Gemini)

## Dependencies on Org Products

- **ao-cli** — Source of compiled binaries (not a code dependency, distribution relationship only)

## Status: Public Release Channel (Active)

- **Created**: 2026-03-19
- **Maturity**: Production distribution channel
- **Commits**: Initial release with install script and README
- **Target audience**: End users, external consumers of AO
- **License**: Proprietary (all rights reserved)

## Relationship to Other AO Repos

| Repo | Relationship |
|------|--------------|
| `ao-cli` | Source implementation (Rust) — compiled binaries distributed via `ao` |
| `ao-skills` | Complementary public plugin for Claude Code |
| `agent-orchestrator` | Legacy desktop app (archived) — UI wrapper around ao-cli |
| `ao-bundled-packs` | Private workflow extension packs |

This is the primary public distribution channel for the AO system, complementing the public `ao-skills` plugin and private `ao-cli` implementation.
