# Product Integration Guide

> How LaunchApp products work together to build and deploy AI-powered SaaS applications.

## Overview

LaunchApp products are designed to work together as a cohesive platform:

```
┌─────────────────────────────────────────────────────────────┐
│                      LaunchApp Platform                      │
├─────────────────────────────────────────────────────────────┤
│  AO Agent Orchestrator  →  Autonomous development & ops     │
├─────────────────────────────────────────────────────────────┤
│  LaunchApp Templates    →  SaaS starter templates           │
│  ├── React Router 7 (flagship)                              │
│  ├── Next.js App Router                                     │
│  ├── Nuxt 4                                                 │
│  └── SvelteKit                                              │
├─────────────────────────────────────────────────────────────┤
│  LaunchPad BaaS         →  Backend services                 │
│  ├── Auth, Database, Storage                                │
│  ├── Payments, Realtime, Push                               │
│  └── Workflows, Identity, CMS                               │
├─────────────────────────────────────────────────────────────┤
│  Design System          →  UI components & styling          │
└─────────────────────────────────────────────────────────────┘
```

---

## Integration Patterns

### 1. Building a New SaaS

**Flow:** Templates + Design System → LaunchPad BaaS → AO for maintenance

1. **Start with a template:**
   ```bash
   npx create-launchapp@latest my-saas
   ```

2. **Add LaunchPad services:**
   ```bash
   npm install @launchpad/auth @launchpad/db @launchpad/payments
   ```

3. **Use Design System components:**
   ```tsx
   import { Button, Card } from '@launchapp/design-system';
   ```

4. **AO maintains the project:**
   ```bash
   ao daemon start --autonomous
   ```

### 2. Adding Backend to Existing Project

**Flow:** LaunchPad SDKs → Custom backend

```typescript
// Initialize LaunchPad client
import { LaunchPadClient } from '@launchpad/core';

const client = new LaunchPadClient({
  baseUrl: 'https://api.example.com',
  apiKey: process.env.LAUNCHPAD_API_KEY,
});

// Use React hooks
import { useAuth, useDatabase } from '@launchpad/auth';

function App() {
  const { user, signIn } = useAuth();
  const { data: posts } = useDatabase('posts');
  // ...
}
```

### 3. Autonomous Development

**Flow:** AO → Templates → Custom features

```yaml
# AO workflow for feature development
workflows:
  feature-delivery:
    phases:
      - plan:
          agent: planner
          output: requirements.md
      - build:
          agent: builder
          input: requirements.md
      - review:
          agent: reviewer
      - qa:
          agent: qa-tester
    on_success:
      - create_pull_request
```

### 4. Design System + Backend Forms

**Flow:** Design System components → LaunchPad API

```tsx
import { Button, Input, Label, Card } from '@launchapp/design-system';
import { useDatabase } from '@launchpad/db';

function ContactForm() {
  const { create } = useDatabase('contacts');

  async function onSubmit(data: FormData) {
    await create({
      name: data.get('name'),
      email: data.get('email'),
    });
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />

        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />

        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}
```

---

## Cross-Product Workflows

### New Project Setup

```bash
# 1. Scaffold with template
npx create-launchapp@latest my-project
cd my-project

# 2. Configure LaunchPad
npm install @launchpad/core @launchpad/auth @launchpad/db

# 3. Add design system components
npx shadcn@latest add \
  --registry https://launchapp-dev.github.io/design-system/registry.json \
  button card input

# 4. Set up AO for maintenance
ao setup
ao daemon start
```

### Adding Authentication

```typescript
// Template has better-auth configured
// Add LaunchPad auth for SSO/enterprise features

import { useAuth } from '@launchpad/auth';

// Automatic organization management
const { user, orgs, switchOrg } = useAuth();
```

### Database + Realtime

```typescript
import { useDatabase } from '@launchpad/db';
import { useRealtime } from '@launchpad/realtime';

function LiveDashboard() {
  // Query data
  const { data: metrics } = useDatabase('metrics');

  // Subscribe to updates
  useRealtime('metrics:updated', (update) => {
    // Handle realtime update
  });

  return <MetricsChart data={metrics} />;
}
```

### Payments + Workflows

```typescript
import { usePayments } from '@launchpad/payments';
import { useWorkflows } from '@launchpad/workflows';

function SubscriptionPage() {
  const { subscribe } = usePayments();
  const { enqueue } = useWorkflows();

  async function handleSubscribe(plan: string) {
    const subscription = await subscribe({ plan });

    // Trigger welcome workflow
    await enqueue('welcome-email', {
      userId: subscription.userId,
      plan: subscription.plan,
    });
  }
}
```

---

## Deployment Integration

### Railway + AO

```bash
# AO manages Railway deployment
ao workflow run --workflow deploy-to-railway
```

### Cloudflare Workers + LaunchPad

Edge deployment with LaunchPad services:

```typescript
// wrangler.toml
[[hyperdrive]]
binding = "DB"
id = "your-hyperdrive-id"

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "your-bucket"
```

```typescript
// Use LaunchPad SDKs in Workers
import { LaunchPadClient } from '@launchpad/core';

export default {
  async fetch(request, env) {
    const client = new LaunchPadClient({
      hyperdrive: env.DB,
      storage: env.STORAGE,
    });
    // ...
  },
};
```

---

## Data Flow

### Typical Request Flow

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Browser │────▶│  LaunchApp   │────▶│   LaunchPad  │
│          │     │   Template   │     │   API Server │
└──────────┘     └──────────────┘     └──────────────┘
      │                  │                    │
      │                  ▼                    ▼
      │           ┌──────────────┐     ┌──────────────┐
      │           │    Design    │     │  PostgreSQL  │
      │           │    System    │     └──────────────┘
      │           └──────────────┘
      │
      ▼
┌──────────┐
│  AO MCP  │ (optional: AI agent monitoring)
└──────────┘
```

---

## Common Configurations

### Full-Stack with Everything

```
Frontend:  LaunchApp Template (React Router 7)
           + Design System components
           + LaunchPad SDKs

Backend:   LaunchPad BaaS API server
           + PostgreSQL database
           + Redis for realtime/cache

DevOps:    AO Agent Orchestrator
           + Autonomous PRs
           + Deploy to Railway/Vercel/Cloudflare
```

### Lightweight Static Site

```
Frontend:  LaunchApp Template
           + Design System
           + Static export

Backend:   LaunchPad (selected SDKs only)
           + Serverless functions

Deploy:    Cloudflare Workers
```

---

## Related Documentation

| Guide | Purpose |
|-------|---------|
| [AO Agent Orchestrator](./ao-agent-orchestrator.md) | Autonomous development |
| [LaunchPad BaaS](./launchpad-baas.md) | Backend services |
| [LaunchApp Templates](./launchapp-templates.md) | SaaS starters |
| [Design System](./design-system.md) | UI components |
