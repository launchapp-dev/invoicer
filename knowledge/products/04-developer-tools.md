# Developer Tools

> better-auth, launchapp-studio, worktree-manager, openapi-gen

## Purpose

Standalone developer tools built by the org — some are open-source community tools, others are internal productivity tools.

---

## `better-auth` (public, open-source)

- **Package**: `better-auth` (on npm)
- **Version**: `0.0.2-beta.8` (root monorepo)
- **Description**: The most comprehensive authentication framework for TypeScript
- **License**: MIT
- **Stars**: Growing (community project)
- **Maturity**: Stable / Active development
- **Last updated**: 2025-04-17

### Purpose

Framework-agnostic authentication and authorization library for TypeScript. Provides a comprehensive set of features out of the box including 2FA, multi-tenant support, OAuth, and a plugin ecosystem.

### Stack

- TypeScript (100%)
- Monorepo: pnpm workspaces + Turborepo
- Build tooling: Biome (linting/formatting), bumpp (versioning)

### Usage in Org

Used as the authentication backbone for:
- `launchpad-baas` (via `@launchpad/auth`)
- `launchapp-lite` (via `packages/auth`)
- `launchpad-saas-template`

---

## `launchapp-studio` (public)

- **Package**: `code-pilot-studio` v0.1.0
- **Description**: AI-powered desktop IDE — "The IDE of the future"
- **Type**: Desktop application (Tauri v2)
- **Maturity**: Early development (Phase 3 in progress)
- **Last updated**: 2025-06-23

### Purpose

A next-generation AI-powered IDE built with Tauri, React, and TypeScript. Phases:
- Phase 1 (done): Foundation — monorepo, Tauri, core packages
- Phase 2 (done): Core features — project management, file explorer, Monaco editor, tabs, file system ops, themes, settings, keyboard shortcuts
- Phase 3 (in progress): Terminal, Git operations, AI Chat with streaming
- Phase 4 (upcoming): Claude CLI integration, multiple AI sessions, MCP support

### Stack

- **Desktop**: Tauri v2 (Rust backend, TypeScript frontend)
- **UI**: React, TypeScript
- **Editor**: Monaco Editor (20+ languages)
- **Monorepo**: pnpm + Turborepo
- **Architecture**: Modular Tauri plugin architecture

### Notes

- Repository is under `launchapp-dev` but was known as `code-pilot-studio`
- Similar architecture to `agent-orchestrator` (both Tauri desktop apps)
- Plans to integrate Claude CLI and MCP

---

## `worktree-manager` (public)

- **Package**: `worktree-manager` v1.0.0
- **Description**: AI-powered parallel development using git worktrees with Claude, Codex, and Gemini
- **License**: Not specified (MIT assumed)
- **Maturity**: Stable / v1.0.0
- **Last updated**: 2025-12-22

### Purpose

MCP-powered orchestration system for Claude Code. Manages multiple repositories with git worktrees, enforces development workflows with hooks, and coordinates AI agents.

Features:
- 47 MCP Tools — Git, GitHub, Tasks, Requirements management
- Git worktrees for parallel feature development in isolated directories
- Task and requirements tracking
- Workflow hooks (enforces: can't edit code without a task!)
- Agent templates (review, testing, security, etc.)
- GitHub integration (PRs, issues, branches, CI checks)

### Stack

- JavaScript/Node.js (MCP server)
- JSON configuration

### Relationship to AO

`worktree-manager` is the predecessor/companion to `ao-cli`. AO provides a more sophisticated, daemon-based orchestration system while `worktree-manager` is a simpler template-based approach. Both use git worktrees and MCP.

---

## `openapi-gen` (public)

- **Package**: `openapi-gen` v0.0.5
- **Description**: TypeScript code generator from OpenAPI specs using Zod and React Query
- **License**: Not specified
- **Maturity**: Early (v0.0.5)
- **Last updated**: 2025-06-04

### Purpose

CLI tool that generates type-safe TypeScript API clients from OpenAPI specifications:
- Zod schemas for runtime validation
- React Query hooks for data fetching
- Organized output (models, endpoints, hooks)

### Stack

- TypeScript
- Zod
- TanStack Query (React Query)

### Usage in Org

Could be used to generate clients for Launchpad API server endpoints.

---

## Other Developer Tools

| Repo | Description | Status |
|------|-------------|--------|
| `pr-review-responder` (public) | Local task runner: responds to GitHub PR comments using Codex | Stable/maintenance |
| `figma-tailwind-plugin` (public) | Figma plugin to generate Tailwind React components from variables | Maintenance |
| `supabase-to-hooks` (public) | Convert Supabase queries to React hooks | Maintenance |
| `react-router-presets` (public) | Presets/snippets for React Router v7 | Maintenance |
| `supabase-railway-template` (public) | Supabase setup for Railway projects | Stable |
