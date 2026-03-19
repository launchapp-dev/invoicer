---
title: "Publish @launchpad/core to npm registry to unblock SDK distribution"
priority: critical
status: proposed
effort: small
category: architecture
source_question: knowledge/questions/can-launchpad-sdks-ship-when-core-dependency-is-github-only.md
owner: unassigned
target_repos:
  - launchpad-core-sdk
  - launchpad-auth-sdk
  - launchpad-db-sdk
  - launchpad-identity-sdk
  - launchpad-payments-sdk
  - launchpad-storage-sdk
  - launchpad-realtime-sdk
  - launchpad-workflows-sdk
  - launchpad-push-sdk
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

All 7 Launchpad feature SDKs depend on `@launchpad/core` via a GitHub git reference — not a published npm package. This means no downstream consumer (including the org's own templates) can reliably `npm install` any SDK. Git references break lockfile determinism, CI reproducibility, and semantic versioning. This is a hard blocker for any distribution strategy — whether public npm, private registry, or bundled in templates. If the BaaS SDKs are kept (per the decide-launchpad-baas-fate action), this must be fixed first.

Derived from: "Can Launchpad SDKs ship to npm when every package depends on @launchpad/core via GitHub git reference?"

## Scope

1. Verify whether `@launchpad/core` exists on npm or GitHub Packages (`npm view @launchpad/core`)
2. Audit every feature SDK's `package.json` to document the exact dependency string for `@launchpad/core` (commit hash, branch, or tag)
3. Choose a publishing target: public npm (under `@launchpad` org scope), GitHub Packages, or private Verdaccio
4. Set up CI/CD to publish `@launchpad/core` on version tags
5. Update all 7 feature SDKs to depend on the published version with proper semver range
6. Verify a clean `npm install` works from a fresh environment for at least 3 SDKs
7. Add this fix to the existing `[SDK-CONSISTENCY]` remediation scope

## Dependencies

- Must be decided after the decide-launchpad-baas-fate action — if SDKs are sunset, this action is unnecessary
- Requires npm org scope `@launchpad` to be claimed (or alternative registry chosen)
- Feature SDKs should pin a specific semver range, not float on latest

## Success Criteria

- `@launchpad/core` is published to a registry with a proper version (not 0.0.0 or git hash)
- All feature SDKs resolve `@launchpad/core` from the registry, not GitHub
- `npm install` works cleanly in a fresh environment for any feature SDK
- CI builds no longer require GitHub auth tokens to resolve internal dependencies

## Notes

- This action is contingent on the BaaS SDKs surviving the decide-launchpad-baas-fate action — if sunset, skip this entirely
- Public npm is the simplest option for distribution but requires the packages to be ready for public visibility
- GitHub Packages is a middle ground — private by default but requires auth tokens for consumers
- Consider a monorepo publish workflow (Changesets, Lerna, or Turborepo) to keep core and SDKs in sync
