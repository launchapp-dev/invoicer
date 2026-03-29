# Design System

> React + TypeScript component library built on Radix UI primitives, styled with Tailwind CSS.

## What Is the Design System?

The LaunchApp Design System provides accessible, composable UI components for building consistent web interfaces. Built on Radix UI primitives with Tailwind CSS styling, it offers full customization via CSS custom properties.

---

## Installation

### npm Package

```bash
npm install @launchapp/design-system
```

### shadcn Registry (Recommended)

Install individual components:

```bash
npx shadcn@latest add \
  --registry https://launchapp-dev.github.io/design-system/registry.json \
  button input label card badge
```

---

## Setup

### 1. Configure Tailwind

Add to `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@launchapp/design-system/dist/**/*.js',
  ],
};
```

### 2. Import Styles

```typescript
import '@launchapp/design-system/styles.css';
```

### 3. Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

---

## Theming

### CSS Custom Properties

All design tokens use the `--la-*` prefix:

```css
:root {
  --la-background: 0 0% 100%;
  --la-foreground: 222.2 84% 4.9%;
  --la-primary: 222.2 47.4% 11.2%;
  --la-primary-foreground: 210 40% 98%;
  --la-border: 214.3 31.8% 91.4%;
  --la-input: 214.3 31.8% 91.4%;
  --la-ring: 222.2 84% 4.9%;
}
```

Values are HSL without the `hsl()` wrapper.

### Dark Mode

```css
.dark {
  --la-background: 222.2 84% 4.9%;
  --la-foreground: 210 40% 98%;
  --la-primary: 210 40% 98%;
  --la-primary-foreground: 222.2 47.4% 11.2%;
}
```

Enable with `class` strategy:

```html
<html class="dark">
```

---

## Components

### Basic Components

| Component | Import |
|-----------|--------|
| Button | `import { Button } from '@launchapp/design-system'` |
| Input | `import { Input } from '@launchapp/design-system'` |
| Label | `import { Label } from '@launchapp/design-system'` |
| Badge | `import { Badge } from '@launchapp/design-system'` |
| Checkbox | `import { Checkbox } from '@launchapp/design-system'` |
| Switch | `import { Switch } from '@launchapp/design-system'` |
| Separator | `import { Separator } from '@launchapp/design-system'` |

### Composite Components

#### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@launchapp/design-system';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### Select

```tsx
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@launchapp/design-system';

<SelectRoot>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</SelectRoot>
```

#### Dialog

```tsx
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@launchapp/design-system';

<DialogRoot>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</DialogRoot>
```

#### Tabs

```tsx
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@launchapp/design-system';

<TabsRoot defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</TabsRoot>
```

#### Accordion

```tsx
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@launchapp/design-system';

<AccordionRoot type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>Trigger</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</AccordionRoot>
```

### Other Components

| Component | Key Imports |
|-----------|-------------|
| Tooltip | `TooltipProvider`, `TooltipRoot`, `TooltipTrigger`, `TooltipContent` |
| Avatar | `Avatar`, `AvatarImage`, `AvatarFallback` |
| Toast | `Toaster`, `useToast` |

---

## TypeScript

TypeScript types are exported:

```tsx
import type { ButtonProps, CardProps } from '@launchapp/design-system';
```

---

## Integration with LaunchApp Templates

Design System is pre-configured in LaunchApp Templates:

```tsx
// Already set up in the template
import { Button } from '@launchapp/design-system';

export default function Page() {
  return <Button>Click me</Button>;
}
```

---

## Full Component List

Available component slugs for shadcn registry:

- accordion
- alert
- alert-dialog
- badge
- button
- card
- checkbox
- combobox
- command
- context-menu
- dialog
- dropdown-menu
- form
- hover-card
- input
- label
- menubar
- navigation-menu
- popover
- radio-group
- scroll-area
- select
- separator
- sheet
- skeleton
- slider
- switch
- table
- tabs
- textarea
- toast
- toggle
- tooltip

---

## Related Products

| Product | Relationship |
|---------|--------------|
| [LaunchApp Templates](./launchapp-templates.md) | Pre-configured with Design System |
| [LaunchPad BaaS](./launchpad-baas.md) | Backend for form submissions |

---

## License

Private — not yet publicly released.
