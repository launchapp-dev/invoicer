# launchpad-customers-sdk

**Repo**: `launchapp-dev/launchpad-customers-sdk`
**Package**: `@launchpad/customers`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

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

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry as part of coordinated SDK consistency update.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: `tsconfig.json` and `package.json` deviations from SDK standards

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- No README exists
- Missing `publishConfig` block
- Single export entry point only
