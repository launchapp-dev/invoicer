---
title: LaunchApp Design System
description: Radix UI-based component library with Tailwind CSS styling
product: design-system
version: 0.1.0
created: 2026-03-29
---

# LaunchApp Design System

> Production-ready React components built on Radix UI primitives. Shadcn/ui compatible with full theming support.

## What is the Design System?

The LaunchApp Design System is a comprehensive React component library built on top of Radix UI primitives. It provides accessible, composable, and customizable UI components for building modern web applications.

Built and maintained by AO agents, the design system demonstrates autonomous software development at scale — components, blocks, and documentation all produced by AI agents.

## Key Features

- **Radix UI Foundation** — Unstyled, accessible primitives
- **Tailwind CSS Styling** — Utility-first CSS with design tokens
- **CVA Variants** — Type-safe component variants
- **shadcn/ui Compatible** — Use with shadcn registry protocol
- **Block Components** — Pre-built page sections (auth, marketing, dashboard)
- **Full TypeScript** — Type-safe components and hooks
- **Storybook Documentation** — Interactive component playground

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Design System Package                        │
│              @audiogenius/design-system                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Component Layers                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  Primitives → Components → Compositions → Blocks        │   │
│  │     (Radix)   (Button)      (DataTable)   (LoginForm)   │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Block Modules                         │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  auth  │  navigation  │  settings  │  marketing         │   │
│  │  dashboard  │  data  │  ecommerce                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Installation

### Via npm

```bash
npm install @audiogenius/design-system
```

### Via shadcn Registry

```bash
# Add the registry
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json button

# Add multiple components
npx shadcn@latest add --registry https://launchapp-dev.github.io/design-system/registry.json \
  button input label card badge separator table dialog
```

## Component Categories

### Primitives

Low-level building blocks:

| Component | Description |
|-----------|-------------|
| `Button` | Action buttons with variants (primary, secondary, ghost, etc.) |
| `Input` | Text inputs with states and validation |
| `Label` | Accessible form labels |
| `Card` | Content containers with header, content, footer |
| `Badge` | Status indicators and tags |
| `Separator` | Visual dividers |

### Forms

Form components with validation support:

| Component | Description |
|-----------|-------------|
| `Checkbox` | Boolean toggles |
| `RadioGroup` | Single-select options |
| `Select` | Dropdown selections |
| `Switch` | Toggle switches |
| `Textarea` | Multi-line text input |
| `Combobox` | Searchable dropdowns |
| `Calendar` | Date selection |

### Overlays

Modal and popup components:

| Component | Description |
|-----------|-------------|
| `Dialog` | Modal dialogs |
| `Sheet` | Side panels |
| `Popover` | Floating content panels |
| `Tooltip` | Contextual hints |
| `AlertDialog` | Confirmation dialogs |
| `DropdownMenu` | Context menus |

### Data Display

Components for showing data:

| Component | Description |
|-----------|-------------|
| `Table` | Data tables with sorting |
| `DataTable` | Advanced tables with filtering |
| `SearchableDataTable` | Full-text search tables |
| `Accordion` | Collapsible sections |
| `Tabs` | Tabbed interfaces |
| `ScrollArea` | Custom scrollbars |

### Navigation

Navigation components:

| Component | Description |
|-----------|-------------|
| `NavigationMenu` | Top-level navigation |
| `Menubar` | Application menus |
| `Command` | Command palettes |
| `Breadcrumb` | Page hierarchy |

## Block Modules

Pre-composed, page-ready components:

### Auth Blocks

```tsx
import {
  LoginForm,
  SignUpForm,
  ForgotPasswordForm,
  OTPVerification
} from '@audiogenius/design-system/blocks/auth';

// Use complete auth flows
function LoginPage() {
  return (
    <LoginForm
      onSubmit={handleLogin}
      onForgotPassword={() => router.push('/forgot')}
    />
  );
}
```

### Marketing Blocks

```tsx
import {
  HeroSection,
  FeatureGrid,
  PricingTable,
  TestimonialCarousel
} from '@audiogenius/design-system/blocks/marketing';

function LandingPage() {
  return (
    <>
      <HeroSection
        title="Build faster with AI"
        subtitle="AO agents ship code while you sleep"
        cta={{ label: 'Get Started', href: '/signup' }}
      />
      <FeatureGrid features={features} />
      <PricingTable tiers={pricingTiers} />
    </>
  );
}
```

### Dashboard Blocks

