# Websites

> launchapp.dev, codeby.ai, lostcause.com

## Overview

The org maintains several websites/web properties. Most are built on similar stacks (React Router v7 or Next.js, TypeScript).

---

## `launchapp.dev` (private)

- **Purpose**: Main product website for LaunchApp platform
- **Stack**: TypeScript, Drizzle ORM, Zod (package name: `launchapp.dev`)
- **Last updated**: 2025-11-22
- **Status**: Maintenance / outdated (v2 landing in separate repo)

### Notes

The README shows this is the `launchapp-lite` monorepo structure (React Router v7, React Native/Expo, Hono API). The domain-named repo seems to be the actual web app rather than just a marketing site. The `launchapp.dev-landing` repo (private, last updated 2025-05-23) appears to be the older landing page.

`launchapp-landing-v2` (private, updated 2026-01-13) appears to be the current active landing page development.

---

## `codeby.ai` (private)

- **Purpose**: codeby.ai web product
- **Stack**: TypeScript (same monorepo structure as launchapp.dev)
- **Last updated**: 2025-06-11
- **Status**: Maintenance (no updates in 9 months)

### Notes

The README shows the same "Project Starter Monorepo" structure as `launchapp.dev`, suggesting it was scaffolded from the same template. No unique product description available.

---

## `lostcause.com` (private)

- **Purpose**: lostcause.com web property
- **Stack**: TypeScript (same monorepo structure)
- **Last updated**: 2025-08-12
- **Status**: Maintenance

### Notes

Same template structure as the other websites. No unique product description available.

---

## Related Website Repos

| Repo | Description | Status |
|------|-------------|--------|
| `launchapp.dev-landing` | Original launchapp.dev landing page | Archived/maintenance |
| `launchapp-landing-v2` | v2 landing page | Active development (updated 2026-01-13) |
| `aethris-landing` | Landing for "Aethris" product | Abandoned (2025-03-06) |
| `site-inspector-landing` | Site inspector pro landing | Abandoned (2025-03-17) |
| `landing-siteinspector-pro` | Site inspector pro landing v2 | Abandoned (2025-03-12) |
| `mymoku.net` | mymoku.net web app | Maintenance (2026-03-12) |

---

## Tech Stack (Common)

All websites share a similar stack:
- TypeScript
- React Router v7 or Next.js
- Tailwind CSS
- Hono (API layer)
- Drizzle ORM / Supabase
- pnpm workspaces + Turborepo
