---
title: "Is the MCP standard durable enough to bet infrastructure products on?"
priority: high
status: open
category: market-trends
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/competitive/ao-agent-orchestrator.md
  - knowledge/ideas/integrations.md
  - knowledge/ideas/feature-proposals.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The Round 3 ideas heavily index on MCP as a durable standard: MCP Gateway (#18) proposes building "the Nginx of AI tool integration," OpenAPI-to-MCP Generator (F9) assumes every API wants MCP exposure, LaunchPad MCP Server (I7) is rated 9/10 priority, and the revenue analysis references a "$10B MCP market." But MCP is an Anthropic-originated protocol that's less than 2 years old. Google launched the competing Agent-to-Agent Protocol (A2A), OpenAI has its own tool-calling conventions, and the history of AI standards is littered with abandoned protocols. Building infrastructure products on MCP is a bet that one company's protocol becomes the industry standard.

## What We Know

- MCP has 6,400+ registered servers as of Feb 2026 — strong adoption momentum.
- The MCP 2026 roadmap explicitly lists transport evolution, enterprise auth, and gateway behavior as unsolved — meaning the spec is still in flux.
- Google's A2A protocol is emerging as a competitor standard, and idea F10 (A2A Protocol Support) acknowledges this.
- Anthropic originated MCP but it's now an open standard — however, governance is still Anthropic-led.
- MCP Gateway (#18) is rated 9/10 priority with "medium" effort — a significant investment if MCP fragments or stalls.
- Multiple ideas assume MCP durability: #18, F9, F10, I7, I23.

## What We Don't Know

- Whether OpenAI will adopt MCP, create a competing standard, or ignore agent-tool protocols entirely.
- How the MCP spec will evolve — breaking changes in a pre-1.0 protocol could invalidate gateway implementations.
- Whether enterprise customers will standardize on MCP or require multi-protocol support (MCP + A2A + proprietary).
- If MCP's current adoption numbers reflect real production usage or just experimentation.
- What happens to MCP if Anthropic pivots strategically or is acquired.

## Suggested Investigation

- Track MCP adoption specifically in production environments (not just registered servers, but active production deployments).
- Monitor OpenAI's stance on MCP — adoption by OpenAI would cement MCP; a competing standard would fragment the market.
- Assess whether MCP Gateway can be designed as protocol-agnostic (gateway for MCP + A2A + others) to hedge against standard fragmentation.
- Review the MCP governance model — is it truly open, or is Anthropic maintaining veto power?
- Talk to enterprise customers: are they betting on MCP, or are they waiting for the standards landscape to settle?

## Answer

_To be filled in by the team or an investigating agent._
