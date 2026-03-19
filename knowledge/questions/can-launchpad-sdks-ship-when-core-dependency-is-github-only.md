---
title: "Can Launchpad SDKs ship to npm when every package depends on @launchpad/core via GitHub git reference?"
priority: critical
status: open
category: architecture
source_files:
  - knowledge/repos/launchpad-core-sdk.md
  - knowledge/repos/launchpad-auth-sdk.md
  - knowledge/repos/launchpad-db-sdk.md
  - knowledge/repos/launchpad-identity-sdk.md
  - knowledge/repos/launchpad-payments-sdk.md
  - knowledge/repos/launchpad-storage-sdk.md
  - knowledge/repos/launchpad-realtime-sdk.md
  - knowledge/repos/launchpad-workflows-sdk.md
  - knowledge/repos/launchpad-push-sdk.md
  - knowledge/sdk-matrix.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The Launchpad BaaS ecosystem has 7 feature SDKs plus standalone packages, all depending on `@launchpad/core`. The repo docs reveal that every SDK resolves `@launchpad/core` via a direct GitHub git reference — not from the npm registry. This creates a hard blocker for any public or commercial distribution of these packages.

## What We Know

- All 7 feature SDKs (`@launchpad/auth`, `@launchpad/db`, `@launchpad/cms`, `@launchpad/customers`, `@launchpad/identity`, `@launchpad/realtime`, `@launchpad/storage`, `@launchpad/workflows`, `@launchpad/push`) depend on `@launchpad/core`.
- `@launchpad/core` is consumed via GitHub git reference, not an npm registry publish.
- All SDKs are v0.1.0 and private.
- 10 `[SDK-CONSISTENCY]` issues were filed on 2026-03-18, but none appear to address the dependency resolution strategy.
- The npm ecosystem requires published dependencies for proper semver resolution, lockfile determinism, and CI reproducibility.

## What We Don't Know

- Is `@launchpad/core` published to any npm registry (public or private)?
- If not, what is the plan for publishing it — public npm, GitHub Packages, or a private registry?
- Do the feature SDKs pin a specific commit/tag of core, or do they float on a branch?
- What happens to downstream consumers when core changes — is there any versioning contract?
- Has anyone outside the org attempted to install these SDKs? Would it even work?

## Suggested Investigation

1. Check if `@launchpad/core` exists on npm or GitHub Packages: `npm view @launchpad/core` and check the GitHub org's package registry.
2. Audit every feature SDK's `package.json` to confirm the exact dependency resolution string for `@launchpad/core`.
3. Attempt a clean `npm install` of any feature SDK from a fresh environment to verify whether it resolves.
4. Decide on a publishing strategy: public npm (requires org scope), GitHub Packages (requires auth token), or private Verdaccio instance.
5. Add this to the `[SDK-CONSISTENCY]` remediation scope if not already tracked.

## Answer

_To be filled in by the team or an investigating agent._
