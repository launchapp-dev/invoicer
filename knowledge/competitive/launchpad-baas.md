# LaunchPad BaaS — Competitive Landscape

> Last updated: 2026-03-18

## Competitors Tracked

- Supabase
- Firebase
- Appwrite
- Nhost
- Convex

---

## Supabase

**Status:** Strong growth, well-funded, aggressive feature expansion.

### Funding
- **Series E (October 2025):** $100M at **$5B valuation**, led by Accel and Peak XV. Figma Ventures joined.
- Total raised: ~$500M. Valuation grew 500%+ in ~1 year.
- User base: grew from 1M to **4M+ developers** in the last year.

### New Features (2025–2026)
- **Multigres:** Enterprise-scale horizontal Postgres scaling with intelligent sharding. Hired Sugu Sougoumarane (Vitess co-creator) to lead.
- **Analytics Buckets:** Apache Iceberg + AWS S3 Tables for columnar analytical workloads, Postgres-compatible. Public alpha.
- **Vector Buckets:** Amazon S3 Vectors for cold embedding storage + query engine. Public alpha.
- **Identity Provider:** Projects can now act as OAuth providers ("Sign in With [Your App]").
- **Stripe Sync Engine:** One-click Supabase + Stripe integration; query subscriptions/invoices via SQL.
- **AWS Marketplace:** Supabase now purchasable via AWS spend commits.
- **PostgREST v14:** ~20% more RPS for GET requests; schema cache loading 7min → 2sec.
- **Node.js Edge Functions:** Legacy Node.js apps can now deploy as Supabase Edge Functions.
- **BKND Acquisition:** Creator joined to build a Lite offering for agentic workloads.
- **Hydra Acquisition:** Team joined to build Supabase Warehouse using pg_duckdb (600x faster analytics).
- **AI Rules:** 30 rules across 8 categories teaching AI agents (Claude Code, Cursor, Copilot) correct Postgres usage.

### Pricing
- Free: 500MB DB, 1GB storage, 50,000 MAU
- Pro: $25/month — 8GB DB, 100,000 MAU
- Team: $599/month
- Enterprise: custom

### Gaps / Threats
- Supabase is moving aggressively into AI-native tooling, analytics, and enterprise — directly competing with Firebase and adding proprietary capabilities that go beyond OSS Postgres.
- The BKND "agentic workloads" Lite offering signals intent to own AI/agent backend use cases.
- AI coding rules integration with Claude Code, Cursor, etc. is a distribution moat.

---

## Firebase (Google)

**Status:** Mature, stable, tightly integrated with Google AI ecosystem.

### Notable 2026 Change
- **Storage now requires Blaze (pay-as-you-go) plan** for new default Cloud Storage buckets as of early February 2026. Projects previously on free tier are affected.

### Pricing Model
- Pure pay-as-you-go — no budget caps. Difficult to predict costs at scale.
- No self-hosting option.

### Strengths
- Deep integration with Google Cloud, Gemini, Vertex AI, Genkit.
- Best for mobile-first apps and teams in the Google ecosystem.

### Weaknesses
- Closed-source; no self-hosting; vendor lock-in.
- NoSQL-only (Firestore); not suitable for relational data.
- Unpredictable billing; no budget caps.
- Slow to innovate on developer UX vs. Supabase/Appwrite.

---

## Appwrite

**Status:** Growing, strong self-hosting story, competitive cloud offering.

### Key Differentiators
- Self-hostable via Docker; full infrastructure control.
- Supports 10+ function runtimes (JS, Python, PHP, Dart, etc.) vs. Supabase's TypeScript-only.
- Budget caps on cloud plans — addresses the "runaway costs" problem Firebase has.
- Full-stack: deploy frontend + backend from one platform.

### Pricing
- Transparent tiered pricing with clear overage rates and **budget caps**.
- Free, Starter, Scale, and Enterprise plans available.

### Weaknesses
- Document-based database (not relational SQL); less suited for complex data models.
- Smaller community and ecosystem vs. Supabase/Firebase.

---

## Nhost

**Status:** Niche, GraphQL-first, Hasura-powered.

### Key Features
- Postgres + Hasura GraphQL + authentication + file storage.
- Git-based CI/CD for schema changes.
- Integrates with Auth0, Clerk, Datadog, etc.

### Pricing (updated September 2025)
- Free: 1GB DB, 1GB storage, 5GB bandwidth (projects pause after 7 days inactivity)
- Pro: **$25/month per project** — 2TB bandwidth, 1.75M DB reads, 750K writes

### Weaknesses
- Limited to GraphQL-first teams; less appealing to REST-first or RPC developers.
- Smaller ecosystem; less momentum vs. Supabase.

---

## Convex

**Status:** Differentiated reactive backend; strong for real-time and AI apps.

### Key Features
- TypeScript-native reactive database with automatic caching, real-time queries.
- Built-in RAG components and hybrid ranking for AI/LLM integration.
- Open-sourced backend (FSL-1.1-Apache-2.0).
- 2025: Added built-in AI code generation + 80+ OAuth providers.

### Pricing
- Free: 1M function calls/month
- Pro: **$25/member/month** — 25M function calls/month
- Startup program: up to 1 year free Professional plan.
- EU hosting available (+30% surcharge).

### Weaknesses
- NoSQL, non-relational — unsuitable for apps needing SQL.
- Per-seat pricing model scales more expensively for large teams.

---

## Market Trends (2025–2026)

1. **Open-source wins:** 85%+ of developer-recommended BaaS platforms are open-source (Supabase, Appwrite, Nhost, Convex).
2. **Predictable pricing:** Budget caps and tiered pricing beating pay-as-you-go (Firebase's weakness).
3. **AI-native backends:** Vector storage, embedding support, and AI tool integrations are now table-stakes.
4. **Self-hosting:** Growing demand for self-hostable options, especially for enterprises and compliance.
5. **Vibe coding / AI-generated apps:** Supabase's growth explicitly attributed to "vibe coding soars" — AI-generated apps need reliable BaaS.

## Competitive Gaps & Opportunities

| Area | Status |
|------|--------|
| Supabase has relational SQL + open-source + best ecosystem | Strongest competitor |
| Firebase has Google AI stack (Gemini/Vertex) | Closed-source; weaker among indie devs |
| Appwrite has best self-hosting + multi-runtime functions | Smaller ecosystem |
| Nhost has GraphQL-native experience | Niche use case |
| Convex has best real-time + AI integration primitives | NoSQL only |
