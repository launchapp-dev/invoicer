# launchpad-identity-sdk

**Repo**: `launchapp-dev/launchpad-identity-sdk`
**Package**: `@launchpad/identity`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

## Purpose

Identity SDK for LaunchPad BaaS — user directory management, Single Sign-On (SSO), Role-Based Access Control (RBAC), and multi-organization management for React applications.

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18
- **Keywords**: identity, sso, rbac, user-management, organizations, permissions

## Key Features

- User directory browsing and management
- SSO provider integration
- RBAC — roles, permissions, policy enforcement
- Organization/team management (multi-tenant)

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client and session management

## Maturity

**Early Development (pre-1.0)** — Last commit 2025-12-18 (CI maintenance: pnpm v10 upgrade + vitest alias fix). No feature development since initial setup.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: `tsconfig.json` and `package.json` deviations from SDK standards

## Notes

- No README exists
- Missing `publishConfig` block
- Single export entry point only (no `./react` sub-path like some peers)
- Vitest alias workaround applied (same as `launchpad-auth-sdk`) — known pnpm git dependency path issue