```tsx
import {
  StatsOverview,
  ActivityFeed,
  MetricCards
} from '@audiogenius/design-system/blocks/dashboard';

function Dashboard() {
  return (
    <>
      <StatsOverview stats={stats} />
      <div className="grid grid-cols-3 gap-4">
        <MetricCards metrics={metrics} />
      </div>
      <ActivityFeed activities={activities} />
    </>
  );
}
```

### Ecommerce Blocks

```tsx
import {
  ProductCard,
  ProductCardGrid,
  ShoppingCart,
  CheckoutForm
} from '@audiogenius/design-system/blocks/ecommerce';

// Product display
<ProductCard
  title="Premium Plan"
  price={99}
  image="/product.jpg"
  rating={4.8}
  badge="Best Seller"
  onAddToCart={addToCart}
/>

// Product grid
<ProductCardGrid products={products} columns={3} />

// Shopping cart
<ShoppingCart
  items={cartItems}
  taxRate={0.08}
  shippingCost={10}
/>

// Checkout
<CheckoutForm onSubmit={processPayment} />
```

### Data Blocks

```tsx
import {
  FullDataTable,
  KanbanBoard,
  SearchableDataTable
} from '@audiogenius/design-system/blocks/data';

// Advanced data table
<SearchableDataTable
  data={users}
  columns={userColumns}
  searchableColumns={['name', 'email']}
  filterableColumns={['role', 'status']}
/>
```

## Usage Examples

### Basic Button

```tsx
import { Button } from '@audiogenius/design-system';

function App() {
  return (
    <Button variant="primary" size="lg">
      Get Started
    </Button>
  );
}
```

### Form with Validation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button
} from '@audiogenius/design-system';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
```

### Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@audiogenius/design-system';

function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive">Confirm Delete</Button>
      </DialogContent>
    </Dialog>
  );
}
```

## Theming

The design system uses CSS custom properties for theming:

```css
:root {
  --la-background: 0 0% 100%;
  --la-foreground: 222.2 84% 4.9%;
  --la-card: 0 0% 100%;
  --la-card-foreground: 222.2 84% 4.9%;
  --la-popover: 0 0% 100%;
  --la-popover-foreground: 222.2 84% 4.9%;
  --la-primary: 222.2 47.4% 11.2%;
  --la-primary-foreground: 210 40% 98%;
  --la-secondary: 210 40% 96.1%;
  --la-secondary-foreground: 222.2 47.4% 11.2%;
  --la-muted: 210 40% 96.1%;
  --la-muted-foreground: 215.4 16.3% 46.9%;
  --la-accent: 210 40% 96.1%;
  --la-accent-foreground: 222.2 47.4% 11.2%;
  --la-destructive: 0 84.2% 60.2%;
  --la-destructive-foreground: 210 40% 98%;
  --la-border: 214.3 31.8% 91.4%;
  --la-input: 214.3 31.8% 91.4%;
  --la-ring: 222.2 84% 4.9%;
  --la-radius: 0.5rem;
}
```

### Custom Theme

```css
/* Custom brand colors */
[data-theme="brand"] {
  --la-primary: 217 91% 60%;
  --la-primary-foreground: 0 0% 100%;
  --la-accent: 217 91% 60%;
  --la-radius: 0.75rem;
}
```

## Component Variants

Components use Class Variance Authority (CVA) for type-safe variants:

```tsx
// Button variants
<Button variant="default" size="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

## Tech Stack

- **Primitives**: Radix UI
- **Styling**: Tailwind CSS
- **Variants**: Class Variance Authority (CVA)
- **Utils**: clsx, tailwind-merge
- **Icons**: Lucide React
- **Forms**: react-hook-form + zod (optional)
- **Docs**: Storybook v10
- **Build**: tsup

## Development

```bash
# Clone the repo
git clone https://github.com/launchapp-dev/design-system.git
cd design-system

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Build components
pnpm build

# Run tests
pnpm test
```

## Storybook

Explore all components interactively:

```bash
pnpm storybook
```

Available at `http://localhost:6006`

## Contributing

The design system is maintained by AO agents. To contribute:

1. Create a new component in `src/components/`
2. Add Storybook stories in `src/components/<Component>.stories.tsx`
3. Export from `src/index.ts`
4. Run tests: `pnpm test`

## Accessibility

All components are built on Radix UI primitives and meet WCAG 2.1 standards:

- Full keyboard navigation
- ARIA labels and roles
- Focus management
- Screen reader support
- Color contrast compliance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Support

- **Storybook**: [storybook.launchapp.dev](https://storybook.launchapp.dev)
- **GitHub**: [launchapp-dev/design-system](https://github.com/launchapp-dev/design-system)
- **Discord**: [LaunchApp Community](https://discord.gg/launchapp)

---

*Built by AO agents. Designed for humans.*
