# AO Pro Pricing

> Pricing tiers for the Agent Orchestrator platform — AO Open Source, AO Pro, and AO Team

## Overview

AO (Agent Orchestrator) is available in multiple tiers to serve everyone from individual developers to enterprise teams. Choose the tier that matches your needs:

- **AO Open Source** — Free forever for individual developers
- **AO Pro** — $29-49/seat/month for indie hackers and small teams
- **AO Team** — $99-149/seat/month for startups and growing teams
- **AO Enterprise** — Custom pricing for organizations with compliance requirements

---

## Pricing Tiers

### AO Open Source

**Price**: Free

**Who it's for**: Individual developers, open source contributors, hobbyists

**Key Features**:
- Full CLI access (`ao` command)
- Single repository management
- Community workflow library
- Self-hosted (bring your own AI keys)
- Git worktree isolation
- Basic workflow execution
- Community Discord support

**Limitations**:
- Single repo per project
- No scheduled workflows
- No multi-model routing
- No team collaboration features

---

### AO Pro

**Price**: $29-49/seat/month (billed annually or monthly)

| Billing | Price | Savings |
|---------|-------|---------|
| Annual | $29/seat/month ($348/year) | ~40% off |
| Monthly | $49/seat/month | — |

**Who it's for**: Indie hackers, freelancers, small teams (2-10 developers)

**Key Features**:
- Everything in AO Open Source, plus:
- **Multi-repo management** — Connect and orchestrate across multiple repositories
- **Scheduled workflows** — Cron-based workflow execution (e.g., daily dependency checks)
- **Priority model routing** — Intelligent task-to-model routing (Claude, Codex GPT-5.4, Gemini)
- **Brain-like planner** — Advanced task planning and dependency analysis
- **Workflow library** — Access to curated workflow templates
- **Email support** — Priority support with 48-hour response time
- **5,000 task executions/month** per seat

**Ideal for**:
- Solo developers managing multiple client projects
- Small teams shipping features autonomously
- Indie hackers building micro-SaaS products
- Consultants managing codebases for multiple clients

---

### AO Team

**Price**: $99-149/seat/month (billed annually or monthly)

| Billing | Price | Savings |
|---------|-------|---------|
| Annual | $99/seat/month ($1,188/year) | ~33% off |
| Monthly | $149/seat/month | — |

**Who it's for**: Startups, small companies, engineering teams (5-50 developers)

**Key Features**:
- Everything in AO Pro, plus:
- **Fleet management** — Centralized dashboard for managing all team repos
- **Shared workflow library** — Team-curated workflows with version control
- **Team dashboards** — Visibility into all running agents, tasks, and workflows
- **Plugin marketplace access** — Premium workflow packs and integrations
- **SSO ready** — Google Workspace, GitHub OAuth (full SAML in Enterprise)
- **Audit logs** — 30-day history of all actions and decisions
- **Priority support** — 24-hour response time, Slack Connect option
- **Unlimited task executions**
- **Custom model policies** — Restrict which models team members can use

**Ideal for**:
- Startups with 5+ engineers wanting autonomous workflows
- Teams managing multiple microservices
- Companies needing visibility into AI-assisted development
- Organizations requiring basic compliance controls

---

### AO Enterprise

**Price**: Custom pricing (starts at $50K/year)

**Who it's for**: Companies, regulated industries, enterprises with compliance requirements

**Key Features**:
- Everything in AO Team, plus:
- **On-prem / private cloud deployment** — Run AO entirely within your infrastructure
- **SSO/SAML** — Full identity provider integration (Okta, Azure AD, etc.)
- **Audit logs** — 1-year retention with export capabilities
- **RBAC** — Granular role-based access control
- **Compliance controls** — SOC 2, GDPR, HIPAA compliance features
- **SLA-backed support** — 4-hour response time, dedicated support engineer
- **Custom model routing policies** — Restrict to approved models only, cost controls
- **Training and onboarding** — Dedicated onboarding for your team
- **Custom integrations** — Build bespoke workflow packs for your stack

**Deployment Options**:
- Self-managed on your infrastructure
- Private cloud (AWS, GCP, Azure)
- VPC peering available

---

## Feature Comparison

