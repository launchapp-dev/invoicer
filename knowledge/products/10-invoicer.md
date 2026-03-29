# Invoicer

> AI-built invoice generator with expense tracking — a showcase of what AO (Agent Orchestrator) can autonomously build. Next.js + @launchapp/design-system.

## Purpose

Invoicer is a SaaS invoice generator that allows users to sign up, create professional invoices, track expenses, see live previews, and download PDFs. Built as an open-source showcase of what AO (Agent Orchestrator) can autonomously build.

Core functionality:
- User authentication (email/password)
- Create and edit invoices with line items
- Partial payment tracking with payment history
- Expense tracking with search, filter, and sort
- Tax presets by jurisdiction (US state, EU VAT, etc.)
- Payment instructions in settings and PDF output
- Real-time preview of invoice appearance
- PDF generation and download
- Dashboard to manage all invoices
- Persistent storage per-user

The platform demonstrates rapid full-stack development with AI agents, serving as a reference implementation for AO-built products.

## Maturity: Active Development (v0.1.0)

Created on 2026-03-28. Very active development with continuous agent orchestration. Multiple features added including payment tracking, expense management, tax presets, and payment instructions. E2E QA testing infrastructure in place.

**Recent milestone (2026-03-29)**: Core invoice creation functional, PDF generation working, expense tracking with search/filter/sort, payment history, tax presets, and payment instructions all implemented.

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
- Tax calculation with presets by jurisdiction:
  - US state sales tax
  - EU VAT rates
  - Custom tax rates
- Discount support
- Payment instructions (configurable in settings)
- Notes and terms

### 4. Live Preview
- Real-time preview of invoice appearance
- Side-by-side editing and preview
- Responsive preview

### 5. PDF Generation
- Client-side PDF rendering
- Download as PDF
- Payment instructions displayed on PDF
- Consistent styling with preview
- No server-side rendering required

### 6. Payment Tracking
- Record partial payments against invoices
- Payment history with date and amount
- Outstanding balance calculation
- Payment method tracking

### 7. Expense Tracking
- Track business expenses
- Categorize expenses
- Link expenses to invoices
- Search, filter, and sort controls
- Expense dashboard with summary statistics

### 8. Tax Presets
- Pre-configured tax rates by jurisdiction
- US state sales tax rates
- EU VAT rates by country
- Custom tax rate creation
- Auto-apply based on client location

### 9. Settings
- Company information (name, address, logo)
- Default payment terms
- Payment instructions for invoices
- Tax settings and defaults
- Currency preferences

### 10. Dashboard
- Overview of all invoices with status
- Expense summary and recent activity
- Quick actions (create new, view, edit)
- Invoice status indicators (draft, sent, paid, overdue)
- Outstanding balances

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
      page.tsx              — Expense tracking with search/filter/sort
    settings/
      page.tsx              — User settings with payment instructions
    api/                    — API routes
  components/
    ui/                     — shadcn registry components
    invoice-form.tsx        — Invoice form component
    line-items.tsx          — Line item management
    payment-history.tsx     — Payment tracking component
    expense-list.tsx        — Expense management with filtering
    tax-presets.tsx         — Tax preset selector
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
- **payments** — Payment records linked to invoices
- **expenses** — Business expenses with categories
- **tax_presets** — Jurisdiction-based tax rates
- **settings** — User preferences and company info

### Key Relationships
- User has many Invoices
- Invoice has many LineItems
- Invoice has many Payments (partial payment tracking)
- User has many Expenses
- User has Settings

---

## AO Configuration

Invoicer is fully managed by AO (Agent Orchestrator):

```
.a/
  config.json         # AO configuration
  memory/             # Run memory storage
  workflows/          # Workflow definitions
qa/
  tests/              # E2E test specifications
  reports/            # QA test results
```

**AO Status**: Active development with continuous agent orchestration. QA testing infrastructure in place with automated E2E testing.

### Recent Development Activity

#### Recently Shipped Features (2026-03-28/29)
| Feature | Task | Description |
|---------|------|-------------|
| Partial Payment Tracking | TASK-297 | Record multiple payments per invoice with history |
| Tax Presets | TASK-293 | Jurisdiction-based tax rates (US states, EU VAT) |
| Expense Search/Filter | TASK-299 | Full-text search, category filter, date/amount sort |
| Payment Instructions | TASK-301 | Configurable instructions in settings, shown on PDF |
| QA Test Infrastructure | — | E2E test specs and automated QA workflow |

#### Recent Commits (2026-03-29)
| SHA | Message | Time |
|-----|---------|------|
| — | planner: update run memory | ongoing |
| — | qa: test results with various PASS/FAIL states | ongoing |
| — | po: triage new features and bugs | ongoing |

#### Active Development Areas
- Payment tracking stability
- Expense management polish
- Tax preset expansion (more jurisdictions)
- E2E bug fixes for auth and checkout flows

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

- No payment processing (invoices tracked, not paid via platform)
- No subscription billing
- No multi-currency support (single currency per invoice)
- No invoice templates/themes (single design)
- No client portal (only sender view)
- No automated email delivery
- No expense receipt upload (manual entry only)
- No multi-company support

---

## Related Knowledge

- [Design System](07-design-system.md) — UI component registry
- [AO Agent Orchestrator](02-ao-agent-orchestrator.md) — Build system
- [CondoHub](09-condohub.md) — Similar AO-built SaaS product
