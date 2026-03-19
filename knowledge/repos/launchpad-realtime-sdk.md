# launchpad-realtime-sdk

**Repo**: `launchapp-dev/launchpad-realtime-sdk`
**Package**: `@launchpad/realtime`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

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

**Early Development (pre-1.0)** — Last commit 2025-12-18 (CI maintenance only). No feature development since initial creation.

## Open Issues

- **#1 [SDK-CONSISTENCY]**: Import extensions and missing README

## Notes

- No README exists (open SDK-CONSISTENCY issue for missing imports and README)
- Keywords indicate presence + broadcast support is planned/implemented
- Server counterpart: `launchpad-realtime-server` (PostgreSQL LISTEN/NOTIFY, Redis pub/sub, SSE)
