# Competitive Landscape

> Last updated: 2026-03-18. Maintained by the competitive-researcher agent.

## Product Areas Tracked

- **[LaunchPad BaaS](./launchpad-baas.md)** vs Supabase, Firebase, Appwrite, Nhost, Convex
- **[AO Agent Orchestrator](./ao-agent-orchestrator.md)** vs Devin, Factory, Sweep, CodeGen agents
- **[Better Auth](./better-auth.md)** vs Auth.js/NextAuth, Lucia, Clerk, WorkOS
- **[LaunchApp SaaS Templates](./launchapp-saas-templates.md)** vs ShipFast, Makerkit, Supastarter
- **[Claude Code Plugins](./claude-code-plugins.md)** vs Cursor extensions, Cody, Continue.dev

---

## Key Highlights (March 2026)

### LaunchPad BaaS
- **Supabase** raised $100M at $5B valuation (October 2025); now at 4M+ developers. Aggressively expanding into AI-native tooling, analytics, and enterprise.
- **Firebase** requires Blaze plan for Cloud Storage as of February 2026 — affecting free-tier projects.
- **Appwrite** continues strong self-hosting story with budget caps (Firebase's weakness).
- **Convex** open-sourced backend; added AI code generation and 80+ OAuth providers.

### AO Agent Orchestrator
- **Devin** (Cognition) raised $400M+ at $10.2B valuation; acquired Windsurf; launched $20/month plan.
- **Factory** raised $50M; "Droids" ranked #1 on Terminal Bench; serving Goldman Sachs, Nvidia, MongoDB.
- **Sweep** remains narrow (PR generation only) — not expanding into full agentic workflows.
- Trend: Engineers moving from code-writing to orchestrating AI agent teams.
- **NEW (2026-03-19):** Deep dive across 40+ tools confirms AO's workflow YAML is unique — no other tool combines agent profiles, phase pipelines, decision contracts, model routing, cron, and fallback chains in a single declarative file. See [ao-rust-ecosystem-deep-dive.md](./ao-rust-ecosystem-deep-dive.md).

### Better Auth
- **Better Auth** raised $5M (Peak XV + YC); fastest-growing JS auth library; Lucia deprecation creating tailwind.
- **Lucia** officially deprecated March 2025 — not production-ready.
- **Clerk** overhauled pricing Feb 2026: 50K free MAU (up from 10K); Business Plan now $250/month for team features.
- **Auth.js v5** still lacks native 2FA, passkeys, RBAC — increasingly outclassed by Better Auth.

### LaunchApp SaaS Templates
- **Supastarter** adopted Better Auth + Drizzle — most modern stack among B2B templates.
- **ShipFast** remains dominant for solo founders; no multi-tenancy.
- **Makerkit** most actively maintained (daily updates); deepest Supabase + AI integration.
- App Router (Next.js) now 85%+ of all templates; Drizzle ORM gaining vs. Prisma.

### Claude Code Plugins
- Claude Code plugin ecosystem: **9,000+ plugins** across official + community marketplaces.
- **Cursor** Pro at $20/month; acquired Windsurf — growing enterprise ambitions.
- **Cody** (Sourcegraph) best for enterprise multi-repo governance + compliance.
- **Continue.dev** 20,000+ GitHub stars; best cost/privacy option for local models.
