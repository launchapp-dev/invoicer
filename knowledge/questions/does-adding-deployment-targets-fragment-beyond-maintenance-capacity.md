---
title: "Does adding deployment targets (Cloudflare Edge, Railway, Docker, Neon) fragment the platform beyond maintenance capacity?"
priority: high
status: open
category: architecture
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/ideas/integrations.md
  - knowledge/active-workstreams.md
  - knowledge/sdk-matrix.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

Round 3 introduces LaunchPad Edge (#22) — a Cloudflare-native deployment target using Workers, R2, D1, and KV. Round 2 already proposed Cloudflare Workers + R2 integration (I16). Neon Serverless Postgres (I24) adds another database backend. Combined with existing Railway and Docker deployments, LaunchPad is heading toward 4+ deployment targets and 3+ database backends. Each target has different runtime behavior, storage semantics, and failure modes. The org characterizes these as "medium" or "small" effort individually, but the compounding maintenance cost of keeping all targets working identically is not accounted for.

## What We Know

- LaunchPad Edge (#22) relies on Cloudflare D1 (SQLite) instead of Postgres — this is not just a deployment difference, it's a fundamental data model difference.
- Hono does provide Cloudflare Workers adapters, which reduces API-level effort — but storage, auth session handling, and database behavior differ.
- Neon integration (I24) adds serverless Postgres semantics (scale-to-zero, HTTP driver) that behave differently from Railway's always-on Postgres.
- The SDK consistency initiative (Workstream 4) already identified consistency problems across Launchpad SDKs — adding more deployment targets multiplies this problem.
- The existing question about cross-SDK integration testing covers SDK consistency, not deployment target consistency.
- There are currently 0 integration tests validating behavior across deployment targets.

## What We Don't Know

- Whether `launchpad-db-engine` can actually abstract over both Postgres and D1 (SQLite) without subtle behavioral differences leaking to users.
- What the testing matrix looks like: (features × deployment targets × database backends) = combinatorial explosion.
- Whether users would actually choose Cloudflare Edge over Railway — is there demonstrated demand, or is this speculative market positioning?
- How many deployment targets can a solo-founder org realistically keep at production quality.
- Whether bugs in one deployment target would erode trust in all targets.

## Suggested Investigation

- List every behavioral difference between Postgres and D1 that affects `launchpad-db-engine` queries (JSON support, array types, full-text search, extensions like pgvector, pg_cron).
- Calculate the actual testing matrix: (core features) × (deployment targets) × (database backends) × (auth providers) = total test scenarios needed.
- Survey potential users: would they choose LaunchPad specifically for Cloudflare Edge deployment, or is Railway/Docker sufficient?
- Consider a "blessed path" strategy: officially support one deployment target at production quality, with others as community-maintained or experimental.
- Evaluate whether the "medium effort" estimate for LaunchPad Edge accounts for ongoing maintenance or only initial implementation.

## Answer

_To be filled in by the team or an investigating agent._
