# launchpad-auth-sdk

**Repo**: `launchapp-dev/launchpad-auth-sdk`
**Package**: `@launchpad/auth`
**Version**: 0.1.0
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

## Purpose

Authentication SDK for Launchpad BaaS. Provides React hooks and components for handling sign-in, sign-up, session management, and auth state within React applications.

## Tech Stack

- TypeScript (ESM)
- React 18+ (peer dependency)
- Build: tsup
- Test: Vitest + Testing Library
- Lint: Biome

## API Surface

Exports React hooks and components for authentication flows. Likely includes:
- Auth state hooks (`useSession`, `useUser`, `useAuth`)
- Sign in/sign up/sign out actions
- Session persistence and refresh

## Dependencies on Org Products

- `@launchpad/core` (GitHub git reference) — HTTP client and React provider foundation

## What Depends On This

- `launchpad-saas-template` — primary consumer
- `launchapp-lite` — likely consumer

## Maturity: Scaffolded / Early

- Initial implementation Dec 2025
- Most recent activity (Dec 18) was CI/CD infrastructure fixes (pnpm v10, resolve.alias bug)
- No README in repo — API surface not formally documented
- Not published to npm registry

## Notes

- Auth is backed by `better-auth` on the server side (`launchpad-baas` monorepo)
- Client SDK wraps the server's auth endpoints via `@launchpad/core`
