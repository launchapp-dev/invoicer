---
title: "Are we ignoring the 90% test failure rate because fixing it threatens our velocity story?"
priority: critical
status: open
category: product-strategy
source_files:
  - knowledge/active-workstreams.md
  - knowledge/repos/launchapp-nextjs.md
  - knowledge/phases/current.md
  - knowledge/questions/are-we-quality-gating-ai-generated-code-at-current-volume.md
generated_by: question-generator
generated_at: 2026-03-30
---

## Context

The launchapp-nextjs template has a 90% test failure rate (111 of 124 Playwright tests failing) due to a critical ZodError regression. The "180+ PRs in 7 days" narrative is central to AO's value proposition, but this volume may be creating quality debt that undermines the very products meant to bootstrap revenue.

## What We Know

- launchapp-nextjs QA burst (2026-03-29): 124 tests run, 13 passed, 111 failed (90% failure rate)
- Critical regression: Runtime ZodError on every page from client-side validation of server-only env vars
- Dashboard 404s: /dashboard/settings, /dashboard/api-keys missing or misrouted
- The "180+ PRs in 7 days" for launchapp-react-router is a core marketing narrative for AO
- launchapp-nextjs had 15 PRs merged (#225-#208) that introduced the type regression
- No quality gates stopped the merge of PRs that broke the build
- TASK-1048 (build fix) ready but not dispatched as of latest fleet scan
- AO's routing has shifted to Codex GPT-5.4 for throughput, which may lack the quality bar of Sonnet

## What We Don't Know

- Is high PR volume with low test coverage being prioritized over reliable code?
- What is the actual customer impact of selling templates with 90% test failures?
- Are we measuring "PRs merged" as a success metric when it should be "tests passing"?
- How many customers have actually tried to use launchapp-nextjs and encountered the ZodError?
- Is the model routing shift (to Codex for throughput) reducing code quality in exchange for velocity?
- What is the cost of fixing 111 test failures vs. the revenue from shipping the template?

## Suggested Investigation

1. **Quality Metrics Audit**: Replace "PRs merged" with "test pass rate" as the primary velocity metric
2. **Customer Impact Assessment**: Survey or interview anyone who tried launchapp-nextjs since the regression
3. **Pre-Merge Gates**: Implement mandatory build/test gates before PR merge (currently removed per 2026-03-20 activity)
4. **Model Routing Review**: Analyze pass/fail rates by model (Claude vs. Codex vs. Gemini) to verify quality assumptions
5. **Technical Debt Inventory**: Catalog all templates' test coverage, lint errors, and build status in one view
6. **Reset Decision**: Evaluate whether launchapp-nextjs should be archived and rebuilt from the working react-router template rather than fixed incrementally

## Answer

_To be filled in by the team or an investigating agent._
