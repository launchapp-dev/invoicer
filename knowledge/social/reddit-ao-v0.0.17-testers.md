# AO — Agent Orchestrator CLI (v0.0.17)

**Coordinate AI agents across providers. Define workflows in YAML. Ship code autonomously.**

## What is AO?

AO is a CLI that orchestrates AI coding agents across multiple providers from a single YAML config. It runs as a background daemon that triages tasks, dispatches them to the right model, creates PRs, reviews code, and merges — all autonomously.

## The power is in the YAML

One file. Every workflow, every agent, every schedule:

```yaml
agents:
  implementer:
    model: kimi-code/kimi-for-coding
    tool: oai-runner
    mcp_servers: ["ao", "context7"]

  reviewer:
    model: minimax/MiniMax-M2.7
    tool: oai-runner
    mcp_servers: ["ao", "github"]

  product-owner:
    model: claude-opus-4-6
    tool: claude
    mcp_servers: ["ao", "sequential-thinking"]

workflows:
  - id: standard
    phases:
      - plan-task
      - implementation
      - push-branch
      - create-pr
      - pr-review:
          on_verdict:
            rework:
              target: implementation

schedules:
  - id: work-planner
    cron: "*/5 * * * *"
    workflow_ref: work-planner
  - id: pr-reviewer
    cron: "*/1 * * * *"
    workflow_ref: pr-reviewer
```

Change a model? One line. Add a new agent? Five lines. Swap providers when rate limits hit? Thirty seconds.

## Real results (not benchmarks — production PRs)

**785 PRs merged autonomously** across 7 repos running AO daemons:

| Repo | PRs Merged | What it builds |
|---|---|---|
| SaaS Template (React Router 7) | 277 | Full-stack SaaS starter |
| Design System | 136 | UI component library |
| AO CLI | 95 | AO builds itself (16 Rust crates) |
| Brain | 92 | Org-wide AI command center |
| Next.js Template | 69 | Next.js App Router starter |
| Nuxt Template | 61 | Nuxt 4 starter |
| SvelteKit Template | 55 | SvelteKit starter |

Zero human intervention for the standard flow: task → triage → implement → push → PR → review → merge.

## 7 AI providers, one config

- **Claude** (Opus, Sonnet, Haiku) — deep reasoning, code review
- **Codex** (GPT-5.4) — fast implementation
- **Gemini** (3.1 Pro) — UI/frontend work
- **Kimi** (kimi-for-coding) — cost-effective implementation via oai-runner
- **MiniMax** (M2.7) — lightweight tasks, PR review via MCP
- **GLM** (5 Turbo) — small tasks via oai-runner
- **Any OpenAI-compatible API** — one runner talks to 15+ providers

Route by task type:

| Complexity | Type | Model |
|---|---|---|
| low | any | MiniMax M2.7 |
| medium | feature | Kimi |
| medium | ui/ux | Gemini 3.1 Pro |
| high | feature | Claude Sonnet |
| critical | any | Claude Opus |

## What it does (v0.0.17)

- **Multi-model routing** — route tasks by complexity/type to the best model
- **Autonomous daemon** — background scheduler with pool size, cron agents, queue management
- **Self-healing pipeline** — auto-rebases conflicting PRs, re-routes failed models, reworks reviewer feedback
- **MCP integration** — GitHub, context7, shadcn/ui, sequential-thinking, memory, filesystem
- **40+ specialized agents** — product owners, architects, UI designers, researchers, reviewers
- **Release automation** — AI evaluates readiness, writes changelog, cuts releases

## Quick start

```bash
curl -fsSL https://raw.githubusercontent.com/launchapp-dev/ao/main/install.sh | bash
cd your-project
ao setup
ao daemon start --autonomous --pool-size 3
```

## Links

- **Install + Docs**: [github.com/launchapp-dev/ao](https://github.com/launchapp-dev/ao)
- **Skills**: [github.com/launchapp-dev/ao-skills](https://github.com/launchapp-dev/ao-skills)
- **Source**: [github.com/launchapp-dev/ao-cli](https://github.com/launchapp-dev/ao-cli)

## Looking for testers

We're looking for developers who:
- Work on monorepo TypeScript or multi-crate Rust projects
- Use multiple AI coding tools (Claude Code, Codex, Gemini CLI)
- Want to automate their PR pipeline end-to-end
- Are comfortable with YAML workflow config and CLI tools

**What you get**: Early access, direct support, your feedback shapes the product.

**What we need**: Real-world usage reports — what works, what breaks, what's missing.

---

*AO builds itself. 785 PRs and counting. Zero vendor lock-in.*
