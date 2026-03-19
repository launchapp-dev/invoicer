---
title: "Cap integration portfolio at 5 packages and adopt recipes approach for the rest"
priority: high
status: proposed
effort: small
category: operations
source_question: knowledge/questions/what-is-hidden-maintenance-cost-of-22-proposed-integrations.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The ideas backlog proposes 22 integration packages (I1-I22), each described as "Small" or "Medium" effort to build. But integrations are maintenance liabilities: each couples LaunchPad to an external API the org doesn't control. The flagship template needed 8 dependency upgrades in a single week. Extrapolating to 22 packages means dozens of breaking-change responses per month. The SDK-CONSISTENCY initiative (10 issues filed 2026-03-18) proves existing packages aren't maintained consistently — before adding 22 more. Many proposed integrations have free alternatives (Sentry has Hono support, PostHog has React SDK, Stripe has official Node SDK).

Derived from: "What is the hidden maintenance cost of 22 proposed integration packages?"

## Scope

1. **Audit existing integration maintenance**: Measure maintenance hours/week for the 3-4 integrations already in the flagship template (Stripe, Resend, PostHog, Upstash) — this is the baseline cost per package
2. **Score each proposed integration on value-add**: For each of the 22 integrations, answer: (a) does the service's own SDK already work with Hono/LaunchPad? (b) what value does a LaunchPad wrapper add beyond the native SDK?
3. **Select top 5 integrations**: Keep only integrations where the LaunchPad wrapper provides meaningful value beyond what the native SDK offers (likely: auth adapter, billing/subscription management, email templating, database ORM, and one analytics provider)
4. **Convert remaining 17 to recipes**: Write documentation guides showing users how to integrate each service themselves — a "recipes" docs section is dramatically cheaper to maintain than 17 packages
5. **Set a hard cap**: Document a policy that the integration portfolio will not exceed 5-7 maintained packages. New integrations must replace an existing one or be a recipe
6. **Calculate and publish the integration tax**: Document that each maintained package costs ~2 hours/month, making 22 packages = 44 hours/month = one full-time engineer equivalent

## Dependencies

- Should align with adopt-integrate-first-strategy-for-baas — integration wrappers for BaaS components count toward the portfolio cap
- No technical blockers — this is primarily a prioritization and documentation task
- Study how Supabase, Remix, and Next.js handle integrations (guides vs packages) for reference

## Success Criteria

- Maintenance cost per integration package quantified with real data from existing integrations
- A ranked list of all 22 integrations with clear keep/convert-to-recipe decisions
- No more than 5-7 first-party integration packages in the maintained portfolio
- A "recipes" documentation section created for deprioritized integrations
- A documented integration cap policy preventing future package sprawl

## Notes

- 22 packages at 2 hours/month each = 528 hours/year = $50K+ in equivalent engineering cost
- Recipes are better for long-tail integrations: they never go stale in the same way packages do, and users can adapt them to their specific version/config
- Consider community-maintained integrations as a middle ground — provide the recipe, let the community maintain the package
- The "integration tax" calculation should be a key input to the focus-single-revenue-stream decision
