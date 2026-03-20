# launchpad-auth-sdk

**Repo**: `launchapp-dev/launchpad-auth-sdk`
**Package**: `@launchpad/auth`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Authentication SDK for LaunchPad BaaS — provides React hooks and components for user authentication, session state, and login flows. Built on top of `@launchpad/core`.

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + @testing-library/react + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18

## Key Features

- React hooks for auth state (`useAuth`, `useSession`, etc.)
- Login/logout/signup components
- Session management via `@launchpad/core`

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client and session management

## Maturity

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry as part of coordinated SDK consistency update.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: Missing README and `test:coverage` script

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of `github:AudioGenius-ai/launchpad-core-sdk`
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- No README exists (open SDK-CONSISTENCY issue)
- Missing `test:coverage` script compared to SDK standard (flagged in issue)
