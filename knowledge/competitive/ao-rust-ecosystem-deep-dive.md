# AO CLI — Rust AI Agent Ecosystem & Workflow DSL Deep Dive

> Last updated: 2026-03-19
> Research scope: 40+ tools across Rust agents, Python frameworks, workflow platforms, and declarative DSLs

## Executive Summary

AO CLI's workflow YAML is **unique in combining all 9 capability boxes** (agent profiles, phase pipelines, decision contracts, output contracts, model routing, cron schedules, fallback chains, post-success hooks, MCP bindings) in a single declarative file. No other tool in the market matches this scope. The closest competitors each cover 1-3 boxes.

---

## Category 1: Rust AI Agent Tools

### Screenpipe (mediar-ai/screenpipe) — 17.3k stars
- **What it is**: Local-first AI memory — records screen/audio, indexes with SQLite + FTS5, exposes via REST API
- **Relation to AO**: Complementary, not competing. Could be an MCP data source for AO's research phases
- **Has workflow YAML**: No. "Pipes" are scheduled markdown-defined agents with data permissions
- **Key differentiator**: Event-driven capture (5-10% CPU), per-pipe AI data permissions with 3 enforcement layers

### ZeroClaw (zeroclaw-labs/zeroclaw) — 28k stars
- **What it is**: Lightweight agent runtime OS. Single ~8.8MB binary, <5MB RAM, 22+ LLM providers
- **Relation to AO**: Closest Rust competitor in spirit. Both have daemon modes for autonomous execution
- **Has workflow YAML**: No. Daemon mode + gateway mode, but no declarative pipeline definitions
- **Key distinction**: ZeroClaw's daemon/gateway are execution surfaces (run whatever logic). AO's daemon is domain-agnostic — all logic lives in workflow YAML and packs (Subject Dispatch Envelope pattern)
- **AO advantage**: Phase verdicts, rework loops, dispatch queues, YAML workflows
- **ZeroClaw advantage**: Portability ($10 hardware), vendor-agnostic traits, smaller binary

### OpenFang (RightNow-AI/openfang) — 15k stars
- **What it is**: Agent OS. 14 Rust crates, 137k LOC, 40 channel adapters, 53 tools, 16 security systems
- **Relation to AO**: Most direct architectural sibling. Both are multi-crate Rust systems with daemon schedulers, RBAC, web UIs
- **Has workflow YAML**: Partial — "Hands" have manifest-based config, but not composable pipeline definitions
- **Key distinction**: OpenFang is general-purpose (40 messaging adapters: Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Teams). AO is software-delivery focused (worktrees, rework loops, phase verdicts)
- **OpenFang's "Hands" vs AO's phases**: Hands are persistent autonomous units with own schedules/RBAC. AO's agents are ephemeral per-phase — spawned, execute, return verdict, exit
- **AO's rework loop pattern** (reviewer rejects → implementer retries with context) has no direct OpenFang equivalent

### async-openai (64bit/async-openai) — 1.8k stars
- **What it is**: Rust OpenAI API client. BYOT types, streaming, retries, WASM support
- **Relation to AO**: Different layer entirely. Library vs platform. AO's oai-runner crate does similar work internally

