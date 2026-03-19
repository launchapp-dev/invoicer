---
title: "Is there any cross-SDK integration testing to verify the Launchpad ecosystem works end-to-end?"
priority: high
status: open
category: technical-debt
source_files:
  - knowledge/repos/launchpad-ecosystem.md
  - knowledge/repos/launchpad-core-sdk.md
  - knowledge/repos/launchpad-realtime-sdk.md
  - knowledge/repos/launchpad-realtime-server.md
  - knowledge/repos/launchpad-payments-sdk.md
  - knowledge/repos/launchpad-payments.md
  - knowledge/repos/launchpad-db-sdk.md
  - knowledge/repos/launchpad-db-engine.md
  - knowledge/sdk-matrix.md
generated_by: question-generator
generated_at: 2026-03-18
---

## Context

The Launchpad BaaS ecosystem spans 19+ repos: a core SDK, 7 feature SDKs, 5+ backend servers, a DB engine, and an orchestration workspace (`launchpad-ecosystem`). Each repo was developed semi-independently with its own test suite. But the value proposition requires these components to work together — a developer expects `@launchpad/realtime` to connect to `launchpad-realtime-server`, `@launchpad/payments` to coordinate with `launchpad-payments-server`, and `@launchpad/db` to work against `launchpad-db-engine`. The repo docs reveal no cross-repo integration testing, and specific transport mismatches suggest the pieces may not actually fit.

## What We Know

- `launchpad-realtime-server` uses SSE (Server-Sent Events) as its transport. The `launchpad-realtime-sdk` client docs are missing — it's unclear whether the client expects SSE, WebSocket, or something else.
- `launchpad-payments` (server-side, Jan 2026) and `launchpad-payments-sdk` (client-side React, Jan 2026) were created separately. No documentation describes how they coordinate.
- `launchpad-db-engine` has 191 tests (solid), but `launchpad-db-sdk` (React hooks layer) has unknown test coverage and depends on the engine working in a specific way.
- `launchpad-ecosystem` is the orchestration workspace but was last updated Jan 2026 and may not reflect the current state of individual SDKs.
- The `[SDK-CONSISTENCY]` issues focus on packaging and config alignment, not functional integration.
- `launchpad-db-engine` is the only component documented as having substantial test coverage (191 tests).

## What We Don't Know

- Can a developer `npm install` the realtime SDK and connect it to a running realtime server out of the box?
- Do the payments client SDK and server SDK agree on API contracts, webhook formats, and error shapes?
- Does `launchpad-ecosystem` run any kind of integration test suite that boots multiple services and verifies cross-communication?
- If `@launchpad/core` changes its HTTP client behavior, do the feature SDKs break silently?
- Has anyone built a working application using 3+ Launchpad SDKs together?
- What percentage of the ecosystem is tested only in isolation vs. in integration?

## Suggested Investigation

1. Attempt to build a minimal app that uses `@launchpad/core` + `@launchpad/db` + `@launchpad/realtime` + `@launchpad/auth` together against running backend servers. Document what breaks.
2. Verify the realtime transport match: check `launchpad-realtime-sdk` source for its expected transport and compare against `launchpad-realtime-server`'s SSE implementation.
3. Check `launchpad-ecosystem` for any existing integration test infrastructure (docker-compose, test scripts, CI config).
4. Audit the payments client-server contract: compare the API routes in `launchpad-payments` server with the endpoints called by `launchpad-payments-sdk`.
5. If no integration tests exist, create a minimal smoke test that boots core services and verifies basic operations across 3+ SDKs.

## Answer

_To be filled in by the team or an investigating agent._
