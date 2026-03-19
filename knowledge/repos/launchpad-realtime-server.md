# launchpad-realtime-server

**Package:** `@launchpad/realtime-server`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-realtime-server (private)
**Language:** TypeScript
**Last pushed:** 2025-12-19
**Status:** Stable

## Purpose

Real-time backend service enabling live data push from PostgreSQL database changes to connected clients via Server-Sent Events (SSE). Uses PostgreSQL LISTEN/NOTIFY for change detection and Redis pub/sub for horizontal scaling across multiple server instances. Multi-tenant with channel scoping per tenant.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Database:** PostgreSQL (pg client + LISTEN/NOTIFY)
- **Cache/pubsub:** Redis (ioredis)
- **Dev dependency:** `@launchpad/db-engine` (DB migration + testing)
- **Build:** (standard tsup pattern)
- **Testing:** Vitest + coverage-v8

## Key Dependencies

| Dependency | Role |
|---|---|
| `pg` | PostgreSQL client for LISTEN/NOTIFY |
| `ioredis` | Redis pub/sub for multi-instance scaling |
| `@launchpad/db-engine` | (dev) DB setup for integration tests |

## API Surface

- `RealtimeService` — main service class
- `start()` / `stop()` — lifecycle management
- `registerClient(tenantId, onEvent, onClose, isActive)` — SSE client registration
- `unregisterClient(clientId)` — cleanup on disconnect
- `subscribeToTable(tenantId, table, operation, filter)` — table change subscriptions
- Heartbeat mechanism for connection keepalive
- In-memory mode (no external deps required for testing)

### PostgreSQL Migrations
- `001_create_notify_function.sql` — `launchpad_notify_changes()` trigger function
- `launchpad_enable_realtime(table)` / `launchpad_disable_realtime(table)` helpers
- `002_enable_realtime_example.sql` — example migration

## Maturity

Stable. Most recent work (Dec 2025) added PostgreSQL migration files for the NOTIFY trigger setup. Core real-time pipeline (Postgres → Redis → SSE) is complete. In-memory mode allows testing without external dependencies.

## Notes

- Transport is SSE (server push), not WebSockets — simpler, HTTP/2 compatible
- Redis enables horizontal scaling: multiple server instances share events via pub/sub
- PostgreSQL NOTIFY is triggered at DB level — catches all changes regardless of which app service made them
- Filtering by table, operation type, or custom conditions prevents unnecessary event delivery
