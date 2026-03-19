# launchpad-audit-log

> Structured audit event logging with filtering, sorting, pagination, and pluggable storage backends.

## Purpose

Records and queries structured audit events across a multi-tenant system. Supports filtering, sorting, and pagination over audit records. Provides Memory and PostgreSQL storage backends — the Postgres store includes multi-tenant fields (`app_id`, `org_id`) and an RLS-ready schema.

## Visibility: Private
## Maturity: Two commits (initial + Postgres integration). Polished.

## Tech Stack

- TypeScript
- tsup
- Vitest
- PostgreSQL (multi-tenant store with RLS-ready schema)

## Package

`@launchpad/audit-log` (v0.1.0)

## Dependencies

- Part of the LaunchPad BaaS platform

## Status

139+ tests, 100% coverage. Two commits: initial release followed by Postgres backend integration.
