# launchpad-server

**Package:** `@launchpad/server`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-server (private)
**Language:** TypeScript
**Last pushed:** 2025-12-16
**Status:** Stable

## Purpose

Type-safe HTTP server framework with built-in OpenAPI 3.1 generation, Zod request/response validation, and composable middleware context. Designed as the HTTP layer for Launchpad BaaS services. Zero runtime dependencies — provides a fluent builder API for defining routes with full TypeScript inference from middleware through to handlers.

## Tech Stack

- **Runtime:** Node.js / TypeScript (edge-ready)
- **Validation:** Zod (peer dependency)
- **Zero runtime dependencies** (Zod is the only required external dep)
- **Targets:** Node.js, Cloudflare Workers, Vercel Edge
- **Build:** tsup
- **Linting:** Biome
- **Testing:** Vitest + coverage-v8

## Key Dependencies

| Dependency | Role |
|---|---|
| *(none runtime)* | Zero runtime dependencies |
| `zod` | (peer) Schema validation |

## API Surface

- `createServer(options)` — create server instance with OpenAPI metadata
- `createRoute()` — fluent route builder
  - `.get/.post/.put/.delete/.patch(path)` — method + path
  - `.input({ params, query, body })` — Zod schemas for validation
  - `.output(schema)` — response schema for OpenAPI
  - `.handler(fn)` — typed handler with inferred context
- `createMiddleware()` — composable middleware builder
  - `.context(fn)` — add typed properties to context
  - `.build(name)` — named middleware for composition
- `server.use(middleware)` — attach middleware
- `server.route(route)` — register route
- Module grouping with `basePath` support
- Global `basePath` + module `basePath` composition
- OpenAPI 3.1 schema auto-generation from route definitions
- Adapters: Node.js (`serve` from `@launchpad/server/adapters/node`)

## Maturity

Stable. Most recent work (Dec 2025) added global `basePath` support for module composition (e.g., `/api/v1` + `/auth` = `/api/v1/auth`). Core type-safe routing, validation, and OpenAPI generation are complete.

## Notes

- The fluent builder pattern provides compile-time type safety from middleware context through to handler — no runtime type casting needed
- Zero dependencies makes it viable for edge runtimes (Cloudflare Workers, Deno)
- OpenAPI generation is automatic from Zod schemas — no separate spec writing required
- This is the HTTP framework used internally by other `@launchpad/*` server packages (storage HTTP mode, git-server REST API)
