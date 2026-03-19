# Launchpad Feature SDKs

Covers the following repos, all sharing the same pattern: TypeScript React SDK, v0.1.0, private, depends on `@launchpad/core`.

| Repo | Package | Description | Last Updated |
|------|---------|-------------|--------------|
| `launchpad-cms-sdk` | `@launchpad/cms` | Headless CMS — content types, localization, versioning | 2025-12-18 |
| `launchpad-customers-sdk` | `@launchpad/customers` | Customer management, CRM, segmentation | 2025-12-18 |
| `launchpad-identity-sdk` | `@launchpad/identity` | User directory, SSO, RBAC, org management | 2025-12-18 |
| `launchpad-realtime-sdk` | `@launchpad/realtime` | WebSocket subscriptions, live data | 2025-12-18 |
| `launchpad-storage-sdk` | `@launchpad/storage` | File uploads, downloads, management | 2025-12-18 |
| `launchpad-workflows-sdk` | `@launchpad/workflows` | Background jobs, scheduled tasks, workflow automation | 2025-12-18 |
| `launchpad-push-sdk` | `@launchpad/push` | Web and mobile push notifications | 2025-12-18 |

## Shared Characteristics

- **Version**: 0.1.0 (all)
- **Visibility**: Private (all)
- **Language**: TypeScript (ESM)
- **Build**: tsup
- **Test**: Vitest
- **Lint**: Biome
- **Peer deps**: React >= 18.0.0
- **Core dependency**: `@launchpad/core` via GitHub git reference

## Maturity: Scaffolded / Early

All seven repos were last updated on 2025-12-18 with CI/CD infrastructure fixes (pnpm v10 upgrades, git config for private GitHub packages). The activity suggests these SDKs were scaffolded as a batch from a template — implementations may be minimal or stubbed.

**No READMEs found** in CMS, customers, identity, storage, or workflows repos. The package.json descriptions are the primary documentation.

## SDK-Specific Notes

### `@launchpad/cms`
Headless CMS layer. Likely wraps content type management, localization endpoints, and versioning APIs from the BaaS. No usage documentation available.

### `@launchpad/customers`
CRM-style SDK. Covers customer profiles, segmentation, and engagement workflows. Pairs with `@launchpad/identity` for user management.

### `@launchpad/identity`
SSO, RBAC (Role-Based Access Control), and organization/tenant management. Likely built on top of `better-auth`'s organization plugin.

### `@launchpad/realtime`
WebSocket subscriptions for live data. Implementation approach (native WebSocket vs. library) unknown — no README.

### `@launchpad/storage`
File management hooks. Wraps upload/download endpoints from the BaaS storage service.

### `@launchpad/workflows`
Background job scheduling and workflow automation hooks. Pairs with the server-side workflow engine in `launchpad-baas`.

### `@launchpad/push`
Client-side push notification management. Works with `@launchpad/push-server` on the backend. Handles subscription registration and notification preferences.

## Dependencies on Org Products

All depend on:
- `@launchpad/core` — HTTP client and React provider

Push SDK additionally pairs with:
- `launchpad-push-server` — backend FCM/APNs/Web Push service

## What Depends On These

- `launchpad-saas-template` (selectively by feature)
- `launchapp-lite` (subset)
