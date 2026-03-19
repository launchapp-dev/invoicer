# renovate-config

> Shared Renovate configuration preset for the org — auto-merge patches, grouped weekly minors, review-gated majors, and CVE bypass scheduling.

## Purpose

Centralises Renovate bot configuration as an org-wide preset. Auto-merges patch updates, groups minor dependency updates into weekly PRs, requires review for major version bumps, and allows CVE/security fixes to bypass the normal schedule. Dependency grouping is configured for TypeScript, Vitest, Biome, React, Hono, and Playwright.

## Visibility: Private
## Maturity: Single commit. Note: README references `AudioGenius-ai` org — copy-paste artifact, not indicative of the config's purpose.

## Tech Stack

- JSON configuration only (no code)

## Package

N/A — configuration preset, not a published package.

## Dependencies

- Part of Infrastructure / Developer Tools

## Status

Single initial commit. Functional as a Renovate preset for the organisation. README contains a stale org name reference (`AudioGenius-ai`) that should be updated.