### Rig (0xPlaygrounds/rig) — 6.6k stars
- **What it is**: Rust LLM framework. 20+ providers, 10+ vector stores, builder pattern agents
- **Relation to AO**: Framework for building agents vs platform for running them. Rig could be used as an LLM abstraction inside AO
- **Has workflow YAML**: No. Rust code-first DAGWorkflow API
- **AO advantage**: Orchestration layer (phase pipelines, verdicts, scheduling). Rig doesn't attempt this
- **Rig advantage**: Provider breadth (20+ vs AO's 5 CLI wrappers)

### AutoAgents — 451 stars
- **What it is**: Multi-agent Rust framework with actor model (Ractor), typed pub/sub, WASM sandboxed tools
- **Relation to AO**: Different coordination pattern. AutoAgents = emergent multi-agent collaboration. AO = structured delivery pipelines
- **Has workflow YAML**: Separate CLI project has YAML-based workflow config, but limited scope

### IronClaw — 10.5k stars
- **What it is**: Privacy-focused personal AI assistant. AES-256-GCM encryption, WASM sandbox, hybrid FTS + vector search
- **Relation to AO**: Single-user assistant vs multi-agent orchestrator
- **Security features AO lacks**: Prompt injection defense (pattern detection, sanitization, policy enforcement), encrypted memory
- **AO features IronClaw lacks**: Multi-agent workflows, phase verdicts, model routing

### rust-ai-buddy — 42 stars
- **What it is**: Educational project. Not comparable to AO

---

## Category 2: Declarative Workflow DSL Comparison (The Key Question)

### Tier S — Genuine Declarative Workflow Languages

Only 6 tools have real YAML-based workflow definitions for AI agents:

| Tool | Agent Profiles | Phase Pipelines | Decision Contracts | Model Routing | Cron | Fallback Chains | Post-Success |
|---|---|---|---|---|---|---|---|
| **AO CLI** | 34 | 50 phases, 49 workflows | Typed (confidence, risk, enums) | By task type × complexity | 23 schedules | Per-phase chains | Merge/cleanup |
| **Julep AI** | Per-agent model | 16 step types | JSON Schema inputs | Per-agent | Partial | Try-catch | No |
| **Kestra** | AI Agent task type | DAG tasks | Typed inputs | Per-task provider | Yes | Retry policies | No |
| **ChatDev 2.0** | Per-node config | DAG graph | No | Per-node | No | No | No |
| **MS Agent Framework** | Azure agent refs | Sequential actions | Typed inputs + PowerFx | Agent selection | No | Checkpoint/resume | No |
| **Oracle Agent Spec** | Yes | Flow DAGs | JSON Schema I/O | Per-node LLM | No | No | No |

#### Julep AI — Closest Overall
- 16 step types, JSON Schema inputs, per-agent models, try-catch fallbacks, sub-workflows
- **Missing**: No agent profiles with system prompts in same file. No cron in config. No decision contracts with confidence/risk. No model routing tables. No post-success hooks
- **Status**: Hosted backend shut down Dec 2025 (self-host only)

#### Kestra — Closest on Operations
- Native cron triggers, retry policies, DAG task dependencies, typed inputs
- **Missing**: Not AI-native. No agent profiles, no decision contracts, no model routing tables, no fallback chains. General-purpose data orchestrator with AI plugin

#### Oracle Agent Spec — Closest in Philosophy
- Framework-agnostic YAML spec, typed I/O schemas, multi-agent composition
- **Missing**: No schedules, no routing tables, no contracts with confidence thresholds, no operational hooks. Specification, not runtime

#### AgentForge Cogs — Closest on Workflow Mechanics
- True state machines in YAML with branching, fallback paths, loop prevention (max_visits)
- **Missing**: No scheduling, no typed contracts, no model routing, no phase reuse across workflows

### Tier A — YAML Exists But Requires Code Glue

| Tool | What's In YAML | What Requires Code |
|---|---|---|
| **CrewAI** | Agent role/goal/backstory (3 fields) | Model, tools, execution params, orchestration (26+ attrs) |
| **Semantic Kernel** | Agent type, model, instructions | Multi-agent orchestration |
| **Swarms** | Agent name, model, temperature | Swarm topology, tool integration |
| **Google ADK** | Agent model, instructions, sub-agents | Everything else |
| **Haystack** | Pipeline serialization | Agent loops, tool-calling |
| **SWE-agent** | Single agent prompt templates | No workflow system |

### Tier B — Visual-First (YAML is export artifact)

Dify.ai, n8n, LangFlow, Flowise, Coze, Botpress, Relevance AI

### Tier C — Code-Only (No Declarative Config)

Claude Code CLI, Devin, OpenHands, Aider, Cline/Roo Code, Devon, LangGraph, AutoGen (legacy), Agency Swarm, CAMEL-AI, MetaGPT, GPT-Engineer, DSPy, BabyAGI, SuperAGI, AgentGPT, Phidata, Letta

---

## Category 3: What AO Should Learn From Others

| Gap | Tool to Learn From | Priority |
|---|---|---|
| LLM provider breadth | Rig (20+ providers) — AO wraps only 5 CLI tools | Medium |
| Channel adapters (messaging) | OpenFang (40 adapters) — AO has no messaging integration | Low (not core) |
| Vector memory / semantic search | IronClaw/OpenFang — AO uses flat JSON, no vector store | Medium |
| Security depth | IronClaw (prompt injection defense), OpenFang (16 security systems) | High |
| Visual computer use | Open Computer Use / Screenpipe — AO can't interact with GUIs | Low |
| Portability | ZeroClaw (8.8MB, $10 hardware) — AO is heavier | Low |
| Framework-agnostic spec | Oracle Agent Spec — AO's YAML is AO-specific | Medium |

## Category 4: What Others Should Learn From AO

| AO Strength | Who Lacks It |
|---|---|
| Phase verdicts + rework loops (advance/rework/skip/fail with max_rework_attempts) | All — CrewAI/AutoGen have basic retry, not structured cross-agent review |
| Declarative workflow YAML (all 9 boxes) | All — each covers 1-3 boxes max |
| Dumb daemon + smart packs (Subject Dispatch Envelope) | OpenFang (domain logic baked into kernel) |
| Model routing by task type × complexity | All — most have per-agent model only |
| Phase catalog with reusable composition | All — AgentForge's Cogs are closest but single-workflow |
| Post-success hooks (merge strategy, auto-merge, cleanup) | All |
| Decision contracts with confidence thresholds and typed verdict fields | All |

---

## Honest Assessment: Rework Loops Specifically

The earlier claim that "no one else makes the rework loop bet" was overstated. Several tools have related patterns:

- **CrewAI**: Hierarchical mode where manager agent reviews worker output and can send back for revision
- **AutoGen**: Multi-agent conversation loops where critic evaluates and conversation continues until quality met
- **LangGraph**: Conditional edges for review-node-routes-back-to-implementation. DIY but documented
- **Devin**: Self-reviews and iterates before submitting (closed-source, can't verify mechanism)
- **SWE-agent / OpenHands**: Self-correction when tests fail (same agent retries, not cross-agent review)

**What IS genuinely distinctive about AO's approach:**
1. Formalized verdict taxonomy (advance/rework/skip/fail) — most have pass/fail at best
2. Configurable `max_rework_attempts` — explicit rework budgets, not unbounded retry
3. Structured rework context forwarding — reviewer's specific feedback passed to implementer
4. Phase pipeline + verdicts as YAML config, not code
5. Separation of reviewer and implementer as distinct agent profiles (different models, prompts, tools)

---

## Positioning Summary

```
                    Abstraction Level

    Platform/OS     ┌─────────┐  ┌─────────┐  ┌─────────┐
    (orchestrate    │   AO    │  │OpenFang │  │ZeroClaw │
     many agents)   │  CLI    │  │         │  │         │
                    └─────────┘  └─────────┘  └─────────┘

    Framework       ┌─────────┐  ┌─────────┐  ┌─────────┐
    (build agents)  │   Rig   │  │  Auto   │  │ Screen  │
                    │         │  │ Agents  │  │  pipe   │
                    └─────────┘  └─────────┘  └─────────┘

    SDK/Client      ┌─────────┐  ┌─────────┐
    (call LLMs)     │ async-  │  │  rust   │
                    │ openai  │  │ ai-buddy│
                    └─────────┘  └─────────┘

                    General ←──────────────→ Domain-Specific
                    Purpose                  (Software Eng)
```

AO sits at the platform tier, domain-specific to software delivery. Its bet: structured quality gates (phase verdicts + rework) produce better outcomes than unconstrained autonomous execution.

**Confidence: 95% that no existing tool combines all 9 capability boxes in a single declarative config file.**
