---
title: "Audit a sample of AO-generated PRs for code quality and correctness"
priority: critical
status: proposed
effort: small
category: technical-debt
source_question: knowledge/questions/are-we-quality-gating-ai-generated-code-at-current-volume.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

180+ AO-generated PRs were merged with no documented review process. Before investing further in AO-driven development or selling templates as "AI-maintained," we need empirical data on whether AO's output is actually good. This is a one-time audit that produces a quality baseline and informs whether the quality gates action is urgent or critical.

Additionally, 15 plugin packs were scaffolded in 2 days and described as "likely awaiting content" — it's unknown whether these contain real functionality or empty boilerplate.

Derived from: "Are we quality-gating the AI-generated code at the volume AO produces?"

## Scope

1. Randomly sample 15-20 AO-generated PRs from the flagship template repo
2. For each PR, evaluate: Does the code do what the PR title claims? Are there obvious bugs, anti-patterns, or security issues? Is the code idiomatic for the stack (React Router 7, Hono, Drizzle)?
3. Clone and build the flagship template end-to-end — does it start, render, and handle basic flows?
4. Check 3-5 of the 15 plugin packs — do they contain real functionality or just scaffolding?
5. Document findings in a quality audit report with a pass/fail summary and regression count

## Dependencies

- None — this can start immediately

## Success Criteria

- A written audit report exists with findings from the PR sample review
- The template has been built and tested end-to-end at least once
- Plugin pack status (functional vs scaffold) is documented
- A quality score or pass rate is established as a baseline for future tracking

## Notes

- If the audit reveals significant quality issues, the CI quality gates action becomes urgent and should block further AO merges
- This audit should happen before any template is sold to a paying customer
- Consider making periodic audits (monthly?) a recurring practice, not just a one-time exercise
