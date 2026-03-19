# ollama-pack

> Claude Code plugin pack: Ollama

## Purpose

Local LLM inference, model management, prompt testing via Ollama

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-17

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/benchmark` | Benchmark inference speed and throughput for a model |
| `/chat-local` | Start an interactive chat with a local Ollama model |
| `/embeddings` | Generate text embeddings using a local model |
| `/models` | List locally available Ollama models |
| `/prompt-test` | Test a prompt against one or more local models |
| `/pull-model` | Pull a model from the Ollama registry |

## Subagents

| Agent | Purpose |
|-------|---------|
| `model-evaluator` | Evaluate and compare local model outputs for a task |
| `prompt-optimizer` | Iteratively optimize prompts for local model performance |

## Installation

```
claude plugin add launchapp-dev/ollama-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
