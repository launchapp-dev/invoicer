---
title: "Developer Tools — Data Flow"
product: developer-tools
type: data-flow
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

Data flows through each of the four developer tools: better-auth's authentication flow, launchapp-studio's IDE data pipeline, worktree-manager's task-driven workflow, and openapi-gen's code generation pipeline.

## Diagram

```mermaid
sequenceDiagram
    Note over USER,DB: better-auth — Authentication Flow
    participant USER as Client App
    participant BA as better-auth Server
    participant DB as Database
    participant OAUTH as OAuth Provider

    USER->>BA: POST /auth/login (email, password)
    BA->>DB: Query user, verify password hash
    DB->>BA: User record
    BA->>BA: Create session token
    BA->>USER: Set-Cookie: session_token

    USER->>BA: POST /auth/oauth/github
    BA->>OAUTH: Redirect to GitHub
    OAUTH->>BA: Callback with auth code
    BA->>OAUTH: Exchange code for token
    BA->>DB: Upsert user + link account
    BA->>USER: Session established

    Note over USER,DB: openapi-gen — Code Generation Pipeline
    participant SPEC as OpenAPI Spec
    participant CLI as openapi-gen CLI
    participant GEN as Generator Engine
    participant OUT as generated/

    CLI->>SPEC: Read spec (file or URL)
    SPEC->>GEN: Parse OpenAPI 3.0+ document
    GEN->>GEN: Resolve $ref references
    GEN->>OUT: Generate models/ (Zod schemas + TS types)
    GEN->>OUT: Generate endpoints/ (API client classes)
    GEN->>OUT: Generate hooks/ (React Query hooks)
    GEN->>OUT: Generate ApiClient.ts (base HTTP client)
    GEN->>GEN: Format with Prettier

    Note over USER,DB: worktree-manager — Task Workflow
    participant DEV as Developer
    participant MCP as MCP Server (47 tools)
    participant GIT as Git
    participant GH as GitHub

    DEV->>MCP: req_create → task_create → req_link_task
    MCP->>MCP: Validate: requirement linked?
    DEV->>MCP: task_start
    MCP->>GIT: git_create_worktree (isolated branch)
    GIT->>DEV: Worktree ready at repos/<name>/worktrees/<task>
    DEV->>MCP: Edit code (hooks enforce active task)
    DEV->>MCP: git_commit → gh_create_pr
    MCP->>GH: Create PR linked to task
```

## Notes

- **better-auth**: Supports sessions, OAuth, 2FA, magic links; framework-agnostic via adapters
- **openapi-gen**: One-way pipeline (spec → code); no runtime component; generates Zod for validation
- **worktree-manager**: Enforces task-first workflow via Claude Code hooks; blocks code edits without active task
- **launchapp-studio**: IDE data flow is file system → Monaco editor → user edits → file write-back; AI chat streams via Claude CLI
- better-auth's plugin system allows extending the flow (e.g., Stripe plugin adds billing hooks after auth)
- openapi-gen supports both local file and URL specs; output is grouped by OpenAPI tags
- worktree-manager's MCP server provides 47 tools across 4 modules (git, github, tasks, requirements)
