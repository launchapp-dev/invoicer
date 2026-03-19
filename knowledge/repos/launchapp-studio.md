# launchapp-studio

**Repo**: `launchapp-dev/launchapp-studio`
**Visibility**: Public
**Language**: TypeScript + Rust (Tauri)
**Package**: `code-pilot-studio` v0.1.0
**Last updated**: 2025-06-30

## Purpose

Next-generation AI-powered IDE ("The IDE of the future") built with Tauri v2, React, and TypeScript. A desktop application providing project management, code editing via Monaco, terminal integration, git operations, and Claude AI chat with streaming responses.

## Tech Stack

- **Desktop**: Tauri v2 (Rust backend + TypeScript frontend)
- **UI**: React 19, TypeScript
- **Editor**: Monaco Editor (20+ languages)
- **Terminal**: xterm.js (in progress)
- **Git**: libgit2 via `tauri-plugin-git` (in progress)
- **Styling**: Tailwind CSS v4, Radix UI
- **State**: Zustand
- **Build**: Turborepo + Vite + pnpm workspaces

## Architecture

Modular Tauri plugin architecture — each major feature is a separate Tauri plugin:

```
apps/desktop/         # Main Tauri desktop app (React frontend + Rust backend)
packages/
  core/              # @code-pilot/core — business logic and services
  ui/                # @code-pilot/ui — React component library
  types/             # @code-pilot/types — shared TypeScript types
  utils/             # @code-pilot/utils — utilities
plugins/
  tauri-plugin-claude/    # Claude CLI integration
  tauri-plugin-terminal/  # Terminal emulation (xterm.js + PTY)
  tauri-plugin-git/       # Git operations (libgit2)
  tauri-plugin-mcp/       # Model Context Protocol support
```

## Development Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 1 - Foundation | ✅ Done | Monorepo, Tauri, core packages |
| 2 - Core Features | ✅ Done | File explorer, Monaco editor, tab management, themes, settings, keyboard shortcuts |
| 3 - Advanced | 🚧 In Progress | Terminal (xterm.js), Git ops (libgit2), AI Chat streaming |
| 4 - AI Integration | 🔮 Upcoming | Claude CLI via `tauri-plugin-claude`, MCP support, multiple concurrent sessions |

## Dependencies on Org Products

- Architecture similar to `agent-orchestrator` (both Tauri desktop apps)
- Planned: Claude CLI integration (ao-cli adjacent)

## Current Status: Early Development (Phase 3)

Last updated 2025-06-30. No activity for ~9 months. May be paused in favor of the `agent-orchestrator` desktop app which has more recent activity.
