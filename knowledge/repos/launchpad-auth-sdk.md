# launchpad-auth-sdk

**Repo**: `launchapp-dev/launchpad-auth-sdk`
**Package**: `@launchpad/auth`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

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

**Active Development (pre-1.0)** — Last substantive commit 2025-12-18 (CI fixes for pnpm v10 and vitest alias workaround). No feature commits in months.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: Missing README and `test:coverage` script

## Notes

- No README exists (open SDK-CONSISTENCY issue)
- Missing `test:coverage` script compared to SDK standard (flagged in issue)
- Installed by consumers via `github:AudioGenius-ai/launchpad-auth-sdk`
