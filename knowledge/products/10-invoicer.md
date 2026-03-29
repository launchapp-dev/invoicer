# Invoicer

> AI-built invoice generator — a showcase of what AO (Agent Orchestrator) can autonomously build. Next.js + @launchapp/design-system.

## Purpose

Invoicer is a SaaS invoice generator that allows users to sign up, create professional invoices, see live previews, and download PDFs. Built as an open-source showcase of what AO (Agent Orchestrator) can autonomously build.

Core functionality:
- User authentication (email/password)
- Create and edit invoices with line items
- Real-time preview of invoice appearance
- PDF generation and download
- Dashboard to manage all invoices
- Persistent storage per-user

The platform demonstrates rapid full-stack development with AI agents, serving as a reference implementation for AO-built products.

## Maturity: Active Development (v0.1.0)

Created on 2026-03-28. Very active development with continuous agent orchestration. Multiple E2E bugs being tracked and fixed (auth redirect loop, NL search expenses, US state tax).

**Recent milestone (2026-03-29)**: Core invoice creation functional, PDF generation working, dashboard accessible. QA identifying critical bugs in auth flow.

## Visibility: Public

Open source repository demonstrating AO capabilities and design system integration.

---

## Repository

### `invoicer` (public)
- **Type**: Next.js 16 application
- **Description**: AI-built invoice generator showcase
- **Stack**: Next.js 16, TypeScript, Tailwind CSS v4, better-auth, Drizzle ORM, SQLite, @react-pdf/renderer
- **Version**: 0.1.0
- **Created**: 2026-03-28
- **Last pushed**: 2026-03-29T15:28:05Z
- **Primary language**: TypeScript (98.9%)

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16.2.1 (App Router) | React framework with server components |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS v4 | Utility-first CSS |
| **UI Components** | @launchapp/design-system | shadcn registry components |
| **Auth** | better-auth | Email/password session management |
| **Database** | SQLite (better-sqlite3) | Data persistence |
| **ORM** | Drizzle ORM | Type-safe database operations |
| **Forms** | React Hook Form + Zod | Form state and validation |
| **PDF** | @react-pdf/renderer | Client-side PDF generation |
| **Icons** | Lucide React | Icon library |
| **Notifications** | Sonner | Toast notifications |
| **AI SDK** | @anthropic-ai/sdk | AI integration |
| **Package Manager** | pnpm | Dependency management |

---

## Core Features

### 1. Authentication
- Email/password signup/login via Better Auth
- Session-based authentication
- Protected routes for authenticated users
- Auth redirect handling

### 2. Invoice Management
- Create new invoices
- Edit existing invoices
- List all invoices in dashboard
- View invoice details
- Delete invoices

### 3. Invoice Editor
- Company/sender information
- Client/recipient information
- Invoice number and date
- Due date configuration
- Line items with:
  - Description
  - Quantity
  - Unit price
  - Amount (auto-calculated)
- Tax calculation
- Discount support
- Notes and terms

### 4. Live Preview
- Real-time preview of invoice appearance
- Side-by-side editing and preview
- Responsive preview

### 5. PDF Generation
- Client-side PDF rendering
- Download as PDF
- Consistent styling with preview
- No server-side rendering required

### 6. Dashboard
- Overview of all invoices
- Quick actions (create new, view, edit)
- Invoice status indicators

### 7. Expense Tracking (Future)
- Track business expenses
- Categorize expenses
- Link expenses to invoices

---

## Project Structure

```
src/
  app/
    layout.tsx              — Root layout
    page.tsx                — Landing page (unauthenticated)
    globals.css             — Global styles + --la-* design tokens
    (auth)/
      login/page.tsx        — Login page
      signup/page.tsx       — Signup page
    dashboard/
      page.tsx              — Invoice dashboard (authenticated)
    invoices/
      new/page.tsx          — Create invoice
      [id]/page.tsx         — Edit invoice
      [id]/preview/page.tsx — Preview/download
    expenses/
      page.tsx              — Expense tracking (future)
    settings/
      page.tsx              — User settings
    api/                    — API routes
  components/
    ui/                     — shadcn registry components
    invoice-form.tsx        — Invoice form component
    line-items.tsx          — Line item management
    pdf-document.tsx        — PDF generation component
    ...
  lib/
    utils.ts                — cn() utility
    auth.ts                 — Auth configuration
    db.ts                   — Drizzle DB client
    calculations.ts         — Invoice math utilities
  db/
    schema.ts               — Drizzle schema (users, invoices, line_items)
    migrations/             — SQL migrations
  types/
    invoice.ts              — TypeScript types
```

---

## Dependencies

