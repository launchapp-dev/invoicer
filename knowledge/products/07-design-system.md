# Design System

> Radix UI based design system

## `design-system` (private)

- **Package**: `@audiogenius/design-system` v0.1.0
- **Description**: Radix UI based design system for AudioGenius
- **Language**: TypeScript
- **Last updated**: 2026-03-19 (very recent — active)
- **Maturity**: Active development

## Purpose

A shared design system based on Radix UI primitives, providing consistent UI components across LaunchApp and AudioGenius products. The `@audiogenius/` namespace suggests this may be the internal brand name for the org's design system.

## Tech Stack

- TypeScript
- Radix UI (component primitives)
- Likely Tailwind CSS (based on org-wide usage)

## Usage in Org

Design system components are used across:
- `agent-orchestrator` desktop app (uses `lucide-react`, `class-variance-authority`, `tailwind-merge` — typical Radix UI setup)
- `launchpad-saas-template` (uses multiple `@radix-ui/*` packages)
- `launchapp-lite` (uses Shadcn UI, which is built on Radix UI)
- `launchapp-studio` (desktop IDE)

## Notes

- No README available in the repo
- Very recent activity (updated 2026-03-19) suggests active development
- The `@audiogenius/` namespace vs `@launchpad/` suggests this may serve both the AI product line and the BaaS platform
- Shadcn UI (used in templates) is built on top of Radix UI — this design system likely provides the configured, branded layer on top of Shadcn/Radix primitives
