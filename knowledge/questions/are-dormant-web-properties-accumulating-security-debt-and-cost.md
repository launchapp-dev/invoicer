---
title: "Are six dormant web properties accumulating security debt and domain renewal costs with no disposition plan?"
priority: medium
status: open
category: operations
source_files:
  - knowledge/products/06-websites.md
  - knowledge/repos/codeby.ai.md
  - knowledge/repos/lostcause.com.md
  - knowledge/repos/aetheris-site.md
  - knowledge/repos/landing-siteinspector-pro.md
  - knowledge/repo-inventory.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The newly expanded repo catalog documents 6+ web properties in various states of abandonment: `codeby.ai` (9 months stale), `lostcause.com` (7 months stale), `launchapp.dev-landing` (10 months stale), `aethris-landing` (12+ months stale), `site-inspector-landing` (12+ months stale), and `landing-siteinspector-pro` (12+ months stale). These sites are deployed on real domains but haven't received dependency updates or security patches in 7-12 months.

## What We Know

- `codeby.ai` — a domain earmarked for the AI code review SaaS idea (#6), but the current repo is an empty monorepo scaffold from June 2025 with zero product code.
- `lostcause.com` — an anime audition platform with some real feature work, but sparse commits since August 2025.
- The Aethris and Site Inspector properties are from abandoned product lines (late 2024 / early 2025) that predate the current LaunchApp focus.
- All websites share a common TypeScript/React Router stack with dependencies that are now 7-12 months out of date (React Router 7 has had multiple security-relevant releases since).
- Domain renewals for `codeby.ai`, `lostcause.com`, and others cost money regardless of whether the properties are active.
- The org overview counts 109 repos — roughly 49 are experimental/legacy/abandoned.

## What We Don't Know

- Are these domains still resolving to live deployments? If so, are they vulnerable to known exploits in outdated dependencies?
- What are the annual domain renewal costs across all org-owned domains?
- Is `codeby.ai` being held as a strategic asset for idea #6, or is it simply forgotten?
- Are any of these sites receiving traffic from external sources (search engines, backlinks)?
- Could abandoned public-facing sites damage the org's reputation if compromised?

## Suggested Investigation

- Audit which domains are still resolving and what they serve (active app vs. parking page vs. error page).
- Check Railway/Vercel/hosting dashboards for deployment costs on dormant projects.
- Decide per-property: (a) keep domain as strategic asset but take down site, (b) archive repo and let domain expire, (c) redirect to launchapp.dev.
- For `codeby.ai` specifically: if idea #6 is moving forward, update the site to at least a coming-soon page; if not, stop paying for the domain.

## Answer

_To be filled in by the team or an investigating agent._
