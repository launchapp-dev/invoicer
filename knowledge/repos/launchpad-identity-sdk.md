# launchpad-identity-sdk

**Repo**: `launchapp-dev/launchpad-identity-sdk`
**Package**: `@launchpad/identity`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

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

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry as part of coordinated SDK consistency update.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: `tsconfig.json` and `package.json` deviations from SDK standards

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- No README exists
- Missing `publishConfig` block
- Single export entry point only (no `./react` sub-path like some peers)
