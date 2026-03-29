# Design System

> Radix UI based design system

## `design-system` (private)

- **Package**: `@launchapp/design-system` v0.1.0
- **Description**: Radix UI based design system for LaunchApp
- **Language**: TypeScript
- **Last updated**: 2026-03-29 (very recent — active)
- **Maturity**: Active development with AO-managed dependency automation

## Purpose

A shared design system based on Radix UI primitives, providing consistent UI components across LaunchApp products. Published as `@launchapp/design-system` and compatible with the shadcn registry.

## Tech Stack

- TypeScript
- Radix UI (component primitives)
- Tailwind CSS
- Storybook v10
- AO workflow automation via `.ao/workflows/custom.yaml`

## Usage in Org

Design system components are used across:
- `agent-orchestrator` desktop app (uses `lucide-react`, `class-variance-authority`, `tailwind-merge` — typical Radix UI setup)
- `launchpad-saas-template` (uses multiple `@radix-ui/*` packages)
- `launchapp-lite` (uses Shadcn UI, which is built on Radix UI)
- `launchapp-studio` (desktop IDE)
- `invoicer`, `postpilot`, `condohub` (AO-built showcase apps)

## Block Modules

The design system organises higher-level, page-ready compositions under `src/blocks/`. Each block module is re-exported from the package root (`src/index.ts`).

| Block module | Exports |
|---|---|
| `blocks/auth` | `LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OTPVerification` |
| `blocks/navigation` | `AppSidebar`, `TopNav`, `MobileNavDrawer` |
| `blocks/settings` | `ProfileSettings`, `AccountSettings`, `NotificationPreferences`, `BillingPage` |
| `blocks/marketing` | `HeroSection`, `FeatureGrid`, `PricingTable`, `TestimonialCarousel` |
| `blocks/dashboard` | `StatsOverview`, `ActivityFeed`, `MetricCards` |
| `blocks/data` | `FullDataTable`, `KanbanBoard`, `SearchableDataTable` |
| `blocks/ecommerce` | `ProductCard`, `ProductCardGrid`, `ShoppingCart`, `CheckoutForm` |

### Ecommerce Blocks (added 2026-03-19)

Three new production-ready ecommerce UI blocks live under `src/blocks/ecommerce`:

#### `ProductCard` / `ProductCardGrid`

Displays a single product with image, price, rating, badge, and an "Add to cart" CTA. Supports three CVA variants:

| Variant | Layout |
|---|---|
| `compact` (default) | Stacked card, 160 px image |
| `detailed` | Stacked card, 224 px image + description |
| `horizontal` | Side-by-side image + content row |

`ProductCardGrid` wraps multiple `ProductCard` instances in a responsive CSS grid (1–4 columns).

Key exports: `ProductCard`, `productCardVariants`, `ProductCardGrid`, `ProductCardProps`, `ProductCardItem`, `ProductCardGridProps`.

#### `ShoppingCart`

A self-contained cart panel that manages its own item state (controlled or uncontrolled via `itemsProp`). Computes subtotal, tax (configurable `taxRate`), and shipping (configurable `shippingCost`, optional `freeShippingThreshold`). Renders an empty-state illustration when the cart is empty.

Key exports: `ShoppingCart`, `ShoppingCartProps`, `CartItem`.

#### `CheckoutForm`

A full, two-column checkout page (form + sticky order summary sidebar). Built on `react-hook-form` + `zod` (`checkoutSchema`). Sections: contact information, shipping address, and payment method (Credit Card or PayPal). Card fields are conditionally rendered based on the selected payment method.

Key exports: `CheckoutForm`, `CheckoutFormProps`, `CheckoutValues`, `OrderSummaryItem`.

## New Components (2026-03-19)

### SearchableDataTable

A new searchable, filterable data table component added to `src/components/`. Builds on the existing `DataTable` component with:
- Full-text search across table columns
- Dynamic filtering UI
- Responsive design matching existing table variants
- Live Storybook story for interactive development

Exported directly from the package root alongside atomic components.

## Release Automation (2026-03-19)

The repo now supports automated npm package publishing with:
- `.release-it.json` — release configuration for versioning and changelog generation
- `CHANGELOG.md` — curated release history
- GitHub release/pages workflows — CI/CD for publishing to npm and documentation site
- `.npmignore` — controls what files are included in the npm package
- `CONTRIBUTING.md` — guidelines for component contributors

## Repository Automation (verified 2026-03-19)

The repo is now an AO-managed maintenance target combining feature delivery with automated dependency maintenance:

- `.ao/workflows/custom.yaml` includes a dependency-update phase, workflow, and 6-hour cron schedule
- An updater agent uses Context7 + `package-version` MCP for dependency scanning
- Context7 is wired to reviewer, product-owner, and component-author agents
- `package-version` is wired to product-owner and component-author agents

## Recent Activity (2026-03-20)

- PR #103 merged at 2026-03-20T00:32:57Z
- PR #102 merged at 2026-03-20T00:37:35Z
- Issues #84 and #85 updated at 2026-03-20T00:38:27Z and 2026-03-20T00:38:29Z
- Continued active development with AO-managed automation cycle

## Notes

- README confirms package is `@launchapp/design-system`
- Very recent activity (updated 2026-03-29) suggests active development
- Phase 3/4 components in progress
- Shadcn UI (used in templates) is built on top of Radix UI — this design system provides the configured, branded layer on top of Shadcn/Radix primitives
- The repo now mixes feature delivery (components/blocks/docs) with automated dependency maintenance through AO
