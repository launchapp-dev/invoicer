# launchpad-payments-server

> Stripe integration SDK — customer management, subscription lifecycle, payment intents, refunds, invoices, and metered billing.

## Purpose

A standalone SDK (not a running server) that wraps the Stripe API with coverage for customer CRUD, subscription lifecycle, payment intents, refunds, invoice management, usage-based and metered billing, and webhook signature verification.

## Visibility: Private
## Maturity: Two commits (initial + coverage threshold config).

## Tech Stack

- TypeScript
- Stripe SDK
- Vitest

## Package

`@launchpad/payments-server` (v0.1.0)

## Dependencies

- Part of the LaunchPad BaaS platform
- Related to `@launchpad/payments` (standalone) and `@launchpad/payments-sdk` (client SDK)

## Status

118 tests. Two commits: initial release followed by coverage threshold configuration. Despite the name, this is a library/SDK not a running server process.
