# Invoicer — Product Vision

The invoicing platform businesses actually want. AI-native, global-ready, built for how people work in 2026 — not 2015.

## The Problem

Invoice tools today are either bloated legacy software (QuickBooks, FreshBooks) or too simple to scale (free PDF generators). Businesses need something that's fast to start, smart enough to handle complexity, and doesn't require an accountant to operate.

## What Invoicer Is

A modern SaaS invoicing platform where AI handles the tedious parts — data entry, tax calculations, follow-ups, compliance — so business owners focus on getting paid. Start with a free tier, grow into paid plans as the business scales.

## Core Features

### 1. Authentication & Accounts
- Sign up / login with email + password via Better Auth
- OAuth: Google, GitHub
- Protected routes — unauthenticated users see the marketing landing page
- User profile with business defaults (name, address, logo, tax ID, payment details)

### 2. Invoice Creation
- Multi-section form: sender, recipient, line items, tax, discount, notes, payment terms
- Line items: description, quantity, unit price, with per-line subtotals
- Auto-calculations: subtotal, tax (multiple rates), discount, grand total
- Invoice metadata: number (auto-incrementing, customizable prefix), issue date, due date
- Payment terms presets: Net 15, Net 30, Net 60, Due on Receipt, Custom
- Attach files (contracts, receipts, SOWs) to invoices
- Duplicate any past invoice as a new draft

### 3. Live Preview
- Real-time invoice preview alongside the form
- Desktop: side-by-side layout
- Mobile: toggle between form and preview
- Preview matches the final PDF output pixel-for-pixel

### 4. PDF Generation
- Professional PDF output via @react-pdf/renderer
- Download as PDF or share via unique link
- Multiple invoice templates to choose from
- Custom branding: logo, colors, fonts

### 5. Invoice Dashboard
- All invoices at a glance with status badges: Draft, Sent, Viewed, Paid, Overdue, Void
- Search by client name, invoice number, amount
- Filter by status, date range, client, currency
- Sort by date, amount, status, client
- Bulk actions: mark as sent, export, delete
- Quick stats: total outstanding, paid this month, overdue amount

### 6. Client Management
- Save clients with their details (name, email, address, tax ID, currency preference)
- Autofill client info when creating new invoices
- Client history: all invoices for a given client, total billed, payment history
- Import clients from CSV

### 7. Multi-Currency & Global Tax
- Support all major currencies (USD, EUR, GBP, CAD, AUD, JPY, CHF, and more)
- Proper formatting via Intl.NumberFormat per currency
- Multiple tax rates per invoice (e.g., state + federal, VAT + service tax)
- Tax presets by jurisdiction (US states, EU VAT, UK VAT, Canadian GST/HST)
- Tax ID fields for sender and recipient (VAT number, EIN, ABN, etc.)
- Currency shown consistently in preview, PDF, and dashboard

### 8. Invoice Lifecycle & Status Tracking
- Status workflow: Draft -> Sent -> Viewed -> Paid -> Archived
- Manual status updates + automatic transitions
- Overdue detection: invoices past due date auto-flagged
- Payment recording: mark as paid with date, method, reference number
- Partial payments: track multiple payments against one invoice
- Void/cancel invoices with audit trail

### 9. Recurring Invoices
- Set up recurring schedules: weekly, bi-weekly, monthly, quarterly, annually
- Auto-generate draft invoices on schedule
- Edit before sending or auto-send
- Pause/resume recurring series

### 10. Settings & Customization
- Business profile: name, address, logo, tax ID, default currency
- Invoice defaults: payment terms, tax rate, notes template, numbering format
- Email templates for invoice sending (when email feature is added)
- Theme: light/dark mode, brand color accent
- Invoice template selection

## AI Features

### 11. Smart Invoice Creation
- Create invoices from natural language: "Invoice Acme Corp $5,000 for March consulting, net 30"
- AI parses intent, fills the form, user confirms and sends
- Works from the dashboard via a command bar or chat input

### 12. Intelligent Autofill
- AI suggests line items based on past invoices to the same client
- Auto-suggest tax rates based on client jurisdiction
- Smart defaults: AI learns the user's patterns (typical rates, terms, descriptions)
- Duplicate detection: warn if creating an invoice that looks like an existing one

### 13. Cash Flow Forecasting
- AI-powered dashboard widget predicting incoming payments
- Based on: outstanding invoices, client payment history, historical patterns
- "Expected this month" vs "At risk" breakdown
- Visual timeline of expected cash flow

### 14. Smart Payment Reminders
- AI drafts follow-up messages for overdue invoices
- Tone-appropriate: friendly for 1 day late, firmer for 30+ days
- Suggested send times based on client response patterns
- One-click send (when email integration is added)

### 15. Expense Categorization
- Upload receipts / expense documents
- AI extracts vendor, amount, date, category
- Link expenses to clients or projects for profit tracking
- Basic profit/loss per client: revenue (invoices) minus expenses

### 16. Natural Language Search
- Search invoices in plain English: "unpaid invoices from last quarter over $1000"
- AI translates to filters and returns results
- Works across invoices, clients, and expenses

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: @launchapp/design-system shadcn registry — install components via `npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json <component>`
- **Styling**: Tailwind CSS v4
- **Auth**: Better Auth
- **Database**: SQLite via Drizzle ORM (dev), Postgres for production
- **PDF**: @react-pdf/renderer for client-side PDF generation
- **Forms**: React Hook Form + Zod
- **AI**: Anthropic Claude API for smart features (via @anthropic-ai/sdk)
- **File Storage**: Local filesystem (dev), S3-compatible for production
- **Cron/Jobs**: AO daemon for scheduled tasks (recurring invoices, reminders)

## Design Principles

- **AI-native, not AI-bolted-on** — AI features are woven into the core UX, not a separate chatbot sidebar
- **Mobile-first responsive** — works on phones, tablets, desktops
- **Dark mode** — via design system's --la-* tokens
- **Accessible** — keyboard nav, screen readers, WCAG 2.1 AA
- **Fast** — client-side PDF generation, optimistic UI, no unnecessary loading states
- **Simple to start** — a new user should create and download their first invoice in under 2 minutes
- **Grows with you** — free tier handles basics, paid tier unlocks AI, recurring, multi-currency
- **Offline-resilient** — core invoice creation works without network, syncs when online

## Pages

1. **/** — Marketing landing page (unauthenticated)
2. **/login** — Login
3. **/signup** — Sign up
4. **/dashboard** — Invoice dashboard with stats, recent invoices, quick actions
5. **/invoices/new** — Create invoice (form + live preview)
6. **/invoices/[id]** — View/edit invoice
7. **/invoices/[id]/preview** — Full-page preview / print view
8. **/clients** — Client list
9. **/clients/[id]** — Client detail with invoice history
10. **/settings** — Business profile, defaults, theme, templates
11. **/settings/templates** — Invoice template management

## Non-Goals (v1)

- No Stripe/payment processing (record payments manually)
- No email sending (generate PDF, user sends manually or shares link)
- No team accounts / multi-user / permissions
- No accounting features (journal entries, chart of accounts, balance sheets)
- No inventory management
- No time tracking
