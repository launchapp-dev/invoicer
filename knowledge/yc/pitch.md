# YC Pitch — AO (Agent Orchestrator)

**Target batch:** S26 (apply ~Apr 2026, interviews May-Jun 2026)

---

## One-Liner

AO is a general-purpose autonomous production system you define in YAML — software, media, data pipelines, and 300+ workflow types across 30 verticals, all running on the same daemon + YAML + MCP architecture.

## The Problem

Organizations across every industry spend most of their time on work that's predictable and multi-phase: software teams on bug fixes, code review, and test coverage; media teams on scripting, asset generation, and assembly; legal teams on contract review and compliance; data teams on ETL and validation. Hiring is slow, expensive, and doesn't scale. AI tools help individual workers go faster, but they don't replace the *team* — the planning, executing, reviewing, quality-gating, and shipping cycle that every multi-phase workflow requires.

## The Solution

AO is a local-first daemon that runs autonomous production teams on your machine. You define agents, workflows, and quality gates in YAML. The same daemon + YAML + MCP architecture that ships software (requirements → architecture → implementation → review → test → merge) also orchestrates media production, data pipelines, legal workflows, healthcare compliance, and any other multi-phase process — AO is domain-agnostic by design.

**Key differentiators:**
- **Domain-agnostic orchestration** — the same architecture handles code, media, data pipelines, legal, healthcare, and 300+ pipeline types across 30 verticals
- **YAML-defined teams** — your production org is a config file, not a headcount
- **Local-first, BYOK** — your machine, your API keys, your data never leaves your network
- **Multi-model routing** — Claude, GPT, Gemini, Kimi, GLM, MiniMax with automatic fallback
- **Git worktree isolation** — each task gets a real branch, not a cloud sandbox
- **Autonomous PM/EM loops** — agents don't just execute, they review, approve, and merge
- **Self-healing** — daemon restarts, retries, and adapts to model rate limits automatically

## Traction

> **Update these numbers before applying**

- 180+ PRs merged autonomously in first week of operation
- 6 daemons running 24/7 across the portfolio
- 20 specialized agents (planner, reviewer, security-monitor, sdk-auditor, etc.)
- Rust codebase (16 crates)
- Design system bootstrapped by AO, now used across our products (70+ PRs merged)
- **StoryForge** — AO orchestrates a full media production pipeline (world-building, script writing, image generation, voice synthesis, music composition, video assembly) using the same daemon + YAML architecture that ships code
- 300+ pipeline use cases identified across 30 verticals, proving domain-agnostic generalizability
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

- AI coding tools: $40B+ market — but every player is fighting over the same "coding agent" niche
- Cursor: $29.3B valuation, $1B+ ARR
- Devin (Cognition): $10.2B valuation, $73M ARR
- Factory AI: $300M valuation
- GitHub Copilot: largest user base (bundled with GitHub)
- Autonomous workflow orchestration across all verticals: untapped

AO is not competing with Cursor (IDE) or Devin (cloud agent). They're building coding tools. AO is building a **general-purpose autonomous production system** — different architecture, different market, vastly larger TAM.

## Why Now

1. LLMs are good enough to write production code (SWE-bench: 78%+ for top models)
2. Multi-model availability means no single-provider dependency
3. Enterprises want AI agents but won't send code to cloud services
4. The "AI engineer" category is forming — but everyone is fighting over coding agents. No one owns "general-purpose autonomous orchestration" yet. Cursor/Devin can't just add this — they're architecturally locked into code editing. AO's daemon + YAML + MCP architecture is domain-agnostic from the ground up.

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
AO is a general-purpose autonomous production system that runs locally on your machine. Define agents and workflows in YAML, and AO dispatches AI models to execute multi-phase pipelines — software delivery, media production, data processing, and any domain — 24/7, without human intervention.

### Why did you pick this idea to work on?
We were building SaaS templates and realized we were doing the same work over and over across 4 frameworks. We built AO to do it for us. It shipped 180+ PRs in its first week. The tool became more valuable than the templates it was building.

### What's new about what you're making?
Every competitor is locked into the "coding agent" framing — 204+ tools all fighting over the same IDE/sandbox niche. AO is a general-purpose autonomous production system. The same daemon + YAML + MCP architecture that ships software also orchestrates media production (StoryForge: world-building → scripting → image gen → voice → music → assembly), data pipelines, legal workflows, and 300+ pipeline types across 30 verticals. It uses git worktrees for real isolation, routes across 6+ LLM providers, and runs PM/EM review loops autonomously. No one else is building domain-agnostic, local-first, multi-model autonomous orchestration.

### Who are your competitors?
Cursor ($29.3B) is an IDE — it helps one developer write code faster. Devin ($10.2B) is a cloud agent — it runs in a sandbox you can't audit. GitHub Copilot is an autocomplete. OpenHands is open-source but lacks orchestration. Composio is the closest — it dispatches coding agents in worktrees — but it's a thin dispatch layer, not a full orchestration engine. All of them are coding-only. AO is the only general-purpose, local-first, BYOK autonomous production system — the same architecture handles software, media, data pipelines, and any multi-phase workflow.

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
