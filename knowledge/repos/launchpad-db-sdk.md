# launchpad-db-sdk

**Repo**: `launchapp-dev/launchpad-db-sdk`
**Package**: `@launchpad/db`
**Version**: 0.1.0
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-01-03

## Purpose

React data querying SDK for Launchpad BaaS. Wraps TanStack Query to provide ergonomic hooks for CRUD operations against Launchpad database tables with automatic caching, invalidation, and TypeScript support.

## Tech Stack

- TypeScript (ESM) + React 18+
- TanStack Query v5 (peer dependency)
- Build: tsup
- Test: Vitest + Testing Library + jsdom
- Lint: Biome

## API Surface

### Provider
- `LaunchpadDbProvider` — combines `QueryClientProvider` + `LaunchpadProvider`; accepts optional custom `QueryClient` and `defaultOptions`

### Hooks
- `useQuery<T>` — fetch records with filtering, sorting, pagination
- `useQuerySingle<T>` — fetch a single record
- `useInsert<T>` — insert records with automatic cache invalidation
- `useUpdate<T>` — update records
- `useDelete` — delete records
- `useInvalidateDb` — manual cache invalidation (`invalidateTable()`)

### Filter Operators
`eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in`, `nin`, `is`, `not`

### Query Keys
Structured as `['launchpad', 'db', tableName, queryOptions]` — use `createQueryKey()` for manual key construction.

### Caching Defaults
- `staleTime`: 1 minute
- `gcTime`: 5 minutes
- `refetchOnWindowFocus`: enabled
- `retry`: 3 attempts

## Dependencies on Org Products

- `@launchpad/core` (GitHub git reference)
- `@tanstack/react-query` >= 5.0.0 (peer)
- `react` >= 18.0.0 (peer)

## What Depends On This

- `launchpad-saas-template` — data fetching layer
- `launchapp-lite` — likely consumer

## Maturity: Active Development

Most mature feature SDK. Key milestone: TASK-394 (Jan 3, 2026) completed full TanStack Query integration — has comprehensive README, full filter API, TypeScript generics, caching strategies documented.

## Notes

- The most feature-complete SDK in the org at time of cataloging
- Follows standard TanStack Query patterns so React Query knowledge transfers directly
