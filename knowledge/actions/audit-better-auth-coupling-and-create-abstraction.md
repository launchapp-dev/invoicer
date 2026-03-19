---
title: "Audit Better Auth coupling depth and create an abstraction layer"
priority: high
status: proposed
effort: medium
category: architecture
source_question: knowledge/questions/what-is-our-risk-if-better-auth-diverges-from-our-needs.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
  - launchapp-lite
  - launchapp-lite-v2
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

Better Auth is a shared foundation across virtually every product: the flagship SaaS template, launchapp-lite, launchapp-lite-v2, launchpad-baas, and the launchpad-auth-sdk. It's positioned as a competitive moat ("zero vendor lock-in"). However, Better Auth is an independent, VC-funded ($5M from Peak XV and Y Combinator) open-source project. The org uses it heavily but controls neither its roadmap nor its licensing decisions. VC-funded OSS projects have a track record of changing licenses (Redis, Terraform, Elastic, MongoDB).

If Better Auth introduces breaking changes, shifts to a restrictive license (BSL/SSPL), or launches a competing hosted service, the org needs a migration path.

Derived from: "What is our risk exposure if Better Auth's direction diverges from our needs?"

## Scope

1. **Audit coupling**: Grep all repos for direct Better Auth API usage vs. abstracted usage. Catalog every direct import of `better-auth` internals
2. **Assess switching cost**: Estimate person-hours to migrate away from Better Auth across all products
3. **Check contributor status**: Determine if the org has any commits, PRs, or maintainer roles in the Better Auth repo — influence reduces risk
4. **Create abstraction layer**: If one doesn't exist, wrap Better Auth behind `@repo/auth` interfaces so that swapping providers is feasible without touching every template
5. **Document fallback options**: Evaluate Auth.js v5, custom implementation, or other alternatives as migration targets
6. **Set up monitoring**: Watch Better Auth's GitHub for announcements about licensing changes, paid tiers, or Better Auth Cloud

## Dependencies

- The LaunchPad SDK re-architecture track in [decide-launchpad-baas-fate.md](decide-launchpad-baas-fate.md) may expand or narrow the audit scope depending on which auth surfaces stay canonical
- The abstraction layer work should align with the flagship template's existing @repo/auth package

## Success Criteria

- A documented audit showing exactly where Better Auth is used and how tightly coupled
- A switching cost estimate (in person-hours) for migrating to an alternative
- An abstraction layer in the flagship template that isolates Better Auth behind a swappable interface
- A documented fallback plan identifying the best alternative auth solution

## Notes

- Better Auth's $5M funding creates monetization pressure — expect a paid offering (Better Auth Cloud) within 12 months
- Enterprise SSO is delivered "via plugin" — if this becomes a paid plugin, it directly impacts the org's enterprise template positioning
- The @repo/auth package in the flagship template may already be a partial abstraction — verify before building from scratch
- MIT license today doesn't guarantee MIT license tomorrow — monitor closely
