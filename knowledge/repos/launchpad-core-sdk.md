# launchpad-core-sdk

**Repo**: `launchapp-dev/launchpad-core-sdk`
**Package**: `@launchpad/core`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

## Purpose

Foundation SDK for the entire LaunchPad BaaS client ecosystem. Provides the HTTP client, session management, multi-tenant support, and optional React integration that all other `@launchpad/*` SDKs depend on.

## Tech Stack

- **Runtime**: Node.js ≥18, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + @vitest/coverage-v8
- **Lint**: Biome
- **Peer deps**: React ≥18 (optional)
- **Exports**: `.` (core) and `./react` (React integration)

## Key Features

- `LaunchpadClient` — typed HTTP client with `getApiUrl()` helper
- Session management and multi-tenant context
- React provider (`LaunchpadProvider`) for context injection

## Dependencies on Org Products

- None (leaf dependency — no `@launchpad/*` runtime deps)

## Maturity

**Active Development (pre-1.0)** — Last functional commit 2025-12-10. CI/CD pipeline added 2025-12-18. No new feature commits since.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: Missing README documentation

## Notes

- All other `@launchpad/*` SDKs install this via `github:AudioGenius-ai/launchpad-core-sdk` (GitHub dep, not npm registry)
- `publishConfig.access: "public"` set — intended for future npm publish
- No README exists yet (open SDK-CONSISTENCY issue)
