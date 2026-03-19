---
title: "Have the 11 standalone Launchpad packages with high test coverage ever been consumed outside of their initial scaffolding?"
priority: high
status: open
category: product-strategy
source_files:
  - knowledge/repos/launchpad-standalone-packages.md
  - knowledge/repos/launchpad-feature-sdks.md
  - knowledge/products/01-launchpad-baas.md
  - knowledge/sdk-matrix.md
  - knowledge/active-workstreams.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

The newly expanded repo catalog documents 11 standalone Launchpad packages (`@launchpad/analytics`, `@launchpad/audit-log`, `@launchpad/appstores`, `@launchpad/i18n`, `@launchpad/secrets`, `@launchpad/ai`, `@launchpad/email`, `@launchpad/payments`, `@launchpad/storage`, `@launchpad/workflows`, `@launchpad/offline`) plus 7 feature SDKs (`@launchpad/cms`, `@launchpad/customers`, `@launchpad/identity`, `@launchpad/realtime`, etc.). Several have impressive test suites — `@launchpad/appstores` has 142 tests at 100% coverage, `@launchpad/audit-log` has 139 tests at 100% coverage, `@launchpad/analytics` has 85+ tests at 99%+ coverage.

Yet all of these packages were last updated in December 2025, and the flagship template (`saas-template-launch-app-test`) builds its own equivalents (`@repo/analytics` uses PostHog, `@repo/email` uses Resend directly, `@repo/billing` uses Stripe directly) rather than consuming the `@launchpad/*` packages.

## What We Know

- 11 standalone packages + 7 feature SDKs = 18 packages at v0.1.0, all private, all untouched for 3+ months.
- The flagship template explicitly does NOT use these packages — it has its own `@repo/*` implementations.
- `launchpad-saas-template` (the older template) depends on `@launchpad/core`, `@launchpad/auth`, `@launchpad/db`, `@launchpad/payments` — but this repo was last updated January 2026 and appears to be superseded by the actively-developed flagship template.
- 10 SDK-CONSISTENCY issues were filed on 2026-03-18, suggesting an intent to bring these packages up to standard — but remediation hasn't started.
- The packages install `@launchpad/core` via GitHub git references (not npm), meaning they've never been published to a package registry.
- 7 feature SDKs have no READMEs and were scaffolded as a batch on the same day.

## What We Don't Know

- Has any package been `import`-ed in a running application, or are they purely scaffolded libraries with tests but no consumers?
- Is the intent to eventually replace the template's `@repo/*` packages with `@launchpad/*` packages, or has the template diverged permanently?
- Were the comprehensive test suites AI-generated alongside the scaffolding, and have they been validated against real service integrations?
- What is the total engineering investment in these 18 packages, and what would it take to bring them to a shippable state?
- Is the SDK-CONSISTENCY initiative (10 issues filed 2026-03-18) a signal that these packages are about to receive active development, or is it aspirational housekeeping?

## Suggested Investigation

- Search for actual `import` statements of `@launchpad/*` packages across all org repos to find real consumers.
- Check npm registry / GitHub Packages for any published versions — if never published, the packages are effectively unreachable.
- Interview the founder: is the LaunchPad BaaS SDK layer the intended long-term architecture, or has the self-contained template won?
- If no consumers exist beyond tests, consider whether maintaining 18 unused packages is justified versus archiving them and focusing on the template's `@repo/*` layer.

## Answer

_To be filled in by the team or an investigating agent._
