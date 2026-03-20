# launchpad-payments-sdk

**Repo**: `launchapp-dev/launchpad-payments-sdk`
**Package**: `@launchpad/payments`
**Version**: `0.1.0`
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2026-03-20

## Purpose

Payments SDK for LaunchPad BaaS — React components and hooks for Stripe-based subscriptions, billing, and payment UI. Integrates Stripe Elements for secure card collection.

## Tech Stack

- **Runtime**: Node.js, ESM-only
- **Bundler**: tsup
- **Test**: Vitest + @testing-library/react + jsdom
- **Lint**: Biome
- **Peer deps**: React ≥18
- **Key deps**: `@stripe/react-stripe-js` ^3.2.0, `@stripe/stripe-js` ^5.5.0

## Key Features

- `PaymentsProvider` with Stripe Elements integration
- `useSubscription` — subscription status, plan, `isActive`, `currentPeriodEnd`
- Checkout and billing management components

## Dependencies on Org Products

- `@launchpad/core` — base HTTP client

## Maturity

**Active Development (pre-1.0)** — Last commit 2026-03-20 (chore: use @launchpad/core@^0.1.0 from npm). Milestone: dependency source transitioned from GitHub to npm registry. Prior: Stripe Elements integration completed 2026-01-03. `useSubscription` enhanced 2026-01-01.

## Open Issues

- **#10 [SDK-CONSISTENCY]**: `tsconfig.json` and `package.json` deviations from SDK standards

## Notes

- **SIGNIFICANT CHANGE (2026-03-20)**: Now uses `@launchpad/core@^0.1.0` from npm registry instead of GitHub deps
- Part of coordinated SDK ecosystem update enabling npm publishing and registry-based dependency management
- Missing `publishConfig` block (unlike other SDKs) — npm publish configuration not set
- Highest issue number (#10) suggesting more iterations/issues have been filed and closed
- Does NOT bundle the Stripe server-side SDK — only client-side Stripe.js
