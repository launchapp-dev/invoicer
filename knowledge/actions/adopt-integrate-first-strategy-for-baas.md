---
title: "Adopt integrate-first strategy for LaunchPad BaaS components"
priority: critical
status: proposed
effort: medium
category: architecture
source_question: knowledge/questions/should-launchpad-integrate-before-building-custom-baas-components.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
  - launchpad-storage-sdk
  - launchpad-jobs-sdk
  - launchpad-realtime-sdk
generated_by: action-extractor
generated_at: 2026-03-19
---

## Context

The ideas backlog proposes building 6 major LaunchPad BaaS components from scratch (Realtime, Functions, Storage, Jobs, Vector, Webhooks). However, integration idea I22 explicitly states that integrating Inngest/Trigger.dev "gets 80% of the value in 10% of the time" vs building from scratch — and this logic applies to every proposed component. The flagship template already uses S3, Upstash, Resend, and PostHog instead of LaunchPad SDKs. LaunchPad BaaS repos have been stale since Jan 2026. Supabase has 4M+ developers and $5B valuation building these same features with large teams — a solo founder with an AI workforce cannot compete on custom infrastructure.

Derived from: "Should LaunchPad integrate existing solutions before building custom BaaS components?"

## Scope

1. **Audit flagship template usage**: Document which LaunchPad BaaS features the flagship template actually uses vs which it bypasses with third-party services — the template is the real product
2. **Map each BaaS component to an integration target**:
   - Storage → S3/Cloudflare R2 wrapper (already used in template)
   - Jobs → Inngest or Trigger.dev wrapper (I22 explicitly recommends this)
   - Realtime → Ably or Pusher wrapper
   - Vector → pgvector extension wrapper (already common)
   - Functions → Cloudflare Workers or Vercel Functions wrapper
   - Webhooks → Svix or custom thin layer
3. **Prototype one integrate-first wrapper**: Build `@launchpad/jobs` as a thin wrapper around Inngest, compare time-to-ship and DX against building custom Jobs on Upstash
4. **Deprecate redundant BaaS repos**: For each BaaS component replaced by an integration wrapper, archive the custom implementation repo
5. **Update the ideas backlog**: Re-score all 6 BaaS component ideas with integrate-first effort estimates instead of build-from-scratch estimates
6. **Decide the "SDK aggregator" positioning**: If LaunchPad wraps S3, Inngest, Ably, and pgvector — own that positioning explicitly rather than pretending to be a custom BaaS

## Dependencies

- Related to decide-launchpad-baas-fate — this action provides a concrete "how" if the fate decision is "selectively revive"
- Depends on resolve-repo-vs-launchpad-sdk-divergence — need to know which SDK namespace survives before building wrappers
- The 10 SDK-CONSISTENCY issues (filed 2026-03-18) should be resolved for whichever SDK approach is chosen

## Success Criteria

- Flagship template audit completed with clear map of LaunchPad vs third-party usage
- At least one integration wrapper prototype built and compared against custom build
- A documented integrate-first strategy replaces the build-from-scratch plan
- Effort estimates for all 6 BaaS components updated to reflect integration approach
- Redundant BaaS repos archived or marked for deprecation

## Notes

- The key question for buyers isn't "LaunchPad Storage" vs "@launchpad/s3-wrapper" — it's whether it works reliably
- An "SDK aggregator" is still a valid product if it provides consistent DX, unified auth, and good docs across services
- This approach dramatically reduces maintenance burden: upstream services handle infrastructure, LaunchPad handles DX
- Calculate maintenance savings: 6 custom BaaS components vs 6 thin wrappers — Supabase needs 3-5 engineers per feature, wrappers need hours/month
