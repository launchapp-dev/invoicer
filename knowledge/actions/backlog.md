# Action Items Backlog

Prioritized list of all action items, sorted by priority then effort (smallest effort first within each priority tier).

Last updated: 2026-03-19

## Critical Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Audit AO-generated code quality](audit-ao-generated-code-quality.md) | Small | Technical Debt | Quality-gating AI-generated code |
| [Focus on a single revenue stream](focus-single-revenue-stream.md) | Small | Product Strategy | Solo founder / 9 revenue streams |
| [Resolve @repo/* vs @launchpad/* SDK divergence](resolve-repo-vs-launchpad-sdk-divergence.md) | Small | Product Strategy | Flagship template duplicates Launchpad SDKs |
| [Run demand validation for SaaS template](run-demand-validation-saas-template.md) | Small | Product Strategy | Evidence of real users |
| [Publish @launchpad/core to npm registry](publish-launchpad-core-to-npm-registry.md) | Small | Architecture | SDK core dependency is GitHub-only |
| [Implement CI quality gates for AO merges](implement-ci-quality-gates-for-ao-merges.md) | Medium | Technical Debt | Quality-gating AI-generated code |
| [Run platform coherence assessment](run-platform-coherence-assessment.md) | Medium | Product Strategy | Platform vs. portfolio of disconnected products |
| [Adopt integrate-first strategy for BaaS components](adopt-integrate-first-strategy-for-baas.md) | Medium | Architecture | Should LaunchPad integrate before building custom BaaS |
| [Build AO Cloud playground MVP](build-ao-cloud-playground-mvp.md) | Medium | Competitive | AO Cloud timing vs. hosted agent market |

## High Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Archive abandoned public repos](archive-abandoned-public-repos.md) | Small | Operations | Abandoned repos eroding developer trust |
| [Cap integration portfolio and adopt recipes approach](cap-integration-portfolio-and-adopt-recipes-approach.md) | Small | Operations | Hidden maintenance cost of 22 integrations |
| [Conduct capacity audit for non-coding work](conduct-capacity-audit.md) | Small | Operations | Solo founder / 9 revenue streams |
| [Create one-click AO cloud deploy template](create-one-click-ao-cloud-deploy.md) | Small | Competitive | AO Cloud timing vs. hosted agent market |
| [Decide LaunchPad BaaS fate](decide-launchpad-baas-fate.md) | Small | Product Strategy | Sunset/revive LaunchPad BaaS |
| [Define brand architecture decision](define-brand-architecture-decision.md) | Small | Product Strategy | Platform vs. portfolio of disconnected products |
| [Draft EULA for digital products](draft-eula-for-digital-products.md) | Small | Revenue | IP protection for one-time-purchase templates |
| [Run external validation of product priorities](run-external-validation-of-product-priorities.md) | Small | Product Strategy | AI-generated ideas biased toward AO ecosystem |
| [Run pricing research and raise launch price](run-pricing-research-and-raise-launch-price.md) | Small | Revenue | Underpricing vs competitor benchmarks |
| [Validate AO Guard market demand](validate-ao-guard-market-demand.md) | Small | Revenue | AO Guard 10/10 priority lacks external validation |
| [Validate React Router 7 market demand](validate-react-router-7-market-demand.md) | Small | Product Strategy | React Router 7 limiting market reach |
| [Verify plugin pack implementations](verify-plugin-pack-implementations.md) | Small | Product Strategy | Plugin packs — working code or scaffolds? |
| [Build minimum viable support and docs](build-minimum-viable-support-and-docs.md) | Medium | Operations | Customer support and docs for paying users |
| [Build cross-SDK integration test suite](build-cross-sdk-integration-test-suite.md) | Medium | Technical Debt | No cross-SDK integration testing |
| [Consolidate marketplace proposals into one](consolidate-marketplace-proposals-into-one.md) | Medium | Product Strategy | Three marketplaces cannibalize each other |
| [Consolidate MCP server implementations](consolidate-mcp-server-implementations.md) | Medium | Architecture | Four MCP servers compete for same surface |
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
6. **Run external validation of product priorities** — no dependencies, calibrates AI-biased roadmap before major investment decisions
7. **Validate AO Guard market demand** — no dependencies, determines if highest-rated idea has real demand
8. **Cap integration portfolio at 5 packages** — no dependencies, prevents premature commitment to 22 maintenance liabilities
9. **Run pricing research and raise launch price** — no dependencies, must happen before prices go public
10. **Validate React Router 7 market demand** — search volume analysis has no dependencies, informs template strategy
11. **Run demand validation** — informs the revenue focus decision
12. **Focus on single revenue stream** — depends on #4-11 for data
13. **Resolve @repo/* vs @launchpad/* SDK divergence** — clarifies whether two stacks exist intentionally, informs BaaS fate
14. **Run platform coherence assessment** — strategic decision that shapes everything downstream
15. **Define brand architecture** — follows from platform coherence decision
16. **Define kill criteria** — applies to deferred streams after focus decision
17. **Decide LaunchPad BaaS fate** — informed by revenue focus, SDK divergence finding, and platform decisions
18. **Adopt integrate-first strategy for BaaS** — executes the "how" after BaaS fate decision; wraps existing services instead of building custom
19. **Publish @launchpad/core to npm** — only if BaaS SDKs survive the fate decision; unblocks SDK distribution
20. **Build cross-SDK integration test suite** — only if BaaS SDKs survive; verifies ecosystem actually works
21. **Consolidate MCP server implementations** — audit and document hierarchy, deprecate redundant servers
22. **Verify plugin pack implementations** — quick audit to check if packs are scaffolds or real code
23. **Audit and test plugin packs** — depends on verification results; tests market viability
24. **Consolidate marketplace proposals into one** — depends on plugin pack viability; single marketplace instead of three
25. **Build minimum viable support and docs** — must complete before first sale
26. **Consolidate SaaS template repos** — execute after deciding templates are the focus
27. **Draft EULA for digital products** — needed before first sale
28. **Set up checkout and license system** — blocks revenue Phase 1, depends on EULA
29. **Implement AO daemon circuit breakers and rollback** — important safety net, depends on CI gates being in place
30. **Create one-click AO cloud deploy** — reduces adoption friction immediately
31. **Build AO Cloud playground MVP** — validates hosted demand, depends on AO being a focus
32. **Audit Better Auth coupling** — independent but lower urgency
