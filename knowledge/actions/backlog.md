# Action Items Backlog

Prioritized list of all action items, sorted by priority then effort (smallest effort first within each priority tier).

Last updated: 2026-03-18

## Critical Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Audit AO-generated code quality](audit-ao-generated-code-quality.md) | Small | Technical Debt | Quality-gating AI-generated code |
| [Focus on a single revenue stream](focus-single-revenue-stream.md) | Small | Product Strategy | Solo founder / 9 revenue streams |
| [Run demand validation for SaaS template](run-demand-validation-saas-template.md) | Small | Product Strategy | Evidence of real users |
| [Implement CI quality gates for AO merges](implement-ci-quality-gates-for-ao-merges.md) | Medium | Technical Debt | Quality-gating AI-generated code |
| [Run platform coherence assessment](run-platform-coherence-assessment.md) | Medium | Product Strategy | Platform vs. portfolio of disconnected products |
| [Build AO Cloud playground MVP](build-ao-cloud-playground-mvp.md) | Medium | Competitive | AO Cloud timing vs. hosted agent market |

## High Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Archive abandoned public repos](archive-abandoned-public-repos.md) | Small | Operations | Abandoned repos eroding developer trust |
| [Conduct capacity audit for non-coding work](conduct-capacity-audit.md) | Small | Operations | Solo founder / 9 revenue streams |
| [Create one-click AO cloud deploy template](create-one-click-ao-cloud-deploy.md) | Small | Competitive | AO Cloud timing vs. hosted agent market |
| [Decide LaunchPad BaaS fate](decide-launchpad-baas-fate.md) | Small | Product Strategy | Sunset/revive LaunchPad BaaS |
| [Define brand architecture decision](define-brand-architecture-decision.md) | Small | Product Strategy | Platform vs. portfolio of disconnected products |
| [Draft EULA for digital products](draft-eula-for-digital-products.md) | Small | Revenue | IP protection for one-time-purchase templates |
| [Run pricing research and raise launch price](run-pricing-research-and-raise-launch-price.md) | Small | Revenue | Underpricing vs competitor benchmarks |
| [Validate React Router 7 market demand](validate-react-router-7-market-demand.md) | Small | Product Strategy | React Router 7 limiting market reach |
| [Build minimum viable support and docs](build-minimum-viable-support-and-docs.md) | Medium | Operations | Customer support and docs for paying users |
| [Consolidate SaaS template repos](consolidate-saas-template-repos.md) | Medium | Product Strategy | Parallel SaaS template variants diluting effort |
| [Implement AO daemon circuit breakers and rollback](implement-ao-daemon-circuit-breakers-and-rollback.md) | Medium | Architecture | AO daemon blast radius risk |
| [Set up checkout and license system](set-up-checkout-and-license-system.md) | Medium | Revenue | IP protection for one-time-purchase templates |
| [Audit plugin packs and test free adoption](audit-and-test-plugin-pack-viability.md) | Medium | Revenue | Paid plugin marketplace viability |
| [Audit Better Auth coupling and create abstraction](audit-better-auth-coupling-and-create-abstraction.md) | Medium | Architecture | Better Auth divergence risk |

## Medium Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Define 90-day kill criteria for revenue streams](define-kill-criteria-for-revenue-streams.md) | Small | Product Strategy | Solo founder / 9 revenue streams |
| [Establish baseline metrics for public repos](check-public-repo-metrics.md) | Small | Product Strategy | Evidence of real users |

## Recommended Execution Order

1. **Audit AO-generated code quality** — no dependencies, immediate risk assessment, informs urgency of CI gates
2. **Implement CI quality gates for AO merges** — depends on audit findings, blocks safe continued AO operation
3. **Archive abandoned public repos** — no dependencies, immediate credibility win, do before any public launch
4. **Conduct capacity audit** — no dependencies, immediate clarity on constraints
5. **Check public repo metrics** — no dependencies, quick data collection
6. **Run pricing research and raise launch price** — no dependencies, must happen before prices go public
7. **Validate React Router 7 market demand** — search volume analysis has no dependencies, informs template strategy
8. **Run demand validation** — informs the revenue focus decision
9. **Focus on single revenue stream** — depends on #4-8 for data
10. **Run platform coherence assessment** — strategic decision that shapes everything downstream
11. **Define brand architecture** — follows from platform coherence decision
12. **Define kill criteria** — applies to deferred streams after focus decision
13. **Decide LaunchPad BaaS fate** — informed by revenue focus and platform decisions
14. **Build minimum viable support and docs** — must complete before first sale
15. **Consolidate SaaS template repos** — execute after deciding templates are the focus
16. **Draft EULA for digital products** — needed before first sale
17. **Set up checkout and license system** — blocks revenue Phase 1, depends on EULA
18. **Implement AO daemon circuit breakers and rollback** — important safety net, depends on CI gates being in place
19. **Create one-click AO cloud deploy** — reduces adoption friction immediately
20. **Build AO Cloud playground MVP** — validates hosted demand, depends on AO being a focus
21. **Audit Better Auth coupling** — independent but lower urgency
22. **Audit and test plugin packs** — depends on revenue focus decision
