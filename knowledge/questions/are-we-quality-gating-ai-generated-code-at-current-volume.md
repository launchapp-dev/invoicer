---
title: "Are we quality-gating the AI-generated code at the volume AO produces?"
priority: critical
status: open
category: technical-debt
source_files:
  - knowledge/active-workstreams.md
  - knowledge/products/02-ao-agent-orchestrator.md
  - knowledge/architecture.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The saas-template-launch-app-test repo merged 180+ PRs in 7 days via the AO daemon. This is extraordinary velocity — roughly 25+ merges per day. Yet nowhere in the knowledge base is there mention of test coverage, CI gates, code review processes, regression tracking, or quality metrics for AI-generated code. The active-workstreams doc celebrates the volume but says nothing about quality controls.

When a human team ships 25+ PRs/day, they have code review, CI pipelines, QA environments, and rollback procedures. When an AI agent does it, the same safeguards (or stronger ones) should exist — but there's no evidence they do.

## What We Know

- AO daemon merged 180+ PRs in 7 days on the flagship template
- AO has "self-healing pipelines" — it retries and fixes its own failures
- The flagship template uses a complex stack: React Router 7, Hono, Better-Auth, Drizzle, Stripe, i18n, email, analytics
- 15 plugin packs were scaffolded in 2 days (2026-03-16/17), described as "likely awaiting content"
- The revenue roadmap positions "AI-workforce maintained (24/7 updates)" as a selling point for templates
- No testing framework, CI configuration, or quality metrics are mentioned anywhere in the knowledge base

## What We Don't Know

- What percentage of merged PRs introduced regressions or bugs?
- Is there a CI pipeline running tests before AO merges PRs?
- What's the test coverage of the flagship template?
- Are there any manual review checkpoints, or is AO fully autonomous?
- If a bad PR is merged, how quickly is it detected and reverted?
- Has anyone manually audited the code AO has produced?
- Are the 15 plugin packs functional or empty scaffolds?

## Suggested Investigation

1. **Audit the CI pipeline**: Check if saas-template-launch-app-test has GitHub Actions, test suites, or linting gates that run before merge
2. **Sample review**: Manually review 10-15 random AO-generated PRs for code quality, correctness, and whether they introduce subtle bugs
3. **Run the template**: Clone and build the flagship template — does it actually work end-to-end?
4. **Check plugin packs**: Verify if the 15 scaffolded packs contain real functionality or just boilerplate
5. **Define quality gates**: If none exist, establish minimum requirements (tests pass, lint clean, build succeeds, no security vulnerabilities) before AO can merge
6. **Track regression rate**: Instrument how often AO PRs break something and how long it takes to fix

## Answer

_To be filled in by the team or an investigating agent._
