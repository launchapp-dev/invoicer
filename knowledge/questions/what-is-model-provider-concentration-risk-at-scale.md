---
title: "What is our model provider concentration risk at 180+ PRs/week of AI-generated code?"
priority: high
status: open
category: architecture
source_files:
  - knowledge/products/02-ao-agent-orchestrator.md
  - knowledge/active-workstreams.md
  - knowledge/competitive/ao-agent-orchestrator.md
  - knowledge/ideas/new-products.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

AO generates 180+ PRs/week across repos, powered by Claude, OpenAI, and Gemini model APIs. This makes the org one of the heaviest users of AI coding APIs in the indie/small-team segment. But there is no documented cost tracking, budget ceiling, provider fallback strategy, or contingency plan for API disruptions.

AO's multi-model routing and self-healing pipelines suggest some resilience, but the knowledge base doesn't document: actual monthly API spend, cost per PR, which models handle what percentage of work, or what happens during an extended outage of the primary provider. At 180+ PRs/week, even a 24-hour outage or a 2x price increase could be operationally significant.

## What We Know

- AO supports multi-model routing across Claude, OpenAI, and Gemini
- Self-healing pipelines can re-route failing model calls to alternative providers
- The reconciler auto-reroutes failing oai-runner tasks to Claude
- Workflow-optimizer tracks per-model success rates
- 180+ PRs/week implies thousands of model API calls per week
- BYOK (bring your own keys) is a core selling point — the org pays its own API costs
- AO Cost Analytics (idea F11) is proposed but not built yet
- No cost-per-PR metrics exist in the knowledge base
- No monthly API spend is documented
- No budget ceiling or circuit breaker for API costs exists
- Anthropic, OpenAI, and Google have all changed API pricing in the past 12 months

## What We Don't Know

- Actual monthly spend on model APIs across all repos
- Cost per PR (average, median, and outlier distribution)
- Which provider handles what percentage of total API calls
- What happens if the primary provider (likely Anthropic/Claude) has a multi-hour outage
- Whether a 2x price increase from any provider would make the current velocity unsustainable
- Whether the self-healing routing actually reduces cost or just shifts it to more expensive models
- What the API spend will look like when AO is sold as a product (customers' costs become a support/retention issue)
- Whether rate limits have ever throttled development velocity

## Suggested Investigation

1. **Cost audit:** Instrument AO to log model, token count, and cost per API call for one week. Calculate cost-per-PR, cost-per-repo, and cost-per-model breakdown
2. **Provider dependency map:** Determine what percentage of work each provider handles and which tasks can only be routed to specific models
3. **Outage simulation:** Disable the primary model provider in a test environment and measure: Does self-healing actually work? What's the quality delta on a secondary model? What's the velocity impact?
4. **Budget ceiling:** Define a maximum monthly API budget. Implement a circuit breaker that pauses non-critical agent work when spend approaches the limit
5. **Pricing sensitivity model:** For each provider, model the impact of a 2x and 5x price increase on monthly costs and per-PR economics
6. **Customer cost guidance:** Since AO Pro is BYOK, create estimated monthly API cost ranges for potential customers (this becomes a sales enablement issue)

## Answer

_To be filled in by the team or an investigating agent._
