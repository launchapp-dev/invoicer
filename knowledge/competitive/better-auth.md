# Better Auth — Competitive Landscape

> Last updated: 2026-03-18

## Competitors Tracked

- Auth.js / NextAuth
- Lucia (deprecated)
- Clerk
- WorkOS

---

## Better Auth

**Status:** Emerging leader among open-source auth libraries; strong momentum.

### Funding
- Raised **$5M** from Peak XV and Y Combinator.

### Key Features
- TypeScript-first, framework-agnostic (Next.js, SvelteKit, Remix, etc.)
- Fully typed API with excellent IDE support.
- Extensible plugin architecture (OAuth, 2FA, passkeys, RBAC, etc.)
- Database-agnostic (PostgreSQL, MySQL, SQLite; works with ORMs).
- MIT licensed; self-hosted.
- Supports: email/password, OAuth, magic links, passkeys.

### Competitive Position
- Compared to NextAuth: removes configuration boilerplate; more modern API.
- Compared to Clerk: no vendor lock-in; self-hosted; framework-agnostic.
- Community growing faster than any JS library in recent memory — developers who try it tend to adopt it.

### Strengths vs. Competitors
| Feature | Better Auth |
|---------|-------------|
| Self-hosted | ✅ |
| 2FA / MFA | ✅ |
| RBAC | ✅ |
| Passkeys | ✅ |
| Framework agnostic | ✅ |
| Pricing | Free (MIT) |
| Enterprise SSO | Via plugin |
| Vendor lock-in | None |

### Weaknesses
- Newer library; smaller community vs. NextAuth and Clerk.
- No pre-built UI components (unlike Clerk).
- Enterprise SSO requires plugin configuration (not built-in like WorkOS/Clerk).

---

## Auth.js / NextAuth v5

**Status:** Established, widely used, actively evolving; not a direct replacement threat.

### Key Changes (v5 / 2025 Rewrite)
- Universal `auth()` function compatible across all Next.js contexts (App Router, Pages, middleware).
- Edge-first: compatible with Vercel Edge Runtime, Cloudflare Workers.
- Framework-agnostic positioning (SvelteKit, Remix portability).
- 80+ OAuth provider integrations.

### Weaknesses
- No built-in 2FA, passkeys, or RBAC — must implement manually.
- Fragmented v5 migration with breaking changes.
- Configuration-heavy and boilerplate-heavy compared to Better Auth.

---

## Clerk

**Status:** Dominant managed auth; significant pricing overhaul in 2026.

### February 2026 Pricing Update
**What got better:**
- Free tier raised from 10,000 to **50,000 Monthly Retained Users** — major competitive improvement.
- Unlimited applications on every plan (previously per-app upgrade required).
- Enhanced Authentication Add-on eliminated; most features now in **Pro ($20/month)**.
- 5 impersonations/month now free.
- Annual billing discount now available.

**What got more expensive:**
- **4+ dashboard seats** now requires Business Plan (**$250/month**).
- **SAML/OIDC Enterprise Connections** are now metered (not unlimited) on Pro.
- **SOC 2 / HIPAA compliance artifacts** require Business Plan.
- M2M token usage billing starts March 16, 2026.

### New Features
- **M2M Tokens as JWTs:** Networkless verification; free JWT verification (no per-call cost to Clerk).
- **Enterprise Connections API:** Full SAML and OIDC management via Backend API.
- **X/Twitter Login:** Email now returned automatically (no manual prompt).
- **Chrome Extension SDK:** Vanilla JS support via `createClerkClient()`.

### Strengths
- Fastest time-to-market; pre-built UI components.
- MFA, user dashboards, RBAC, email verification all out-of-box.
- 5,300+ production deployments, 10M+ users.

### Weaknesses
- Closed-source; vendor lock-in (user data stored by Clerk).
- Expensive at scale for enterprise teams needing multiple seats.
- Reports of downtime and redirect issues on custom login pages.

---

## WorkOS

**Status:** Enterprise-only; best-in-class for B2B SaaS SAML/SCIM.

### Key Features
- SAML SSO, SCIM provisioning, directory sync — all out of the box.
- Designed for B2B SaaS selling to enterprise customers.
- Multi-tenancy, advanced RBAC.

### Weaknesses
- Overkill (and expensive) for smaller projects or consumer apps.
- Less useful for individual developer or startup use cases.

---

## Lucia Auth

**Status:** DEPRECATED as of March 2025.

- Library officially deprecated; transitioning to educational resources only.
- **Not suitable for any production use.**
- Developers migrating to Better Auth or Auth.js v5.

---

## Market Trends (2025–2026)

1. **Lucia's deprecation** created a void that Better Auth is filling.
2. **Clerk's 50K free MAU** makes it more competitive for early-stage startups.
3. **Better Auth gaining fast adoption** as recommended choice for new TypeScript projects.
4. **Framework-agnostic** auth is increasingly important as teams mix Next.js, SvelteKit, Remix.
5. **Passkeys** becoming a standard expectation; Auth.js v5 still lacks native support.

## Competitive Gaps & Opportunities

| Area | Insight |
|------|---------|
| Better Auth has momentum as OSS winner post-Lucia | Community-driven growth, positive developer sentiment |
| Clerk's 50K free MAU narrows gap for early startups | More competitive in the indie/early-stage market |
| Clerk's enterprise pricing is high | Business Plan at $250/mo may push teams toward self-hosted |
| WorkOS is B2B only — irrelevant for consumer apps | Narrow addressable market |
| Better Auth plugin ecosystem needs growth | Enterprise SSO via plugins is less turnkey than WorkOS/Clerk |
