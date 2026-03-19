# launchpad-workflows

**Package:** `@launchpad/workflows`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-workflows (private)
**Language:** TypeScript
**Last pushed:** 2026-01-03
**Status:** Active development

## Purpose

Production-ready workflow engine for orchestrating multi-step business processes. Provides declarative JSON workflow definition with steps, conditions, triggers, retry policies, circuit breakers, and full execution history. Recently integrated BullMQ for distributed job queue execution.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Job queue:** BullMQ (Redis-backed distributed execution)
- **Redis client:** ioredis
- **DB:** `@launchpad/db-engine` (PostgreSQL for state)
- **Build:** tsup
- **Linting:** Biome
- **Testing:** Vitest + coverage-v8

## Key Dependencies

| Dependency | Role |
|---|---|
| `@launchpad/db-engine` | PostgreSQL workflow state persistence |
| `bullmq` | Distributed job queue |
| `ioredis` | Redis client for BullMQ |

## API Surface

- `WorkflowsService` — main service
- `registerBuiltInActions()` — register HTTP, transform, delay, alert actions
- Workflow definition: JSON schema with steps, triggers, conditions
- Step types: `action`, `condition`, `wait`, `loop`
- Trigger types: `manual`, `webhook`, `schedule`, `event`
- Retry policies with exponential backoff
- Circuit breaker for external service fault tolerance
- Variable resolution via `{{stepId.field}}` template syntax
- Full execution history and run tracking
- Custom action registration

## Maturity

Active development. BullMQ integration (Jan 2026) significantly upgraded this from a simple in-process engine to a distributed, production-grade workflow system. The combination of circuit breakers, retry policies, and distributed execution makes this feature-complete for production use.

## Notes

- Depends on both Redis (BullMQ) and PostgreSQL (`@launchpad/db-engine`) for full production use
- Custom actions can be registered via `registerAction()` — extensible plugin model
- Template variable resolution allows data flow between steps
