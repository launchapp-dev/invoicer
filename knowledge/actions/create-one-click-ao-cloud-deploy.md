---
title: "Create one-click cloud deployment template for self-hosted AO"
priority: high
status: proposed
effort: small
category: competitive
source_question: knowledge/questions/should-ao-cloud-launch-earlier-to-avoid-losing-hosted-agent-market.md
owner: unassigned
target_repos:
  - ao-cli
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

While a full AO Cloud or playground MVP takes time, a one-click cloud deployment template (Railway, Fly.io, or Render) can immediately reduce the friction of self-hosting. Instead of "install Rust, configure locally," users get "click Deploy, add API key, go." This preserves the BYOK/self-hosted positioning while removing the biggest adoption barrier. It also serves as infrastructure groundwork for the playground MVP.

Derived from: "Should AO Cloud launch earlier to avoid ceding the hosted agent market to Devin and Factory?"

## Scope

1. Create a Dockerfile for the AO daemon with all dependencies pre-built
2. Write a railway.toml / fly.toml deployment config with sensible defaults
3. Add a "Deploy to Railway" / "Deploy to Fly.io" button to the AO README
4. Document the 3-step setup: click deploy → add API key env var → connect repo
5. Test the deployment end-to-end with a sample workflow
6. Ensure the template handles persistent storage for AO state (SQLite DB, queue)

## Dependencies

- AO CLI Rust binary must support headless/daemon mode in containerized environments
- Needs to handle the GitHub App or token configuration for PR creation
- Railway/Fly.io account for testing and template hosting

## Success Criteria

- A new user can go from zero to running AO workflows in under 10 minutes via one-click deploy
- The deployment template is linked from the AO README and docs
- At least one cloud platform (Railway or Fly.io) has a working deploy button
- Template handles persistence and restarts gracefully

## Notes

- This is a bridge strategy — it reduces friction now while the playground/cloud MVP is developed
- Railway and Fly.io both have free tiers that could support initial users at zero cost
- The deploy template becomes marketing collateral: "Self-host AO in the cloud in 5 minutes"
- Monitor deployment success/failure rates to identify common setup issues