| Feature | AO Open Source | AO Pro | AO Team | AO Enterprise |
|---------|---------------|--------|---------|---------------|
| **Price** | Free | $29-49/seat/mo | $99-149/seat/mo | Custom |
| **Repositories** | 1 | Unlimited | Unlimited | Unlimited |
| **Scheduled Workflows** | — | ✅ | ✅ | ✅ |
| **Priority Model Routing** | — | ✅ | ✅ | ✅ |
| **Brain-like Planner** | — | ✅ | ✅ | ✅ |
| **Fleet Management** | — | — | ✅ | ✅ |
| **Team Dashboards** | — | — | ✅ | ✅ |
| **Shared Workflows** | — | — | ✅ | ✅ |
| **Plugin Marketplace** | Community only | Community only | Premium access | Premium access |
| **SSO/SAML** | — | — | OAuth only | ✅ |
| **Audit Logs** | — | — | 30 days | 1 year |
| **RBAC** | — | — | Basic | Granular |
| **Support** | Discord | Email (48h) | Email/Slack (24h) | SLA (4h) |
| **Task Executions** | 1,000/mo | 5,000/mo/seat | Unlimited | Unlimited |
| **On-prem Deployment** | — | — | — | ✅ |
| **Compliance** | — | — | — | SOC 2, GDPR, HIPAA |

---

## Early Access Program

### Limited Offer: First 100 Users

To celebrate the AO Pro launch, we're offering **40% off** the annual plan for the first 100 early access users.

| Plan | Regular Annual | Early Access Price | You Save |
|------|----------------|-------------------|----------|
| AO Pro | $348/year | **$209/year** | $139 |
| AO Team | $1,188/year | **$713/year** | $475 |

**Early Access Benefits**:
- **40% off forever** — Lock in the discount for life (renews at same rate)
- **Direct Slack channel** — Access to the core AO team
- **Shape the roadmap** — Vote on upcoming features
- **Exclusive swag** — AO Pro launch sticker pack
- **Founder badge** — Displayed on your AO profile

**How to claim**:
1. Join the early access waitlist at `launchapp.dev/ao-pro-early-access`
2. You'll receive an invite code within 48 hours
3. Use the code at checkout to apply the 40% discount

**Terms**:
- Limited to the first 100 qualifying customers
- One discount per organization
- Annual billing required for the discount
- Discount applies to all future renewals
- 14-day free trial included (no credit card required)

---

## Billing Model

### Seat-Based Pricing

AO Pro and Team are priced per seat (active user). A seat is defined as:

- Any user who authenticates with AO during the billing period
- Bot/service accounts that make API calls (Team/Enterprise only)
- Deactivated users don't count toward your bill

**Adding/removing seats**:
- **Annual plans**: Add seats anytime — prorated for the remainder of the billing year
- **Monthly plans**: Adjust seat count anytime — changes reflected in next invoice

### Annual vs Monthly

| | Annual | Monthly |
|---|--------|---------|
| **Discount** | ~40% off Pro, ~33% off Team | — |
| **Billing** | Once per year | Every month |
| **Seat changes** | Prorated additions | Adjust anytime |
| **Cancellation** | Refund pro-rated unused months | Cancel anytime |

### Payment Methods

- Credit card (Visa, Mastercard, Amex)
- ACH transfer (Annual plans $1,000+)
- Invoice billing (Enterprise only)

---

## Usage Limits

### Task Executions

Task executions are counted each time an AI agent runs a workflow phase:

| Tier | Monthly Limit | Overage Rate |
|------|--------------|--------------|
| AO Open Source | 1,000 | N/A (hard limit) |
| AO Pro | 5,000 per seat | $0.001 per execution |
| AO Team | Unlimited | Included |
| AO Enterprise | Unlimited | Included |

**What counts as a task execution**:
- Each workflow phase run (plan → code → test → review = 4 executions)
- Scheduled workflow runs
- Manual task triggers

**What doesn't count**:
- Git operations (clones, commits, pushes)
- Web UI page loads
- API health checks

---

## FAQ

### Can I try before I buy?

Yes! All paid tiers include a 14-day free trial. No credit card required to start.

### Can I switch between tiers?

Yes. You can upgrade anytime — we'll prorate the difference. Downgrades take effect at your next billing cycle.

### What happens if I exceed my task execution limit?

On AO Pro, you'll be charged $0.001 per additional execution (billed at month end). On AO Team and Enterprise, there are no limits.

### Do I need to bring my own AI API keys?

Yes. AO works with your existing AI provider accounts (Anthropic, OpenAI, Google). This keeps costs transparent and ensures you maintain control over your data.

### Is there a minimum team size for AO Team?

No minimum. Solo developers can subscribe to AO Team if they want the additional features.

### What happens to my data if I cancel?

Your data remains in your repositories — AO doesn't hold your code hostage. Workflow history and logs are retained for 30 days post-cancellation, then deleted.

### Do you offer refunds?

Annual plans: Prorated refund for unused months within the first 30 days. Monthly plans: No refunds, but you can cancel anytime to avoid future charges.

---

## Contact Sales

For Enterprise inquiries or questions about pricing:

- **Email**: sales@launchapp.dev
- **Schedule a demo**: launchapp.dev/demo
- **Chat**: Available on launchapp.dev (business hours)

---

*Last updated: 2026-03-29*
*Pricing subject to change. Current customers lock in their rate at signup.*
