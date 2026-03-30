@AGENTS.md

# Invoicer — Coding Agent Guide

## What Is This?

A SaaS invoice generator. Users sign up, create invoices, see a live preview, and download PDFs. Built as an open-source showcase of what AO (Agent Orchestrator) can autonomously build.

## Tech Stack

- **Next.js 15** — App Router, TypeScript, `src/` directory
- **@launchapp/design-system** — shadcn registry with Radix UI primitives and `--la-*` CSS tokens
- **Tailwind CSS v4** — Styling
- **Auth**: Better Auth — email/password signup/login, session management
- **Database**: SQLite + Drizzle ORM — users, clients, invoices, expenses, recurring invoices, payments, attachments
- **React Hook Form + Zod** — Form state and validation
- **@react-pdf/renderer** — Client-side PDF generation
- **Anthropic SDK** — AI-assisted invoice generation
- **Sonner** — Toast notifications

## Design System — shadcn Registry

Components are installed from our shadcn registry into `src/components/ui/`. **Do NOT install @launchapp/design-system as an npm package.** Use the shadcn CLI:

### Install components
```bash
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json button
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json button input label card badge separator
```

### Import installed components
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
```

### CSS tokens
All design tokens use the `--la-` prefix (e.g., `--la-primary`, `--la-background`). These are defined in globals.css. Available component slugs (lowercase, hyphenated): accordion, alert, alert-dialog, badge, button, card, checkbox, combobox, command, context-menu, dialog, dropdown-menu, form, hover-card, input, label, menubar, navigation-menu, popover, radio-group, scroll-area, select, separator, sheet, skeleton, slider, switch, table, tabs, textarea, toast, toggle, tooltip, and many more.

## Project Structure

```
src/
  app/
    layout.tsx                    — Root layout
    page.tsx                      — Landing page (unauthenticated)
    globals.css                   — Global styles + --la-* design tokens
    (auth)/
      login/page.tsx              — Login page
      signup/page.tsx             — Signup page
    dashboard/
      page.tsx                    — Invoice dashboard (authenticated)
      recurring/page.tsx          — Recurring invoices
      dashboard-stats.tsx         — Stats widget
      dashboard-filters.tsx       — Dashboard filters
      dashboard-table.tsx         — Invoice table
      invoice-actions.tsx         — Invoice actions menu
      logout-button.tsx           — Logout button
      cash-flow-widget.tsx        — Cash flow visualization
      pagination-controls.tsx     — Table pagination
      ai-invoice-command.tsx      — AI invoice generation dialog
    invoices/
      new/page.tsx                — Create invoice
      [id]/page.tsx               — Edit invoice
      [id]/preview/page.tsx       — Preview and PDF download
    clients/
      page.tsx                    — Client list
      [id]/page.tsx               — Edit client
      new/page.tsx                — Create client
      csv-import.tsx              — CSV client import
    settings/
      page.tsx                    — Account settings
      templates/page.tsx          — Invoice templates
      settings-form.tsx           — Settings form
    expenses/
      page.tsx                    — Expenses list
      expenses-manager.tsx        — Expense management
    i/[token]/
      page.tsx                    — Public invoice view (share link)
      public-invoice-view.tsx     — Shared invoice component
    changelog/page.tsx            — Changelog page
    api/
      auth/[...all]/route.ts      — Auth endpoints
      attachments/route.ts        — Upload attachment
      attachments/[id]/route.ts   — Serve attachment
  components/
    ui/                           — shadcn registry components (installed via CLI)
    invoice-form.tsx              — Invoice form with line items
    line-items.tsx                — Line item row management
    invoice-attachments.tsx       — Attachment upload/list
    invoice-totals.tsx            — Summary totals display
    invoice-pdf.tsx               — PDF document structure
    invoice-preview.tsx           — PDF preview
  lib/
    utils.ts                      — cn() utility (installed by shadcn)
    auth.ts                       — Auth configuration
    auth-client.ts                — Client-side auth utilities
    db.ts                         — Drizzle DB client
    calculations.ts               — Invoice math (subtotal, tax, total)
    recurring-actions.ts          — Recurring invoice triggers
    expense-storage.ts            — Expense persistence
    invoice-schema.ts             — Zod schemas for invoices
    storage.ts                    — Client-side storage utilities
    ai.ts                         — Anthropic API integration
  db/
    schema.ts                     — Drizzle schema (user, session, account, verification, userSettings, invoices, clients, expenses, payments, attachments, recurringInvoices)
    migrations/                   — SQL migrations
```

## Build & Test

```bash
pnpm install
pnpm dev          # Development server on :3002
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm db:push      # Push schema to database
pnpm db:migrate   # Run migrations
pnpm db:generate  # Generate migration files
```

**CRITICAL**: Run `pnpm db:push` in the project root (`/Users/samishukri/brain/repos/invoicer`) after any PR that modifies `src/db/schema.ts` is merged. Skipping this causes `SqliteError: table X has no column named Y` at runtime — the in-memory Drizzle schema diverges from the on-disk SQLite file. This brought down the dashboard and invoice save (TASK-289).

### Database Schema Tables

- **user** — Better Auth user with email, name, image
- **session** — User sessions (token, expiration, IP, user-agent)
- **account** — OAuth account links (provider, tokens)
- **verification** — Email verification tokens
- **userSettings** — User preferences (business info, branding, currency, theme, invoice templates, payment terms)
- **invoices** — Invoice records (status, dates, parties, line items as JSON, totals, payment info)
- **clients** — Client directory (contact info, company, address, preferences)
- **expenses** — Expense tracking (vendor, amount, category, receipt path)
- **recurringInvoices** — Scheduled invoice generation (frequency, template, status)
- **payments** — Payment records (invoice, amount, method, date)
- **attachments** — Invoice file attachments (invoice, file path, metadata)

## Working Rules

- Install UI components from the design system registry — never build custom buttons, inputs, cards, etc.
- Import UI components from `@/components/ui/<component>` (NOT from @launchapp/design-system)
- To add a new design system component, run: `npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json <component-name>`
- All form state goes through React Hook Form with Zod schemas
- Currency formatting via Intl.NumberFormat
- Auth-protected routes use middleware or server-side session checks
- All invoice CRUD goes through server actions or API routes backed by Drizzle
- File naming: kebab-case for files, PascalCase for components
- Imports use `@/*` alias (maps to `src/`)
- Do not add yourself as author or co-author in commits
- Do not add comments unless the logic is non-obvious
