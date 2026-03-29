---
title: LaunchApp Integration Guide
description: How LaunchApp products work together — AO, LaunchPad BaaS, Design System, and Templates
version: 1.0
created: 2026-03-29
---

# LaunchApp Integration Guide

> How LaunchApp products work together to accelerate software development.

## Overview

LaunchApp provides a complete ecosystem for building and shipping SaaS products:

| Product | Purpose | Role in Stack |
|---------|---------|---------------|
| **AO Pro** | AI agent orchestrator | Development automation |
| **LaunchPad BaaS** | Backend-as-a-Service | Infrastructure layer |
| **Design System** | UI component library | Presentation layer |
| **Templates** | SaaS starters | Application foundation |

These products are designed to work together seamlessly while remaining independently useful.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LaunchApp Ecosystem                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │                    AO Pro (Orchestration)                  │    │
│   │  • Plans and executes development tasks                   │    │
│   │  • Maintains templates and design system                  │    │
│   │  • Coordinates multi-repo development                     │    │
│   └───────────────────────┬───────────────────────────────────┘    │
│                           │ Manages                                │
│                           ▼                                        │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │              LaunchApp Templates (Application)             │    │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │    │
│   │  │  Next.js    │  │    Nuxt     │  │    SvelteKit    │   │    │
│   │  │  Template   │  │  Template   │  │    Template     │   │    │
│   │  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘   │    │
│   │         └─────────────────┴──────────────────┘            │    │
│   │                         │                                 │    │
│   │         ┌───────────────┴───────────────┐                 │    │
│   │         │      React Router 7           │                 │    │
│   │         │      (Flagship Template)      │                 │    │
│   │         └───────────────────────────────┘                 │    │
│   └─────────────────────────┬─────────────────────────────────┘    │
│                             │ Uses                                  │
│                             ▼                                       │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │              LaunchPad BaaS (Backend Layer)                │    │
│   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │    │
│   │  │  Auth  │ │   DB   │ │Storage │ │Payments│ │Realtime│  │    │
│   │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │    │
│   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │    │
│   │  │Workflow│ │  Push  │ │Identity│ │Customers│ │  CMS   │  │    │
│   │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │    │
│   └───────────────────────────────────────────────────────────┘    │
│                             │ Uses                                  │
│                             ▼                                       │
│   ┌───────────────────────────────────────────────────────────┐    │
│   │           Design System (UI Components)                    │    │
│   │  ┌────────────┐ ┌────────────┐ ┌──────────────────────┐   │    │
│   │  │  Primitives│ │ Components │ │  Block Modules       │   │    │
│   │  │  (Radix)   │ │  (Buttons) │ │  (LoginForm, etc.)   │   │    │
│   │  └────────────┘ └────────────┘ └──────────────────────┘   │    │
│   └───────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Common Integration Patterns

### Pattern 1: Full Stack (Template + BaaS + Design System)

Use a LaunchApp template with full LaunchPad BaaS integration:

```
Template (React Router) → LaunchPad SDKs → Design System Components
        │                        │                    │
        └────────────────────────┴────────────────────┘
                              │
                    Complete SaaS Application
```

**When to use**: New SaaS products where you want maximum velocity.

**Setup**:

```bash
# 1. Create from template
npx create-launchapp@latest my-app --template react-router

# 2. LaunchPad SDKs are already integrated
#    - @launchpad/auth for authentication
#    - @launchpad/payments for billing
#    - @launchpad/db for database queries

# 3. Design system components already imported
#    from @audiogenius/design-system

# 4. Start developing
pnpm dev
```

### Pattern 2: Backend-Only (BaaS + Custom Frontend)

Use LaunchPad BaaS with a custom frontend:

```
Your Frontend (Any framework) → LaunchPad SDKs → BaaS Servers
        │                              │              │
        └──────────────────────────────┴──────────────┘
                          │
                 Custom UI + Managed Backend
```

**When to use**: Existing frontend where you need a new backend.

**Setup**:

