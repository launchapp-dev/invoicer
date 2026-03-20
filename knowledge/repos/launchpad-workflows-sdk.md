# launchpad-workflows-sdk

**Repo**: `launchapp-dev/launchpad-workflows-sdk`
**Package**: `@launchpad/workflows`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Workflows SDK for LaunchPad BaaS — client-side interface for triggering background jobs, scheduling tasks, and monitoring workflow execution against the Launchpad backend.

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18
- **Keywords**: workflows, jobs, cron, scheduled-tasks, background-jobs

## Key Features

- Trigger and monitor background jobs
- Cron/scheduled task management
- Workflow state tracking

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client
- Designed to interface with `launchpad-workflows` (standalone server-side workflow engine)

## Maturity

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry as part of coordinated SDK consistency update.

## Open Issues

- **#1 [SDK-CONSISTENCY]**: `tsconfig.json` and `package.json` deviations from SDK standards

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- No README exists
- Missing `publishConfig` block (unlike most other SDKs)
- Related server-side standalone SDK: `launchpad-workflows` (circuit breaker, state management, actions)
