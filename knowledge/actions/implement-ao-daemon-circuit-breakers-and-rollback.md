---
title: "Implement circuit breakers, rollback procedures, and blast radius controls for AO daemon"
priority: high
status: proposed
effort: medium
category: architecture
source_question: knowledge/questions/what-is-blast-radius-if-ao-daemon-introduces-systematic-bugs.md
owner: unassigned
target_repos:
  - ao-cli
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

AO runs 24/7, merges PRs autonomously, and maintains its own codebase — creating a circular risk where a systematic flaw can propagate across the entire org before detection. The self-healing pipeline feature could mask problems: if AO retries a bad pattern, it digs deeper into a bad state rather than surfacing the issue. With deep cross-repo coupling through shared packages, a single bad merge in a shared dependency could cascade to every downstream repo. No rollback strategy, circuit breakers, or disaster recovery plan is documented.

Derived from: "What is the blast radius if the AO daemon introduces systematic bugs across repos?"

## Scope

1. **Circuit breakers**: Implement automatic daemon pause when error rates exceed thresholds — e.g., 3+ consecutive CI failures, same file modified 5+ times in 24h, or build broken for more than 1 hour
2. **Rollback procedure**: Document and test a procedure to revert the last N AO-generated PRs in a repo — include a script or CLI command to batch-revert
3. **Merge rate limiting**: Add configurable limits on merges per repo per hour/day to prevent runaway batch operations
4. **Dependency impact mapping**: Identify which shared packages, if corrupted, cascade to the most repos — prioritize those for stricter quality gates
5. **Manual override**: Document how to emergency-pause AO, prevent all merges, and take manual control during an incident
6. **Audit trail**: Ensure all AO-generated commits are clearly labeled and distinguishable from human commits for easy filtering during incident response

## Dependencies

- CI quality gates (implement-ci-quality-gates-for-ao-merges) should be in place first — circuit breakers react to CI signals
- Understanding of AO daemon internals is needed to implement rate limiting and pause functionality

## Success Criteria

- AO automatically pauses when error thresholds are exceeded
- A tested rollback procedure exists and can revert a batch of AO PRs in under 15 minutes
- Merge rate limits are configurable per repo
- An incident response runbook exists for "AO is merging bad code"
- At least one chaos test has been run to verify the circuit breaker triggers correctly

## Notes

- The circular risk (AO maintaining AO) deserves special attention — consider making AO's own repos require human approval for merges
- Circuit breakers should alert (email, Slack, or similar) when triggered, not just silently pause
- Rate limiting is also a cost control measure — unlimited AO runs consume API credits
- This becomes more critical as AO is offered to external customers — a bug in multi-tenant AO could affect customer repos
