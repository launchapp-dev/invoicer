---
title: "Are abandoned public repos eroding developer trust before we even launch?"
priority: high
status: open
category: operations
source_files:
  - knowledge/repos/aethris_client_plugins.md
  - knowledge/repos/react-router-presets.md
  - knowledge/repos/supabase-railway-template.md
  - knowledge/repos/create-launchpad.md
  - knowledge/repos/launchapp-studio.md
  - knowledge/repos/figma-tailwind-plugin.md
  - knowledge/repo-inventory.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The launchapp-dev GitHub organization has 5+ public repos with zero activity for 6-12 months, including completely empty repos (aethris_client_plugins), abandoned scaffolds (create-launchpad, react-router-presets, supabase-railway-template), and a paused IDE project (launchapp-studio). When a potential customer or contributor visits the org page to evaluate products like AO or LaunchApp templates, these dead repos are immediately visible and signal abandonment, not velocity.

## What We Know

- **aethris_client_plugins**: Public, empty, created Nov 2024 — no content ever pushed
- **react-router-presets**: Public, created May 2025 — appears empty/minimal, no activity since creation
- **supabase-railway-template**: Public, created Mar 2025 — one-off config dump, no commits since
- **create-launchpad**: Public, created Nov 2025 — placeholder with no commits, counterpart to create-launchapp but never developed
- **launchapp-studio**: Public, last updated Jun 2025 — ambitious "IDE of the future" project paused for 9+ months
- **figma-tailwind-plugin**: Public, last updated Apr 2025 — 11+ months without activity
- The org is actively building 4-5 products and generating 180+ PRs/week on active repos
- GTM strategy calls for Show HN, Product Hunt, and developer community engagement

## What We Don't Know

- How many developers have visited the org page and formed negative impressions from dead repos
- Whether any of these repos have open issues, stale PRs, or security vulnerabilities from unmaintained dependencies
- Whether the launchapp-studio README ("IDE of the future") is setting expectations that damage credibility
- What the cost of archiving vs. the cost of leaving abandoned repos public actually is
- Whether any of these repos have external forks or dependents that would break if archived

## Suggested Investigation

1. Run `gh repo list launchapp-dev --public --json name,pushedAt,isArchived` to get exact staleness metrics
2. Check for open issues/PRs on each abandoned repo
3. Run dependency audits (`npm audit`) on repos with package.json to identify security exposure
4. Count GitHub stars, forks, and traffic on abandoned repos to gauge external interest
5. Make archive/delete decisions for each: archive (preserves history, signals intentional closure), delete (removes entirely), or revive (if there's a plan)
6. Consider whether launchapp-studio should be archived or explicitly marked as "on hold" in its README

## Answer

_To be filled in by the team or an investigating agent._
