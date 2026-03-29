# LaunchPad BaaS

> Modular Backend-as-a-Service platform — authentication, database, storage, payments, and more as TypeScript SDKs.

## What Is LaunchPad BaaS?

LaunchPad BaaS is a Firebase alternative built on Postgres and open standards. It provides core backend services as independently deployable TypeScript packages with full type safety and multi-tenancy built in.

The platform consists of:
- **11 client SDKs** — React hooks and components
- **7 backend servers** — Hono-based services
- **11 standalone libraries** — Framework-agnostic utilities

---

## Quick Start

### 1. Install Core SDK

```bash
npm install @launchpad/core
```

### 2. Install Service SDKs

```bash
npm install @launchpad/auth @launchpad/db @launchpad/storage
npm install @launchpad/payments @launchpad/realtime @launchpad/push
```

### 3. Initialize Client

```typescript
import { LaunchPadClient } from '@launchpad/core';

const client = new LaunchPadClient({
  baseUrl: 'https://api.your-app.com',
  apiKey: process.env.LAUNCHPAD_API_KEY,
});
```

### 4. Use React Hooks

```typescript
import { useAuth, useDatabase, useStorage } from '@launchpad/auth';

function App() {
  const { user, signIn } = useAuth();
  const { data } = useDatabase('posts');
  const { upload } = useStorage();

  // Build your UI
}
```

---

## Client SDKs

All SDKs at v0.1.0, published to npm:

| SDK | Package | Purpose |
|-----|---------|---------|
| Core | `@launchpad/core` | HTTP client, session management |
| Auth | `@launchpad/auth` | Authentication hooks and components |
| DB | `@launchpad/db` | TanStack Query hooks for database |
| Storage | `@launchpad/storage` | File uploads and downloads |
| Payments | `@launchpad/payments` | Stripe subscriptions and billing |
| Realtime | `@launchpad/realtime` | WebSocket subscriptions |
| Workflows | `@launchpad/workflows` | Background jobs and scheduled tasks |
| Push | `@launchpad/push` | Web and mobile push notifications |
| Identity | `@launchpad/identity` | SSO, RBAC, organization management |
| Customers | `@launchpad/customers` | CRM, segmentation, engagement |
| CMS | `@launchpad/cms` | Headless CMS with content types |

---

## Backend Servers

| Server | Package | Purpose |
|--------|---------|---------|
| API Server | `@launchpad/server` | Type-safe HTTP with OpenAPI 3.1 |
| Payments | `@launchpad/payments-server` | Stripe webhooks and subscriptions |
| Realtime | `@launchpad/realtime-server` | PostgreSQL LISTEN/NOTIFY, Redis pub/sub |
| Push | `@launchpad/push-server` | FCM, APNs, Web Push |
| Git | `@launchpad/git-server` | Agent-optimized git with worktree isolation |
| MCP | `@launchpad/mcp-server` | MCP server for AI agent integration |
| Task Orchestrator | `@launchpad/task-orchestrator` | AI agent task queue with MCP tools |

---

## Standalone Libraries

Framework-agnostic utilities:

| Library | Purpose |
|---------|---------|
| `@launchpad/db-engine` | Custom DB engine with multi-tenancy (public) |
| `@launchpad/analytics` | Event tracking and feature flags |
| `@launchpad/audit-log` | Structured audit logging |
| `@launchpad/i18n` | Internationalization utilities |
| `@launchpad/ai` | OpenAI/Anthropic SDK wrapper |
| `@launchpad/email` | Resend integration with templating |
| `@launchpad/secrets` | AES-256-GCM encryption |
| `@launchpad/appstores` | App Store and Google Play IAP validation |

---

## Tech Stack

- **Language**: TypeScript (Node.js)
- **API Framework**: Hono
- **Authentication**: better-auth
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (primary), MySQL and SQLite supported
- **Payments**: Stripe
- **Storage**: S3-compatible (AWS S3, R2, Tigris)
- **Email**: Resend
- **Push**: FCM, APNs, Web Push
- **AI**: OpenAI, Anthropic
- **Deployment**: Railway, Vercel, Cloudflare Workers, Docker

---

## Architecture

### Monorepo Structure

```
launchpad-baas/
├── apps/
│   ├── api/          # Hono API server
│   └── admin/        # Next.js admin UI
├── sdk/
│   ├── core/         # Core SDK
│   ├── auth/         # Auth SDK
│   └── db/           # DB SDK
└── packages/
    └── ...           # Shared packages
```

### Multi-Tenancy

All services support organization-based data isolation:

```typescript
// Automatic tenant isolation
const posts = await db.query.posts.findMany({
  where: eq(posts.orgId, currentOrg.id)
});
```

### API Design

- OpenAPI 3.1 specification
- Zod validation
- Type-safe clients generated from spec

---

## Integration with LaunchApp Templates

LaunchApp Templates come with LaunchPad SDKs pre-configured:

```typescript
// In a LaunchApp template
import { useAuth } from '@launchpad/auth';
import { useDatabase } from '@launchpad/db';

// Already wired up to your backend
```

---

## Deployment

### Railway (Recommended)

```bash
railway login
railway link
railway up
```

### Cloudflare Workers

Edge-first deployment with Hyperdrive (Neon Postgres pooling) and R2:

```bash
wrangler deploy
```

Features:
- Sub-5ms cold starts
- 50ms CPU time limit per request
- R2 for S3-compatible storage

### Docker

```bash
docker build -t launchpad-api .
docker run -p 3000:3000 launchpad-api
```

---

## Related Products

| Product | Relationship |
|---------|--------------|
| [LaunchApp Templates](./launchapp-templates.md) | Pre-configured with LaunchPad SDKs |
| [AO Agent Orchestrator](./ao-agent-orchestrator.md) | Can deploy and manage LaunchPad services |
| [better-auth](https://github.com/better-auth/better-auth) | Our open-source auth library (used by LaunchPad) |

---

## License

Private — not yet publicly released.