### External Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.1 | Framework |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM rendering |
| better-auth | ^1.5.6 | Authentication |
| drizzle-orm | ^0.45.2 | Database ORM |
| better-sqlite3 | ^12.8.0 | SQLite driver |
| @react-pdf/renderer | ^4.3.2 | PDF generation |
| react-hook-form | ^7.72.0 | Form management |
| @hookform/resolvers | ^5.2.2 | Form validation adapters |
| zod | ^4.3.6 | Schema validation |
| tailwindcss | ^4 | Styling |
| @tailwindcss/postcss | ^4 | Tailwind PostCSS plugin |
| @anthropic-ai/sdk | ^0.80.0 | AI integration |
| lucide-react | ^1.7.0 | Icons |
| sonner | ^2.0.7 | Toast notifications |
| class-variance-authority | ^0.7.1 | Component variants |
| tailwind-merge | ^3.5.0 | Tailwind class merging |
| clsx | ^2.1.1 | Conditional classes |
| tw-animate-css | ^1.4.0 | Tailwind animations |
| shadcn | ^4.1.1 | shadcn CLI |
| cmdk | ^1.1.1 | Command palette |

### Radix UI Primitives
| Package | Purpose |
|---------|---------|
| @radix-ui/react-alert-dialog | Alert dialogs |
| @radix-ui/react-checkbox | Checkboxes |
| @radix-ui/react-dialog | Dialogs |
| @radix-ui/react-dropdown-menu | Dropdown menus |
| @radix-ui/react-label | Form labels |
| @radix-ui/react-popover | Popovers |
| @radix-ui/react-select | Select inputs |
| @radix-ui/react-separator | Separators |
| @radix-ui/react-slot | Slot composition |
| @radix-ui/react-switch | Toggle switches |
| @radix-ui/react-tabs | Tab navigation |

### Org Product Dependencies
| Product | Usage |
|---------|-------|
| @launchapp/design-system | UI components via shadcn registry |
| better-auth | Authentication (org's open-source library) |

---

## Database Schema

### Tables
- **users** — User accounts (via better-auth)
- **invoices** — Invoice headers
- **line_items** — Invoice line items
- **expenses** — Business expenses (future)

### Key Relationships
- User has many Invoices
- Invoice has many LineItems
- User has many Expenses

---

## AO Configuration

Invoicer is fully managed by AO (Agent Orchestrator):

```
.a/
  config.json         # AO configuration
  memory/             # Run memory storage
  workflows/          # Workflow definitions
```

**AO Status**: Active development with continuous agent orchestration. Multiple E2E bugs tracked.

### Recent Development Activity

#### Recent Commits (2026-03-29)
| SHA | Message | Time |
|-----|---------|------|
| 6bce9cc | planner: update run memory (6 ready E2E bugs all blocked by 6 unmerged deps; dispatched product-review) | 15:28 |
| 874fdc8 | po: update run memory (TASK-327 NL search expenses E2E bug, TASK-328 US state tax E2E bug) | 15:21 |
| 99b7a82 | qa: test results 2026-03-29 run 17 — CRITICAL FAIL (auth redirect loop, TASK-326) | 15:18 |
| eb29591 | reconciler: update run memory (promoted 3 backlog tasks to ready, TASK-325 marked done) | 15:06 |
| c873bba | planner: update run memory (TASK-325 already queued; 2 tasks blocked by 5 unmerged deps for 7+ runs) | 15:04 |

#### Active Issues
- **TASK-326**: Auth redirect loop (CRITICAL)
- **TASK-327**: NL search expenses E2E bug
- **TASK-328**: US state tax E2E bug
- **6 ready E2E bugs** blocked by 6 unmerged dependencies

---

## Build & Development

```
pnpm install
pnpm dev          # Development server on :3002
pnpm build        # Production build
pnpm lint         # ESLint
pnpm db:push      # Push schema to database
pnpm db:migrate   # Run migrations
pnpm db:generate  # Generate migrations
```

**CRITICAL**: Run `pnpm db:push` after any PR that modifies `src/db/schema.ts`. Skipping this causes `SqliteError: table X has no column named Y` at runtime.

---

## Next.js Configuration

```typescript
// next.config.ts
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};
```

---

## MCP Configuration

```json
{
  "server": {
    "enabled": true
  },
  "ao_task_runner": {
    "enabled": true
  }
}
```

---

## Product Context

Invoicer represents the **AO-built SaaS showcase** category for the launchapp-dev org. It demonstrates:

- **Rapid full-stack development**: Complete invoice SaaS built autonomously by AO agents
- **Design system integration**: Heavy use of @launchapp/design-system components
- **Best practices**: React Hook Form, Zod validation, type-safe database operations
- **PDF generation**: Client-side PDF rendering without server dependencies
- **Auth patterns**: Better Auth implementation for session-based auth

Key differentiators:
- First AO-built product with PDF generation
- Demonstrates the full development lifecycle (design → build → QA → iterate)
- Used as a template/reference for future AO-built products
- Showcases end-to-end type safety (DB schema → API → forms → validation)

---

## Non-Goals (v1)

- No payment processing (invoices tracked, not paid)
- No subscription billing
- No multi-currency support (single currency per invoice)
- No invoice templates/themes (single design)
- No client portal (only sender view)
- No automated email delivery
- No tax calculation rules (manual tax entry)
- No expense tracking (future feature)

---

## Related Knowledge

- [Design System](07-design-system.md) — UI component registry
- [AO Agent Orchestrator](02-ao-agent-orchestrator.md) — Build system
- [CondoHub](09-condohub.md) — Similar AO-built SaaS product
