# Invoicer — Product Vision

A clean, modern SaaS invoice generator built with Next.js and @launchapp/design-system.

## What It Does

Users sign up, create invoices via a form (sender, recipient, line items, tax, notes), see a live preview, and download professional PDF invoices. Invoices are saved to their account and accessible from any device.

## Core Features

1. **Authentication** — Sign up, login, logout with email/password. OAuth (Google, GitHub) as stretch goal. Protected routes — unauthenticated users see a landing page + login.
2. **Invoice Form** — Multi-section form: sender info, recipient info, line items (description, quantity, rate), tax rate, discount, notes, payment terms
3. **Live Preview** — Real-time invoice preview alongside the form as the user types
4. **PDF Generation** — Generate downloadable PDF invoices from the form data
5. **Invoice Dashboard** — Authenticated users see a dashboard of all their invoices with status (draft, sent, paid), search, and filters
6. **Invoice History** — Save invoices to the database tied to the user's account. Edit, duplicate, delete.
7. **Customization** — Choose from invoice templates/themes, upload a logo, set brand colors
8. **Currency Support** — Support multiple currencies with proper formatting
9. **Auto-Calculations** — Subtotal, tax, discount, and total computed automatically

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: @launchapp/design-system shadcn registry — install components via `npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json <component>`
- **Styling**: Tailwind CSS v4
- **Auth**: Better Auth for authentication
- **Database**: SQLite via Drizzle ORM (simple, no external infra needed for dev)
- **PDF**: @react-pdf/renderer for client-side PDF generation
- **State**: React Hook Form + Zod for form validation

## Design Principles

- Mobile-first responsive design
- Dark mode support (via design system)
- Accessible (keyboard nav, screen readers, proper ARIA)
- Fast — client-side PDF generation, server-side data persistence
- Simple infra — SQLite + file-based auth, no external services required to run locally

## Non-Goals (v1)

- No payment processing / Stripe billing
- No email sending (no "send invoice via email")
- No team accounts / multi-user orgs
- No recurring invoices
