---
title: "Archive abandoned public repos to protect org credibility"
priority: high
status: proposed
effort: small
category: operations
source_question: knowledge/questions/are-abandoned-public-repos-eroding-developer-trust-before-launch.md
owner: unassigned
target_repos:
  - aethris_client_plugins
  - react-router-presets
  - supabase-railway-template
  - create-launchpad
  - launchapp-studio
  - figma-tailwind-plugin
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The launchapp-dev GitHub org has 5+ public repos with zero activity for 6-12 months. When potential customers evaluate AO or LaunchApp templates, dead repos on the org page signal abandonment rather than velocity. This directly undermines the "180 PRs in 7 days" narrative and GTM plans targeting Show HN, Product Hunt, and developer communities. The fix is trivial (archiving) but the damage of inaction compounds with every visitor.

Derived from: "Are abandoned public repos eroding developer trust before we even launch?"

## Scope

1. Run `gh repo list launchapp-dev --public --json name,pushedAt,isArchived` to get exact staleness data
2. Check each abandoned repo for open issues, stale PRs, external forks, and stars
3. For repos with zero external engagement: archive immediately (aethris_client_plugins, react-router-presets, supabase-railway-template, create-launchpad)
4. For launchapp-studio: archive and update README to say "Paused — see [active projects]" with links to AO and LaunchApp
5. For figma-tailwind-plugin: decide if there's a revival plan within 30 days; if not, archive
6. Run `npm audit` on repos with package.json to confirm no security vulnerabilities are exposed
7. Verify no external packages depend on any of these repos before archiving

## Dependencies

- Need GitHub org admin access to archive repos
- Should check npm registry for published packages from these repos before archiving

## Success Criteria

- All repos inactive for 6+ months with no external engagement are archived
- The org page shows only active, maintained projects
- No broken external dependencies from archiving

## Notes

- Archiving is reversible — repos can be unarchived if needed later
- This should be done before any Show HN or Product Hunt launch to avoid "why are there dead repos" comments
- Consider pinning the 3-4 most active repos on the org profile page for a curated first impression
