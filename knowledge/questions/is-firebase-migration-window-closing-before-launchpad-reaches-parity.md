---
title: "Is the Firebase migration window closing before LaunchPad reaches feature parity?"
priority: high
status: open
category: competitive
source_files:
  - knowledge/ideas/new-products.md
  - knowledge/ideas/integrations.md
  - knowledge/ideas/overview.md
generated_by: question-generator
generated_at: 2026-03-19
---

## Context

LaunchPad Migrate (#16, 9/10 priority) and Supabase Compat SDK (I25, 9/10 priority) are positioned as the "cheapest customer acquisition channel" — converting Firebase and Supabase users fleeing pricing changes and complexity. The overview explicitly states "Firebase removing free tier creates urgency." But urgency cuts both ways: Firebase developers are migrating *now*, and every week that passes, more of them settle permanently on Supabase, Appwrite, or Nhost.

LaunchPad Migrate requires LaunchPad to be a credible migration *destination*. Today, LaunchPad is missing: background jobs (#11), serverless functions (#2), real-time (#1), object storage (#5), and vector search (#10). These are table-stakes BaaS features that Firebase and Supabase both offer. A migration tool that moves developers to an incomplete platform will generate churn, not acquisition.

## What We Know

- Firebase removed free storage tier in 2025, triggering active migration exploration
- Supabase has 4M+ developers and is the default Firebase alternative
- LaunchPad has: database engine, auth (Better Auth), and SDK scaffolds (not production-ready per SDK consistency issues)
- LaunchPad is missing: Jobs, Functions, Realtime, Storage, Vector — 5 of the 6 core BaaS capabilities
- SDK consistency initiative was just filed (10 issues on 2026-03-18) but work hasn't started
- Supabase shipped Stripe Sync Engine, Auth improvements, and PostgREST v14 in Q1 2026
- The `supabase-to-hooks` repo demonstrates awareness of migration patterns but is a conversion utility, not a platform

## What We Don't Know

- How long the Firebase migration window remains open — are most developers already settled?
- What percentage of Firebase developers would consider a less-established alternative vs defaulting to Supabase
- Whether a "partial migration" (auth + database only) provides enough value to attract users
- How long it would take to build the missing 5 core BaaS features to minimum viable parity
- Whether partnering with existing services (e.g., Inngest for jobs, Uploadthing for storage) could close the feature gap faster than building

## Suggested Investigation

- Survey or research Firebase migration discussions (Reddit, HN, Discord communities) to assess: where are people going? Is the decision already made for most?
- Define "minimum migration destination" — the smallest LaunchPad feature set that makes migration viable (likely: auth + database + jobs)
- Estimate time to build those minimum features vs the migration window timeline
- Evaluate a "compose not build" strategy: LaunchPad as auth + database, with documented integrations for jobs (Inngest), storage (Uploadthing/R2), and realtime (Ably) to create an immediate migration path
- Compare cost of acquiring users via migration tooling vs other channels (content marketing, template sales, Claude Code plugin distribution)

## Answer

_To be filled in by the team or an investigating agent._
