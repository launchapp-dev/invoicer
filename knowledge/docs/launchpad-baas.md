---
title: LaunchPad BaaS - Backend-as-a-Service Platform
description: Modular backend platform with 19+ SDKs for auth, database, storage, payments, and more
product: launchpad-baas
version: 0.1.0
created: 2026-03-29
---

# LaunchPad BaaS — Backend-as-a-Service Platform

> A Firebase alternative built on Postgres and open standards. Full TypeScript type safety with multi-tenancy built in.

## What is LaunchPad BaaS?

LaunchPad BaaS is a modular, scalable backend platform providing core services for SaaS applications. It includes authentication, database management, storage, payments, realtime updates, push notifications, AI, analytics, CMS, and more — all as independently deployable TypeScript packages.

Unlike Firebase, LaunchPad BaaS:
- Runs on **PostgreSQL** (not a proprietary database)
- Provides **full type safety** with TypeScript
- Has **multi-tenancy built in** from the ground up
- Gives you **full source code** — no vendor lock-in
- Uses **open standards** — deploy anywhere

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Applications                          │
│         (React, Vue, Svelte, React Native, etc.)                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     LaunchPad SDKs (@launchpad/*)                    │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   Auth   │ │    DB    │ │ Storage  │ │ Payments │ │ Realtime │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Workflows│ │   Push   │ │Identity  │ │Customers │ │   CMS    │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      LaunchPad Backend Servers                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   API    │ │Payments  │ │ Realtime │ │   Push   │ │   Git    │  │
│  │  Server  │ │ Server   │ │  Server  │ │  Server  │ │  Server  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Data Layer                                   │
│         PostgreSQL  │  Redis  │  S3-compatible Storage              │
└─────────────────────────────────────────────────────────────────────┘
```

## Client SDKs

All SDKs are published as `@launchpad/*` on npm.

### Core SDKs

| SDK | Package | Description |
|-----|---------|-------------|
| **Core** | `@launchpad/core` | HTTP client, session management, React integration |
| **Auth** | `@launchpad/auth` | Authentication hooks and components for React |
| **DB** | `@launchpad/db` | Database querying with TanStack Query React hooks |
| **Payments** | `@launchpad/payments` | Stripe subscriptions and billing |
| **Storage** | `@launchpad/storage` | File uploads, downloads, and management |
| **Realtime** | `@launchpad/realtime` | WebSocket subscriptions and live data |

### Extended SDKs

| SDK | Package | Description |
|-----|---------|-------------|
| **Workflows** | `@launchpad/workflows` | Background jobs, scheduled tasks, workflow automation |
| **Push** | `@launchpad/push` | Web and mobile push notifications |
| **Identity** | `@launchpad/identity` | User directory, SSO, RBAC, organization management |
| **Customers** | `@launchpad/customers` | Customer management, CRM, segmentation |
| **CMS** | `@launchpad/cms` | Headless CMS with content types, localization, versioning |
| **Offline** | `@launchpad/offline` | Offline-first capabilities |
| **Testing** | `@launchpad/testing` | Testing utilities |

## Standalone Libraries

These packages can be used independently without the full BaaS platform:

| Library | Package | Description | Tests | Coverage |
|---------|---------|-------------|-------|----------|
| **DB Engine** | `@launchpad/db-engine` | Custom DB engine with multi-tenancy | 191 | 95%+ |
| **Payments** | `@launchpad/payments` | Stripe integration | 118 | 95%+ |
| **Storage** | `@launchpad/storage` | S3/GCS abstraction | — | — |
| **Email** | `@launchpad/email` | Resend integration | — | — |
| **Workflows** | `@launchpad/workflows` | BullMQ-based job engine | — | — |
| **Secrets** | `@launchpad/secrets` | AES-256-GCM encryption | — | — |
| **AI** | `@launchpad/ai` | OpenAI + Anthropic SDK | — | — |
| **Analytics** | `@launchpad/analytics` | Event tracking, feature flags | 85+ | 99%+ |
| **Audit Log** | `@launchpad/audit-log` | Structured audit logging | 139+ | 100% |
| **i18n** | `@launchpad/i18n` | Internationalization | 127 | 97%+ |
| **App Stores** | `@launchpad/appstores` | Apple/Google IAP | 142 | 100% |

## Backend Servers

| Server | Package | Description | Tests |
|--------|---------|-------------|-------|
| **API Server** | `@launchpad/server` | Type-safe HTTP server (Hono-based) | — |
| **Payments** | `@launchpad/payments-server` | Stripe integration | 118 |
| **Realtime** | `@launchpad/realtime-server` | PostgreSQL LISTEN/NOTIFY + SSE | — |
| **Push** | `@launchpad/push-server` | FCM, APNs, Web Push | 175 |
| **Git** | `@launchpad/git-server` | Agent-optimized git server | — |
| **MCP** | `@launchpad/mcp-server` | MCP server for AI agents | — |
| **Task Orchestrator** | `@launchpad/task-orchestrator` | AI agent task queue | — |

## Quickstart

### 1. Install the Core SDK

```bash
npm install @launchpad/core
```

### 2. Initialize the Client

```typescript
import { LaunchPadClient } from '@launchpad/core';

const client = new LaunchPadClient({
  baseUrl: 'https://api.yourapp.com',
  apiKey: process.env.LAUNCHPAD_API_KEY,
});
```

### 3. Add Auth

```bash
npm install @launchpad/auth
```

```typescript
import { useAuth } from '@launchpad/auth';

function LoginPage() {
  const { login, register, user } = useAuth();

  // Use auth hooks in your components
}
```

### 4. Query the Database

```bash
npm install @launchpad/db
```

```typescript
import { useQuery, useMutation } from '@launchpad/db';

function UserList() {
  const { data: users, isLoading } = useQuery('users', () =>
    client.db.query('SELECT * FROM users')
  );

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 5. Handle Payments

```bash
npm install @launchpad/payments
```

```typescript
import { useSubscription } from '@launchpad/payments';

function BillingPage() {
  const { subscription, createCheckout } = useSubscription();

  return (
    <div>
      <p>Plan: {subscription?.plan}</p>
      <button onClick={() => createCheckout('pro')}>
        Upgrade to Pro
      </button>
    </div>
  );
}
```

## React Integration

LaunchPad provides first-class React support through hooks and context providers:

```tsx
// App.tsx
import { LaunchPadProvider } from '@launchpad/core';
import { AuthProvider } from '@launchpad/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const launchpad = new LaunchPadClient({
  baseUrl: process.env.NEXT_PUBLIC_LAUNCHPAD_URL,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LaunchPadProvider client={launchpad}>
        <AuthProvider>
          <YourApp />
        </AuthProvider>
      </LaunchPadProvider>
    </QueryClientProvider>
  );
}
```

## Multi-Tenancy

LaunchPad BaaS has multi-tenancy built in from the ground up:

```typescript
// All queries are automatically scoped to the current organization
const { data } = useQuery('projects', () =>
  client.db.query('SELECT * FROM projects')
  // Automatically filtered by user's active organization
);

// Switch organizations
await client.switchOrganization('org_123');

// Organization management
const { createOrganization, inviteMember } = useOrganization();
```

## Database Schema

LaunchPad uses PostgreSQL with Drizzle ORM. Example schema:

```typescript
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

## Realtime Subscriptions

```typescript
import { useRealtime } from '@launchpad/realtime';

function LiveNotifications() {
  const { data: notifications } = useRealtime(
    'notifications',
    { userId: currentUser.id }
  );

  return (
    <NotificationList items={notifications} />
  );
}
```

## Tech Stack

- **Language**: TypeScript (Node.js)
- **API Framework**: Hono
- **Authentication**: better-auth
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (primary), MySQL and SQLite supported
- **Payments**: Stripe
- **Storage**: S3-compatible (AWS S3, R2, etc.)
- **Email**: Resend
- **Push Notifications**: FCM, APNs, Web Push
- **AI**: OpenAI, Anthropic
- **Background Jobs**: BullMQ
- **Monorepo**: pnpm workspaces + Turborepo

## Deployment

LaunchPad BaaS can be deployed to:

- **Railway** — Primary deployment target
- **Docker** — Self-hosted option
- **AWS/GCP/Azure** — Cloud provider deployment

```bash
# Docker deployment
docker-compose up -d

# Railway deployment
railway up
```

## Self-Hosting

LaunchPad BaaS is designed to be self-hosted:

```bash
# Clone the platform repo
git clone https://github.com/launchapp-dev/launchpad-baas.git
cd launchpad-baas

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run migrations
pnpm db:migrate

# Start the server
pnpm dev
```

## Comparison with Firebase

| Feature | LaunchPad BaaS | Firebase |
|---------|---------------|----------|
| Database | PostgreSQL (open) | Firestore (proprietary) |
| Type Safety | Full TypeScript | Limited |
| Multi-tenancy | Built-in | Manual implementation |
| Auth | better-auth (open source) | Firebase Auth (vendor lock-in) |
| Source Code | Full access | Closed source |
| Deployment | Anywhere | Firebase only |
| Pricing | Self-hosted = pay for infra | Usage-based, can spike |

## API Reference

See individual SDK documentation for complete API references:

- [@launchpad/core API](https://docs.launchpad.dev/core)
- [@launchpad/auth API](https://docs.launchpad.dev/auth)
- [@launchpad/db API](https://docs.launchpad.dev/db)
- [@launchpad/payments API](https://docs.launchpad.dev/payments)

## Examples

### Next.js App

```tsx
// app/page.tsx
import { getUser } from '@launchpad/auth/server';

export default async function HomePage() {
  const user = await getUser();

  return (
    <div>
      <h1>Welcome, {user?.name || 'Guest'}</h1>
    </div>
  );
}
```

### API Route

```tsx
// app/api/users/route.ts
import { createRouteHandler } from '@launchpad/server';
import { db } from '@/lib/db';

export const GET = createRouteHandler(async (req) => {
  const users = await db.query.users.findMany();
  return Response.json(users);
});
```

## Support

- **Documentation**: [docs.launchpad.dev](https://docs.launchpad.dev)
- **GitHub**: [launchapp-dev/launchpad-baas](https://github.com/launchapp-dev/launchpad-baas)
- **Discord**: [LaunchApp Community](https://discord.gg/launchapp)
- **Email**: support@launchapp.dev

---

*LaunchPad BaaS: Your backend, your data, your control.*
