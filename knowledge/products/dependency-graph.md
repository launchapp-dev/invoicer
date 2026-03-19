# Dependency Graph

> Inter-product dependency map for launchapp-dev org

## Visual Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CONSUMER LAYER                               │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  launchapp-lite  │  │ launchpad-saas-  │  │  launchapp.dev   │  │
│  │  (template)      │  │ template         │  │  (website)       │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                    │                      │             │
└───────────┼────────────────────┼──────────────────────┼─────────────┘
            │                    │                      │
┌───────────▼────────────────────▼──────────────────────▼─────────────┐
│                      LaunchPad BaaS SDK LAYER                       │
│                                                                     │
│  @launchpad/core ◄─── @launchpad/auth   @launchpad/db              │
│       ▲                    ▲                  ▲                     │
│       │                    │                  │                     │
│  @launchpad/payments  @launchpad/storage  @launchpad/realtime       │
│  @launchpad/workflows @launchpad/push     @launchpad/identity       │
│  @launchpad/customers @launchpad/cms      @launchpad/analytics      │
│  @launchpad/audit-log @launchpad/i18n     @launchpad/offline        │
│  @launchpad/ai        @launchpad/secrets  @launchpad/appstores      │
└──────────────────────────────────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────────────────┐
│                    LaunchPad BACKEND SERVER LAYER                    │
│                                                                      │
│  @launchpad/server (Hono framework)                                  │
│  @launchpad/db-engine (custom DB with multi-tenancy)                 │
│  @launchpad/payments-server  @launchpad/realtime-server              │
│  @launchpad/push-server      @launchpad/git-server                  │
│  @launchpad/mcp-server       @launchpad/task-orchestrator            │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                       AO AGENT SYSTEM                                │
│                                                                      │
│  ao-cli (Rust) ◄──── agent-orchestrator (Tauri desktop)             │
│       ▲                                                              │
│       │                                                              │
│  ao-skills (Claude Code plugin) ──► launchapp-dev/brain             │
│  ao-bundled-packs (AO workflow packs)                                │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                    SHARED FOUNDATIONS                                │
│                                                                      │
│  better-auth ─────────────────────────────────────────────────────► │
│  (used by launchpad-baas, launchapp-lite, launchpad-saas-template)   │
│                                                                      │
│  design-system (@audiogenius/design-system) ──────────────────────► │
│  (used by agent-orchestrator, launchapp products, design-reliant UIs)│
└──────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Dependency Matrix

### Templates → BaaS SDKs

| Template | Depends On |
|----------|-----------|
| `launchpad-saas-template` | `@launchpad/core`, `@launchpad/auth`, `@launchpad/db`, `@launchpad/payments-sdk` |
| `launchapp-lite` | better-auth, Drizzle ORM (internal packages), Hono |
| `launchapp-lite-v2` | Same as launchapp-lite |

### BaaS SDKs → Core

| SDK | Depends On |
|-----|-----------|
| `@launchpad/auth` | `@launchpad/core`, `better-auth` |
| `@launchpad/db` | `@launchpad/core`, `@launchpad/db-engine` (possibly) |
| `@launchpad/payments` | `@launchpad/core`, Stripe |
| `@launchpad/storage` | `@launchpad/core`, AWS SDK v3 |
| `@launchpad/realtime` | `@launchpad/core` |
| `@launchpad/workflows` | `@launchpad/core` |
| All others | `@launchpad/core` |

### Backend Servers → SDKs

| Server | Depends On |
|--------|-----------|
| `@launchpad/payments-server` | `@launchpad/payments`, `@launchpad/server`, Stripe |
| `@launchpad/realtime-server` | `@launchpad/server`, PostgreSQL LISTEN/NOTIFY, Redis |
| `@launchpad/push-server` | `@launchpad/push`, FCM SDK, APNs SDK |
| `@launchpad/git-server` | `@launchpad/server`, isomorphic-git |
| `@launchpad/mcp-server` | `@launchpad/db`, `@launchpad/server`, MCP SDK |
| `@launchpad/task-orchestrator` | `@launchpad/server`, `@launchpad/db` |

### AO System → External

| Component | Depends On |
|-----------|-----------|
| `ao-cli` | Rust ecosystem (Axum, Tokio, Serde), Claude/Codex/Gemini CLI tools |
| `agent-orchestrator` | `ao-cli` (sidecar), React 19, Tauri v2, TanStack Query |
| `ao-skills` | Claude Code plugin SDK, `ao-cli` (referenced commands) |
| `ao-bundled-packs` | `ao-cli`, Tavily API, Playwright |

### Developer Tools → External

| Tool | Depends On |
|------|-----------|
| `better-auth` | TypeScript, framework-agnostic |
| `launchapp-studio` | Tauri v2, Monaco Editor, React |
| `worktree-manager` | Node.js, Claude Code MCP |
| `openapi-gen` | Node.js, Zod, TanStack Query |

---

## Reverse Dependency Map (who depends on what)

### `better-auth` is used by:
- `launchpad-baas` (core auth)
- `launchapp-lite` (template auth)
- `launchpad-saas-template` (via `@launchpad/auth`)
- `launchpad-auth-sdk` (re-exports/wraps better-auth)

### `@launchpad/core` is used by:
- All `@launchpad/*` SDKs
- `launchpad-saas-template`
- `launchapp-lite` (internal core package)

### `@launchpad/db-engine` is used by:
- `launchpad-baas` (database layer)
- `@launchpad/db` SDK
- Possibly `launchpad-db-sdk`

### `@audiogenius/design-system` is used by:
- `agent-orchestrator` (desktop app)
- Potentially other UI products

### `ao-cli` is used by:
- `agent-orchestrator` (desktop sidecar)
- `brain` repo (AO manages this project)
- Any project with AO configured

---

## Circular/Interesting Dependencies

- `launchpad-baas` monorepo *contains* early versions of `@launchpad/core`, `@launchpad/auth`, `@launchpad/db` — these have since been extracted to separate repos
- `ao-cli` *manages* the `brain` repo, which *documents* `ao-cli`
- `launchpad-mcp-server` exposes Launchpad to AI agents, which could include `ao-cli` agents

---

## Maturity by Dependency Tier

| Tier | Maturity | Notes |
|------|---------|-------|
| Rust core (ao-cli) | Very active | Multiple commits/day |
| BaaS Backend servers | Stable v0.1.0 | Minor updates |
| BaaS SDKs | Stable v0.1.0 | Mostly stable |
| Templates | Active | Iteration happening |
| Developer tools | Mixed | better-auth active, others stable/maintenance |
| Websites | Mixed | launchapp.dev active, others stagnant |
| Design system | Active | Recent updates |
| Plugin packs | Active | Recent batch release |
