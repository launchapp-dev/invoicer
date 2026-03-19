# code-pilot-studio

## Purpose
A Tauri-based desktop application for AI-powered development workflows — essentially a desktop IDE companion that orchestrates multiple AI coding assistants (Claude Code, Codex, etc.) using git worktrees for isolated workspace management. This appears to be an early predecessor or parallel exploration to the `agent-orchestrator` desktop app.

## Repository
- **Repo**: launchapp-dev/code-pilot-studio (private)
- **Last Pushed**: 2025-06-21

## Tech Stack
- **Desktop Framework**: Tauri (Rust backend + React frontend)
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Rust via Tauri
- **Session Storage**: SQLite
- **Real-time**: WebSocket
- **AI Backends**: Pluggable system supporting multiple AI coding assistants
- **Workspace Management**: Git worktree-based isolation
- **Terminal**: tmux for terminal multiplexing
- **Extension System**: Experimental Node.js extension host (`extension-host/`)

## Structure
```
code-pilot-tauri/    — Main Tauri application (React + Rust)
extension-host/      — Experimental Node.js extension host
```

## Key Features
- Multi-AI backend support (pluggable)
- Git worktree isolation per coding session
- SQLite-based session persistence
- WebSocket real-time communication
- tmux integration for terminal management
- File search within sessions
- Worktree cleanup on session deletion

## Relationship to Other Products
- **Predecessor/parallel to `agent-orchestrator`** — both are desktop apps for AI development orchestration. `agent-orchestrator` (Electron-based, Tauri-planned) appears to be the more mature, actively developed successor.
- The worktree management concept carries forward into `worktree-manager` (public npm package)
- Predates `ao-cli` — the Rust-based orchestration approach here may have informed ao-cli's design

## Maturity / Status
**Archived / Superseded** — last pushed 2025-06-21. Active feature development occurred (worktree cleanup, file search, session management) but the project appears to have been superseded by `agent-orchestrator`. No active commits since June 2025.
