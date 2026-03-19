---
title: "Map @repo/* to @launchpad/* migration gaps in flagship template"
priority: critical
status: proposed
effort: small
category: architecture
source_question: knowledge/questions/why-does-flagship-template-duplicate-launchpad-sdks-with-repo-packages.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
  - launchpad-saas-template
  - launchpad-auth-sdk
  - launchpad-payments-sdk
  - launchpad-storage-sdk
  - launchpad-db-sdk
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The BaaS answer now resolves the strategic question: `@launchpad/*` should become the foundation beneath templates. That turns this action from a product-decision exercise into a concrete migration-discovery step. The flagship template still runs on `@repo/*` packages, so the org needs a precise gap map before migration starts.

Derived from: "Why does the flagship template use its own @repo/* packages instead of @launchpad/* SDKs — are we building two competing stacks?"

## Scope

1. For each `@repo/*` package in the flagship template, identify the corresponding `@launchpad/*` SDK
2. Document the exact migration gap:
   - Features present in `@repo/*` but missing in `@launchpad/*`
   - Features present in `@launchpad/*` but unused by the template
   - Dependency and packaging differences
   - Test coverage and runtime confidence differences
3. Produce a package-by-package migration order showing what can move first and what requires compatibility work
4. Identify which `@repo/*` modules can be deleted immediately after migration versus which need temporary shims
5. Hand the gap map to the LaunchPad SDK re-architecture action for execution

## Dependencies

- This is the discovery input for [decide-launchpad-baas-fate.md](decide-launchpad-baas-fate.md), which now captures the SDK re-architecture work
- Informed by [run-platform-coherence-assessment.md](run-platform-coherence-assessment.md), which documents the cohesive portfolio model
- Should be finished before broad template migration begins

## Success Criteria

- A package-by-package migration matrix exists for the flagship template
- The missing capabilities that block `@launchpad/*` adoption are explicit and prioritized
- The org knows what can be migrated now, what needs compatibility work, and what can be deleted later
- Migration execution can start without rediscovering the same architecture questions

## Notes

- Do not treat this as abstract architecture work; it should end in a checklist that an implementation agent can execute
- The goal is one canonical backend foundation, not a long-lived adapter layer
