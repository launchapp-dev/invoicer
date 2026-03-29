# AI Coding Model Rankings

**Snapshot date:** 2026-03-26
**Sources:** kilo.ai/leaderboard, llm-stats.com, labs.scale.com/leaderboard

## Top 10 Coding Models (by composite performance)

| Rank | Model | Provider | SWE-bench Verified | Code Arena | Notes |
|------|-------|----------|-------------------|------------|-------|
| 1 | Claude Opus 4.6 | Anthropic | 81.4% | 2,002 | Top overall; dominates orchestrator/planning |
| 2 | Gemini 3.1 Pro Preview | Google | 80.6% | 1,855 | 1M context, strong GPQA (94.3%) |
| 3 | MiniMax M2.5 | MiniMax | 80.2% | — | Free tier; top code-gen usage share |
| 4 | GPT 5.2 | OpenAI | 80.0% | — | Leads Scale private-repo SWE-bench (23.81) |
| 5 | GPT 5.4 | OpenAI | — | 1,666 | 1M context; top SWE Atlas codebase QnA (35.48) |
| 6 | Claude Sonnet 4.6 | Anthropic | — | — | $3/1M tokens; strong debug share |
| 7 | MiniMax M2.7 | MiniMax | — | — | 56.2% SWE-Pro; cost-effective |
| 8 | GLM-5 | Z.ai | — | — | Production-grade; budget option |
| 9 | Grok Code Fast 1 | xAI | — | — | 23.7 coding index; speed-focused |
| 10 | Claude Sonnet 4.5 | Anthropic | — | — | 38.6 coding index; proven workhorse |

## Rankings by Task Type (kilo.ai weekly usage share)

### Architect Mode
1. mimo-v2-pro (25%)
2. Claude Opus 4.6 (16%)
3. MiniMax M2.5 (12%)

### Code Generation
1. kilo-auto-free (25%)
2. MiniMax M2.5 (24%)
3. mimo-v2-pro (9%)

### Debug/Troubleshooting
1. MiniMax M2.5 (22%)
2. kilo-auto-free (20%)
3. Claude Sonnet 4.6 (10%)

### Orchestrator/Planning
1. Claude Opus 4.6 (22%)
2. Claude Sonnet 4.6 (13%)
3. MiniMax M2.5 (12%)

## Scale AI SWE-Bench Pro (Public Repos)

1. Claude Opus 4.5 — 45.89
2. Claude Sonnet 4.5 — 43.6
3. Gemini 3 Pro Preview — 43.3
4. Claude Sonnet 4 — 42.7
5. GPT 5.2 (High) — 41.78

## Scale AI SWE Atlas – Codebase QnA

1. GPT 5.4 (xHigh, Codex CLI) — 35.48
2. Claude Opus 4.6 Thinking (Claude Code) — 31.5
3. GPT 5.2 (High, SWE-Agent) — 29.03

## Price-Performance Comparison

| Model | Input $/1M | Output $/1M | Context | Value Tier |
|-------|-----------|-------------|---------|------------|
| Claude Opus 4.6 | $5.00 | $25.00 | 200K | Premium |
| Gemini 3.1 Pro | $2.50 | $15.00 | 1M | High value |
| GPT 5.4 | $2.50 | $15.00 | 1M | High value |
| Claude Sonnet 4.6 | $3.00 | ~$15.00 | 200K | Mid-tier |
| MiniMax M2.5 | Free | Free | — | Budget leader |
| Qwen 3.5-397B | ~$0.60 | ~$1.00 | — | Open-source budget |
| GLM-5 | ~$0.60 | ~$1.00 | — | Open-source budget |

## Comparison Against Our Current Model Routing

**Current routing (from .ao/workflows/custom.yaml and knowledge/repos/ao-cli.md):**
- Default/most agents: `kimi-for-coding` (Kimi by Moonshot)
- Feature/build: Claude Sonnet
- UI work: Gemini
- Analytical/system judgment: Codex GPT-5.4
- Model-ranker: Claude Opus 4.6
- Some repo agents: MiniMax M2.7, Claude Sonnet 4.6

### Assessment

1. **kimi-for-coding (default for 30+ agents):** Kimi does not appear in any top-10 coding leaderboard across kilo.ai, llm-stats, or Scale AI. MiniMax M2.5 (free, 80.2% SWE-bench) and Gemini 3.1 Pro ($2.50/1M, 80.6% SWE-bench) significantly outrank it on all benchmarks. This is the highest-impact routing gap.

2. **Codex GPT-5.4 for analytical roles:** Confirmed strong — leads SWE Atlas codebase QnA (35.48). Good fit for PR review, code review, reconciler.

3. **Claude Sonnet for features:** Solid choice. Claude Sonnet 4.6 ranks well in debug usage and orchestrator modes.

4. **Gemini for UI:** Gemini 3.1 Pro is now #2 overall in Code Arena (1,855) with the highest GPQA (94.3%). Excellent fit, and at $2.50/1M input it's cost-effective.

5. **MiniMax M2.7 in launchapp-sveltekit:** MiniMax M2.5 outperforms M2.7 on SWE-bench (80.2% vs implied lower). Consider upgrading to M2.5.

### Recommendations

- **Evaluate replacing `kimi-for-coding` default** with MiniMax M2.5 (free, 80.2% SWE-bench) or Gemini 3.1 Pro ($2.50/1M, 80.6%) for the 30+ agents currently using it. This is the single biggest potential quality uplift.
- **Evaluate MiniMax M2.5 for code-gen heavy agents** — it leads kilo.ai code-gen usage (24%) and is free.
