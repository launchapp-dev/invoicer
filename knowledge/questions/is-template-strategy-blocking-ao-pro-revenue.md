---
title: "Is the template strategy actually blocking AO Pro revenue instead of funding it?"
priority: critical
status: open
category: revenue
source_files:
  - knowledge/vision.md
  - knowledge/active-workstreams.md
  - knowledge/phases/current.md
  - knowledge/products/03-launchapp-templates.md
  - knowledge/products/02-ao-agent-orchestrator.md
generated_by: question-generator
generated_at: 2026-03-30
---

## Context

The vision describes a flywheel: AO builds templates → templates generate revenue → revenue funds AO development. However, Phase 2 (Bootstrap Revenue) has 30 days remaining with $0 MRR and critical template failures blocking any path to revenue. Meanwhile, AO Pro—the actual recurring revenue product—has no visible development progress despite being the primary revenue target.

## What We Know

- Phase 2 deadline: 2026-04-30 (30 days remaining) with $10k MRR target
- Current revenue: $0 MRR
- Only 1 of 4 templates is production-ready (launchapp-react-router)
- launchapp-nextjs: 111/124 tests failing, build broken (TASK-1048)
- launchapp-nuxt: daemon crashed (TASK-880)
- launchapp-sveltekit: 391 lint errors (stable but high debt)
- AO Pro pricing defined ($29-49/seat/mo) but no development tasks visible
- 23 new repos created in late March, diverting resources from templates
- Fleet at 86% health with systemic runner failures

## What We Don't Know

- Is the template flywheel actually viable, or is it a distraction from building AO Pro directly?
- What is the actual path from template sales to AO Pro subscription conversion?
- How many template sales are needed to fund meaningful AO Pro development, and can we hit that in 30 days with only 1 working template?
- Are we building templates to prove AO works (demos) or to generate revenue (products)? The distinction matters for resource allocation.
- What is the opportunity cost of fixing 111 failing tests in nextjs vs. building AO Pro onboarding?

## Suggested Investigation

1. **Revenue Model Validation**: Calculate exact template sales volume needed to fund 3-6 months of AO Pro development at current burn rate
2. **AO Pro Scope Audit**: Inventory what actually exists for AO Pro (landing page, signup flow, billing, multi-repo support) vs. what's documented
3. **Resource Reallocation Analysis**: Compare timeline to fix all templates vs. timeline to ship MVP AO Pro
4. **Customer Pipeline**: Verify if there are actual customers waiting for templates vs. actual customers waiting for AO Pro
5. **Decision Framework**: Define explicit criteria for sunsetting template work to focus on AO Pro if Phase 2 targets are missed

## Answer

_To be filled in by the team or an investigating agent._
