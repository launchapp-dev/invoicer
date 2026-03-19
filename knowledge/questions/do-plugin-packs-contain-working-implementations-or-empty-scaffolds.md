---
title: "Do the 15 Claude Code plugin packs contain working implementations or are they empty scaffolds?"
priority: high
status: open
category: product-strategy
source_files:
  - knowledge/repos/ao-plugin-packs-overview.md
  - knowledge/repos/claude-plugin-marketplace.md
  - knowledge/repos/ao-bundled-packs.md
  - knowledge/revenue/opportunities.md
  - knowledge/competitive/claude-code-plugins.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The revenue roadmap projects $10K–$50K/month from premium plugin packs, and the GTM strategy positions the `claude-plugin-marketplace` as a key distribution channel. However, all 15 plugin packs (aws-pack, firebase-pack, pdf-pack, postgres-pack, stripe-pack, etc.) were created in a 2-day batch on March 16–17, 2026. Each follows an identical scaffold structure (pack.toml, agents, workflows, skills, hooks). The repo docs describe their structure but not whether the implementations actually work.

## What We Know

- 15 packs exist across connector (aws, docker, figma, firebase, google-workspace, linear, postgres, slack, stripe, supabase) and capability (monitoring, ollama, pdf, playwright, research) categories.
- All are v0.1.0, require `ao_core >= 0.1.0`, and have zero inter-pack dependencies.
- Each pack includes 5–7 commands, 1–3 agents, 2–3 exported workflows, and a `pack.toml` manifest.
- All were created in bulk within a 2-day window — a pattern consistent with scaffolding, not iterative development.
- The marketplace indexes all packs but has no usage metrics, reviews, or download counts.
- No existing question addresses pack content quality — Q8 asks about marketplace viability but assumes packs exist.

## What We Don't Know

- Do the agent definitions in each pack contain meaningful system prompts and tool configurations, or are they placeholder templates?
- Do the workflows actually execute successfully when installed?
- Has anyone run `ao pack install aws-pack` and used it for real work?
- What percentage of each pack's advertised features are functional vs. stubbed?
- Are the MCP server connections in each pack configured to work with real services (AWS credentials, Slack tokens, etc.)?
- What is the effort to bring a scaffolded pack to production quality?

## Suggested Investigation

1. Pick 3 representative packs (one connector like `aws-pack`, one capability like `pdf-pack`, one productivity like `slack-pack`) and attempt to install and use each for a real task.
2. For each pack, audit: (a) agent prompt quality, (b) workflow execution success, (c) skill functionality, (d) MCP server connectivity.
3. Categorize all 15 packs as "functional," "partially functional," or "scaffold only."
4. Estimate effort-to-production for each category.
5. Decide whether to invest in deepening a few packs or broadening the scaffold collection — quality vs. quantity trade-off.

## Answer

_To be filled in by the team or an investigating agent._
