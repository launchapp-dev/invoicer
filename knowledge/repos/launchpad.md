# launchpad (bare repo)

## Purpose
A comprehensive application management platform — a no-code/low-code builder that enables connecting to databases, auto-generating REST APIs, building visual workflows, and creating full-stack apps with AI-powered code generation. This is distinct from `launchpad-baas` (the backend service platform) — this is a visual app-builder product.

The repo description says "launchpad" but the README calls it **"Launchpad - Application Management Platform"** built "on top of launchapp.dev."

## Repository
- **Repo**: launchapp-dev/launchpad (private)
- **Last Pushed**: 2025-12-10

## Tech Stack
- **Monorepo**: Turborepo + pnpm workspaces (project starter template)
- **Apps**:
  - `apps/web` — Launchpad web platform (React Router v7, Shadcn UI)
  - `apps/native` — React Native mobile app (Expo)
  - `apps/landing` — Marketing landing page
- **Core Packages**:
  - `packages/api` — Hono API server
  - `packages/db-connections` — Multi-database connection manager (PostgreSQL, MySQL, MongoDB)
  - `packages/workflows` — Visual workflow engine with triggers, actions, execution
  - `packages/secrets` — AES-256-GCM encrypted secrets management
  - `packages/ai` — AI integration for app builder
  - `packages/auth` — Better-Auth
  - `packages/database` — Drizzle ORM
- **Infrastructure**: Pulumi (ECS/RDS deployment)
- **AI**: OpenAI API, Anthropic API, OpenRouter for app building

## Key Features
- **Database Connections**: Multi-database support (PostgreSQL, MySQL, MongoDB)
- **Auto-Generated APIs**: REST APIs from database table schemas
- **Visual Workflow Builder**: Drag-and-drop workflow design with triggers/actions
- **AI App Builder**: Full-stack app generation using AI
- **CRUD Builder**: Admin interfaces auto-generated from database tables
- **App Visualizer**: Architecture visualization
- **Bolt Integration**: External app-building tool integration (Bolt.new)
- **GitHub Integration**: Direct GitHub connectivity
- **Secrets Management**: Encrypted secrets storage
- **CRM Features**: Developer-facing CRM tools
- **Analytics Dashboard**: Built-in analytics

## Relationship to Other Products
- Built on the launchapp.dev project starter template
- Conceptually similar to `launchpad-baas` but positioned differently:
  - `launchpad-baas`: backend services SDK/platform
  - `launchpad` (this repo): visual no-code/low-code app management UI
- Uses Better-Auth for auth
- Extensive Bolt.new integration suggests experimentation with AI app-building tools
- The heavy documentation (100+ .md files) indicates intensive AI-assisted development

## Maturity / Status
**Stalled / Heavy development** — last pushed 2025-12-10. Massive amount of work was done (CRM, app builder, workflow engine, CRUD generator, analytics) but the repo shows signs of AI-generated sprawl (100+ documentation files, multiple competing integration attempts). Status is unclear — could be an internal product still in development or a client project.

## Note on Naming Confusion
The task description referred to this as "launchapp (bare)" — it is actually the `launchpad` repo (not `launchapp`). The GitHub repo name is `launchapp-dev/launchpad`. Do not confuse with:
- `launchpad-baas` — the BaaS backend platform
- `launchapp-lite` — lightweight SaaS template
