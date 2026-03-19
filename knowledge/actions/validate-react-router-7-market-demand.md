---
title: "Validate React Router 7 template market demand before full launch investment"
priority: high
status: proposed
effort: small
category: product-strategy
source_question: knowledge/questions/is-react-router-7-bet-limiting-template-market-reach.md
owner: unassigned
target_repos: []
generated_by: action-extractor
generated_at: 2026-03-18
---

## Context

85%+ of competing SaaS templates use Next.js App Router. Our flagship template uses React Router 7 + Hono — a technically strong but minority framework choice. Positioning this as differentiation only works if enough buyers want React Router 7 specifically. If the addressable market is 15% of SaaS template buyers, the revenue ceiling may be significantly lower than projected. Before investing heavily in launch marketing, we need data on whether this is genuinely differentiation or an adoption barrier.

Derived from: "Is our React Router 7 bet limiting our addressable market for SaaS templates?"

## Scope

1. **Search volume comparison**: Check Google Trends, Ahrefs, or similar for "React Router SaaS template" vs "Next.js SaaS template" vs "Remix SaaS template" — quantify relative demand
2. **Community sentiment**: Post in r/reactjs, React Router Discord, and relevant communities asking about framework preference for production SaaS — gather qualitative signal
3. **Conversion tracking plan**: Set up analytics on the template landing page to track what percentage of visitors bounce vs convert, with framework mentioned prominently
4. **Next.js variant feasibility**: Estimate effort to maintain a parallel Next.js variant — with AO's velocity, dual-framework support might be feasible if the backend layer (Hono, Drizzle) stays shared
5. **Document the decision**: Whether staying React Router 7-only or adding Next.js, document the rationale and the data that informed it

## Dependencies

- Landing page must exist to run conversion tracking (depends on GTM launch timeline)
- Search volume analysis can start immediately with no dependencies

## Success Criteria

- Search volume data is collected and documented
- A go/no-go decision on Next.js variant is made with supporting data
- If demand data shows React Router 7 market is too small, a mitigation plan exists (Next.js variant, different positioning, or pivot)

## Notes

- React Router 7 could be a strength in the Remix/React Router community — but that community needs to be large enough to sustain a template business
- AO's velocity might make dual-framework maintenance feasible where it wouldn't be for a solo developer — this is worth evaluating
- The older Next.js template (launchpad-saas-template, Next.js 14 + Prisma) exists but appears inactive — reviving it might be cheaper than building from scratch
- Don't let sunk cost in React Router 7 prevent a framework pivot if the data clearly shows Next.js dominance
