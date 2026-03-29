:
# LaunchApp Dev — Org-Wide Architecture

**Last Updated**: 2026-03-29

## Overview

LaunchApp Dev is a GitHub organization focused on building AI-powered developer tools and SaaS applications. The org follows a monorepo-style structure with shared packages and clear separation between flagship apps, shared SDKs, and tooling.

## Repository Architecture

### Flagship Applications

| Repo | Purpose | Stack | Status |
|------|---------|-------|--------|
| `launchapp-nextjs` | Primary SaaS application | Next.js 15, TypeScript, Tailwind v4 | Production |
| `launchapp-react-router` | React Router v7-based flagship | React Router v7, TypeScript | Active development |

### Shared SDKs & Packages

| Package | Purpose | Consumers |
|---------|---------|-----------|
| `@repo/api` | Shared API utilities, middleware, response helpers | All apps |
| `@repo/db` | Database schema and Drizzle ORM | All apps |
| `@repo/ui` | Shared UI components | All apps |
| `@repo/design-system` | Design tokens and CSS variables | All apps |

### AO (Agent Orchestrator) Platform

| Repo | Purpose | Stack |
|------|---------|-------|
| `ao` | Core orchestrator daemon | Rust |
| `ao-dashboard` | Fleet monitoring Tauri app | Rust + React + Tailwind |
| `brain` | Knowledge base and task management | Markdown, Scripts |

### Support & Tooling

| Repo | Purpose |
|------|---------|
| `design-system` | shadcn registry, design tokens |
| `gstack` | Browser automation for QA |

## Cross-Cutting Concerns

### API Consistency Strategy

All applications use `@repo/api` for standardized:
- Response helpers (success/error formatting)
- Rate limiting middleware
- Observability (metrics, Sentry, tracing)
- Authentication/authorization patterns

### Design System

- **Registry**: https://launchapp-dev.github.io/design-system/registry.json
- **Tokens**: `--la-*` CSS custom properties
- **Components**: shadcn/ui primitives via registry
- **Theme**: Midnight dark theme

### Database

- SQLite with Drizzle ORM
- Shared schema in `@repo/db`
- Migrations managed per-application

## Integration Points

1. **Trigger.dev** — Background job processing (react-router, nextjs)
2. **Sentry** — Error tracking and performance monitoring
3. **Better Auth** — Authentication across all apps
4. **AO Fleet** — Task orchestration and agent management

## Recent Architectural Changes (Last 7 Days)

- **ao-dashboard**: Major UI migration to Tailwind v4 + design system theme
- **ao-dashboard**: Fleet monitoring with React Flow topology visualization
- **launchapp-react-router**: Synced @repo/api from launchapp-nextjs (PR #429)
- **launchapp-react-router**: Added observability module (replaces Logger.ts)
- **launchapp-react-router**: Rate limiting middleware added
