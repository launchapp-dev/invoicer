---
title: "What is the blast radius if the AO daemon introduces systematic bugs across repos?"
priority: high
status: open
category: architecture
source_files:
  - knowledge/products/02-ao-agent-orchestrator.md
  - knowledge/active-workstreams.md
  - knowledge/products/dependency-graph.md
  - knowledge/architecture.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

AO is the engine that maintains the org's own products. It runs 24/7, merges PRs autonomously, and operates across multiple repositories. This creates a unique circular risk: AO maintains the repos that build AO. If the daemon develops a systematic flaw — a misunderstanding of a pattern, a broken upgrade path, a security anti-pattern — it could propagate that flaw across the entire org before anyone notices.

This isn't a theoretical risk. The knowledge base shows AO merged 180+ PRs in 7 days on a single repo and has "self-healing pipelines" that retry failures. Self-healing is powerful but can also mask problems: if AO keeps "fixing" its own failures in the wrong direction, it could dig deeper into a bad state.

## What We Know

- AO daemon runs continuously across multiple repos
- 180+ PRs merged in 7 days on the flagship template alone
- AO uses git worktrees for isolation (per-task isolation, not per-org)
- AO has self-healing pipelines that retry and adapt
- The dependency graph shows deep cross-repo coupling (shared packages, shared frameworks)
- AO maintains ao-cli, ao-skills, ao-bundled-packs — i.e., it maintains itself
- 15 plugin packs were scaffolded in 2 days, suggesting batch operations at scale
- No rollback strategy or disaster recovery plan is documented

## What We Don't Know

- If AO introduces a bug in a shared package (e.g., design-system, a LaunchPad SDK), how many downstream repos break?
- Is there a way to "roll back" an entire batch of AO-generated PRs?
- Has AO ever introduced a systematic pattern that later turned out to be wrong?
- What monitoring exists to detect code quality degradation over time?
- If AO corrupts its own configuration or workflow definitions, is there a manual override?
- Are there circuit breakers that pause the daemon if error rates spike?
- Who gets paged when AO breaks something at 3 AM?

## Suggested Investigation

1. **Dependency impact analysis**: Map which shared packages, if corrupted by a bad PR, would cascade to the most repos
2. **Rollback procedure**: Define and test a procedure to revert the last N AO-generated PRs across a repo
3. **Circuit breaker design**: Implement (or verify existence of) automatic pause when: test failures spike, build breaks persist, or the same file is modified repeatedly
4. **Audit trail**: Ensure every AO-generated change is traceable and distinguishable from human changes
5. **Manual override**: Document how to pause AO, prevent merges, and take manual control during an incident
6. **Chaos test**: Intentionally introduce a subtle bug in a shared package and measure how long it takes to detect and remediate

## Answer

_To be filled in by the team or an investigating agent._
