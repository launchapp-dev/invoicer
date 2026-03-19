---
title: "Design System — Data Flow"
product: design-system
type: data-flow
status: current
source_repos:
  - design-system
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How data flows through the design system — from component source code through the build pipeline to consuming applications. Covers both the base component layer and the blocks layer (including new ecommerce blocks), the development workflow (Storybook), build output (tsup), and runtime data patterns.

## Diagram

```mermaid
sequenceDiagram
    participant DEV as Developer
    participant BLOCKS as src/blocks/
    participant SRC as src/components/
    participant LIB as src/lib/ + src/styles/
    participant SB as Storybook v10
    participant TSUP as tsup (bundler)
    participant DIST as dist/
    participant APP as Consumer App

    Note over DEV,APP: Development Flow
    DEV->>SRC: Write/edit base component (TSX)
    DEV->>BLOCKS: Write/edit block (TSX)
    BLOCKS->>SRC: Import base components
    BLOCKS->>LIB: Import cn(), utils
    SRC->>LIB: Import cn(), utils
    SRC->>SB: Component stories auto-discovered
    BLOCKS->>SB: Block stories auto-discovered
    DEV->>SB: `pnpm dev` → localhost:6006
    SB->>DEV: Visual preview + docs

    Note over DEV,APP: Build Flow
    DEV->>TSUP: `pnpm build`
    TSUP->>SRC: Read src/index.ts (components + blocks exports)
    TSUP->>DIST: Output dist/index.js (ESM)
    TSUP->>DIST: Output dist/index.cjs (CJS)
    TSUP->>DIST: Output dist/index.d.ts (types)
    TSUP->>DIST: Output dist/styles.css

    Note over DEV,APP: Consumption Flow
    APP->>DIST: import { Button } from '@audiogenius/design-system'
    APP->>DIST: import { CheckoutForm } from '@audiogenius/design-system'
    APP->>DIST: import '@audiogenius/design-system/styles.css'
    DIST->>APP: ESM or CJS bundle + CSS

    Note over DEV,APP: Ecommerce Block Runtime Data Flow
    APP->>BLOCKS: ProductCard: {items, onAddToCart, variant}
    BLOCKS->>SRC: CVA variants → Card + Button + Badge
    APP->>BLOCKS: ShoppingCart: {items, onQuantityChange, onRemoveItem}
    BLOCKS->>SRC: Cart state → Card + Button + Separator + Badge
    APP->>BLOCKS: CheckoutForm: {onSubmit, items}
    BLOCKS->>SRC: zod schema → react-hook-form → Form + Input + RadioGroup
    BLOCKS->>APP: onSubmit(CheckoutValues)

    Note over DEV,APP: Base Component Runtime Data Flow
    APP->>SRC: Props → CVA variants → className
    SRC->>LIB: cn() merges Tailwind classes (tailwind-merge)
    SRC->>APP: Rendered accessible component (Radix a11y)
```

## Notes

- Two-tier export: src/index.ts re-exports both base components and all block categories
- Blocks are composed patterns that wire base components together with business logic
- Ecommerce data flow: ProductCard renders product data with variant layouts (compact/detailed/horizontal); ShoppingCart manages cart items with quantity controls and price calculations; CheckoutForm collects shipping/payment info via multi-field zod-validated form
- CheckoutForm uses react-hook-form + zod for form state management and validation — props flow in, CheckoutValues flow out via onSubmit callback
- Two output formats: ESM (dist/index.js) for modern bundlers, CJS (dist/index.cjs) for legacy
- CSS is distributed separately via `dist/styles.css` — consumers must import it
- CVA handles variant-based styling at both the component and block level (e.g., productCardVariants)
- tailwind-merge (via cn() utility) resolves conflicting Tailwind classes at runtime
- Radix UI primitives handle keyboard navigation, focus management, ARIA attributes
- Storybook v10 serves as both the development environment and component documentation — blocks include their own stories
- Chart components (recharts) accept data arrays and render via SVG
- DataTable (tanstack/react-table) handles sorting, filtering, pagination internally
