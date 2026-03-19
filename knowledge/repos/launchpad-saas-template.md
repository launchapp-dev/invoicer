# launchpad-saas-template

**Repo**: `launchapp-dev/launchpad-saas-template`
**Visibility**: Private
**Language**: TypeScript
**Package**: `@launchpad/saas-template` v0.1.0
**Last updated**: 2026-01-01

## Purpose

Production-ready SaaS starter template built on the full Launchpad BaaS platform. Provides auth, billing, team management, and multi-tenancy out of the box — the showcase template for the `@launchpad/*` SDK ecosystem.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Auth**: Better Auth (via `@launchpad/auth`)
- **Database**: PostgreSQL + Prisma ORM
- **UI**: Tailwind CSS, Radix UI
- **Payments**: Stripe
- **Validation**: Zod
- **TypeScript**

## Features

- Email/password + Google/GitHub OAuth + MFA
- Stripe subscriptions (multiple plans)
- Team management (organizations, invitations, RBAC)
- Multi-tenancy (organization-based data isolation)
- Audit logging
- `.launchpad/` directory with AI agent-readable manifests (manifest.yaml, schema.yaml, patterns.yaml, rules.yaml)

## Dependencies on Org Products

| Dependency | Source |
|-----------|--------|
| `@launchpad/core` | BaaS core SDK |
| `@launchpad/auth` | Auth SDK (wraps better-auth) |
| `@launchpad/db` | Database SDK |
| `@launchpad/payments-sdk` | Payments SDK |
| Radix UI | Design system primitives |

## Current Status: Stable (v0.1.0)

Last updated 2026-01-01. Stable reference template for the Launchpad platform.
