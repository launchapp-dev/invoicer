# AO Dashboard

> Fleet monitoring desktop app for the AO Agent Orchestrator. Visualize daemons, workflows, and agents in real time.

## Purpose

AO Dashboard is a Tauri v2 desktop application that provides a god's-eye view of an [AO](https://github.com/launchapp-dev/ao) fleet. It discovers AO projects, streams daemon health and event logs, visualizes workflow topology with interactive graphs, and exposes fleet control operations through a React-based UI.

The dashboard is the primary visual control surface for AO fleet operations, complementing the `ao-cli` command-line interface and the `ao-fleet` control plane.

Core functionality:
- **Fleet Overview** — Real-time health status, agent counts, queue depths, and task distribution charts with per-project drill-down
- **Flow View** — Interactive React Flow graph showing project → workflow → phase topology
- **Event Stream** — Live log viewer with filtering by level, project, and text search
- **Project Detail** — Filtered logs by workflow, model, or active run with live streaming
- **Founder Command Center** — Team-scoped fleet controls, schedule policies, and daemon reconciliation overrides
- **Persistent Cache** — Workflow and task data cached via `tauri-plugin-store` for instant startup

## Maturity: Active Development (v0.1.0)

Created in March 2026. Under very heavy active development with multiple commits per day throughout late March 2026. The app recently transitioned from direct AO CLI integration to using `ao-fleet` as its backend control plane, enabling richer multi-project fleet management.

**Recent milestones (2026-03-29)**:
- Switched dashboard fleet control plane to `ao-fleet`
- Added founder command center with policy controls and team detail views
- Restructured dashboard around fleet teams and aggregated fleet overview
- Hardened project detail loading and fleet data scrolling

## Visibility: Public

Open source MIT-licensed repository.

---

## Repository

### `ao-dashboard` (public)
- **Type**: Tauri v2 desktop application
- **Description**: Fleet monitoring and management desktop app for AO
- **Stack**: React 19, TypeScript, Tailwind CSS v4, Vite, Tauri 2, Recharts, React Flow
- **Version**: 0.1.0
- **License**: MIT
- **Last pushed**: 2026-03-29T21:55:12Z
- **Primary language**: TypeScript

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19.1.0 | UI library |
| **Language** | TypeScript 5.8.3 | Type safety |
| **Build Tool** | Vite 7.0.4 | Development and production builds |
| **Styling** | Tailwind CSS 4.2.2 | Utility-first CSS |
| **Vite Plugin** | `@tailwindcss/vite` | Tailwind Vite integration |
| **Desktop Shell** | Tauri 2 | Rust-based cross-platform desktop runtime |
| **Tauri API** | `@tauri-apps/api` | Frontend-to-Rust IPC |
| **Tauri Plugins** | `plugin-opener`, `plugin-store` | File opening and persistent local storage |
| **Charts** | Recharts 3.8.0 | Data visualization and dashboards |
| **Flow Graphs** | `@xyflow/react` 12.10.1 (React Flow) | Interactive topology graphs |
| **Radix Primitives** | `@radix-ui/react-collapsible`, `react-scroll-area`, `react-tabs`, `react-tooltip` | Accessible UI components |
| **Markdown** | `react-markdown`, `remark-gfm`, `rehype-raw`, `rehype-sanitize` | Rich text rendering |
| **Icons/Utils** | `lucide-react` (via org conventions), `clsx`, `tailwind-merge`, `class-variance-authority` | Utilities |

---

## Core Features

### 1. Fleet Overview
- Cards for each AO project with status, agent allocation, and queue depth
- Task distribution charts (done / ready / backlog)
- Daemon status indicators with utilization bars
- Per-project drill-down navigation
- Aggregated fleet overview for founder/operator snapshots

### 2. Flow View
- Interactive React Flow canvas
- Visualizes project → workflow → phase topology
- Click-to-focus and zoom interactions
- Graph tracing for understanding execution paths

### 3. Event Stream
- Real-time log stream from `ao daemon stream --json`
- Filters by log level, project, and free-text search
- Auto-scroll and pause controls
- Color-coded severity indicators

### 4. Project Detail
- Deep-dive into a single AO project
- Filter logs by workflow, model, or active run
- Live streaming updates
- Close integration with `ao-fleet` project proxy

### 5. Founder Command Center
- Team-scoped fleet controls
- Schedule policy management
- Daemon intent reconciliation
- Host assignment and capacity views
- Operational overrides for fleet rebalancing

### 6. Phased Loading
- Projects load instantly from cache
- Health data fetched in parallel
- Workflows and tasks populate in the background
- Smooth UI without blocking on slow daemon responses

---

## Architecture

