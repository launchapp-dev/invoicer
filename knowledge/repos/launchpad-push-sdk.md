# launchpad-push-sdk

**Repo**: `launchapp-dev/launchpad-push-sdk`
**Package**: `@launchpad/push`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

## Purpose

Push Notifications SDK for LaunchPad BaaS — React hooks and providers for web push notification permission management, service worker registration, and push subscription handling via VAPID.

## Tech Stack

- **Runtime**: Node.js, ESM-only (+ CJS via tsup dual build)
- **Bundler**: tsup (both ESM and CJS outputs)
- **Test**: Vitest + @testing-library/react + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18

## Key Features

- `PushProvider` — configures VAPID public key + service worker path
- `usePushPermission` — permission state and `requestPermission()`
- `usePushSubscription` — subscribe/unsubscribe to push notifications
- Service worker registration helpers
- Zero-config setup

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client
- Designed to connect to `launchpad-push-server` (FCM, APNs, Web Push)

## Maturity

**Early Development (pre-1.0)** — Last commit 2025-12-18 (CI maintenance). Has a complete README with usage examples, better documented than most peers.

## Open Issues

- **#1 [SDK-CONSISTENCY]**: Author field, exports config, and tsconfig deviations from SDK standards

## Notes

- Author field is `"Launchpad Team"` (not `"AudioGenius <hello@audiogenius.ai>"` like other SDKs) — flagged in consistency issue
- Uniquely provides both ESM and CJS builds (`dist/index.cjs` in exports)
- Has README unlike most other SDKs at this stage
- `prepublishOnly` script runs build + tests before publish
