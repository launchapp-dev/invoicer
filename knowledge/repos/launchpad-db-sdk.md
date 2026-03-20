# launchpad-db-sdk

**Repo**: `launchapp-dev/launchpad-db-sdk`
**Package**: `@launchpad/db`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Database SDK for LaunchPad BaaS — provides React hooks for querying, mutating, and paginating data from the Launchpad API. Built on TanStack Query (React Query v5) for caching and synchronization.

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + @testing-library/react + @testing-library/jest-dom + jsdom
- **Lint**: Biome
- **Peer deps**: `@tanstack/react-query` ≥5, React ≥18

## Key Features

- `LaunchpadDbProvider` — wraps both `QueryClientProvider` and `LaunchpadProvider`
- `useQuery` — fetch with filtering, sorting, pagination
- `useMutation` — insert/update/delete with optimistic updates
- `useSubscription` — real-time data via query invalidation
- Custom `QueryClient` injection supported

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client

## Maturity

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry. Prior: TanStack Query integration completed 2026-01-03 via TASK-394.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: `tsconfig.json` and `package.json` deviations from SDK standards

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- Has a complete README with usage examples
- Most feature-complete of the client SDKs at time of last update
- Peer dependency on `@tanstack/react-query` ≥5 makes it heavier than other SDKs
