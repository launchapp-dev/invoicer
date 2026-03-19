# Design System

> Radix UI based design system

## `design-system` (private)

- **Package**: `@audiogenius/design-system` v0.1.0
- **Description**: Radix UI based design system for AudioGenius
- **Language**: TypeScript
- **Last updated**: 2026-03-19 (very recent — active)
- **Maturity**: Active development

## Purpose

A shared design system based on Radix UI primitives, providing consistent UI components across LaunchApp and AudioGenius products. The `@audiogenius/` namespace suggests this may be the internal brand name for the org's design system.

## Tech Stack

- TypeScript
- Radix UI (component primitives)
- Likely Tailwind CSS (based on org-wide usage)

## Usage in Org

Design system components are used across:
- `agent-orchestrator` desktop app (uses `lucide-react`, `class-variance-authority`, `tailwind-merge` — typical Radix UI setup)
- `launchpad-saas-template` (uses multiple `@radix-ui/*` packages)
- `launchapp-lite` (uses Shadcn UI, which is built on Radix UI)
- `launchapp-studio` (desktop IDE)

## Block Modules

The design system organises higher-level, page-ready compositions under `src/blocks/`. Each block module is re-exported from the package root (`src/index.ts`).

| Block module | Exports |
|---|---|
| `blocks/auth` | `LoginForm`, `SignUpForm`, `ForgotPasswordForm`, `OTPVerification` |
| `blocks/navigation` | `AppSidebar`, `TopNav`, `MobileNavDrawer` |
| `blocks/settings` | `ProfileSettings`, `AccountSettings`, `NotificationPreferences`, `BillingPage` |
| `blocks/marketing` | `HeroSection`, `FeatureGrid`, `PricingTable`, `TestimonialCarousel` |
| `blocks/dashboard` | `StatsOverview`, `ActivityFeed`, `MetricCards` |
| `blocks/data` | `FullDataTable`, `KanbanBoard` |
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

## Notes

- No README available in the repo
- Very recent activity (updated 2026-03-19) suggests active development
- The `@audiogenius/` namespace vs `@launchpad/` suggests this may serve both the AI product line and the BaaS platform
- Shadcn UI (used in templates) is built on top of Radix UI — this design system likely provides the configured, branded layer on top of Shadcn/Radix primitives
