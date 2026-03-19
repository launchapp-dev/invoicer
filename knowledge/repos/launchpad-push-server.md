# launchpad-push-server

> Cross-platform push notification service supporting FCM, APNs, and Web Push with device management and delivery analytics.

## Purpose

Server-side push notification service covering Android (FCM HTTP v1 API), iOS (APNs), and Web (VAPID/web-push). Handles device registration and management, topic subscriptions, scheduled notifications, and delivery analytics. Uses Postgres stores via the shared `db-engine` package for persistence.

## Visibility: Private
## Maturity: Two commits. Most recently pushed of the server packages.

## Tech Stack

- TypeScript
- FCM HTTP v1 API
- APNs
- web-push library (VAPID)
- PostgreSQL via `db-engine`

## Package

`@launchpad/push-server` (v0.1.0)

## Dependencies

- `launchpad-db-engine` (Postgres store abstraction)
- Part of the LaunchPad BaaS platform
- Server-side counterpart to `launchpad-push-sdk`

## Status

74 tests in initial commit, 101 tests after second commit. Last pushed 2025-12-18 — the most recently updated of the server-side packages.
