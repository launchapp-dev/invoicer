---
title: "Re-architect LaunchPad SDKs as the foundation for templates"
priority: critical
status: proposed
effort: medium
category: architecture
source_question: knowledge/questions/should-we-sunset-open-source-or-revive-launchpad-baas.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
  - launchpad-auth-sdk
  - launchpad-db-sdk
  - launchpad-payments-sdk
  - launchpad-storage-sdk
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The answered question made the strategic choice: LaunchPad BaaS should be revived, but only through a re-architecture that makes `@launchpad/*` the reusable foundation beneath templates instead of a parallel stack. Right now the flagship template still runs on `@repo/*` packages while the LaunchPad SDKs sit partially idle. That duplication has to be collapsed into one canonical foundation.

Derived from: "Should we sunset, open-source, or revive the LaunchPad BaaS SDKs?"

## Scope

1. Define the canonical SDK surface that templates should consume for auth, database, payments, storage, and any shared utilities
2. Remove the GitHub git-reference packaging bottleneck by publishing or otherwise distributable-versioning the shared core pieces
3. Create a migration plan from `@repo/*` packages in the flagship template to `@launchpad/*` equivalents, including compatibility gaps and missing features
4. Migrate one template path end-to-end as the proof that the SDK foundation is viable
5. Deprecate or collapse duplicated internal packages once the template path is stable
6. Update product and architecture docs so templates are clearly described as running on the LaunchPad SDK layer

## Dependencies

- Depends on [resolve-repo-vs-launchpad-sdk-divergence.md](resolve-repo-vs-launchpad-sdk-divergence.md) to map the migration gaps
- Depends on [publish-launchpad-core-to-npm-registry.md](publish-launchpad-core-to-npm-registry.md) to remove the packaging blocker
- Should be validated by [build-cross-sdk-integration-test-suite.md](build-cross-sdk-integration-test-suite.md) before broad rollout

## Success Criteria

- The flagship template consumes `@launchpad/*` SDKs for the core backend primitives
- `@repo/*` duplication is reduced to zero or to clearly justified compatibility shims
- Shared SDK packages are installable and versioned in a way templates can consume reliably
- The knowledge base describes one canonical backend foundation instead of two competing stacks

## Notes

- This is not a "revive everything exactly as it was" decision
- The output should be a cleaner foundation for templates, not a bigger maintenance surface
- Avoid preserving old architecture just to protect sunk cost
