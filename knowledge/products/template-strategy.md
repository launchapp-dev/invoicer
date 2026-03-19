# Template Strategy: AO-Built Starters for Every Major Framework

## The Play

AO can provision a production SaaS template in days. Competitors hand-build one template for one framework. We build templates for **every major framework** — proving AO's capability while creating a multi-framework template catalog no competitor can match.

## Competitive Landscape

### Top Competitors (by framework)

| Competitor | Framework | Price | Key Feature | Weakness |
|---|---|---|---|---|
| **ShipFast** | Next.js | $199 | Largest community, conversion-optimized LP | No tests, no RBAC, no multi-tenancy |
| **Makerkit** | Next.js, Remix | $299 | Best billing abstraction (Stripe/Paddle/Lemon Squeezy) | Complex, Supabase-locked |
| **Supastarter** | Next.js, Nuxt, SvelteKit | $349 | Multi-framework, multi-tenancy | Expensive, Supabase-dependent |
| **SaaS Pegasus** | Django | ~$249 | Most mature Django option, RBAC | Python only, traditional stack |
| **Bullet Train** | Rails | Open-source + paid | Rich history, great docs | Ruby declining in startups |
| **Larafast** | Laravel | ~$199 | Full admin panel, social auth | PHP ecosystem shrinking |
| **LaunchFast** | Astro, Next.js, SvelteKit | $199 | SEO-first, multi-framework | Thin feature set |
| **Enferno** | Flask | Open-source | AI-optimized development | Small community |
| **BuilderHack** | Next.js | Budget | Essential SaaS features | Limited scope |

### What They All Have in Common
- Auth (OAuth, magic link, email/password)
- Payments (Stripe, sometimes Lemon Squeezy/Paddle)
- Database (Prisma/Drizzle/Django ORM)
- Email (Resend/Mailgun/SendGrid)
- Landing page + blog
- Tailwind CSS

### What NONE of Them Have
- **AI workforce that maintains the template after purchase** — this is our moat
- **Multi-model orchestration** — AO can build AND maintain each template
- **"Powered by AO" badge** — your template stays up-to-date because AO is watching

## LaunchApp Template Strategy

### Phase 1: Cover the Big 3 (Next 4-8 weeks)

AO builds starters for the three most popular SaaS frameworks:

| Template | Framework | Why | Compete With |
|---|---|---|---|
| **launchapp-nextjs** | Next.js (App Router) | 85%+ of SaaS market | ShipFast, Makerkit, Supastarter |
| **launchapp-nuxt** | Nuxt 4 | Growing Vue ecosystem | Supastarter (Nuxt) |
| **launchapp-sveltekit** | SvelteKit | Fastest-growing framework | Supastarter (SvelteKit) |

Each includes: auth (Better Auth), billing (Stripe + Polar), database (Drizzle + Postgres), email (Resend), admin dashboard, landing page, blog, i18n, analytics.

**Differentiator**: Every template ships with AO configured. Buyers get an AI workforce that maintains their fork — dependency updates, security patches, feature additions. No competitor offers this.

### Phase 2: SSR TypeScript Framework Variants (Weeks 8-16)

Same SaaS features, different SSR TypeScript meta-frameworks:

| Template | Framework | SSR Approach | Why |
|---|---|---|---|
| **launchapp-tanstack** | TanStack Start | Full-stack React, Vinxi | Newest contender, file-based routing, growing fast |
| **launchapp-solid** | SolidStart | Solid.js SSR | Blazing fast, reactive, TypeScript-native |
| **launchapp-astro** | Astro + React islands | Content-first SSR | Best for content-heavy SaaS, marketing sites |
| **launchapp-remix** | Remix (React Router 7) | Already exists as our flagship | Our home turf — React Router 7 + Hono |

### Phase 3: Vertical-Specific Templates (Weeks 16-24)

All TypeScript SSR, different verticals:

| Template | Vertical | Base Framework | Why |
|---|---|---|---|
| **launchapp-ai-saas** | AI/LLM apps | Next.js or RR7 | Hottest vertical, 30% of new SaaS |
| **launchapp-marketplace** | Two-sided platforms | Next.js | Complex auth + payments |
| **launchapp-ecommerce** | Storefronts | Next.js or Nuxt | High demand, proven market |
| **launchapp-internal** | Admin/internal tools | React Router 7 | Enterprise need |

### Phase 4: The Full Catalog

Every template in the `create-launchapp` CLI — all pure SSR TypeScript:
```
create-launchapp --template react-router    # Our flagship (Hono + Better Auth)
create-launchapp --template nextjs          # App Router + RSC
create-launchapp --template nuxt            # Vue 3 + Nitro
create-launchapp --template sveltekit       # Svelte 5 + SSR
create-launchapp --template tanstack        # TanStack Start + Vinxi
create-launchapp --template solid           # SolidStart
create-launchapp --template astro           # Astro + React islands
create-launchapp --template ai-saas         # AI vertical (any framework)
create-launchapp --template marketplace     # Two-sided (any framework)
create-launchapp --template ecommerce       # Storefront (any framework)
```

### Why Pure SSR TypeScript Only

- **One language, full stack** — TypeScript everywhere, no context switching
- **SSR is table stakes** — SEO, performance, streaming, RSC/server components
- **AO works best with TypeScript** — type-safe code generation, better agent output
- **Market consolidation** — 90%+ of new SaaS startups use TypeScript
- **No Django/Rails/Laravel/PHP** — different ecosystems, different toolchains, fragmented effort. Focus wins.

## Pricing Strategy

| Tier | Price | Includes |
|---|---|---|
| **Starter** | $149 | Template + 1 year of AO updates |
| **Pro** | $249 | Template + lifetime AO updates + priority support |
| **Team** | $499 | Template + lifetime + team license (5 seats) + private Discord |
| **All-Access** | $999 | Every template, every framework, lifetime updates |

Compare: ShipFast $199 (one template, no AI updates), Supastarter $349 (three frameworks, no AI), Makerkit $299 (one framework).

**Our edge**: "Buy once, AO maintains it forever. Your dependencies are always current, your security patches are always applied, your template evolves with the framework."

## How AO Builds Each Template

1. Start from the existing `launchapp-lite` or `saas-template-launch-app-test` as the reference
2. AO creates a new repo: `gh repo create launchapp-dev/launchapp-<framework>`
3. AO scaffolds the framework-specific structure
4. AO ports core features: auth, billing, email, database, landing page
5. AO adapts to framework conventions (file-based routing, server components, etc.)
6. AO sets up its own daemon in the repo for ongoing maintenance
7. Brain tracks the template in knowledge/products/ and knowledge/repos/

Each template is a proof point for AO AND a revenue source. The flywheel spins faster with each one.

## Sources

- [BoilerplateHub — Best SaaS Boilerplates](https://boilerplatehub.com)
- [Supastarter — Best SaaS Boilerplates 2026](https://supastarter.dev/best-saas-boilerplate-2026)
- [MakerKit vs ShipFast Comparison](https://makerkit.dev/makerkit-vs-shipfast)
- [ShipFast Review 2026](https://dupple.com/tools/shipfast)
- [SaaS Pegasus Guide](https://www.saaspegasus.com/guides/saas-boilerplates-and-starter-kits/)
- [StarterIndex — 895 SaaS Boilerplates](https://starterindex.com/saas-boilerplates)
