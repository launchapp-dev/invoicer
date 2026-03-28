@AGENTS.md

# Invoicer — Coding Agent Guide

## What Is This?

A modern invoice generator web app. Users fill out a form, see a live preview, and download a PDF invoice. Built as an open-source showcase of what AO (Agent Orchestrator) can autonomously build.

## Tech Stack

- **Next.js 15** — App Router, TypeScript, `src/` directory
- **@launchapp/design-system** — UI component library (shadcn-based, Radix primitives). Install from GitHub: `pnpm add @launchapp/design-system@github:launchapp-dev/design-system`
- **Tailwind CSS v4** — Styling (design system uses `--la-*` CSS tokens)
- **React Hook Form + Zod** — Form state and validation
- **@react-pdf/renderer** — Client-side PDF generation
- **localStorage** — Invoice persistence (no backend)

## Design System Usage

Import components from `@launchapp/design-system`:
```tsx
import { Button, Card, Input, Label, Form } from "@launchapp/design-system";
import "@launchapp/design-system/styles.css";
```

All CSS tokens use the `--la-` prefix (e.g., `--la-primary`, `--la-background`). See the design system's Tailwind config for the full mapping. Available components include: Button, Card, Input, Label, Form, Select, Table, Dialog, Badge, Separator, Tabs, and 100+ more.

## Project Structure

```
src/
  app/
    layout.tsx        — Root layout with design system styles
    page.tsx          — Main invoice page
    globals.css       — Global styles + design system tokens
  components/         — Invoice-specific components
  lib/                — Utilities (calculations, PDF generation, storage)
  types/              — TypeScript types (Invoice, LineItem, etc.)
```

## Build & Test

```bash
pnpm install
pnpm dev          # Development server on :3000
pnpm build        # Production build
pnpm lint         # ESLint
```

## Working Rules

- Use `@launchapp/design-system` components for ALL UI — never build custom buttons, inputs, cards, etc.
- All form state goes through React Hook Form with Zod schemas
- Currency formatting via Intl.NumberFormat
- Keep everything client-side — no API routes, no server actions, no database
- File naming: kebab-case for files, PascalCase for components
- Imports use `@/*` alias (maps to `src/`)
- Do not add yourself as author or co-author in commits
- Do not add comments unless the logic is non-obvious
