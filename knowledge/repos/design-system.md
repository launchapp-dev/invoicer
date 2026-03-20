# design-system

**Repo**: `launchapp-dev/design-system`
**Visibility**: Private
**Language**: TypeScript
**Package**: `@audiogenius/design-system` v0.1.0
**Last updated**: 2026-03-20T13:04:59Z (very active)

## Purpose

Shared design system based on Radix UI primitives, providing consistent UI components across LaunchApp and AudioGenius products. The branded, configured layer on top of Shadcn UI / Radix UI.

## Tech Stack

- TypeScript
- Radix UI (component primitives)
- Tailwind CSS (styling)
- Likely: class-variance-authority, tailwind-merge, lucide-react

## Usage in Org

| Consumer | How Used |
|----------|---------|
| `agent-orchestrator` | Desktop app UI components |
| `launchpad-saas-template` | Template UI components |
| `launchapp-lite` | Via Shadcn UI (Radix-based) |
| `launchapp-studio` | Desktop IDE components |

## Source Structure

```
apps/
  docs/         # Documentation website with component pages + live previews

src/
  components/   # ~52 atomic primitives (Button, Input, Card, Form, DataTable, SearchableDataTable, …)
  blocks/
    auth/       # LoginForm, SignUpForm, ForgotPasswordForm, OTPVerification
    navigation/ # AppSidebar, TopNav, MobileNavDrawer
    settings/   # ProfileSettings, AccountSettings, NotificationPreferences, BillingPage
    marketing/  # HeroSection, FeatureGrid, PricingTable, TestimonialCarousel
    dashboard/  # StatsOverview, ActivityFeed, MetricCards
    data/       # FullDataTable, KanbanBoard
    ecommerce/  # ProductCard, ProductCardGrid, ShoppingCart, CheckoutForm  ← added 2026-03-19
  lib/          # cn() utility
  styles/       # CSS + Tailwind config
  index.ts      # Flat public re-exports for everything above
```

## Release Automation

Verified on the default branch at commit `93211d8` (2026-03-19):

- `.release-it.json` — release configuration for automated versioning and changelog generation
- `CHANGELOG.md` — manually curated release history
- GitHub release/pages workflows — automated CI/CD for publishing npm package and documentation
- `.npmignore` — controls which files are packaged when published to npm

## AO Workflow Automation

Verified on the default branch at commit `93211d8` (2026-03-19):

- `.ao/workflows/custom.yaml` includes a dependency-update phase, workflow, and 6-hour cron schedule
- An `updater` agent uses Context7 + `package-version` MCP for dependency scanning
- Context7 was wired to reviewer, product-owner, and component-author agents
- `package-version` was wired to product-owner and component-author agents

## Ecommerce Block Module (`src/blocks/ecommerce`)

Added 2026-03-19. Three components for building storefronts:

| Export | Description |
|---|---|
| `ProductCard` | Single product tile; variants: `compact`, `detailed`, `horizontal` |
| `productCardVariants` | CVA variant factory (for style extension) |
| `ProductCardGrid` | Responsive grid wrapper (1–4 columns) |
| `ShoppingCart` | Cart panel with quantity controls, tax/shipping calc, free-shipping threshold |
| `CheckoutForm` | Full checkout page: contact info + shipping address + card/PayPal payment + order summary |

**Key types**: `ProductCardItem`, `CartItem`, `CheckoutValues`, `OrderSummaryItem`

All ecommerce exports are available directly from the package root:

```ts
import {
  ProductCard, ProductCardGrid,
  ShoppingCart,
  CheckoutForm,
} from "@audiogenius/design-system";
```

## SearchableDataTable Component

Added 2026-03-19 as a new primitive in `src/components/`. A searchable, filterable data table component with live Storybook story. Builds on the existing `DataTable` component, adding:

- Full-text search across table columns
- Dynamic filtering UI
- Responsive design matching existing table variants

Exported directly from the package root alongside other atomic components.

## Documentation

Updated 2026-03-19:
- README.md rewritten to clarify design system purpose, usage, and component categories
- CONTRIBUTING.md added with guidelines for component development and testing
- Storybook stories updated to include SearchableDataTable live preview

## Recent Activity (2026-03-20)

**Early morning (00:30–00:38Z):**
- PR #103 merged at 2026-03-20T00:32:57Z
- PR #102 merged at 2026-03-20T00:37:35Z
- Issues #84 and #85 updated at 2026-03-20T00:38:27Z and 2026-03-20T00:38:29Z

**Post-12:43Z activity (accessibility hardening & docs upgrade):**
- PR #130 (12:57:08Z): NavigationMenuTrigger updated with focus-visible ring for WCAG 2.4.7 compliance (TASK-134)
- PR #131 (12:57:29Z): Warning variant component updated with role="alert" for WCAG 4.1.3 compliance (TASK-135)
- PR #104 (13:04:53Z): Storybook docs site upgraded from Next.js 14 to 16.2.0 for improved compatibility and performance (TASK-102)

Continued active development of components and blocks with AO-managed automation; emphasis on accessibility compliance and documentation infrastructure.

## Current Status: Active Development

- The `@audiogenius/` namespace (vs `@launchpad/`) suggests it predates or serves both the AI product line and the BaaS platform
- No public README available
- Very recent activity (updated 2026-03-20) — actively being developed
- Current default-branch focus is split between component/block coverage and AO-managed maintenance automation
