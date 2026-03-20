# launchpad-storage-sdk

**Repo**: `launchapp-dev/launchpad-storage-sdk`
**Package**: `@launchpad/storage`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Storage SDK for LaunchPad BaaS — provides file upload/download with progress tracking, presigned URL generation, and metadata management against S3/R2-compatible backends. Includes both vanilla and React-specific APIs.

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18 (optional)
- **Exports**: `.` (core `StorageClient`) and `./react` (hooks + `StorageProvider`)

## Key Features

- `StorageClient` — upload/download with progress callbacks, S3/R2 compatible
- `StorageProvider` / `useUpload` React integration
- Presigned URL generation
- File metadata management
- Public file flag support
- Multi-bucket and multi-tenant support

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client (`LaunchpadClient`)

## Maturity

**Stable (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry. No open issues — the only SDK with zero open SDK-CONSISTENCY issues.

## Open Issues

None.

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- Most complete SDK in terms of documentation (full README with code examples)
- Keywords include `cloudflare` and `r2`, confirming Cloudflare R2 as a target backend
- `react` sub-export suggests consumers don't pay for React if using server-side only
