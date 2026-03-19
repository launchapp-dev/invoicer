---
title: "Establish baseline metrics for all public repos"
priority: medium
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/do-we-have-any-evidence-real-users-want-what-we-are-building.md
owner: unassigned
target_repos:
  - ao-cli
  - launchpad-db-engine
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

Across the entire knowledge base there is zero mention of actual usage metrics — no GitHub stars, npm downloads, forks, or issues from external users. Before investing in revenue infrastructure, the org needs a baseline understanding of whether anyone outside the org has noticed these projects. This data already exists in GitHub and npm but hasn't been collected or documented.

Derived from: "Do we have any evidence real users want what we're building?"

## Scope

1. For each public repo, collect: GitHub stars, forks, open issues (from external users), traffic data (clones, views)
2. For each published npm package, collect: weekly/monthly download counts, dependent packages
3. Check for external mentions: blog posts, tweets, forum discussions referencing the org's projects
4. Document all findings in a knowledge/metrics/ baseline document
5. Set up a monthly cadence to re-check these metrics and track trends

## Dependencies

- Need to identify which repos are public and which npm packages are published
- GitHub traffic data requires repo admin access

## Success Criteria

- Baseline metrics documented for all public repos and npm packages
- A clear picture of current external awareness/adoption (even if it's zero)
- Monthly tracking cadence established

## Notes

- If all metrics are near zero, that's valuable data — it means the demand validation action is even more critical
- Non-zero metrics (even small) indicate organic interest worth investigating further
- GitHub traffic data only retains 14 days of history — start collecting now
