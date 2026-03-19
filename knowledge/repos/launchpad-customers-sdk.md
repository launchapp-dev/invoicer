# launchpad-customers-sdk

**Repo**: `launchapp-dev/launchpad-customers-sdk`
**Package**: `@launchpad/customers`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

## Purpose

Customers SDK for LaunchPad BaaS — customer lifecycle management, CRM functionality, customer segmentation, and engagement tracking for React applications.

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18
- **Keywords**: customers, crm, segmentation, engagement, lifecycle

## Key Features

- Customer profile management
- CRM operations (contact data, notes, history)
- Customer segmentation (grouping, tags, filters)
- Engagement tracking and lifecycle events

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client

## Maturity

**Early Development (pre-1.0)** — Last commit 2025-12-18 (CI maintenance: pnpm v10 + vitest alias fix). No feature development since initial setup.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: `tsconfig.json` and `package.json` deviations from SDK standards

## Notes

- No README exists
- Missing `publishConfig` block
- Single export entry point only
- Vitest alias workaround applied (same pattern as auth-sdk, identity-sdk) — known pnpm git dependency path issue
