---
title: "Is the agentic backend pivot responding to developer demand or competitor announcements?"
priority: high
status: open
category: product-strategy
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/ideas/feature-proposals.md
  - knowledge/competitive/launchpad-baas.md
  - knowledge/products/01-launchpad-baas.md
  - knowledge/revenue/opportunities.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

Round 4 introduced LaunchPad Agentic Backend (#25) and Agentic Endpoints (F32), both framed as responses to competitor moves: Firebase Studio launched agentic development with Gemini 2.5 Pro, Supabase acquired BKND for "agentic workloads," and Convex ships built-in RAG components. The knowledge base positions these as urgent ("LaunchPad must differentiate or become irrelevant"). But LaunchPad BaaS is currently at v0.1.0, hasn't had significant code development since Dec 2025-Jan 2026, and the core SDKs have an open question about whether they're even production-ready (SDK consistency remediation just started with 10 issues filed). Pivoting a pre-launch BaaS toward agentic workloads before the basic CRUD use case is proven risks chasing a trend before establishing a foundation.

## What We Know

- LaunchPad BaaS is at v0.1.0 with last significant pushes in Dec 2025-Jan 2026.
- 10 SDK-CONSISTENCY issues were filed on 2026-03-18 — remediation not started.
- The core LaunchPad SDKs are on GitHub only (not published to npm) per existing question.
- Firebase Studio's agentic mode and Supabase's BKND acquisition are real competitive moves.
- #25 (Agentic Backend) is rated 9/10 priority; F32 (Agentic Endpoints) is rated 9/10.
- Both depend on `launchpad-db-engine`, `openapi-gen`, and LaunchPad Vector (#10) — none production-ready.
- The existing question "should we sunset or revive LaunchPad BaaS" is still unanswered.
- No evidence exists that any external developer has used LaunchPad BaaS for any workload (agentic or otherwise).

## What We Don't Know

- Whether developers building agentic apps actually need a specialized BaaS or whether a standard Postgres + API layer suffices.
- What "agentic workload" means concretely beyond marketing language — what database operations do AI agents need that regular apps don't?
- Whether Firebase/Supabase's agentic features are getting adoption or are also speculative bets.
- If the org should stabilize LaunchPad for traditional CRUD first (prove product-market fit) before adding agentic features.
- Whether the effort for #25 and F32 should instead go toward making LaunchPad BaaS work at all — publishing SDKs to npm, achieving SDK consistency, getting a single external user.
- What the actual developer demand signal is: are developers requesting agentic backends, or are they requesting stable, documented traditional backends?

## Suggested Investigation

1. Search for "agentic backend" or "AI backend" in developer communities (Reddit, Hacker News, Discord) to gauge organic demand vs vendor-driven narrative.
2. Evaluate Firebase Studio's agentic mode adoption: are developers actually using it, or is it a demo feature?
3. Assess whether LaunchPad BaaS can reach v1.0 for traditional use cases before adding agentic features — define what "v1.0 for CRUD" looks like.
4. Interview 5 developers building AI agent apps to ask: "What backend are you using? What do you wish it did differently?" — test whether the pain point is real.
5. Determine if F32 (Agentic Endpoints) could be a thin layer on top of a stable LaunchPad CRUD BaaS rather than a pivot — making agentic features additive rather than redirective.

## Answer

_To be filled in by the team or an investigating agent._
