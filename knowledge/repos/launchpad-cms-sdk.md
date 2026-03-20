# launchpad-cms-sdk

**Repo**: `launchapp-dev/launchpad-cms-sdk`
**Package**: `@launchpad/cms`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Headless CMS SDK for LaunchPad BaaS — React hooks and providers for content type management, multi-language localization, content versioning, media management, and editorial workflows (draft → review → published → archived).

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18
- **Keywords**: cms, headless-cms, content-management, localization, versioning

## Key Features

- `CMSProvider` — locale configuration context
- `useEntries` / `usePublishedEntries` — content entry querying
- `usePublishEntry` — publish workflow actions
- Content type definition with typed fields
- Multi-language support with fallbacks
- Version history and restore
- Media/asset management
- Preview mode (unpublished content)
- Status workflow: Draft → Review → Published → Archived

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client

## Maturity

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry as part of coordinated SDK consistency update.

## Open Issues

- **#2 [SDK-CONSISTENCY]**: Barrel exports, tsconfig, and package.json deviations

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- One of the better-documented SDKs — has a full README with API reference
- Single export entry (no sub-paths) — all CMS APIs in one bundle
- Missing `publishConfig` block
- Most feature-rich in terms of domain scope (content types, localization, versioning, media, preview mode)
