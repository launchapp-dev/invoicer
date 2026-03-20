---
title: "What is the throughput plan when Codex GPT-5.4's doubled rate limit expires on 2026-04-02?"
priority: critical
status: open
category: architecture
source_files:
  - knowledge/active-workstreams.md
  - knowledge/architecture.md
  - knowledge/competitive/ao-agent-orchestrator.md
generated_by: question-generator
generated_at: 2026-03-20
---

## Context

AO CLI is currently routing analytical and high-throughput task classes to Codex GPT-5.4 during a temporary doubled-rate-limit promotional window that expires on 2026-04-02 — 13 days from now. The active-workstreams document explicitly states the goal is to "raise throughput via Codex GPT-5.4" and "split task classes by model strengths." This routing decision is baked into agent prompts and workflow configurations, meaning the current velocity numbers (200+ PRs/week for the flagship template alone) may depend on capacity that is about to halve.

## What We Know

- AO CLI v0.0.11 routes tasks to Codex GPT-5.4 during the doubled-rate-limit window through 2026-04-02.
- The architecture describes fallback model chains (GLM -> MiniMax -> Claude) but does not mention what happens when Codex rates normalize.
- Current org velocity is extremely high: 200+ PRs in the flagship, 80+ in design-system, 60+ in ao-cli, 58+ in brain — all within roughly one week.
- AO's competitive differentiation includes multi-model orchestration and model routing by task type, making provider capacity a first-order concern.
- Devin and Factory are cloud-hosted and likely negotiate bulk model rates; AO's BYOK model means the user absorbs rate limits directly.

## What We Don't Know

- What percentage of current throughput depends on Codex GPT-5.4 specifically vs. other providers?
- Will OpenAI offer a renewal or permanent rate increase after April 2?
- Has AO been tested at half the current Codex rate limit to understand the throughput impact?
- Are there queuing or backpressure mechanisms in the daemon to gracefully degrade when a provider's rate drops?
- What is the cost difference between Codex and the fallback providers for equivalent task classes?

## Suggested Investigation

1. Audit the last 7 days of task routing to quantify what percentage of tasks went to Codex vs. Claude vs. other providers.
2. Simulate AO daemon behavior at 50% Codex rate limit — measure queue depth, latency, and throughput degradation.
3. Contact OpenAI about post-promotional rate options or negotiate a committed-use rate.
4. Review AO's `custom.yaml` model routing to confirm fallback chains are configured and tested for all Codex-routed task classes.
5. Evaluate whether current velocity targets are sustainable at normal rates or are artificially inflated by the promotional window.

## Answer

_To be filled in by the team or an investigating agent._