```bash
# 1. Install LaunchPad SDKs in your project
npm install @launchpad/core @launchpad/auth @launchpad/db

# 2. Configure client
import { LaunchPadClient } from '@launchpad/core';

const client = new LaunchPadClient({
  baseUrl: 'https://api.yourapp.com',
});

# 3. Use hooks in your components
import { useAuth } from '@launchpad/auth';

function Login() {
  const { login } = useAuth();
  // ...
}
```

### Pattern 3: UI-Only (Design System + Custom Backend)

Use the Design System with your own backend:

```
Template/Custom App → Design System → Your Backend API
        │                  │               │
        └──────────────────┴───────────────┘
                          │
                 Polished UI + Custom Logic
```

**When to use**: You have an existing backend but need consistent UI.

**Setup**:

```bash
# 1. Install design system
npm install @audiogenius/design-system

# 2. Import components
import { Button, Card, Input } from '@audiogenius/design-system';

# 3. Use with your API
function MyComponent() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api/my-endpoint')
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <Card>
      <Input value={data?.name} />
      <Button onClick={save}>Save</Button>
    </Card>
  );
}
```

### Pattern 4: AO-Enhanced (Any Stack + AO Pro)

Add AO Pro to an existing codebase for autonomous development:

```
Your Existing Codebase ← AO Pro Agents → Autonomous PRs
        │                                               │
        └───────────────────────────────────────────────┘
                          │
                 AI-Powered Development
```

**When to use**: You have an existing codebase and want AI assistance.

**Setup**:

```bash
# 1. Install AO CLI
curl -fsSL https://raw.githubusercontent.com/launchapp-dev/ao/main/install.sh | bash

# 2. Initialize in your project
cd my-existing-project
ao init

# 3. Create your first task
ao task create "Refactor authentication middleware"

# 4. Watch AO work
ao daemon logs --follow
```

## Detailed Integration Examples

### Template + LaunchPad BaaS

The flagship template comes with LaunchPad integration:

```typescript
// packages/database/schema.ts
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// Tables are automatically synced with LaunchPad
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email').notNull(),
  // ...
});

// packages/auth/index.ts
import { betterAuth } from 'better-auth';
import { LaunchPadAdapter } from '@launchpad/auth/adapter';

export const auth = betterAuth({
  adapter: LaunchPadAdapter(),
  // ...
});

// apps/web/app/routes/dashboard.tsx
import { useAuth } from '@launchpad/auth';
import { useQuery } from '@launchpad/db';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: projects } = useQuery('projects', () =>
    client.db.query('SELECT * FROM projects')
  );

  return (
    <DashboardLayout>
      <ProjectList projects={projects} />
    </DashboardLayout>
  );
}
```

### Design System + Template

Components are pre-configured in templates:

```tsx
// apps/web/app/routes/login.tsx
import {
  LoginForm
} from '@audiogenius/design-system/blocks/auth';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm
        onSubmit={handleLogin}
        onForgotPassword={() => navigate('/forgot')}
      />
    </div>
  );
}

// Custom page using primitives
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Label
} from '@audiogenius/design-system';

export default function CustomPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Username</Label>
            <Input placeholder="@username" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### AO + Template Development

AO maintains templates continuously:

```yaml
# .ao/workflows/maintenance.yaml
name: template-maintenance
version: 1

schedule:
  - cron: "0 */6 * * *"  # Every 6 hours

phases:
  - name: check-dependencies
    prompt: |
      Check for outdated dependencies in package.json files.
      Identify security vulnerabilities.
    model: codex-gpt-5.4

  - name: update-dependencies
    prompt: |
      Update safe dependencies. Create PR with changelog.
    model: claude-sonnet

  - name: test-changes
    prompt: |
      Run full test suite. Ensure no regressions.
    model: codex-gpt-5.4

  - name: review
    prompt: |
      Review changes for quality and security.
    model: o3-mini
