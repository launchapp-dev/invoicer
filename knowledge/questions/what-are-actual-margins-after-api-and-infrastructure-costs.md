---
title: "What are our actual margins on projected revenue after accounting for API costs, infrastructure, and model spend?"
priority: critical
status: open
category: revenue
source_files:
  - knowledge/revenue/overview.md
  - knowledge/revenue/pricing-analysis.md
  - knowledge/active-workstreams.md
  - knowledge/products/02-ao-agent-orchestrator.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The revenue analysis projects $30K–$120K MRR at 12 months but presents only top-line revenue with no cost structure or margin analysis. For an AI-powered product portfolio where the core engine (AO) consumes LLM API tokens at scale, understanding the cost basis is essential. AO currently processes 180+ PRs/week using Claude and other models. Products like AO Guard, CodeBy.ai, and AO Cloud will pass API costs through to customers. If margins are thin or negative on key products, the revenue projection is misleading.

## What We Know

- AO uses multi-model routing (Claude, OpenAI models) with a self-healing pipeline that reroutes failing requests.
- At 180+ PRs/week, each involving multiple agent calls (planning, coding, reviewing, testing), API token consumption is substantial.
- Claude API pricing (as of early 2026): Opus ~$15/$75 per 1M input/output tokens; Sonnet ~$3/$15.
- AO Pro is priced at $29/month — if a single user's agent runs consume $10–$50/month in API costs, margins could be razor-thin or negative.
- AO Guard ($29–$299/seat) requires running AI analysis on every PR, meaning per-seat API costs scale with repository activity.
- CodeBy.ai ($15–$99/seat) similarly runs AI analysis per code review.
- The pricing analysis benchmarks against competitor prices but does not model cost of goods sold (COGS).
- SaaS template sales ($149–$1,199 one-time) have near-100% margins since they're digital goods — these are the only cost-efficient revenue line.

## What We Don't Know

- What is the current monthly spend on LLM API calls for internal AO usage?
- What is the per-user, per-PR cost of running AO Guard analysis?
- At what usage level does a $29/month AO Pro subscriber become unprofitable?
- Whether the multi-model routing strategy (self-healing pipeline) increases costs by retrying on more expensive models when cheaper ones fail.
- What hosting/infrastructure costs are required for SaaS products (AO Cloud, CodeBy.ai, AO Guard).
- Whether any products should use a "bring your own API key" model to avoid carrying API costs.

## Suggested Investigation

1. Instrument current AO usage to measure monthly API spend (tokens consumed, cost per model, cost per PR).
2. Model per-user COGS for each AI-powered product: AO Pro, AO Guard, CodeBy.ai, AO Cloud.
3. Calculate break-even pricing: at what price point does each product achieve 60%+ gross margins?
4. Evaluate "bring your own key" (BYOK) vs. managed API models — BYOK eliminates COGS but limits addressable market.
5. Compare margin structure to Cursor ($20/month, reportedly spending $5–$8/user on API costs) and similar AI dev tools.
6. Determine if the self-healing pipeline's model fallback pattern creates unpredictable cost spikes.

## Answer

_To be filled in by the team or an investigating agent._
