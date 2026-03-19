# launchpad-payments

**Package:** `@launchpad/payments`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-payments (private)
**Language:** TypeScript
**Last pushed:** 2026-01-14
**Status:** Stable / active maintenance

## Purpose

Standalone payments SDK providing a provider-agnostic interface for payment operations. Handles Stripe integration including subscriptions, invoices, metered billing, webhooks, and multi-tenant customer management. Designed to be used independently of the full LaunchPad BaaS stack.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Payment provider:** Stripe SDK
- **Build:** tsup
- **Linting:** Biome
- **Testing:** Vitest + coverage-v8

## Key Dependencies

| Dependency | Role |
|---|---|
| `stripe` | Stripe API client |
| `@launchpad/db-engine` | (dev) Shared DB for integration tests |

## API Surface

- `PaymentsService` — main service class
- `StripeProvider` — Stripe payment provider implementation
- `MockProvider` — testing mock
- Customer CRUD operations
- Subscription management (create, update, cancel)
- One-time payment intents
- Invoice generation
- Metered billing / usage records
- Stripe webhook handling
- Multi-tenant scoped operations

## Maturity

Stable. Most recent activity (Jan 2026) added Renovate automated dependency config and dist output for GitHub-based installs. The core feature set appears complete. Metered billing and multi-tenant support are notable differentiators.

## Notes

- `dist/` is committed to git (unusual) — indicates GitHub-based installs rather than npm registry publishing
- Renovate config groups Stripe SDK updates
