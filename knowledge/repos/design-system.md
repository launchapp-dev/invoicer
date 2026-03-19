# design-system

**Repo**: `launchapp-dev/design-system`
**Visibility**: Private
**Language**: TypeScript
**Package**: `@audiogenius/design-system` v0.1.0
**Last updated**: 2026-03-19 (very active)

## Purpose

Shared design system based on Radix UI primitives, providing consistent UI components across LaunchApp and AudioGenius products. The branded, configured layer on top of Shadcn UI / Radix UI.

## Tech Stack

- TypeScript
- Radix UI (component primitives)
- Tailwind CSS (styling)
- Likely: class-variance-authority, tailwind-merge, lucide-react

## Usage in Org

| Consumer | How Used |
|----------|---------|
| `agent-orchestrator` | Desktop app UI components |
| `launchpad-saas-template` | Template UI components |
| `launchapp-lite` | Via Shadcn UI (Radix-based) |
| `launchapp-studio` | Desktop IDE components |

## Notes

- The `@audiogenius/` namespace (vs `@launchpad/`) suggests it predates or serves both the AI product line and the BaaS platform
- No public README available
- Very recent activity (updated 2026-03-19) — actively being developed

## Current Status: Active Development
