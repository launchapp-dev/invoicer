# Invoicer — Product Vision

A clean, modern invoice generator built with Next.js and @launchapp/design-system.

## What It Does

Users fill out a form with invoice details (sender, recipient, line items, tax, notes) and generate a professional PDF invoice they can download or share via link.

## Core Features

1. **Invoice Form** — Multi-section form: sender info, recipient info, line items (description, quantity, rate), tax rate, discount, notes, payment terms
2. **Live Preview** — Real-time invoice preview alongside the form as the user types
3. **PDF Generation** — Generate downloadable PDF invoices from the form data
4. **Invoice History** — Save invoices locally (localStorage) so users can revisit and duplicate past invoices
5. **Customization** — Choose from invoice templates/themes, upload a logo, set brand colors
6. **Currency Support** — Support multiple currencies with proper formatting
7. **Auto-Calculations** — Subtotal, tax, discount, and total computed automatically

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: @launchapp/design-system (shadcn-based, Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **PDF**: @react-pdf/renderer for client-side PDF generation
- **State**: React Hook Form + Zod for form validation
- **Storage**: localStorage for invoice persistence (no backend needed)

## Design Principles

- Mobile-first responsive design
- Dark mode support (via design system)
- Accessible (keyboard nav, screen readers, proper ARIA)
- Fast — no server-side rendering needed for the core flow, client-side PDF generation
- Zero backend — runs entirely in the browser

## Non-Goals (v1)

- No user accounts / authentication
- No payment processing
- No email sending
- No server-side storage
