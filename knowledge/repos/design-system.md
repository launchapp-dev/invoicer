# design-system

**Repo**: `launchapp-dev/design-system`
**Visibility**: Private
**Language**: TypeScript
**Package**: `@audiogenius/design-system` v0.1.0
**Last updated**: 2026-03-19 (very active)

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
  components/   # ~52 atomic primitives (Button, Input, Card, Form, DataTable, …)
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

## AO Workflow Automation

Verified on the default branch at commit `735383c` (2026-03-19):

- `.ao/workflows/custom.yaml` now includes a dependency-update phase, workflow, and 6-hour cron schedule.
- An `updater` agent uses Context7 + `package-version` MCP for dependency scanning.
- Context7 was wired to reviewer, product-owner, and component-author agents.
- `package-version` was wired to product-owner and component-author agents.

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

## Notes

- The `@audiogenius/` namespace (vs `@launchpad/`) suggests it predates or serves both the AI product line and the BaaS platform
- No public README available
- Very recent activity (updated 2026-03-19) — actively being developed
- Current default-branch focus is split between component/block coverage and AO-managed maintenance automation

## Current Status: Active Development
