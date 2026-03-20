# launchpad-realtime-sdk

**Repo**: `launchapp-dev/launchpad-realtime-sdk`
**Package**: `@launchpad/realtime`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Realtime SDK for LaunchPad BaaS — WebSocket-based subscriptions for live data updates, presence tracking, and broadcast messaging. Pairs with `launchpad-realtime-server` (PostgreSQL LISTEN/NOTIFY + Redis pub/sub).

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + @testing-library/react + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18
- **Keywords**: websocket, subscriptions, presence, broadcast

## Key Features

- WebSocket connection management
- Table/channel subscriptions with live data callbacks
- Presence tracking (who's online)
- Broadcast messaging

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client and session management
- Designed to connect to `launchpad-realtime-server` backend

## Maturity

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry as part of coordinated SDK consistency update.

## Open Issues

- **#1 [SDK-CONSISTENCY]**: Import extensions and missing README

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- No README exists (open SDK-CONSISTENCY issue for missing imports and README)
- Keywords indicate presence + broadcast support is planned/implemented
- Server counterpart: `launchpad-realtime-server` (PostgreSQL LISTEN/NOTIFY, Redis pub/sub, SSE)
