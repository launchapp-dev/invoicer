# YC Pitch — AO (Agent Orchestrator)

**Target batch:** S26 (apply ~Apr 2026, interviews May-Jun 2026)

---

## One-Liner

AO is an autonomous software engineering team you define in YAML — it shipped 180+ PRs across 4 frameworks in its first week, with zero human code review.

## The Problem

Software teams spend most of their time on work that's predictable: bug fixes, dependency updates, code review, test coverage, boilerplate features. Hiring is slow, expensive, and doesn't scale. AI coding assistants (Copilot, Cursor) help individual developers write code faster, but they don't replace the *team* — the planning, reviewing, testing, merging, and shipping cycle.

## The Solution

AO is a local-first daemon that runs an autonomous engineering org on your machine. You define agents, workflows, and quality gates in YAML. AO dispatches AI agents to git worktrees, runs multi-phase pipelines (requirements → architecture → implementation → review → test → merge), and ships code 24/7 without human intervention.

**Key differentiators:**
- **YAML-defined teams** — your engineering org is a config file, not a headcount
- **Local-first, BYOK** — your machine, your API keys, your code never leaves your network
- **Multi-model routing** — Claude, GPT, Gemini, Kimi, GLM, MiniMax with automatic fallback
- **Git worktree isolation** — each task gets a real branch, not a cloud sandbox
- **Autonomous PM/EM loops** — agents don't just code, they review, approve, and merge
- **Self-healing** — daemon restarts, retries, and adapts to model rate limits automatically

## Traction

> **Update these numbers before applying**

- 180+ PRs merged autonomously in first week of operation
- 6 daemons running 24/7 across the portfolio
- 20 specialized agents (planner, reviewer, security-monitor, sdk-auditor, etc.)
- Rust codebase (16 crates)
- Design system bootstrapped by AO, now used across our products (70+ PRs merged)
- 54+ repos managed from a single "brain" command center
- External users: ___ (NEED THIS)
- GitHub stars: ___ (NEED THIS)
- Revenue: ___ (NEED THIS)

## Business Model

Free CLI binary (closed source) → monetize ecosystem:

| Revenue Stream | Price | Status |
|---|---|---|
| SaaS templates (built by AO) | $149-299 | Ready to ship |
| Workflow packs | $15-49/pack | Building |
| AO Team (fleet, dashboard, RBAC) | $99/seat/mo | Planned |
| AO Enterprise (on-prem, SSO, SLA) | Custom | Planned |
| AO Cloud (hosted orchestration) | Usage-based | Planned |

**Alternative if going open-core:** BSL license on CLI, cloud/enterprise closed.

## Market

- AI coding tools: $40B+ market
- Cursor: $29.3B valuation, $1B+ ARR
- Devin (Cognition): $10.2B valuation, $73M ARR
- Factory AI: $300M valuation
- GitHub Copilot: largest user base (bundled with GitHub)

AO is not competing with Cursor (IDE) or Devin (cloud agent). AO is a **local autonomous engineering org** — different buyer, different use case.

## Why Now

1. LLMs are good enough to write production code (SWE-bench: 78%+ for top models)
2. Multi-model availability means no single-provider dependency
3. Enterprises want AI agents but won't send code to cloud services
4. The "AI engineer" category is forming — no one owns "autonomous local orchestration" yet

## Why Us

**Sami Shukri (Technical Lead)** — Full-stack engineer who built the AO orchestration engine in ~11 weeks — 16 Rust crates covering fleet orchestration, multi-model routing, and a YAML workflow engine — plus the full LaunchApp ecosystem from LaunchPad BaaS to the brain repo.

**Rafael (Product)** — Experience across startups and enterprise. Brings product discipline, go-to-market strategy, and market perspective. Complements the technical foundation with execution focus.

Together: one founder builds the engine, the other makes sure it ships to the right people. After ~11 weeks of building AO, we pointed it at 4 SaaS frameworks and it shipped 180+ PRs autonomously in its first week of operation. We also used AO to bootstrap our design system, which is now integrated across our products. The product proves itself by existing.

## Ask

$500K (standard YC deal) to:
1. Get to 500+ users running AO on their repos
2. Ship AO Cloud (hosted orchestration, no CLI setup)
3. Hit $10K MRR from templates + packs
4. Hire first engineer

## The Demo

> _Script this closer to interview time_

1. Show a task being created: `ao task create "Add Stripe billing to the dashboard"`
2. Watch the daemon pick it up, assign an agent, create a worktree
3. Agent writes code, runs tests, creates PR
4. PM loop reviews, EM loop approves
5. PR merges to main — zero human involvement
6. Total time: ~5 minutes for a real feature, live

---

## YC Application Answers (Draft)

### What does your company do?
AO is an autonomous software engineering team that runs locally on your machine. Define agents and workflows in YAML, and AO dispatches AI models to plan, code, review, test, and merge — 24/7, without human intervention.

### Why did you pick this idea to work on?
We were building SaaS templates and realized we were doing the same work over and over across 4 frameworks. We built AO to do it for us. It shipped 180+ PRs in its first week. The tool became more valuable than the templates it was building.

### What's new about what you're making?
Every AI coding tool is either an IDE assistant (Cursor, Copilot) or a cloud sandbox (Devin, Factory). AO is neither — it's a local daemon that runs a full engineering team: planning, coding, reviewing, testing, and merging. It uses git worktrees for real branch isolation, routes across 6+ LLM providers, and runs PM/EM review loops autonomously. No one else does local-first, multi-model, multi-phase autonomous orchestration.

### Who are your competitors?
Cursor ($29.3B) is an IDE — it helps one developer write code faster. Devin ($10.2B) is a cloud agent — it runs in a sandbox you can't audit. GitHub Copilot is an autocomplete. OpenHands is open-source but lacks orchestration. AO is the only local-first, BYOK autonomous engineering org defined in YAML.

### How do or will you make money?
Free CLI binary for adoption. Revenue from: SaaS templates built by AO ($149-299), workflow packs ($15-49), AO Team for fleet management ($99/seat/mo), AO Enterprise for on-prem ($custom), and eventually AO Cloud for hosted orchestration.

### How will you get users?
The templates ARE the marketing. Every template sold comes with a README that says "this was built and maintained by AO." Developer content: live demos of AO shipping features, blog posts, "AO built this" case studies. Free CLI means zero barrier to try it.

---

## Pre-Application Checklist

- [ ] Fix workflow runner reliability (TASK-526/527)
- [ ] Green all template quality gates (nextjs build, sveltekit lint)
- [ ] Get 20-50 beta users running AO
- [ ] Ship AO binary as free download
- [ ] First template sale ($149-299)
- [ ] Record demo video (1 min, AO shipping a feature end-to-end)
- [ ] GitHub presence (stars, README, landing page)
- [ ] Track weekly metrics: users, PRs merged, tasks completed
- [ ] Finalize open-source vs closed-source vs BSL decision
- [ ] Apply to S26 batch
