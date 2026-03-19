---
title: "Developer Tools — System Architecture"
product: developer-tools
type: system
status: current
source_repos:
  - better-auth
  - launchapp-studio
  - worktree-manager
  - openapi-gen
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

System architecture of the Developer Tools product line — four independent tools: better-auth (TypeScript auth framework), launchapp-studio (Tauri desktop IDE), worktree-manager (MCP-based agent orchestration), and openapi-gen (OpenAPI code generator). Each serves a different purpose but several are consumed by or relate to other org products.

## Diagram

```mermaid
graph TD
    subgraph "better-auth (TypeScript Auth Framework)"
        BA_CORE["better-auth<br/>Core library — sessions,<br/>OAuth, 2FA, multi-tenant"]
        BA_CLI["@better-auth/cli<br/>CLI tools"]
        BA_EXPO["@better-auth/expo<br/>React Native adapter"]
        BA_STRIPE["@better-auth/stripe<br/>Stripe billing plugin"]
        BA_PLUGINS["Plugin Ecosystem<br/>Extensible via plugins"]
    end

    subgraph "launchapp-studio (Tauri Desktop IDE)"
        STUDIO_APP["apps/desktop<br/>Tauri v2 + React 19"]
        subgraph "Packages"
            STUDIO_CORE["@code-pilot/core<br/>Business logic"]
            STUDIO_UI["@code-pilot/ui<br/>Component library"]
            STUDIO_TYPES["@code-pilot/types"]
            STUDIO_UTILS["@code-pilot/utils"]
        end
        subgraph "Tauri Plugins (8)"
            PLUG_CLAUDE["tauri-plugin-claude"]
            PLUG_TERM["tauri-plugin-terminal"]
            PLUG_GIT["tauri-plugin-git"]
            PLUG_MCP["tauri-plugin-mcp-webserver"]
            PLUG_PM["tauri-plugin-project-management"]
            PLUG_STORE["tauri-plugin-storage"]
            PLUG_VSCODE["tauri-plugin-vscode-host"]
            PLUG_WIN["tauri-plugin-window-manager"]
        end
    end

    subgraph "worktree-manager (MCP Agent Orchestration)"
        WM_SERVER["mcp/server.js<br/>MCP server — 47 tools"]
        WM_GIT["mcp/modules/git.js<br/>Git worktree ops"]
        WM_GH["mcp/modules/github.js<br/>GitHub integration"]
        WM_TASKS["mcp/modules/tasks.js<br/>Task management"]
        WM_REQS["mcp/modules/requirements.js<br/>Requirements tracking"]
        WM_HOOKS[".claude/hooks/<br/>Workflow enforcement"]
    end

    subgraph "openapi-gen (Code Generator CLI)"
        OG_CLI["src/cli.ts<br/>Commander CLI"]
        OG_GEN["src/generator/<br/>Code generation engine"]
        OG_API["src/ApiClient.ts<br/>Base HTTP client"]
        OG_OUT["generated/<br/>models/ endpoints/ hooks/"]
    end

    BA_CORE --> BA_CLI
    BA_CORE --> BA_EXPO
    BA_CORE --> BA_STRIPE

    STUDIO_APP --> STUDIO_CORE
    STUDIO_APP --> STUDIO_UI
    STUDIO_APP --> PLUG_CLAUDE
    STUDIO_APP --> PLUG_TERM
    STUDIO_APP --> PLUG_GIT

    WM_SERVER --> WM_GIT
    WM_SERVER --> WM_GH
    WM_SERVER --> WM_TASKS
    WM_SERVER --> WM_REQS

    OG_CLI --> OG_GEN
    OG_GEN --> OG_OUT
    OG_GEN --> OG_API

    subgraph "Org Consumers"
        SAAS["saas-template"]
        LPAD["launchpad-baas"]
        LITE["launchapp-lite"]
    end

    BA_CORE -.->|Used as auth| SAAS
    BA_CORE -.->|Used as auth| LPAD
    BA_CORE -.->|Used as auth| LITE
```

## Notes

- **better-auth**: Flagship open-source contribution; monorepo with 4 packages (core, cli, expo, stripe)
- **launchapp-studio**: Tauri v2 desktop app with 8 custom plugins; Phase 3 in progress (terminal, git, AI chat)
- **worktree-manager**: Predecessor to ao-cli; simpler Node.js MCP server with 47 tools for Claude Code
- **openapi-gen**: Standalone CLI that generates Zod schemas + React Query hooks from OpenAPI specs
- better-auth is the most impactful tool — it's the auth backbone for 3+ org products
- launchapp-studio shares architecture patterns with agent-orchestrator (both Tauri v2 apps)
- worktree-manager is stable at v1.0.0 but effectively superseded by ao-cli for active development
- openapi-gen is early-stage (v0.0.5) and maintenance-mode
