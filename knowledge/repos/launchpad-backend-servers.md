# Launchpad Backend Servers

Covers standalone Node.js server packages that run alongside the core `launchpad-baas` API.

---

## launchpad-payments-server

**Repo**: `launchapp-dev/launchpad-payments-server`
**Package**: `@launchpad/payments-server`
**Version**: 0.1.0
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-11

### Purpose

Backend payments server with Stripe integration. Handles webhooks, subscription lifecycle, usage-based billing, and customer/invoice management. Deployed as a separate service alongside `launchpad-baas`.

### Tech Stack

- Node.js + TypeScript
- Stripe SDK (`stripe` npm package)
- Test: Vitest with coverage thresholds
- Lint: Biome

### API Surface

Core export: `PaymentsService`

Operations:
- **Customer management** — `createCustomer`, `getCustomer`, `updateCustomer`, `deleteCustomer`, `listCustomers`
- **Subscriptions** — create, update, cancel, retrieve subscription lifecycle
- **Payments** — payment intents, confirmations, refunds
- **Invoices** — create, send, finalize
- **Usage-based billing** — metered billing with usage records
- **Webhooks** — Stripe signature verification and event routing

Also exports mock utilities for testing all Stripe operations.

### Dependencies

External only: `stripe` npm package. No `@launchpad/*` internal dependencies.

### Maturity: Early Beta

Initial implementation Dec 11, 2025. Feature-complete Stripe wrapper based on README. Mock utilities suggest thoughtful testability. No changelog beyond initial commit.

---

## launchpad-push-server

**Repo**: `launchapp-dev/launchpad-push-server`
**Package**: `@launchpad/push-server`
**Version**: 0.1.0
**Visibility**: Private
**Language**: TypeScript
**Last updated**: 2025-12-18

### Purpose

Push notification backend service supporting FCM (Android), APNs (iOS), and Web Push (VAPID). Manages device registration, topic subscriptions, scheduled notifications, and delivery analytics.

### Tech Stack

- Node.js + TypeScript
- `firebase-admin` — FCM provider
- `web-push` — Web Push / VAPID
- PostgreSQL store (added Dec 18, 2025)
- Test: Vitest

### API Surface

Core export: `PushService`

Providers:
- `FCMProvider` — Firebase Cloud Messaging
- `APNsProvider` — Apple Push Notification service
- `WebPushProvider` — VAPID-based web push
- `MockProvider` — testing

Operations:
- **Device management** — register/unregister devices, platform tracking
- **Topic subscriptions** — broadcast to device groups
- **Scheduled notifications** — future delivery scheduling
- **Analytics** — send success/failure rates by platform and topic

### Dependencies

External: `firebase-admin`, `web-push`. No `@launchpad/*` internal dependencies.

### Paired With

- `@launchpad/push` (client SDK) — for frontend subscription registration

### Maturity: Active

PostgreSQL store added Dec 18, 2025 (most recent meaningful feature commit). Production-ready multi-platform notification service.
