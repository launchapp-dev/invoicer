:
# LaunchApp Dev — Repository Inventory

**Last Updated**: 2026-03-29

## Active Repositories

### SaaS Applications

#### launchapp-nextjs
- **Purpose**: Primary flagship SaaS application
- **Stack**: Next.js 15, App Router, TypeScript, Tailwind CSS v4
- **Auth**: Better Auth (email/password + sessions)
- **Database**: SQLite + Drizzle ORM
- **Status**: Production
- **Last Activity**: 2026-03-29

#### launchapp-react-router
- **Purpose**: React Router v7-based flagship application
- **Stack**: React Router v7, TypeScript, Tailwind CSS
- **Auth**: Better Auth
- **Database**: SQLite + Drizzle ORM
- **Status**: Active development
- **Last Activity**: 2026-03-29 (PR #429 merged)
- **Recent Changes**:
  - Synced @repo/api from launchapp-nextjs
  - Added observability module (metrics, Sentry, tracing)
  - Added Trigger.dev integration
  - Added rate limiting middleware
  - Removed Logger.ts (superseded by observability)

### AO Platform

#### ao
- **Purpose**: Agent Orchestrator daemon
- **Stack**: Rust
- **Status**: Production
- **Responsibility**: Task scheduling, agent management, workflow orchestration

#### ao-dashboard
- **Purpose**: Fleet monitoring and control dashboard
- **Stack**: Tauri 2 (Rust + React), Tailwind CSS v4
- **Status**: Active development
- **Last Activity**: 2026-03-29
- **Recent Changes**:
  - Full UI migration to Tailwind + design system
  - React Flow topology visualization
  - Team detail and founder controls
  - Fleet overview with aggregated data
  - Live filtered project streams

#### brain
- **Purpose**: Knowledge base and task management
- **Stack**: Markdown, Scripts
- **Status**: Active

### Shared Packages

#### design-system
- **Purpose**: shadcn registry and design tokens
- **Type**: Component registry
- **Registry URL**: https://launchapp-dev.github.io/design-system/registry.json

#### gstack
- **Purpose**: Browser automation and QA testing
- **Stack**: TypeScript
- **Status**: Production

## Archived/Inactive Repositories

None noted in recent activity.

## Repository Relationships

```
launchapp-nextjs      launchapp-react-router
        |                       |
        v                       v
    @repo/api  <-------------  @repo/api (synced)
        |
        v
   @repo/db, @repo/ui, @repo/design-system
        |
        v
   design-system (registry)
```
