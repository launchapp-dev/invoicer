---
title: "Resolve @repo/* vs @launchpad/* SDK divergence in flagship template"
priority: critical
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/why-does-flagship-template-duplicate-launchpad-sdks-with-repo-packages.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
  - launchpad-saas-template
  - launchpad-auth-sdk
  - launchpad-payments-sdk
  - launchpad-storage-sdk
  - launchpad-db-sdk
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The most active repo (`saas-template-launch-app-test`, 180+ PRs in 7 days) uses its own `@repo/auth`, `@repo/database`, `@repo/billing`, `@repo/storage`, `@repo/email` packages built directly on Better Auth, Drizzle, Stripe, Resend, and S3. Meanwhile, the Launchpad BaaS ecosystem has dedicated SDKs covering the same domains (`@launchpad/auth`, `@launchpad/db`, `@launchpad/payments`, `@launchpad/storage`). All active development flows into `@repo/*` packages, not `@launchpad/*` SDKs. This is either two competing stacks or an undocumented architectural decision — either way, it needs resolution to avoid wasted effort and customer confusion.

Derived from: "Why does the flagship template use its own @repo/* packages instead of @launchpad/* SDKs — are we building two competing stacks?"

## Scope

1. **Feature overlap map**: For each `@repo/*` package, identify the corresponding `@launchpad/*` SDK and document:
   - Features present in `@repo/*` but not `@launchpad/*` (and vice versa)
   - Dependency differences (direct npm deps vs. GitHub git refs via `@launchpad/core`)
   - Code quality and test coverage comparison
2. **Strategic decision**: Choose one path:
   - **Option A — SDKs power templates**: Migrate `saas-template-launch-app-test` to consume `@launchpad/*` SDKs, making them the proven foundation. This validates the BaaS platform story.
   - **Option B — Templates are the product**: Formally deprecate `@launchpad/*` SDKs. Extract any unique value (e.g., db-engine's 191 tests) into `@repo/*` packages. Templates are standalone products, not BaaS showcases.
   - **Option C — Two distinct products**: Document that templates and BaaS serve different markets, accept the maintenance cost of two stacks, and ensure no customer confusion in marketing.
3. **Execute the decision**: Update repos, archive deprecated code, update GTM messaging
4. **Update knowledge base**: Reflect the decision in product overview docs

## Dependencies

- Strongly linked to decide-launchpad-baas-fate — if BaaS is sunset, Option B is the only path
- Informed by run-platform-coherence-assessment — platform vs. portfolio decision shapes this
- Should be resolved before any public launch or customer-facing marketing

## Success Criteria

- A documented decision on whether `@repo/*` or `@launchpad/*` is the canonical stack
- Zero ambiguity in the codebase — one stack is active, the other is archived or integrated
- GTM strategy reflects the chosen architecture
- No customer can accidentally discover two competing implementations of the same feature

## Notes

- All active development is already flowing into `@repo/*` — inertia favors Option B (templates as product)
- Option A (SDKs power templates) would validate the BaaS platform story but requires significant migration work and fixing the npm publishing blocker first
- The `launchpad-saas-template` (last pushed Jan 2026) is already effectively abandoned — this is further evidence of drift toward `@repo/*`
- This decision has downstream effects on: pricing strategy (SDK subscription vs. template one-time), support scope, and documentation effort
