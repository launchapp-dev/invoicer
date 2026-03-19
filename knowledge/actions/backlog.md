# Action Items Backlog

Prioritized list of all action items, sorted by priority then effort (smallest effort first within each priority tier).

Last updated: 2026-03-19

## Critical Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Set up AO landing page with "180 PRs in 7 days" hero story](set-up-ao-landing-page-with-180-prs-hero-story.md) | Small | Revenue | Evidence of real users |
| [Implement founder review gate for ideas](implement-founder-review-gate-for-ideas.md) | Small | Operations | Decision framework for 93 ideas |
| [Audit AO-generated code quality](audit-ao-generated-code-quality.md) | Small | Technical Debt | Quality-gating AI-generated code |
| [Adopt AO-first revenue plan and defer the rest](focus-single-revenue-stream.md) | Small | Product Strategy | Solo founder / 9 revenue streams |
| [Map @repo/* to @launchpad/* migration gaps in flagship template](resolve-repo-vs-launchpad-sdk-divergence.md) | Small | Architecture | Flagship template duplicates Launchpad SDKs |
| [Run demand validation for SaaS template](run-demand-validation-saas-template.md) | Small | Product Strategy | Evidence of real users |
| [Publish @launchpad/core to npm registry](publish-launchpad-core-to-npm-registry.md) | Small | Architecture | SDK core dependency is GitHub-only |
| [Launch AO Pro early access with a waitlist, pricing, and founder-led onboarding](launch-ao-pro-early-access.md) | Medium | Revenue | Evidence of real users |
| [Implement CI quality gates for AO merges](implement-ci-quality-gates-for-ao-merges.md) | Medium | Technical Debt | Quality-gating AI-generated code |
| [Document the cohesive LaunchApp portfolio and cross-product path](run-platform-coherence-assessment.md) | Medium | Product Strategy | Platform vs. portfolio of disconnected products |
| [Re-architect LaunchPad SDKs as the foundation for templates](decide-launchpad-baas-fate.md) | Medium | Architecture | Sunset/revive LaunchPad BaaS |
| [Adopt integrate-first strategy for BaaS components](adopt-integrate-first-strategy-for-baas.md) | Medium | Architecture | Should LaunchPad integrate before building custom BaaS |
| [Build AO Cloud playground MVP](build-ao-cloud-playground-mvp.md) | Medium | Competitive | AO Cloud timing vs. hosted agent market |

## High Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Triage and archive the 93-idea catalog](triage-and-archive-idea-catalog.md) | Small | Product Strategy | Decision framework for 93 ideas |
| [Archive abandoned public repos](archive-abandoned-public-repos.md) | Small | Operations | Abandoned repos eroding developer trust |
| [Cap integration portfolio and adopt recipes approach](cap-integration-portfolio-and-adopt-recipes-approach.md) | Small | Operations | Hidden maintenance cost of 22 integrations |
| [Conduct capacity audit for non-coding work](conduct-capacity-audit.md) | Small | Operations | Solo founder / 9 revenue streams |
| [Create one-click AO cloud deploy template](create-one-click-ao-cloud-deploy.md) | Small | Competitive | AO Cloud timing vs. hosted agent market |
| [Define brand architecture decision](define-brand-architecture-decision.md) | Small | Product Strategy | Platform vs. portfolio of disconnected products |
| [Draft EULA for digital products](draft-eula-for-digital-products.md) | Small | Revenue | IP protection for one-time-purchase templates |
| [Run external validation of product priorities](run-external-validation-of-product-priorities.md) | Small | Product Strategy | AI-generated ideas biased toward AO ecosystem |
| [Run pricing research and raise launch price](run-pricing-research-and-raise-launch-price.md) | Small | Revenue | Underpricing vs competitor benchmarks |
| [Validate AO Guard market demand](validate-ao-guard-market-demand.md) | Small | Revenue | AO Guard 10/10 priority lacks external validation |
| [Validate React Router 7 market demand](validate-react-router-7-market-demand.md) | Small | Product Strategy | React Router 7 limiting market reach |
| [Verify plugin pack implementations](verify-plugin-pack-implementations.md) | Small | Product Strategy | Plugin packs — working code or scaffolds? |
| [Build minimum viable support and docs](build-minimum-viable-support-and-docs.md) | Medium | Operations | Customer support and docs for paying users |
| [Build cross-SDK integration test suite](build-cross-sdk-integration-test-suite.md) | Medium | Technical Debt | No cross-SDK integration testing |
| [Build checkout for template sales to bootstrap revenue](set-up-checkout-and-license-system.md) | Medium | Revenue | IP protection for one-time-purchase templates |
| [Consolidate marketplace proposals into one](consolidate-marketplace-proposals-into-one.md) | Medium | Product Strategy | Three marketplaces cannibalize each other |
| [Consolidate MCP server implementations](consolidate-mcp-server-implementations.md) | Medium | Architecture | Four MCP servers compete for same surface |
| [Consolidate SaaS template repos](consolidate-saas-template-repos.md) | Medium | Product Strategy | Parallel SaaS template variants diluting effort |
| [Implement AO daemon circuit breakers and rollback](implement-ao-daemon-circuit-breakers-and-rollback.md) | Medium | Architecture | AO daemon blast radius risk |
| [Audit plugin packs and test free adoption](audit-and-test-plugin-pack-viability.md) | Medium | Revenue | Paid plugin marketplace viability |
| [Audit Better Auth coupling and create abstraction](audit-better-auth-coupling-and-create-abstraction.md) | Medium | Architecture | Better Auth divergence risk |
| [Use AO to provision three sellable template verticals from one shared foundation](use-ao-to-provision-three-template-verticals.md) | Large | Product Strategy | Platform vs. portfolio of disconnected products |

## Medium Priority

| Action | Effort | Category | Source Question |
|--------|--------|----------|----------------|
| [Define 90-day kill criteria for revenue streams](define-kill-criteria-for-revenue-streams.md) | Small | Product Strategy | Solo founder / 9 revenue streams |
| [Establish baseline metrics for public repos](check-public-repo-metrics.md) | Small | Product Strategy | Evidence of real users |

## Recommended Execution Order

1. **Set up AO landing page with "180 PRs in 7 days" hero story** — immediate top-of-funnel asset for every AO conversation
2. **Launch AO Pro early access** — converts the current AO demand signal into a real pipeline and first cohort
3. **Adopt AO-first revenue plan and defer the rest** — locks scope so the org does not reopen nine revenue tracks
4. **Conduct capacity audit** — validates what the two founders can actually support across AO Pro and template sales
5. **Build minimum viable support and docs** — required before the first AO cohort or template buyers arrive
6. **Implement founder review gate for ideas** — prevents the approved focus from being diluted by new auto-generated ideas
7. **Triage and archive the 93-idea catalog** — keep only the approved, vision-aligned bets visible
8. **Build checkout for template sales** — creates the second, narrower bootstrap revenue path
9. **Document the cohesive LaunchApp portfolio and cross-product path** — turns the answered strategy into an operational product map
10. **Consolidate SaaS template repos** — ensures one canonical template foundation exists before expanding the catalog
11. **Map @repo/* to @launchpad/* migration gaps** — creates the concrete migration checklist for the SDK foundation work
12. **Publish @launchpad/core to npm** — removes the packaging blocker for template consumption
13. **Re-architect LaunchPad SDKs as the foundation for templates** — collapses the parallel stack problem into one canonical backend layer
14. **Build cross-SDK integration test suite** — verifies the re-architecture actually works end-to-end
15. **Use AO to provision three template verticals** — scale the template catalog only after the foundation is stable
16. **Audit AO-generated code quality** — sample current output quality to quantify operational risk
17. **Implement CI quality gates for AO merges** — harden the AO delivery loop after audit findings
18. **Archive abandoned public repos** — remove public trust damage before wider launch activity
19. **Create one-click AO cloud deploy** — lower adoption friction for teams that want hosted self-serve quickly
20. **Build AO Cloud playground MVP** — validate hosted demand after the AO sales story is live
21. **Define brand architecture** — formalize naming once the product map is documented
22. **Define kill criteria** — apply strict revisit rules to every deferred revenue idea
23. **Run external validation of product priorities** — pressure-test the roadmap with outside signal
24. **Check public repo metrics** — establish a baseline for future demand tracking
25. **Run pricing research and raise launch price** — calibrate pricing before volume grows
26. **Validate React Router 7 market demand** — tighten template positioning before scaling template sales
27. **Cap integration portfolio at 5 packages** — avoid reopening a maintenance-heavy platform surface
28. **Consolidate MCP server implementations** — remove internal platform ambiguity
29. **Verify plugin pack implementations** — confirm whether the packs are productizable or just scaffolds
30. **Audit and test plugin packs** — only after implementation quality is known
31. **Consolidate marketplace proposals into one** — avoid fragmented marketplace bets
32. **Implement AO daemon circuit breakers and rollback** — important safety work that benefits from CI hardening first
33. **Audit Better Auth coupling** — lower urgency, but useful before wider platform coupling deepens
