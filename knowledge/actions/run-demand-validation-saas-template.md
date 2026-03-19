---
title: "Run demand validation for the SaaS template before building checkout"
priority: critical
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/do-we-have-any-evidence-real-users-want-what-we-are-building.md
owner: unassigned
target_repos:
  - saas-template-launch-app-test
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

The SaaS template is feature-complete but there is zero evidence of external user demand anywhere in the knowledge base — no download counts, no GitHub stars mentioned, no user interviews, no beta testers, no waitlist signups. Revenue projections assume 200-800 template sales/year but this is entirely speculative. Building payment infrastructure without demand validation risks significant wasted effort.

The template uses React Router 7 + Hono instead of Next.js, which 85%+ of competing SaaS templates use. Whether this is a differentiator or a limitation is unknown.

Derived from: "Do we have any evidence real users want what we're building?"

## Scope

1. Create a landing page with pricing for the SaaS template
2. Add a "Buy Now" or "Get Early Access" CTA that tracks clicks (no payment processing needed yet)
3. Post in relevant communities: React Router Discord, Indie Hackers, relevant subreddits, Twitter/X
4. Identify and directly reach out to 5 potential beta users (indie hackers or startup founders)
5. Collect qualitative feedback: Would they pay? What's missing? Why React Router over Next.js?
6. Run this test for 30 days and measure: landing page visits, CTA clicks, direct responses

## Dependencies

- Landing page content needs to be written (can be a simple single-page site)
- No payment infrastructure needed — this is a demand test, not a sales funnel

## Success Criteria

- Landing page live with tracking within 1 week
- At least 50 unique visitors in 30 days (validates distribution channels work)
- At least 5 CTA clicks or direct expressions of purchase intent
- At least 3 qualitative conversations with potential users
- A clear go/no-go decision on investing in payment infrastructure

## Notes

- If CTA click rate is <2%, reconsider the product positioning or target market
- The "not Next.js" angle needs explicit testing — is the React Router community underserved or just smaller?
- Free adoption data (GitHub stars, npm installs) should be checked first as a leading indicator
