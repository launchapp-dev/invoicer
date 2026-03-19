# launchpad-email

**Package:** `@launchpad/email`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-email (private)
**Language:** TypeScript
**Last pushed:** 2026-01-04
**Status:** Stable

## Purpose

Standalone email SDK with a provider-agnostic interface for sending transactional email. Supports Resend as the primary provider with template rendering and multi-tenant scoping. Minimal dependencies — essentially a thin abstraction layer over Resend.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Email provider:** Resend SDK
- **Build:** tsup
- **Linting:** Biome
- **Testing:** Vitest + coverage-v8

## Key Dependencies

| Dependency | Role |
|---|---|
| `resend` | Resend email API client |

## API Surface

- `EmailService` — main service class
- `ResendProvider` — Resend integration
- `MockProvider` — testing mock
- `TemplateRenderer` — variable substitution template engine
- Template storage and management
- `send()` — raw email send
- `sendTemplate()` — template-based send
- Multi-tenant scoped operations

## Maturity

Stable. Most recent change (Jan 2026) added Renovate config for automated updates. Core email functionality is complete. The scope is intentionally narrow — Resend only, no SMTP fallback.

## Notes

- No SMTP or SendGrid support — Resend-only in current form
- Template engine is simple variable substitution (not Handlebars/Mjml)
- Renovate groups email provider packages for batch updates
