# Revenue Roadmap

> Last updated: 2026-03-18 by revenue-analyst agent.

## Roadmap Overview

Three horizons of revenue generation, organized by time-to-revenue and effort required.

**Target:** $15K–$60K MRR within 18 months across all product lines.

---

## Phase 1: Quick Wins (Weeks 1–4) — Target: $2K–$8K/month

### 1.1 Launch SaaS Template Sales ⭐ Highest Priority

**Week 1–2:**
- Set up payment processing (Lemon Squeezy or Stripe) on launchapp.dev
- Create product tiers: Lite ($149), Pro ($299), Team ($599), Agency ($1,199)
- Write sales landing page with feature comparison, demo, and social proof
- Set up license key delivery system (GitHub private repo access or download link)

**Week 3–4:**
- Launch on Product Hunt, Indie Hackers, Twitter/X
- Post in React Router, Hono, and Better-Auth communities
- Set up affiliate program (20% commission for referrals)
- Begin collecting testimonials from early buyers

**Revenue Estimate:** 10–30 sales/month → $1.5K–$9K/month
**Effort:** 1 person, 2 weeks
**Dependencies:** None — product exists

### 1.2 GitHub Sponsors / Open Collective

**Week 1:**
- Enable GitHub Sponsors on `ao-cli` and `design-system`
- Create sponsor tiers: $5/mo (thanks), $25/mo (logo on README), $100/mo (priority issues)
- Add funding.yml to key repos

**Revenue Estimate:** $200–$1K/month (grows with OSS adoption)
**Effort:** 1 hour setup
**Dependencies:** None

### 1.3 Early Access Program for AO Pro

**Week 2–4:**
- Create waitlist/beta signup page
- Offer $19/month early access to AO Pro features
- Cap at 50 beta users for feedback loop

**Revenue Estimate:** 20–50 signups → $380–$950/month
**Effort:** 1 week (feature flags + payment integration)
**Dependencies:** Basic license validation in AO CLI

---

## Phase 2: Core Monetization (Months 2–4) — Target: $5K–$20K/month

### 2.1 AO CLI Pro Launch

**Month 2:**
- Implement license key validation in AO CLI
- Gate Pro features: multi-model routing, self-healing, daemon scheduling, workflow optimizer
- Set up account portal (billing, license management)

**Month 3:**
- Launch AO Pro at $29/month
- Publish documentation, tutorials, getting-started guides
- Distribution: Homebrew, cargo install, GitHub Releases
- Community: Discord server, GitHub Discussions

**Month 4:**
- Launch AO Team at $99/month/seat
- Add team-oriented features: shared configs, org-wide workflows
- Target agencies and dev teams running AI-assisted workflows

**Revenue Estimate:** 100–500 Pro subs → $3K–$15K/month
**Effort:** 1–2 people, 2 months
**Dependencies:** Stable AO CLI release, documentation

### 2.2 Design System Pro

**Month 3–4 (aligned with Phase 3-4 component completion):**
- Complete Phase 3 components (navigation, data display)
- Gate advanced components behind Pro license
- Launch: Community (free) + Pro ($149) + Team ($349)
- Sell through npm (free tier) + gumroad/lemonsqueezy (Pro downloads)

**Revenue Estimate:** 50–200 Pro licenses → $7.5K–$30K one-time, then ~$2K–$5K/month ongoing
**Effort:** Already in progress (Phase 3-4 work)
**Dependencies:** Phase 3-4 component completion

### 2.3 Consulting & Setup Services

**Month 2:**
- Offer "LaunchApp Setup" service: $500 for template customization + deployment
- Offer "AO Onboarding" service: $300 for workflow setup + agent configuration
- List on the marketing site, promote to template buyers

**Revenue Estimate:** 2–5 engagements/month → $1K–$2.5K/month
**Effort:** On-demand, no upfront investment
**Dependencies:** Template and AO products being sold

---

## Phase 3: Platform & Marketplace (Months 4–8) — Target: $10K–$40K/month

### 3.1 Premium Plugin Marketplace

**Month 4–5:**
- Differentiate free vs. premium features in existing 15 plugin packs
- Build payment infrastructure in `claude-plugin-marketplace`
- Launch premium packs at $5–$15/month each
- Launch All-Access Bundle at $49/month

**Month 6–8:**
- Open marketplace to third-party developers
- Implement 70/30 revenue split
- Add review system, usage analytics, pack versioning
- Target: 50+ premium packs from community contributors

