# launchpad-core-sdk

**Repo**: `launchapp-dev/launchpad-core-sdk`
**Package**: `@launchpad/core`
**Version**: 0.1.0
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

## Purpose

The foundational SDK for all Launchpad BaaS client-side packages. Provides the HTTP client, session management, configuration, and React context that every other `@launchpad/*` SDK depends on.

## Tech Stack

- TypeScript (ESM)
- React 18+ (optional peer dependency)
- Build: tsup
- Test: Vitest + Testing Library
- Lint: Biome

## API Surface

Two entry points:
- `.` — core utilities, HTTP client, session management (framework-agnostic)
- `./react` — React provider, hooks, and context integration

Key exports:
- `LaunchpadClient` — HTTP client with `getApiUrl()` and session handling
- `LaunchpadProvider` — React context provider wrapping the client
- `LaunchpadConfig` — configuration type (`baseUrl`, `apiKey`)

## Dependencies on Org Products

None. This is the root of the dependency tree.

## What Depends On This

Every feature SDK installs it via GitHub reference:
```
"@launchpad/core": "github:AudioGenius-ai/launchpad-core-sdk"
```
- `@launchpad/auth`
- `@launchpad/db`
- `@launchpad/cms`
- `@launchpad/customers`
- `@launchpad/identity`
- `@launchpad/realtime`
- `@launchpad/storage`
- `@launchpad/workflows`
- `@launchpad/push`
- `@launchpad/offline`
- `@launchpad/testing`

## Maturity: Active / Stable

- Initial implementation Dec 10, 2025
- CI/CD workflow added Dec 18, 2025
- Not published to npm registry (GitHub dependency reference)
- No README in repo (only package.json present)

## Notes

- React peer dependency is **optional** — supports both React and non-React environments
- All downstream SDKs lock to this via GitHub git URL, not semver ranges
