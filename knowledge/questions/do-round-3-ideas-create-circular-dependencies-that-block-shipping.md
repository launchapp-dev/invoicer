---
title: "Do Round 3 ideas create circular dependency chains that prevent independent shipping?"
priority: high
status: open
category: architecture
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/ideas/feature-proposals.md
  - knowledge/ideas/overview.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

Round 3 introduced 5 new products and 6 features that are deeply interlinked. Auth Cloud (#19) requires the Better Auth Admin Dashboard (F23) as its core differentiator. MCP Gateway (#18) requires Better Auth SSO for enterprise auth. AO Compliance Engine (#20) requires AO Guard (#12) as its foundation. LaunchPad Edge (#22) requires a D1 adapter for `launchpad-db-engine` that doesn't exist. DevOnboard (#21) depends on `openapi-gen` and Claude API integration. Meanwhile, AO Guard (#12) — the highest-priority idea at 10/10 — is itself unbuilt.

This creates a potential dependency deadlock: nothing from Round 3 can ship in its envisioned form until several Round 2 and Round 1 dependencies are completed first.

## What We Know

- Auth Cloud (#19) explicitly lists F23 (Admin Dashboard) as a "core differentiator vs raw self-hosting"
- MCP Gateway (#18) leverages Better Auth for "SSO-integrated authentication" and Hono for reverse proxy
- Compliance Engine (#20) describes itself as a "natural bundle" with AO Guard (#12)
- LaunchPad Edge (#22) needs `launchpad-db-engine` to abstract storage backend for D1/R2 — this adapter doesn't exist
- AO Guard (#12) is rated 10/10 priority but remains unbuilt after two rounds
- 15 ideas are rated 9/10+, meaning prioritization hasn't forced ranking
- The org processes 180+ PRs/week but active workstreams number only 6

## What We Don't Know

- Which Round 3 ideas can ship as useful MVPs without their stated dependencies
- Whether the dependency graph has been mapped — is there a critical path?
- How long the dependency chain is from "nothing built" to "Auth Cloud ships with Admin Dashboard"
- Whether any Round 3 product has been designed with a standalone v0 that delivers value without its dependencies
- If the org has capacity to build dependencies and new products simultaneously

## Suggested Investigation

- Map the full dependency graph across all 79 ideas, identifying which ideas block which
- Identify the longest critical path and estimate time-to-ship
- For each Round 3 product, define a "dependency-free MVP" — the smallest useful version that ships without waiting for other ideas
- Determine if any dependencies can be replaced with third-party solutions (e.g., use Clerk instead of Auth Cloud for MCP Gateway SSO until Auth Cloud ships)
- Prioritize building the most-blocking dependency first (likely AO Guard, which unblocks Compliance Engine)

## Answer

_To be filled in by the team or an investigating agent._