**Revenue Estimate:** 200–1,000 subscribers + marketplace commission → $10K–$50K/month
**Effort:** 2 people, 3–4 months
**Dependencies:** Stable Claude Code plugin API, payment infrastructure

### 3.2 Template Marketplace

**Month 6–8:**
- Allow community to build and sell templates using LaunchApp's design system
- Charge 20% marketplace commission
- Provide template builder CLI/SDK for consistent quality
- Curate and feature top templates

**Revenue Estimate:** $500–$3K/month in commissions (grows with ecosystem)
**Effort:** 1 person, 2 months
**Dependencies:** Design system adoption, community size

---

## Phase 4: Strategic Bets (Months 8–18) — Target: Additional $5K–$20K/month

### 4.1 Hosted AO Platform (Cloud)

**Month 8–12:**
- Build cloud infrastructure for managed AO daemon
- Web dashboard for workflow management
- Multi-tenant isolation, usage metering
- Free tier: 100 runs/month; Pro: $49/month; Team: $199/month

**Month 12–18:**
- Enterprise features: SSO, audit logs, dedicated infra
- SOC 2 compliance for enterprise sales
- Partner integrations (GitHub, Linear, Slack)

**Revenue Estimate:** 50–200 teams → $2.5K–$40K/month
**Effort:** 2–3 people, 6–12 months
**Dependencies:** Stable AO CLI, cloud deployment, auth system

### 4.2 Video Course: "Build a SaaS with LaunchApp"

**Month 6–8:**
- Record comprehensive video course ($49–$99)
- Sell on own platform + Udemy/Skillshare
- Use as lead gen for template sales

**Revenue Estimate:** $1K–$5K/month (passive after creation)
**Effort:** 1 person, 1 month of recording
**Dependencies:** Template product established

---

## Revenue Projections Summary

| Timeline | Monthly Revenue (Low) | Monthly Revenue (High) | Cumulative |
|---|---|---|---|
| **Month 1** | $2K | $8K | $2K–$8K |
| **Month 3** | $5K | $20K | $12K–$48K |
| **Month 6** | $10K | $40K | $42K–$168K |
| **Month 12** | $15K | $60K | $102K–$468K |
| **Month 18** | $25K | $80K | $192K–$948K |

---

## Priority Stack Rank

| Rank | Opportunity | Revenue Potential | Effort | Confidence |
|---|---|---|---|---|
| 1 | SaaS Template Sales | $1.5K–$9K/mo | Very Low | Very High |
| 2 | AO CLI Pro/Team | $3K–$15K/mo | Medium | High |
| 3 | Design System Pro | $2K–$5K/mo | Low (in-progress) | High |
| 4 | Premium Plugin Marketplace | $10K–$50K/mo | High | Medium |
| 5 | Consulting Services | $1K–$2.5K/mo | None | High |
| 6 | GitHub Sponsors | $200–$1K/mo | None | Medium |
| 7 | Hosted AO Platform | $2.5K–$40K/mo | Very High | Medium-Low |
| 8 | Video Course | $1K–$5K/mo | Low | Medium |
| 9 | Template Marketplace | $500–$3K/mo | Medium | Medium-Low |

---

## Key Metrics to Track

| Metric | Tool | Target (Month 6) |
|---|---|---|
| Template sales/month | Lemon Squeezy / Stripe | 30–50 |
| AO CLI downloads/month | GitHub Releases / Homebrew | 5,000+ |
| AO Pro subscribers | Billing dashboard | 200+ |
| Plugin marketplace subscribers | Marketplace dashboard | 500+ |
| Design system npm downloads/week | npm stats | 1,000+ |
| MRR | Stripe dashboard | $10K+ |
| Customer acquisition cost (CAC) | Analytics | < $50 |
| Lifetime value (LTV) | Billing data | > $200 |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| SaaS template market saturated | Medium | Medium | Differentiate on RR7/Hono stack, not another Next.js kit |
| Claude Code plugin API changes | Medium | High | Maintain close relationship with Anthropic, abstract plugin interfaces |
| AI orchestration commoditized | Medium | High | Focus on workflow automation UX, not raw AI capabilities |
| Low conversion on free→paid | High | Medium | Generous free tier, clear upgrade path, usage-based nudges |
| Pricing too high for indie devs | Medium | Low | PPP pricing, student discounts, community licenses |
