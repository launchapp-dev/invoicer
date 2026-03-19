# launchpad-analytics

> Pluggable event tracking, user identification, and feature flag system for the LaunchPad platform.

## Purpose

Provides a unified analytics layer with support for batch event processing, user identification, and feature flags. Ships multiple provider implementations including Console, Memory, and PostgreSQL — enabling both local development and multi-tenant production deployments.

## Visibility: Private
## Maturity: Stable initial release. Postgres integration added in most recent commit.

## Tech Stack

- TypeScript
- Vitest
- tsup
- PostgreSQL (multi-tenant persistence provider)

## Package

`@launchpad/analytics` (v0.1.0)

## Dependencies

- Part of the LaunchPad BaaS platform

## Status

85+ tests, 99%+ coverage. Two commits: initial release followed by Postgres provider integration.
