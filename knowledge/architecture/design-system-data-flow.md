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

How data flows through the design system — from component source code through the build pipeline to consuming applications. Covers the development workflow (Storybook), build output (tsup), and how consumers import and render components.

## Diagram

```mermaid
sequenceDiagram
    participant DEV as Developer
    participant SRC as src/components/
    participant LIB as src/lib/ + src/styles/
    participant SB as Storybook v10
    participant TSUP as tsup (bundler)
    participant DIST as dist/
    participant APP as Consumer App

    Note over DEV,APP: Development Flow
    DEV->>SRC: Write/edit component (TSX)
    SRC->>LIB: Import cn(), utils
    SRC->>SB: Stories auto-discovered
    DEV->>SB: `pnpm dev` → localhost:6006
    SB->>DEV: Visual preview + docs

    Note over DEV,APP: Build Flow
    DEV->>TSUP: `pnpm build`
    TSUP->>SRC: Read src/index.ts exports
    TSUP->>DIST: Output dist/index.js (ESM)
    TSUP->>DIST: Output dist/index.cjs (CJS)
    TSUP->>DIST: Output dist/index.d.ts (types)
    TSUP->>DIST: Output dist/styles.css

    Note over DEV,APP: Consumption Flow
    APP->>DIST: import { Button } from '@audiogenius/design-system'
    APP->>DIST: import '@audiogenius/design-system/styles.css'
    DIST->>APP: ESM or CJS bundle + CSS
    APP->>APP: Render with Tailwind classes
    APP->>APP: Radix UI handles a11y + behavior

    Note over DEV,APP: Component Data Flow (Runtime)
    APP->>SRC: Props → CVA variants → className
    SRC->>LIB: cn() merges Tailwind classes (tailwind-merge)
    SRC->>APP: Rendered accessible component
```

## Notes

- Two output formats: ESM (dist/index.js) for modern bundlers, CJS (dist/index.cjs) for legacy
- CSS is distributed separately via `dist/styles.css` — consumers must import it
- Components use CVA (class-variance-authority) for variant-based styling at the prop level
- tailwind-merge (via cn() utility) resolves conflicting Tailwind classes at runtime
- Radix UI primitives handle keyboard navigation, focus management, ARIA attributes
- Storybook v10 serves as both the development environment and component documentation
- Form components integrate react-hook-form + zod for validation data flow
- Chart components (recharts) accept data arrays and render via SVG
- DataTable (tanstack/react-table) handles sorting, filtering, pagination internally
