---
title: "Build cross-SDK integration test suite for Launchpad ecosystem"
priority: high
status: proposed
effort: medium
category: technical-debt
source_question: knowledge/questions/is-there-any-cross-sdk-integration-testing-for-launchpad-ecosystem.md
owner: unassigned
target_repos:
  - launchpad-ecosystem
  - launchpad-core-sdk
  - launchpad-realtime-sdk
  - launchpad-realtime-server
  - launchpad-payments-sdk
  - launchpad-payments
  - launchpad-db-sdk
  - launchpad-db-engine
  - launchpad-auth-sdk
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The Launchpad BaaS ecosystem spans 19+ repos with each component tested in isolation, but no cross-repo integration testing exists. Specific red flags include: the realtime server uses SSE transport but it's unclear if the realtime SDK expects SSE or WebSocket; the payments client and server SDK have no documented API contract; and `launchpad-ecosystem` (the orchestration workspace) hasn't been updated since January 2026. The value proposition requires these components to work together — a customer expects `@launchpad/realtime` to connect to `launchpad-realtime-server` — but there's no evidence this has ever been verified.

Derived from: "Is there any cross-SDK integration testing to verify the Launchpad ecosystem works end-to-end?"

## Scope

1. **Transport audit**: Check `launchpad-realtime-sdk` source for expected transport and compare against `launchpad-realtime-server`'s SSE implementation — document any mismatch
2. **Contract audit**: Compare API routes in `launchpad-payments` server with endpoints called by `launchpad-payments-sdk` — document mismatches in request/response shapes, webhook formats, error types
3. **Smoke test**: Build a minimal app using `@launchpad/core` + `@launchpad/db` + `@launchpad/realtime` + `@launchpad/auth` against running backend servers — document every failure
4. **Check launchpad-ecosystem**: Inspect for existing docker-compose, test scripts, or CI config that might already support multi-service testing
5. **Create integration test harness**: If no infrastructure exists, create a minimal docker-compose + test runner in `launchpad-ecosystem` that boots core services and verifies cross-communication
6. **Document breaking interfaces**: Produce a compatibility matrix showing which SDK versions work with which server versions

## Dependencies

- Depends on publish-launchpad-core-to-npm-registry — SDKs must be installable before they can be integration-tested
- Depends on [decide-launchpad-baas-fate.md](decide-launchpad-baas-fate.md), which now drives the LaunchPad SDK re-architecture track
- Backend servers must be runnable locally (docker or direct)

## Success Criteria

- Transport mismatch between realtime SDK and server is identified and documented (or confirmed as compatible)
- Payments client-server API contract is audited with mismatches listed
- At least one multi-SDK integration test passes end-to-end (or failures are documented with root causes)
- A repeatable integration test harness exists in `launchpad-ecosystem` (even if minimal)

## Notes

- This action is part of proving the LaunchPad SDK re-architecture is production-credible
- The transport mismatch (SSE vs WebSocket) is the highest-risk finding — if confirmed, the realtime SDK and server literally cannot communicate
- `launchpad-db-engine` with 191 tests is the most battle-tested component — start integration testing from there
- If the smoke test reveals fundamental incompatibilities, the re-architecture scope should be reduced until one stable path works end-to-end
