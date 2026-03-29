# Websites

> launchapp.dev, mymoku.net, codeby.ai, lostcause.com, and related properties

## Overview

The org maintains several websites/web properties. Most are built on similar stacks (React Router v7 or Next.js, TypeScript).

---

## `launchapp.dev` (private)

- **Purpose**: Full-stack monorepo serving as the main LaunchApp product website AND canonical template for other org projects
- **Stack**: TypeScript, Turborepo + pnpm, React Router v7, Expo React Native, Hono API, Better Auth, Drizzle ORM, Pulumi (ECS/RDS)
- **Last updated**: 2026-03-28
- **Status**: Active development — serves as live marketing site + template baseline

### Key Capabilities
- Monorepo with: React web app (apps/web), React Native mobile (apps/native), marketing site (apps/landing)
- Shared packages: API (Hono), authentication (Better Auth), database (Drizzle), email (Resend), push notifications, storage (S3)
- Infrastructure: Pulumi deployment, OpenAPI code generation, admin user management
- Used as canonical template by mymoku.net, launchapp-landing-v2, launchapp-images, bluelight-poc

### Recent Activity (2026-03-20)
- Dependency updates: better-auth upgraded from 1.2.12 to 1.3.26
- Auto-linting fixes and active maintenance

---

## `codeby.ai` (private)

- **Purpose**: codeby.ai web product
- **Stack**: TypeScript (same monorepo structure as launchapp.dev)
- **Last updated**: 2026-03-23
- **Status**: Active

### Notes

The README shows the same "Project Starter Monorepo" structure as `launchapp.dev`, suggesting it was scaffolded from the same template. Recently active with regular pushes.

---

## `lostcause.com` (private)

- **Purpose**: Anime audition/submission platform — allows up to 3 file submissions per user per audition
- **Stack**: TypeScript (same monorepo structure)
- **Last updated**: 2026-03-23
- **Status**: Active

---

## `mymoku.net` (private)

- **Purpose**: Yelp-style local business discovery app ("My Moku"). Mobile-first with privacy policy/terms pages. Business chat handler with carousel/map/list view markdown directives.
- **Stack**: TypeScript, React Router v7 (web), Expo React Native (mobile), Hono API, Better Auth, Drizzle ORM, NativeWind/Tailwind
- **Last updated**: 2026-03-20
- **Status**: Active development — most recently updated product app in the org
- **Notes**: `moku-demo` and `mymoku-demo` repos are earlier prototypes of this product

---

Same template structure as the other websites. Recently active with regular pushes.

---

## Related Website Repos

| Repo | Description | Status |
|------|-------------|--------|
| `launchapp.dev-landing` | Original launchapp.dev landing page | Stale (2025-05-23) |
| `launchapp-landing-v2` | v2 landing page | Active development (2026-01-13) |
| `aethris-landing` | Landing for "Aethris" product | Abandoned (2025-03-06) |
| `site-inspector-landing` | Site inspector pro landing | Abandoned (2025-03-17) |
| `landing-siteinspector-pro` | Site inspector pro landing v2 | Abandoned (2025-03-12) |
| `mymoku.net` | mymoku.net web app | Active (2026-03-20) |

---

## Tech Stack (Common)

All websites share a similar stack:
- TypeScript
- React Router v7 or Next.js
- Tailwind CSS
- Hono (API layer)
- Drizzle ORM / Supabase
- pnpm workspaces + Turborepo
