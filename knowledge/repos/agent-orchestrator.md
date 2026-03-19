# agent-orchestrator (ARCHIVED)

**Repo**: `launchapp-dev/agent-orchestrator`
**Visibility**: Private (Archived 2026-03-19)
**Language**: TypeScript + Rust (Tauri)
**Version**: 0.1.0
**Last updated**: 2026-02-22
**Status**: Archived — superseded by ao-cli

## Purpose

Desktop application wrapping ao-cli with a visual UI for orchestrating AI agents, planning work, and running workflow execution.

## Tech Stack

- **Desktop**: Tauri v2 (Rust shell)
- **Frontend**: React 19, TypeScript
- **Routing**: React Router v7
- **State**: Zustand, TanStack Query v5
- **Styling**: TailwindCSS
- **Visualization**: ReactFlow (workflow graphs)
- **Build**: Vite
- **Testing**: Vitest
- **Backend**: ao-cli binary (Tauri sidecar)

## Architecture

The ao-cli Rust binary is embedded as a Tauri sidecar. Frontend communicates via Tauri's IPC layer. A web app (`apps/ao-web`) is also embedded in the desktop shell.

```
agent-orchestrator/
  src/             # Frontend React app
  apps/
    ao-web/        # Embedded web app
  src-tauri/       # Tauri Rust shell
  scripts/
    prepare-sidecar.mjs  # Builds and injects ao-cli binary
```

## Dependencies on Org Products

- `ao-cli` (Rust binary — sidecar)
- Possibly `@audiogenius/design-system`

## Key Dependencies (External)

- `@tauri-apps/api` v2.10.1
- `@tauri-apps/plugin-dialog`, `notification`, `opener`, `process`, `updater`, `window-state`
- `@hypothesi/tauri-mcp-server` v0.8.1

## Current Status: Active Development

At v0.1.0. Less frequent commits than ao-cli. Acts as the GUI layer for ao-cli.
