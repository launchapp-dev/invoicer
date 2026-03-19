# launchapp-landing-v2

## Purpose
Landing page v2 for LaunchApp — a new iteration of the marketing/lead-gen landing page. Based on commit messages, this focuses on redesigning the landing page copy, implementing lead capture forms, and redesigning sections (benefits, "Who We Replace", etc.) with an AI-first positioning message.

## Repository
- **Repo**: launchapp-dev/launchapp-landing-v2 (private)
- **Last Pushed**: 2026-01-13

## Tech Stack
- **Monorepo**: Turborepo + pnpm workspaces (same project starter template)
- **Framework**: React Router v7, Shadcn UI, Tailwind CSS
- **Apps**: `apps/web`, `apps/native`, `apps/landing`
- **Additional**: pexels-mcp-server (images integration), Puppeteer for testing
- **Lead capture**: Database-backed lead form

## Key Differences vs launchapp.dev
- Includes `pexels-mcp-server` directory — custom MCP server for fetching stock photos from Pexels
- Multiple lead form test scripts (test-lead-form.js, test-form-submission.js, etc.)
- VOIDAI analysis documents — possibly studying competitor VoidAI for design inspiration
- LAUNCHAPP-DESIGN-AESTHETIC.md — specific design direction document
- Focus on lead generation with form submission tracking

## Notable Files
- `LEADGEN_IMPLEMENTATION_PLAN.md` — lead generation strategy
- `VOIDAI_BENEFITS_EXACT_ANALYSIS.md` — competitor analysis of VoidAI
- `Update_LandingPage_Copy.md` — copy update plan
- `landing-page-content.md` — content specification

## Relationship to Other Products
- Sibling to launchapp.dev — this is v2 of the marketing landing page
- Shares the same monorepo template stack
- May eventually replace or augment the landing section in launchapp.dev

## Maturity / Status
**Stalled / In Progress** — last pushed 2026-01-13. Landing page redesign with lead capture appears to have been paused before completion. Multiple test scripts suggest ongoing iteration before the push date.
