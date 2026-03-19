---
title: "Implement CI quality gates that must pass before AO can merge PRs"
priority: critical
status: proposed
effort: medium
category: technical-debt
source_question: knowledge/questions/are-we-quality-gating-ai-generated-code-at-current-volume.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
  - ao-cli
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

AO merged 180+ PRs in 7 days on the flagship template with no documented CI gates, test suites, or quality checks. The knowledge base celebrates velocity but contains zero mention of test coverage, linting, build verification, or security scanning. Selling "AI-workforce maintained" templates as a feature requires proof that the AI output meets minimum quality standards — otherwise every merged PR is a potential liability shipped to paying customers.

Derived from: "Are we quality-gating the AI-generated code at the volume AO produces?"

## Scope

1. Add a GitHub Actions CI workflow to `saas-template-launch-app-test` that runs on every PR: build, lint, type-check, and (if tests exist) test suite
2. Configure AO daemon to require CI checks to pass before auto-merging — AO must not merge red PRs
3. Add a basic smoke test that verifies the template builds and the dev server starts without errors
4. Add security scanning (e.g., `npm audit`, Snyk, or similar) as a non-blocking CI step
5. Document the quality gate requirements in the repo README or a CONTRIBUTING.md
6. Apply the same CI pattern to any other repo where AO merges autonomously

## Dependencies

- Need to audit what CI (if any) already exists in the target repos before building new workflows
- AO daemon configuration must support "require checks to pass" — verify this capability exists

## Success Criteria

- Every AO-generated PR runs through CI before merge
- PRs that fail build, lint, or type-check are blocked from merging
- A dashboard or log shows CI pass/fail rate for AO PRs over time
- Zero PRs merge with broken builds

## Notes

- Start with the flagship template repo since it has the highest PR volume
- Self-healing pipelines are valuable but should not bypass CI — AO should fix failures and re-run CI, not skip it
- Consider adding a "max retries" limit so AO doesn't infinitely loop on unfixable issues
- This is the single highest-risk gap in the current setup — a single bad pattern propagated across 180 PRs could require days to unwind
