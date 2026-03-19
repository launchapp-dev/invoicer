---
title: "Design System — Deployment Architecture"
product: design-system
type: deployment
status: current
source_repos:
  - design-system
generated_by: architecture-diagrammer
generated_at: 2026-03-18
last_verified: 2026-03-19
---

## Overview

How the design system is built, documented, and distributed. Built with tsup into dual ESM/CJS bundles, documented via Storybook v10, and consumed as a package by other org repos.

## Diagram

```mermaid
graph TD
    subgraph "Source"
        SRC["src/<br/>components/, lib/, styles/"]
        TS["TypeScript 5"]
    end

    subgraph "Build Pipeline"
        TSUP["tsup<br/>Bundle + DTS generation"]
        POSTCSS["PostCSS + Tailwind CSS"]
        TCHECK["tsc --noEmit<br/>Type checking"]
    end

    subgraph "Output (dist/)"
        ESM["dist/index.js<br/>ESM module"]
        CJS["dist/index.cjs<br/>CommonJS module"]
        DTS["dist/index.d.ts<br/>Type declarations"]
        CSS["dist/styles.css<br/>Compiled styles"]
    end

    subgraph "Documentation"
        SB["Storybook v10<br/>storybook dev -p 6006"]
        SBBUILD["storybook build<br/>Static site"]
    end

    subgraph "Consumer Projects"
        SAAS["saas-template-launch-app-test"]
        AOAPP["agent-orchestrator"]
        STUDIO["launchapp-studio"]
        LPSAAS["launchpad-saas-template"]
    end

    SRC --> TSUP
    SRC --> POSTCSS
    SRC --> TCHECK
    TSUP --> ESM
    TSUP --> CJS
    TSUP --> DTS
    POSTCSS --> CSS

    SRC --> SB
    SB --> SBBUILD

    ESM --> SAAS
    ESM --> AOAPP
    ESM --> STUDIO
    ESM --> LPSAAS
    CSS --> SAAS
    CSS --> AOAPP
```

## Notes

- tsup bundles to both ESM and CJS for maximum compatibility
- Package exports: "." for JS/types, "./styles.css" for compiled CSS
- Storybook v10 with @storybook/react-vite for Vite-based dev server
- Private package (not published to npm) — consumed via workspace references or git
- The @audiogenius/design-system namespace is used across the org
- Consumers import components and separately import styles.css