```
~/.ao/*                    ao daemon health         ao daemon stream --json
   │                            │                          │
   ▼                            ▼                          ▼
┌──────────┐            ┌──────────────┐           ┌──────────────┐
│ Discover │            │  Health Poll │           │  Event Stream│
│ Projects │            │  (parallel)  │           │  (per proj)  │
└────┬─────┘            └──────┬───────┘           └──────┬───────┘
     │                         │                          │
     └─────────────────────────┼──────────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   ao-fleet backend  │
                    │  (team/project ctl) │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │   Overview │ Flow   │
                    │   Stream  │ Detail  │
                    └─────────────────────┘
```

The Rust Tauri backend discovers AO projects from `~/.ao/`, runs `ao daemon health` and `ao daemon stream --json` for each project in parallel, and emits structured events to the React frontend via Tauri IPC. As of March 2026, dashboard project operations are increasingly routed through `ao-fleet` rather than spawning the AO CLI directly.

---

## Dependencies

### External Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.0 | UI library |
| react-dom | 19.1.0 | DOM rendering |
| @vitejs/plugin-react | 4.6.0 | Vite React plugin |
| vite | 7.0.4 | Build tool |
| typescript | ~5.8.3 | Type checking |
| tailwindcss | 4.2.2 | Styling |
| @tailwindcss/vite | 4.2.2 | Tailwind Vite integration |
| recharts | 3.8.0 | Charts |
| @xyflow/react | 12.10.1 | Flow graphs |
| react-markdown | 10.1.0 | Markdown rendering |
| remark-gfm | 4.0.1 | GitHub-flavored markdown |
| rehype-raw | 7.0.0 | Raw HTML in markdown |
| rehype-sanitize | 6.0.0 | Sanitized HTML output |
| @radix-ui/react-collapsible | 1.1.12 | Collapsible panels |
| @radix-ui/react-scroll-area | 1.2.10 | Scrollable regions |
| @radix-ui/react-tabs | 1.1.13 | Tab navigation |
| @radix-ui/react-tooltip | 1.2.8 | Tooltips |
| class-variance-authority | 0.7.1 | Component variants |
| clsx | 2.1.1 | Conditional classes |
| tailwind-merge | 3.5.0 | Tailwind class merging |

### Org Product Dependencies

| Product | Usage |
|---------|-------|
| `ao-cli` | Data source for daemon health and stream events |
| `ao-fleet` | Control plane backend for multi-project fleet operations |

---

## AO Integration Status

AO Dashboard is a first-class AO product, built and maintained by the AO Agent Orchestrator itself.

### Integration Points

| Component | Integration |
|-----------|-------------|
| **AO CLI** | Spawns `ao daemon health` and `ao daemon stream --json` to gather live project state |
| **AO Fleet** | New primary backend — dashboard routes project ops through `ao-fleet` for team-scoped control, schedule policies, and founder overrides |
| **Tauri IPC** | Custom Rust commands bridge frontend React to backend AO/fleet operations |
| **tauri-plugin-store** | Caches workflow and task data for sub-second startup |

### Recent Development Activity

#### Recently Shipped Features (2026-03-27 to 2026-03-29)
| Feature | Commit | Description |
|---------|--------|-------------|
| Fleet Control Plane Switch | `11d0589` | Switched dashboard fleet control to `ao-fleet` |
| Team Detail | `39e6637` | Added team detail and founder controls |
| Founder Command Center | `f6e8b7c` | Added founder operations and policy controls |
| Aggregated Fleet Overview | `8a6ade4` | Uses aggregated fleet overview for snapshots |
| Project Detail Hardening | `49659b1` | Hardened dashboard project detail loading |
| Prefer Enabled Projects | `3cf0f6e` | Dashboard prefers enabled fleet projects |

### Build & Development

```bash
pnpm install
pnpm tauri dev    # Development desktop app
pnpm tauri build  # Production desktop build
```

### Prerequisites

- [AO CLI](https://github.com/launchapp-dev/ao) installed at `~/.local/bin/ao`
- At least one AO project with a running daemon
- Rust toolchain
- Node.js + pnpm

---

## Product Context

AO Dashboard represents the **visual control plane** layer of the AO Agent Orchestrator ecosystem. It demonstrates:

- **Real-time fleet monitoring**: Live health, logs, and topology for multiple AO projects
- **Desktop-first UX**: Tauri v2 delivers native performance with web tech
- **Reactive data visualization**: Recharts for metrics, React Flow for topology
- **Control plane integration**: Tight coupling with `ao-fleet` for company-wide orchestration

Key differentiators:
- First AO product with a dedicated visual monitoring surface
- Designed for founder/operator workflows with command center controls
- Ships as a cross-platform MIT-licensed desktop application

---

## Non-Goals (current)

- Not a code editor or IDE (see `launchapp-studio` for that)
- Not a replacement for `ao-cli` command-line operations
- Not a workflow authoring tool (see `ao` CLI and `.ao/workflows/`)
- Not a hosted SaaS (local-first desktop app)

---

## Related Knowledge

- [AO Agent Orchestrator](02-ao-agent-orchestrator.md) — Parent product line
- [Dependency Graph](dependency-graph.md) — How `ao-dashboard` fits into the org
