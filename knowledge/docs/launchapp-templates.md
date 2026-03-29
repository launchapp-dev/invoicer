---
title: LaunchApp Templates - SaaS Starters
description: Production-ready SaaS starter templates for Next.js, Nuxt, SvelteKit, and React Router
product: launchapp-templates
version: 1.0
created: 2026-03-29
---

# LaunchApp Templates

> Production-ready SaaS starter templates. Ship in days, not months. Built and maintained by AO agents.

## What are LaunchApp Templates?

LaunchApp Templates are complete, production-ready SaaS starter templates that include everything you need to launch a SaaS product:

- **Authentication** — Email/password, OAuth (Google, GitHub), MFA
- **Billing** — Stripe subscriptions, usage-based billing
- **Database** — PostgreSQL with Drizzle ORM
- **Team Management** — Organizations, invitations, RBAC
- **Admin Dashboard** — User management, subscription oversight
- **Email** — Transactional emails with templates
- **Storage** — File uploads and management
- **Monitoring** — Sentry error tracking

## Available Templates

| Template | Framework | Status | Best For |
|----------|-----------|--------|----------|
| **Flagship** | React Router 7 | Production | Full-featured SaaS |
| **Next.js** | Next.js App Router | Active Dev | Next.js ecosystem |
| **Nuxt** | Nuxt 4 | Active Dev | Vue ecosystem |
| **SvelteKit** | SvelteKit | Active Dev | Svelte ecosystem |
| **React Router** | React Router 7 | Healthy | Lightweight SSR |

## Quick Comparison

| Feature | Flagship | Next.js | Nuxt | SvelteKit |
|---------|----------|---------|------|-----------|
| Framework | React Router 7 | Next.js 14+ | Nuxt 4 | SvelteKit |
| Language | TypeScript | TypeScript | TypeScript | TypeScript |
| Styling | Tailwind v4 | Tailwind v4 | Tailwind v4 | Tailwind v4 |
| Auth | better-auth | better-auth | better-auth | better-auth |
| Database | PostgreSQL/Drizzle | PostgreSQL/Drizzle | PostgreSQL/Drizzle | PostgreSQL/Drizzle |
| Payments | Stripe | Stripe | Stripe | Stripe |
| Deploy | Railway/Vercel/CF | Railway/Vercel | Railway | Railway |

## Flagship Template

The flagship template is the reference implementation. All other templates are framework-specific ports of this architecture.

### Tech Stack

- **Frontend**: React Router 7 (SSR mode)
- **Backend**: Hono API server
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: better-auth (email, OAuth, MFA)
- **Billing**: Stripe + Polar.sh
- **Email**: Resend + React Email
- **Jobs**: Trigger.dev v4
- **Storage**: S3-compatible
- **Analytics**: PostHog
- **Monitoring**: Sentry

### Monorepo Structure

```
saas-template/
├── apps/
│   └── web/                    # React Router 7 frontend
│       ├── app/
│       │   ├── routes/         # Application routes
│       │   │   ├── _index.tsx  # Landing page
│       │   │   ├── auth/       # Login, signup, MFA
│       │   │   ├── dashboard/  # User dashboard
│       │   │   └── admin/      # Admin panel
│       │   └── root.tsx        # Root layout
├── packages/
│   ├── api/                    # Hono API server
│   ├── auth/                   # Better Auth config
│   ├── billing/                # Stripe integration
│   ├── config/                 # Environment config
│   ├── database/               # Drizzle schema + client
│   ├── email/                  # Email templates
│   ├── i18n/                   # Internationalization
│   ├── storage/                # S3 storage client
│   └── ui-kit/                 # Shared components
├── docker-compose.yml          # Local development
└── turbo.json                  # Turborepo config
```

### Features

#### Authentication
- Email/password registration
- OAuth (Google, GitHub)
- Email verification
- Password reset
- Multi-factor authentication (TOTP)
- Session management

#### Billing
- Stripe Checkout integration
- Subscription management
- Multiple pricing tiers
- Usage-based billing
- Invoice generation
- Customer portal

#### Team Management
- Organization creation
- Team invitations
- Member roles (owner, admin, member)
- Organization switching
- Audit logging

#### Admin Dashboard
- User management
- Subscription overview
- Organization management
- System settings

## Framework-Specific Templates

### Next.js Template

```bash
# Create new project
npx create-launchapp@latest my-app --template nextjs

# Or clone directly
git clone https://github.com/launchapp-dev/launchapp-nextjs.git
```

**Features**:
- Next.js App Router
- Server Components by default
- Edge runtime support
- API Routes for backend

**Recent Status** (2026-03-24):
- Build: FAIL (TypeScript type mismatch — being fixed)
- Active development with 15 PRs merged

### Nuxt Template

```bash
# Create new project
npx create-launchapp@latest my-app --template nuxt

# Or clone directly
git clone https://github.com/launchapp-dev/launchapp-nuxt.git
```

**Features**:
- Nuxt 4 with Nitro
- Vue 3 Composition API
- Auto-imports
- File-based routing