```

## Data Flow Examples

### User Registration Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────────┐
│   User  │────▶│  Template    │────▶│   LaunchPad │────▶│  PostgreSQL │
│         │     │  (Web App)   │     │   Auth SDK  │     │  Database   │
└─────────┘     └──────────────┘     └─────────────┘     └─────────────┘
                      │
                      ▼
               ┌──────────────┐
               │ Design System│
               │  LoginForm   │
               └──────────────┘
```

### Payment Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────────┐
│   User  │────▶│  Template    │────▶│  LaunchPad  │────▶│   Stripe    │
│         │     │  Checkout    │     │  Payments   │     │   API       │
└─────────┘     └──────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │  Webhook    │
                                       │  Handler    │
                                       └─────────────┘
```

### Realtime Updates

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────────┐
│ Client  │◄═══▶│  Template    │◄═══▶│  LaunchPad  │◄═══▶│  PostgreSQL │
│   A     │ WS  │  (useRealtime)│ WS  │  Realtime   │ LISTEN │  NOTIFY   │
└─────────┘     └──────────────┘     └─────────────┘     └─────────────┘
     ▲
     │ WS Broadcast
     ▼
┌─────────┐
│ Client  │
│   B     │
└─────────┘
```

## Environment Configuration

### Full Stack Setup

```env
# AO Configuration
AO_API_KEY=ao_...
AO_MODEL_ROUTER=smart  # auto-route to best model

# LaunchPad BaaS
LAUNCHPAD_BASE_URL=https://api.yourapp.com
LAUNCHPAD_API_KEY=lp_...

# Database
DATABASE_URL=postgresql://...

# Auth
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Payments
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# Monitoring
SENTRY_DSN=https://...
POSTHOG_KEY=ph_...
```

## Deployment Integration

### Railway (Recommended)

```yaml
# railway.yaml
services:
  web:
    build:
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL
      - BETTER_AUTH_SECRET
      - STRIPE_SECRET_KEY
    healthcheck:
      path: /api/health
      port: 3000
```

### Vercel

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "framework": "react-router",
  "env": {
    "DATABASE_URL": "@database-url",
    "STRIPE_SECRET_KEY": "@stripe-secret"
  }
}
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/app
      - LAUNCHPAD_BASE_URL=http://launchpad:8080
    depends_on:
      - db
      - launchpad

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres

  launchpad:
    image: launchapp/launchpad:latest
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/launchpad
```

## Migration Guides

### From Firebase

```typescript
// Before (Firebase)
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
await signInWithEmailAndPassword(auth, email, password);

// After (LaunchPad)
import { useAuth } from '@launchpad/auth';

const { login } = useAuth();
await login({ email, password });
```

### From Supabase

```typescript
// Before (Supabase)
const { data, error } = await supabase
  .from('projects')
  .select('*');

// After (LaunchPad)
import { useQuery } from '@launchpad/db';

const { data } = useQuery('projects', () =>
  client.db.query('SELECT * FROM projects')
);
```

## Troubleshooting

### Common Issues

**Issue**: Design System styles not applying
```bash
# Solution: Ensure Tailwind config includes design system paths
# tailwind.config.js
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './node_modules/@audiogenius/design-system/dist/**/*.js',
]
```

**Issue**: LaunchPad SDK returning 401
```bash
# Solution: Check API key and base URL
# Verify LAUNCHPAD_API_KEY and LAUNCHPAD_BASE_URL environment variables
```

**Issue**: AO tasks failing
```bash
# Solution: Check model routing and API keys
ao model status
ao errors list
```

## Support

- **AO Support**: [AO Documentation](https://github.com/launchapp-dev/ao)
- **LaunchPad Support**: [LaunchPad Docs](https://docs.launchpad.dev)
- **Design System**: [Storybook](https://storybook.launchapp.dev)
- **Templates**: [Template Guides](https://docs.launchapp.dev/templates)
- **Community**: [Discord](https://discord.gg/launchapp)

---

*LaunchApp: The complete ecosystem for modern SaaS development.*
