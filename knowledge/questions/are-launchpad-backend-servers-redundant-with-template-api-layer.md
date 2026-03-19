---
title: "Are Launchpad backend servers redundant now that the flagship template builds its own API layer?"
priority: high
status: open
category: architecture
source_files:
  - knowledge/repos/launchpad-backend-servers.md
  - knowledge/active-workstreams.md
  - knowledge/products/01-launchpad-baas.md
  - knowledge/sdk-matrix.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The Launchpad BaaS includes 7 standalone backend servers (`@launchpad/payments-server`, `@launchpad/push-server`, `@launchpad/realtime-server`, `@launchpad/git-server`, `@launchpad/mcp-server`, `@launchpad/server`, `@launchpad/task-orchestrator`). These were built as independent microservices intended to run alongside the core BaaS.

Meanwhile, the flagship SaaS template (`saas-template-launch-app-test`) has received 180+ merged PRs in the last week and builds its own Hono-based API layer (`@repo/api`) with storage routes, billing webhooks, rate limiting, and more — covering much of the same surface area as the standalone servers.

## What We Know

- All 7 backend servers were last updated between December 2025 and January 2026 — none have been touched in 2-3 months.
- The flagship template's `@repo/api` package now handles payments (Stripe + Polar.sh), storage (presigned upload/download/delete), and authentication — overlapping with `@launchpad/payments-server` and `@launchpad/server`.
- The template uses Upstash for rate limiting and Redis, while the standalone servers use different infrastructure patterns.
- `launchpad-task-orchestrator` (17 MCP tools for AI agent workflows) overlaps significantly with AO CLI's own task system.
- `launchpad-git-server` (agent-optimized git with worktree isolation) overlaps with `worktree-manager` and AO's built-in worktree handling.
- No evidence exists of any consumer of these servers outside the LaunchPad monorepo itself.

## What We Don't Know

- Is any internal or external project actively deploying these servers in production?
- Were these servers built for a BaaS-as-hosted-service model that hasn't materialized?
- Is the template's API layer an intentional fork (self-contained template is the product) or accidental duplication?
- What is the maintenance cost of keeping 7 unmaintained servers in the org?

## Suggested Investigation

- Check deployment configs (Railway, Docker) for evidence any server is actually running.
- Survey the template's `@repo/api` to map exact feature overlap with standalone servers.
- Decide: are the standalone servers a "platform" offering (for BaaS customers) or were they scaffolding that the template has outgrown?
- If redundant, consider archiving to reduce cognitive load and signal clarity to potential users.

## Answer

_To be filled in by the team or an investigating agent._
