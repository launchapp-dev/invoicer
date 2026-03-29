# LaunchApp Templates

> Production-ready SaaS starters with auth, billing, multi-tenancy, and team management pre-configured.

## What Are LaunchApp Templates?

LaunchApp Templates provide a complete starting point for full-stack SaaS applications. They include authentication, billing, multi-tenancy, and team management — all wired up and ready to customize.

Templates integrate with [LaunchPad BaaS](./launchpad-baas.md) or can be used standalone.

---

## Available Templates

| Template | Framework | Status |
|----------|-----------|--------|
| **Flagship** | React Router 7 | Active, reference implementation |
| **Next.js** | Next.js App Router | In development |
| **Nuxt** | Nuxt 4 | In development |
| **SvelteKit** | SvelteKit | In development |

All framework variants follow the same architecture — only the frontend framework differs.

---

## Quick Start

### Using create-launchapp

```bash
npx create-launchapp@latest my-saas
cd my-saas
pnpm install
```

### Manual Setup

```bash
git clone https://github.com/launchapp-dev/saas-template-launch-app-test.git my-saas
cd my-saas
pnpm install
cp .env.example .env
```

### Database Setup

```bash
# Push schema to database
pnpm db:push

# Or run migrations
pnpm db:migrate
```

### Development

```bash
pnpm dev
```

Open http://localhost:3000

---

## Architecture

### Monorepo Structure

```
my-saas/
├── apps/
│   └── web/              # Frontend application
├── packages/
│   ├── api/              # Hono API server
│   ├── auth/             # Better Auth configuration
│   ├── database/         # Drizzle ORM, schema, migrations
│   ├── billing/          # Stripe integration
│   ├── email/            # Email templates and service
│   ├── storage/          # S3-compatible storage
│   ├── i18n/             # Internationalization
│   └── ui-kit/           # Shared UI components
└── tooling/
    ├── typescript-config/
    └── biome/
```

### Key Technologies

| Layer | Technology |
|-------|------------|
| Frontend | React Router 7 (or framework variant) |
| API | Hono |
| Auth | better-auth |
| Database | PostgreSQL + Drizzle ORM |
| Payments | Stripe |
| Styling | Tailwind CSS v4 |
| Components | Radix UI |
| Validation | Zod |

---

## Features

### Authentication

- Email/password with secure hashing
- Google/GitHub OAuth
- MFA/TOTP support
- Email verification
- Password reset
- Session management

### Teams & Organizations

- Multi-tenant organizations
- Role-based access control (RBAC)
- Team invitations
- Member management

### Billing

- Stripe Checkout integration
- Subscription management
- Multiple pricing plans
- Metered billing support
- Invoice history

### Database

- Type-safe with Drizzle ORM
- Migrations
- Seed data
- Query optimization

### Additional Features

- Email templating with React Email
- File uploads with S3/R2
- Background jobs (configurable)
- Push notifications
- Analytics (PostHog)
- Error tracking (Sentry)
- i18n support

---

## Framework-Specific Variants

### React Router 7 (Flagship)

The reference implementation. All other variants are ports of this template.

```bash
git clone https://github.com/launchapp-dev/saas-template-launch-app-test.git
```

### Next.js

```bash
git clone https://github.com/launchapp-dev/launchapp-nextjs.git
```

### Nuxt

```bash
git clone https://github.com/launchapp-dev/launchapp-nuxt.git
```

### SvelteKit

```bash
git clone https://github.com/launchapp-dev/launchapp-sveltekit.git
```

---

## Deployment

### Railway

```bash
railway login
railway link
railway up
```

### Vercel

```bash
vercel
```

### Cloudflare Workers

Edge deployment with Hyperdrive and R2:

```bash
wrangler deploy
```

Features:
- Sub-5ms cold starts
- 50ms CPU time limit
- R2 for storage

---

## Customization

### Adding a New Page

```typescript
// apps/web/app/routes/dashboard.tsx
export default function Dashboard() {
  return <div>My Dashboard</div>;
}
```

### Adding an API Route

```typescript
// packages/api/src/routes/projects.ts
app.get('/projects', async (c) => {
  const projects = await db.query.projects.findMany();
  return c.json(projects);
});
```

### Customizing the Database Schema

```typescript
// packages/database/src/schema.ts
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  orgId: text('org_id').notNull(),
});
```

Then run:
```bash
pnpm db:generate
pnpm db:push
```

---

## Integration with LaunchPad

Templates come with optional LaunchPad SDK integration:

```typescript
// Using LaunchPad auth instead of better-auth directly
import { useAuth } from '@launchpad/auth';

function Component() {
  const { user, signIn } = useAuth();
  // ...
}
```

---

## Related Products

| Product | Relationship |
|---------|--------------|
| [LaunchPad BaaS](./launchpad-baas.md) | Backend services integration |
| [Design System](./design-system.md) | UI components |
| [AO Agent Orchestrator](./ao-agent-orchestrator.md) | Can maintain and upgrade templates |

---

## License

Private — not yet publicly released.
