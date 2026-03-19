---
title: "What is our risk exposure if Better Auth's direction diverges from our needs?"
priority: high
status: open
category: architecture
source_files:
  - knowledge/competitive/better-auth.md
  - knowledge/products/dependency-graph.md
  - knowledge/architecture.md
  - knowledge/sdk-matrix.md
  - knowledge/products/01-launchpad-baas.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

Better Auth is listed as a "shared foundation" in the dependency graph and appears in virtually every product: the flagship SaaS template (`@repo/auth`), launchapp-lite, launchapp-lite-v2, launchpad-baas, and the launchpad-auth-sdk. The architecture document calls it "the org's own auth library" and it's positioned as a competitive moat ("zero vendor lock-in" GTM theme).

However, Better Auth has raised $5M from Peak XV and Y Combinator. It is an independent, externally-funded open-source project. The org uses it heavily but doesn't control its roadmap, licensing decisions, or breaking changes. The competitive analysis notes Better Auth is "the fastest-growing JS auth library" with strong community momentum — which means its priorities will increasingly be shaped by its broader user base, not this org's specific needs.

## What We Know

- Better Auth v1.2.7 is used across all templates and the BaaS platform
- It's MIT licensed today, but VC-funded OSS projects sometimes change licensing (Redis, Terraform, Elastic, MongoDB precedents)
- Better Auth's plugin architecture means enterprise SSO "via plugin" — not a first-class built-in feature
- The org's repos reference `better-auth` as a direct npm dependency (not a fork)
- The competitive landscape doc positions Better Auth as something the org benefits from but doesn't fully own
- Better Auth's $5M funding creates pressure to monetize — likely via hosted/managed auth service or enterprise features

## What We Don't Know

- Does the org have any influence over Better Auth's roadmap? (contributor status, maintainer access, advisory role)
- If Better Auth introduced a breaking change in v2.0, how many person-hours would it take to update all products?
- Is there an abstraction layer between Better Auth and the org's auth packages, or is it tightly coupled?
- What happens if Better Auth introduces a paid "Better Auth Cloud" that competes with the self-hosted story the org relies on?
- Has the org evaluated what a migration away from Better Auth would cost?
- Could Better Auth's licensing change (e.g., to BSL or SSPL) break the org's commercial template sales?

## Suggested Investigation

1. **Audit coupling depth**: Grep all repos for direct Better Auth API usage vs. abstracted usage. If every template directly imports `better-auth` internals, the switching cost is high
2. **Check the org's contributor status**: Are there commits, PRs, or maintainer roles in the Better Auth repo? Influence reduces risk
3. **Create an auth abstraction layer**: If one doesn't exist, consider wrapping Better Auth behind an `@repo/auth` interface so that swapping providers is feasible
4. **Monitor Better Auth's monetization signals**: Watch for announcements about Better Auth Cloud, pricing tiers, or license changes
5. **Evaluate fallback options**: If Better Auth disappeared tomorrow, what's the migration path? Auth.js v5? Custom implementation? Knowing the answer before you need it is the point

## Answer

_To be filled in by the team or an investigating agent._
