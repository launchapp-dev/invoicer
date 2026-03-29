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
│  @launchpad/push-server      @launchpad/git-server                   │
│  @launchpad/mcp-server       @launchpad/task-orchestrator            │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                       AO AGENT SYSTEM                                │
│                                                                      │
│  ┌─────────────┐     ┌─────────────┐                                │
│  │ ao-dashboard│────►│  ao-fleet   │                                │
│  │ (Tauri UI)  │     │(control pl.)│                                │
│  └─────────────┘     └──────┬──────┘                                │
│                             │                                        │
│  ┌─────────────┐            │      ┌─────────────┐                  │
│  │ ao-desktop  │            └─────►│   ao-cli    │                  │
│  │(Tauri wrap.)│                   │  (Rust CLI) │                  │
│  └─────────────┘                   └──────┬──────┘                  │
│                                           │                          │
│  ao-skills ◄──────────────────────────────┘                         │
│  ao-projects (MCP)                                                   │
│  ao-bundled-packs / ao-core-packs / ao-fleet-pack                    │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                    AO-BUILT SHOWCASE APPS                            │
│                                                                      │
│  invoicer ◄── postpilot ◄── condohub ◄── launchapp-crm              │
│  (all built autonomously by AO; depend on design-system + better-auth)│
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
| `launchapp-react-router` | React Router 7, Hono, Better Auth, Drizzle, Supabase, Stripe |

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
| `ao-dashboard` | `ao-fleet` (control plane), Tauri v2, React 19, Recharts, React Flow |
| `ao-fleet` | `ao-cli` (spawns/consumes), Rust ecosystem, SQLite, MCP SDK |
| `ao-desktop` | `ao-cli` (sidecar), Tauri v2, TypeScript |
| `ao-skills` | Claude Code plugin SDK, `ao-cli` (referenced commands) |
| `ao-bundled-packs` | `ao-cli`, Tavily API, Playwright |
| `ao-projects` | Rust ecosystem, MCP SDK |

### Developer Tools → External

| Tool | Depends On |
|------|-----------|
| `better-auth` | TypeScript, framework-agnostic |
| `worktree-manager` | Node.js, Claude Code MCP |
| `ai-model-registry` | TypeScript, aggregating provider APIs |

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

### `@launchapp/design-system` is used by:
- `agent-orchestrator` (legacy desktop app)
- `invoicer`, `postpilot`, `condohub` (AO-built showcases)
- `launchapp-lite` and templates
- `launchapp-studio` (desktop IDE)

### `ao-cli` is used by:
- `ao-fleet` (spawns and consumes AO CLI for local projects)
- `ao-dashboard` (indirectly via `ao-fleet`)
- `brain` repo (AO manages this project)
- Any project with AO configured

### `ao-fleet` is used by:
- `ao-dashboard` (primary data source and control plane backend)

---

## Circular/Interesting Dependencies

- `launchpad-baas` monorepo *contains* early versions of `@launchpad/core`, `@launchpad/auth`, `@launchpad/db` — these have since been extracted to separate repos
- `ao-cli` *manages* the `brain` repo, which *documents* `ao-cli`
- `ao-fleet` *orchestrates* `ao-cli` without vendoring it
- `ao-dashboard` *visualizes* `ao-fleet`, which *controls* `ao-cli`
- `launchpad-mcp-server` exposes Launchpad to AI agents, which could include `ao-cli` agents

---

## Maturity by Dependency Tier

| Tier | Maturity | Notes |
|------|---------|-------|
| Rust core (ao-cli, ao-projects, ao-fleet) | Very active | Multiple commits/day |
| AO dashboard / desktop | Very active | Heavy development March 2026 |
| AO-built showcase apps | Very active | Built autonomously, daily commits |
| BaaS Backend servers | Stable v0.1.0 | Minor updates |
| BaaS SDKs | Stable v0.1.0 | Mostly stable |
| Templates | Active | Iteration happening |
| Developer tools | Mixed | better-auth active, others stable/maintenance |
| Websites | Active | All three main sites updated March 2026 |
| Design system | Active | Recent updates |
| Plugin packs | Active | Recent batch release |
