@AGENTS.md

# Invoicer — Coding Agent Guide

## What Is This?

A modern invoice generator web app. Users fill out a form, see a live preview, and download a PDF invoice. Built as an open-source showcase of what AO (Agent Orchestrator) can autonomously build.

## Tech Stack

- **Next.js 15** — App Router, TypeScript, `src/` directory
- **@launchapp/design-system** — shadcn registry with Radix UI primitives and `--la-*` CSS tokens
- **Tailwind CSS v4** — Styling
- **React Hook Form + Zod** — Form state and validation
- **@react-pdf/renderer** — Client-side PDF generation
- **localStorage** — Invoice persistence (no backend)

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
    layout.tsx        — Root layout
    page.tsx          — Main invoice page
    globals.css       — Global styles + --la-* design tokens
  components/
    ui/               — shadcn registry components (installed via CLI)
    invoice-form.tsx  — Invoice form component
    line-items.tsx    — Line item management
    ...
  lib/
    utils.ts          — cn() utility (installed by shadcn)
    calculations.ts   — Invoice math
    storage.ts        — localStorage helpers
  types/
    invoice.ts        — TypeScript types (Invoice, LineItem, etc.)
```

## Build & Test

```bash
pnpm install
pnpm dev          # Development server on :3000
pnpm build        # Production build
pnpm lint         # ESLint
```

## Working Rules

- Install UI components from the design system registry — never build custom buttons, inputs, cards, etc.
- Import UI components from `@/components/ui/<component>` (NOT from @launchapp/design-system)
- To add a new design system component, run: `npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json <component-name>`
- All form state goes through React Hook Form with Zod schemas
- Currency formatting via Intl.NumberFormat
- Keep everything client-side — no API routes, no server actions, no database
- File naming: kebab-case for files, PascalCase for components
- Imports use `@/*` alias (maps to `src/`)
- Do not add yourself as author or co-author in commits
- Do not add comments unless the logic is non-obvious
