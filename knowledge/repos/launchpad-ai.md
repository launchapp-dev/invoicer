# launchpad-ai

**Package:** `@launchpad/ai`
**Version:** 0.1.0
**Repo:** launchapp-dev/launchpad-ai (private)
**Language:** TypeScript
**Last pushed:** 2025-12-12
**Status:** Stable

## Purpose

Standalone AI SDK providing a unified provider abstraction over OpenAI and Anthropic. Supports streaming via async generators, embeddings for RAG/similarity use cases, per-tenant usage tracking, and tool/function calling. Includes a context builder for schema-aware prompt construction.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **AI providers:** OpenAI SDK, Anthropic SDK
- **Build:** tsup
- **Linting:** Biome
- **Testing:** Vitest + coverage-v8

## Key Dependencies

| Dependency | Role |
|---|---|
| `openai` | OpenAI API client |
| `@anthropic-ai/sdk` | Anthropic API client |

## API Surface

- `AIService` — main service class
- `InMemoryUsageTracker` — per-tenant token/cost tracking
- `chat(tenantId, options)` — single completion
- `chatStream(tenantId, options)` — async generator streaming
- `embed(tenantId, text)` — text embedding generation
- Tool/function calling support
- Context builder for structured prompt assembly
- Provider switching per request (not just global default)
- `MockProvider` — deterministic testing

## Supported Providers

| Provider | Models |
|---|---|
| OpenAI | gpt-4-turbo-preview, etc. |
| Anthropic | claude-3-opus-20240229, etc. |

## Maturity

Stable. Most recent work (Dec 2025) was fixing Biome lint errors for CI compatibility — no new features. Core multi-provider abstraction, streaming, and usage tracking are complete. Model names in README are slightly dated (opus-20240229) suggesting the docs haven't been updated to latest Anthropic models.

## Notes

- Usage tracking is per-tenant — supports SaaS cost attribution
- Embeddings support enables RAG workflows without an additional library
- Model IDs are hardcoded in README examples but `defaultModel` is configurable
- No LangChain/LlamaIndex dependency — intentionally minimal abstraction
