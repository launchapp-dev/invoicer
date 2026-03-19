# research-pack

> Claude Code plugin pack: Research

## Purpose

Web search, docs lookup, citation management via Brave/Tavily/Context7

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/changelog` | Look up the changelog for a library or package |
| `/compare-libs` | Compare two or more libraries side by side |
| `/find-examples` | Find code examples for a library or API |
| `/lookup-docs` | Look up official documentation for a tool or library |
| `/research` | Run a deep web search on a topic |

## Subagents

| Agent | Purpose |
|-------|---------|
| `deep-researcher` | Conduct multi-step research and produce a structured report |
| `docs-assistant` | Answer questions by searching and synthesizing documentation |

## Installation

```
claude plugin add launchapp-dev/research-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