**Recent Status** (2026-03-24):
- Lint: 3 errors (57% reduction — improving)
- 7 PRs merged recently
- Cookie consent/GDPR features

### SvelteKit Template

```bash
# Create new project
npx create-launchapp@latest my-app --template sveltekit

# Or clone directly
git clone https://github.com/launchapp-dev/launchapp-sveltekit.git
```

**Features**:
- SvelteKit with SSR
- Svelte 5 runes
- Minimal bundle size
- Form actions

**Recent Status** (2026-03-24):
- Lint: 391 errors (stable, acknowledged debt)
- 8 PRs merged recently
- Multi-plan pricing implemented

### React Router Template

```bash
# Create new project
npx create-launchapp@latest my-app --template react-router

# Or clone directly
git clone https://github.com/launchapp-dev/launchapp-react-router.git
```

**Features**:
- React Router 7 SSR
- Lightweight framework
- Fast cold starts
- Excellent DX

**Recent Status** (2026-03-24):
- Build: PASS
- Lint: PASS
- Test: PASS (102 tests)
- **Healthiest template in the fleet**

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL (local or cloud)
- Stripe account
- Resend account (for email)

### 1. Create from Template

```bash
# Using create-launchapp
npx create-launchapp@latest my-saas

# Or clone the flagship
git clone https://github.com/launchapp-dev/saas-template-launch-app-test.git my-saas
```

### 2. Install Dependencies

```bash
cd my-saas
pnpm install
```

### 3. Configure Environment

```bash
cp apps/web/.env.example apps/web/.env
# Edit with your credentials
```

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp

# Auth
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...
```

### 4. Setup Database

```bash
# Run migrations
pnpm db:migrate

# Generate Drizzle client
pnpm db:generate

# (Optional) Seed data
pnpm db:seed
```

### 5. Start Development

```bash
# Start all services
pnpm dev

# Or start specific apps
pnpm --filter web dev
pnpm --filter api dev
```

### 6. Setup Stripe

1. Create products and prices in Stripe Dashboard
2. Copy price IDs to your environment
3. Configure webhook endpoint: `/api/webhooks/stripe`
4. Add webhook signing secret to environment

## Deployment

### Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build and run
docker-compose up -d

# Or build production image
docker build -t my-saas .
docker run -p 3000:3000 my-saas
```

### Cloudflare Workers

The flagship template supports Cloudflare Workers deployment:

```bash
# Configure wrangler.toml
# Deploy
pnpm deploy:cf
```

**Features**:
- Edge runtime
- Sub-5ms cold starts
- Hyperdrive for Postgres pooling
- R2 for storage

## Customization

### Adding a New Page

```tsx
// apps/web/app/routes/dashboard/settings.tsx
import { requireAuth } from '@repo/auth/session';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth(request);
  return { user };
}

export default function SettingsPage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Settings</h1>
      <p>Welcome, {user.name}</p>
    </div>
  );
}
```

### Adding an API Route

```typescript
// packages/api/src/routes/projects.ts
import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';

const app = new Hono();

app.get('/', requireAuth, async (c) => {
  const user = c.get('user');
  const projects = await db.query.projects.findMany({
    where: eq(projects.organizationId, user.activeOrganizationId),
  });
  return c.json(projects);
});

export default app;
```

### Customizing the Design

Edit design tokens in `apps/web/app/styles/globals.css`:

```css
:root {
  --la-primary: 217 91% 60%;  /* Your brand color */
  --la-radius: 0.75rem;        /* Your border radius */
}
```

## Database Schema

```typescript
// packages/database/schema.ts
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  plan: varchar('plan', { length: 50 }).default('free'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').references(() => organizations.id),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  status: varchar('status', { length: 50 }).notNull(),
  currentPeriodEnd: timestamp('current_period_end'),
});
```

## Testing

```bash
# Run all tests
pnpm test

# Run specific app tests
pnpm --filter web test

# E2E tests with Playwright
pnpm e2e
```

## Pricing Tiers Template

The template includes a complete pricing page:

```tsx
// Example pricing configuration
const tiers = [
  {
    name: 'Starter',
    price: 29,
    description: 'For individuals',
    features: ['1 user', '10 projects', 'Basic support'],
    priceId: 'price_...',
  },
  {
    name: 'Pro',
    price: 99,
    description: 'For growing teams',
    features: ['10 users', 'Unlimited projects', 'Priority support'],
    priceId: 'price_...',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: ['Unlimited users', 'SSO', 'Dedicated support'],
    priceId: null,
  },
];
```

## AO Maintenance

All LaunchApp templates are maintained by AO agents:

- **Dependency updates** — Automated PRs for security patches
- **Feature parity** — Framework variants kept in sync with flagship
- **Quality gates** — Build, lint, and test enforcement
- **Documentation** — Auto-generated API docs

## Support

- **Documentation**: [docs.launchapp.dev/templates](https://docs.launchapp.dev/templates)
- **GitHub**: [launchapp-dev](https://github.com/launchapp-dev)
- **Discord**: [LaunchApp Community](https://discord.gg/launchapp)
- **Email**: support@launchapp.dev

---

*Built by AO. Ship faster.*
