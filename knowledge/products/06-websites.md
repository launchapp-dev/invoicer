# Websites

> launchapp.dev, mymoku.net, codeby.ai, lostcause.com, and related properties

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

- **Purpose**: Anime audition/submission platform — allows up to 3 file submissions per user per audition
- **Stack**: TypeScript (same monorepo structure)
- **Last updated**: 2025-08-12
- **Status**: Low activity — some real feature work but sparse commits

---

## `mymoku.net` (private)

- **Purpose**: Yelp-style local business discovery app ("My Moku"). Mobile-first with privacy policy/terms pages. Business chat handler with carousel/map/list view markdown directives.
- **Stack**: TypeScript, React Router v7 (web), Expo React Native (mobile), Hono API, Better Auth, Drizzle ORM, NativeWind/Tailwind
- **Last updated**: 2026-03-12
- **Status**: Active development — most recently updated product app in the org
- **Notes**: `moku-demo` and `mymoku-demo` repos are earlier prototypes of this product

---

## `codeby.ai` (private)

- **Purpose**: Placeholder/very early start on an AI coding product. No description. README is generic template.
- **Stack**: TypeScript (same monorepo structure)
- **Last updated**: 2025-06-11
- **Status**: Essentially empty — single initial commit, likely abandoned

---

## Related Website Repos

| Repo | Description | Status |
|------|-------------|--------|
| `launchapp.dev-landing` | Original launchapp.dev landing page | Stale (2025-05-23) |
| `launchapp-landing-v2` | v2 landing page | Active development (2026-01-13) |
| `aethris-landing` | Landing for "Aethris" product | Abandoned (2025-03-06) |
| `site-inspector-landing` | Site inspector pro landing | Abandoned (2025-03-17) |
| `landing-siteinspector-pro` | Site inspector pro landing v2 | Abandoned (2025-03-12) |

---

## Tech Stack (Common)

All websites share a similar stack:
- TypeScript
- React Router v7 or Next.js
- Tailwind CSS
- Hono (API layer)
- Drizzle ORM / Supabase
- pnpm workspaces + Turborepo
