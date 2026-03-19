---
title: "Is parallel development of 3+ SaaS template variants diluting engineering effort?"
priority: high
status: open
category: product-strategy
source_files:
  - knowledge/repos/launchapp-lite.md
  - knowledge/repos/launchapp-lite-v2.md
  - knowledge/repos/saas-template-launch-app-test.md
  - knowledge/repos/launchpad-saas-template.md
  - knowledge/products/03-launchapp-templates.md
  - knowledge/revenue/opportunities.md
  - knowledge/active-workstreams.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The org currently maintains at least four SaaS template repositories that serve overlapping purposes: launchapp-lite (primary lightweight template), launchapp-lite-v2 (Turborepo variant with Tailwind v4), saas-template-launch-app-test (flagship dev vehicle, 180+ PRs), and launchpad-saas-template (full BaaS-powered template using Next.js + Prisma). With AO automating development, the 180+ PRs/week are flowing into saas-template-launch-app-test, but features and fixes may not be propagating to the other variants. For a solo founder, maintaining multiple near-identical products is a multiplication of support, documentation, and update burden.

## What We Know

- **launchapp-lite**: Active, React Router 7 + Hono + Better Auth + Drizzle, includes mobile (Expo) support
- **launchapp-lite-v2**: Active, same stack but Tailwind CSS v4 upgrade, Turborepo conversion
- **saas-template-launch-app-test**: Extremely active (180+ PRs), same stack, serving as primary dev vehicle
- **launchpad-saas-template**: Stable, different stack entirely (Next.js 14 + Prisma + full LaunchPad BaaS), last updated Jan 2026
- Revenue model prices templates at $149 (Lite) to $1,199 (Agency) — implying tiered variants are part of the pricing strategy
- All LaunchApp variants share the same tech stack (RR7 + Hono + Better Auth + Drizzle) while launchpad-saas-template uses a different stack
- AO is automating development on saas-template-launch-app-test but it's unclear how changes flow to the sellable products

## What We Don't Know

- Which template is the actual sellable product — is it launchapp-lite, launchapp-lite-v2, or saas-template-launch-app-test?
- Are features developed in saas-template-launch-app-test being backported to launchapp-lite variants?
- Is launchpad-saas-template (Next.js) still a maintained product or effectively abandoned alongside LaunchPad BaaS?
- Does the pricing tier (Lite $149 vs Pro $299) map to different repos or different feature flags in one repo?
- How much AO compute time is spent on duplicated work across variants
- Whether customers would prefer one well-maintained template with configuration options over multiple variants

## Suggested Investigation

1. Diff the feature sets of launchapp-lite, launchapp-lite-v2, and saas-template-launch-app-test to quantify divergence
2. Define which repo is the canonical sellable product and document the relationship between test/dev vehicles and release artifacts
3. Decide whether launchpad-saas-template (Next.js variant) is still a product or should be archived
4. Evaluate a single-repo strategy with feature flags or configuration for Lite vs Pro tiers
5. If multiple variants are intentional, create an AO workflow that syncs critical fixes across all template repos
6. Map pricing tiers to concrete repo/feature differences

## Answer

_To be filled in by the team or an investigating agent._
