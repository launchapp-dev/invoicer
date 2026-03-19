# Launchpad Standalone Packages

Utility and support packages that are not React/BaaS-specific SDKs but part of the broader Launchpad ecosystem.

---

## launchpad-analytics

**Repo**: `launchapp-dev/launchpad-analytics`
**Package**: `@launchpad/analytics`
**Version**: 0.1.0
**Visibility**: Private
**Last updated**: 2025-12-12

### Purpose

Pluggable analytics package for event tracking, user identification, feature flags, and batch processing. Framework-agnostic — no React or `@launchpad/core` dependency.

### API Surface

Core: `Analytics` class

Capabilities:
- **Event tracking** — `track(event, properties)`
- **User identification** — `identify(userId, traits)`
- **Page views** — `page(category, name, properties)`
- **Groups** — associate users with orgs/groups
- **Aliases** — link anonymous to identified users
- **Feature flags** — `isFeatureEnabled(key)` with context
- **Batch processing** — configurable flush intervals

Providers (built-in):
- `ConsoleProvider` — development logging
- `MemoryProvider` — in-memory for testing

Feature flag providers:
- `MemoryFlagProvider` — static flag values for testing

### Dependencies

No `@launchpad/*` dependencies. Standalone utility.

### Maturity: Stable Beta

Has comprehensive README. PostgreSQL provider added Dec 12, 2025, indicating db-engine registration integration.

---

## launchpad-audit-log

**Repo**: `launchapp-dev/launchpad-audit-log`
**Package**: `@launchpad/audit-log`
**Version**: 0.1.0
**Visibility**: Private
**Last updated**: 2025-12-12

### Purpose

Comprehensive audit logging library for tracking and querying system events with actors, resources, outcomes, and metadata.

### API Surface

Core: `AuditService`

Features:
- **Event logging** — structured events with actor, resource, outcome, severity
- **Flexible filtering** — query by date, type, actor, resource, severity
- **Batch processing** — configurable flush intervals
- **Pluggable handlers** — console, batch, filter handlers

Built-in stores:
- `MemoryAuditStore` — testing

### Dependencies

No `@launchpad/*` dependencies. Standalone utility.

### Maturity: Stable Beta

PostgreSQL store added Dec 12, 2025. Full README with examples.

---

## launchpad-appstores

**Repo**: `launchapp-dev/launchpad-appstores`
**Package**: `@launchpad/appstores`
**Version**: 0.1.0
**Visibility**: Private
**Last updated**: 2025-12-11

### Purpose

App store integration library for Apple App Store Connect and Google Play — receipt validation, subscription management, and in-app purchase handling.

### Tech Stack

- TypeScript
- `jose` — JWT handling (App Store tokens)

### API Surface

Core: `AppStoreService`

Platforms: `apple` | `google`

Operations:
- Receipt verification
- Subscription management (track, refresh, cancel)
- Purchase handling (consumable, non-consumable)
- Webhook/server-to-server notification processing

Providers:
- `MockProvider` — testing
- (Real providers for Apple/Google in production)

Built-in stores:
- `MemorySubscriptionStore`, `MemoryPurchaseStore`

### Dependencies

External: `jose`. No `@launchpad/*` dependencies.

### Maturity: Early Beta

Initial implementation Dec 11, 2025. Feature-complete interface design with Mock implementations for testing. Likely needs real Apple/Google provider implementations.

---

## launchpad-i18n

**Repo**: `launchapp-dev/launchpad-i18n`
**Package**: `@launchpad/i18n`
**Version**: 0.1.0
**Visibility**: Private
**Last updated**: 2025-12-11

### Purpose

Internationalization and localization utilities for Launchpad applications. Standalone utility library.

### Dependencies

No `@launchpad/*` dependencies. Standalone.

### Maturity: Early

Initial implementation Dec 11, 2025. No README or further documentation found.

---

## offline-sdk

**Repo**: `launchapp-dev/offline-sdk`
**Package**: `@launchpad/offline`
**Version**: 0.1.0
**Visibility**: Private
**Last updated**: 2025-12-10

### Purpose

Offline-first capabilities for Launchpad applications — likely local caching, sync queues, conflict resolution, and service worker integration.

### Dependencies

- `@launchpad/core` (GitHub git reference)

### Maturity: Early

Initial implementation Dec 10, 2025. Earliest SDK in the batch. No README.

---

## testing-sdk

**Repo**: `launchapp-dev/testing-sdk`
**Package**: `@launchpad/testing`
**Version**: 0.1.0
**Visibility**: Private
**Last updated**: 2025-12-10

### Purpose

Testing utilities for Launchpad applications — mock providers, test helpers, and fixtures for all `@launchpad/*` SDKs.

### Dependencies

- `@launchpad/core` (GitHub git reference)

### Maturity: Early

Initial implementation Dec 10, 2025. No README.

---

## renovate-config

**Repo**: `launchapp-dev/renovate-config`
**Visibility**: Private
**Last updated**: 2025-12-30

### Purpose

Shared Renovate Bot configuration preset for all repos in the org. Standardizes dependency update behavior across the ecosystem.

### Configuration

- Extends `config:recommended` + dependency dashboard
- **Auto-merge**: patch updates via squash PR
- **Weekly batching**: minor updates grouped, scheduled Monday before 5am
- Lock file maintenance: weekly Monday before 5am
- No PR hourly/concurrent limits
- Labels: `["dependencies"]`
- Range strategy: `bump`

### Usage

Other repos extend this via:
```json
{
  "extends": ["github>launchapp-dev/renovate-config"]
}
```

### Maturity: Stable

Actively maintained config added Dec 30, 2025.

### Note

`description` field references "AudioGenius-ai organization" — indicates this config was ported/renamed from a prior org.
