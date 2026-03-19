# figma-pack

> Claude Code plugin pack: Figma

## Purpose

Figma design token extraction, component specs, design-to-code workflows

## Visibility: Private
## Maturity: Active Development
## Last Updated: 2026-03-16

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/component-spec` | Generate a spec sheet for a Figma component |
| `/export-assets` | Export assets from a Figma file |
| `/extract-tokens` | Extract design tokens (colors, typography, spacing) from Figma |
| `/list-components` | List all components in a Figma file or library |
| `/style-guide` | Generate a style guide from Figma styles |

## Subagents

| Agent | Purpose |
|-------|---------|
| `design-reviewer` | Review designs for consistency and accessibility |
| `design-to-code` | Convert Figma component specs to code |

## Installation

```
claude plugin add launchapp-dev/figma-pack
```

## Notes

- Part of the LaunchApp Claude Code plugin pack suite (15 packs total, released 2026-03-16/17)
- READMEs reference `AudioGenius-ai/` install path — use `launchapp-dev/` instead
- MIT licensed, private repo
