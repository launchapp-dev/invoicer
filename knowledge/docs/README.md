# LaunchApp Documentation

> User-facing documentation for LaunchApp products — quickstart guides, architecture overviews, and integration references.

## Product Overview

LaunchApp is a suite of developer tools and infrastructure for building and deploying AI-powered SaaS applications:

| Product | What It Does | For |
|---------|--------------|-----|
| **AO Agent Orchestrator** | Autonomous software delivery with AI agents | Teams wanting automated development workflows |
| **LaunchPad BaaS** | Backend-as-a-Service platform with 19+ SDKs | Developers building full-stack applications |
| **LaunchApp Templates** | Production-ready SaaS starters | Teams starting new projects |
| **Design System** | Radix UI component library with Tailwind CSS | Frontend developers |

---

## Quick Links

### Getting Started

- [AO Agent Orchestrator Quickstart](./ao-agent-orchestrator.md)
- [LaunchPad BaaS Quickstart](./launchpad-baas.md)
- [LaunchApp Templates Guide](./launchapp-templates.md)
- [Design System Guide](./design-system.md)

### Integration

- [Product Integration Guide](./integration.md) — How products work together
- [SDK Consistency Matrix](../sdk-matrix.md) — Package versions across products

### API Reference

- [Brain Products MCP API](./brain-products-api.md) — MCP server for querying product knowledge
- [Data Model](./data-model.md) — Brain knowledge base structure

---

## Product Lines

### 1. AO Agent Orchestrator

Turn YAML configuration into autonomous software delivery pipelines. AO dispatches tasks to AI agents across isolated git worktrees, manages quality gates, and merges results automatically.

**Key Features:**
- Multi-agent orchestration with planners, builders, reviewers, architects
- Decision contracts with advance/rework/skip/fail verdicts
- Model routing by task complexity
- Worktree isolation for parallel execution

**Get Started:** [AO Agent Orchestrator Guide](./ao-agent-orchestrator.md)

---

### 2. LaunchPad BaaS

Modular Backend-as-a-Service built on Postgres and open standards. Full TypeScript type safety with multi-tenancy built in.

**Key Features:**
- 19+ SDKs covering auth, database, storage, payments, realtime, push
- Hono-based API server with OpenAPI 3.1
- React hooks for all services
- Self-hosted or cloud deployment

**Get Started:** [LaunchPad BaaS Guide](./launchpad-baas.md)

---

### 3. LaunchApp Templates

Production-ready SaaS starters with auth, billing, multi-tenancy, and team management pre-configured.

**Available Templates:**
- React Router 7 (flagship)
- Next.js App Router
- Nuxt 4
- SvelteKit

**Get Started:** [LaunchApp Templates Guide](./launchapp-templates.md)

---

### 4. Design System

React + TypeScript component library built on Radix UI primitives, styled with Tailwind CSS.

**Key Features:**
- 15+ accessible components
- CSS custom properties with `--la-*` prefix
- Dark mode support
- shadcn registry integration

**Get Started:** [Design System Guide](./design-system.md)

---

## Architecture

For system architecture documentation, see [knowledge/architecture](../architecture/).

---

## Contributing

Documentation is maintained alongside the products. Updates are made through AO workflows and human review.

For questions or issues, refer to the product-specific guides or check the [brain knowledge base](../).
