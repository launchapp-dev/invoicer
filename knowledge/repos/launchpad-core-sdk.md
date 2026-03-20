# launchpad-core-sdk

**Repo**: `launchapp-dev/launchpad-core-sdk`
**Package**: `@launchpad/core`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Foundation SDK for the entire LaunchPad BaaS client ecosystem. Provides the HTTP client, session management, multi-tenant support, and optional React integration that all other `@launchpad/*` SDKs depend on.

## Tech Stack

- **Runtime**: Node.js ≥18, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + @vitest/coverage-v8
- **Lint**: Biome
- **Peer deps**: React ≥18 (optional)
- **Exports**: `.` (core) and `./react` (React integration)
- **Publishing**: Configured for npm registry on version tags

## Key Features

- `LaunchpadClient` — typed HTTP client with `getApiUrl()` helper
- Session management and multi-tenant context
- React provider (`LaunchpadProvider`) for context injection

## Dependencies on Org Products

- None (leaf dependency — no `@launchpad/*` runtime deps)

## Maturity

**Active Development (pre-1.0)** — Last commit 2026-03-20 (ci: trigger npm publish on version tags). Milestone: npm publishing now enabled, marking transition from GitHub deps to npm registry.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: Missing README documentation

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: npm publishing now enabled via version tag CI trigger. All dependent SDKs updated to consume from npm registry instead of GitHub.
- All other `@launchpad/*` SDKs now install this via npm (`@launchpad/core@^0.1.0`) instead of GitHub deps
- `publishConfig.access: "public"` set — npm publish now active on version tags
- No README exists yet (open SDK-CONSISTENCY issue)
