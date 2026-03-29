"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const blurInVariants = cva(
  "inline-block animate-blur-in motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface BlurInProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof blurInVariants> {}

function BlurIn({ className, size, children, ...props }: BlurInProps) {
  return (
    <span
      className={cn(blurInVariants({ size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
BlurIn.displayName = "BlurIn";

const fadeUpVariants = cva(
  "inline-block animate-fade-up motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface FadeUpProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof fadeUpVariants> {}

function FadeUp({ className, size, children, ...props }: FadeUpProps) {
  return (
    <span
      className={cn(fadeUpVariants({ size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
FadeUp.displayName = "FadeUp";

const gradientTextVariants = cva("inline-block", {
  variants: {
    variant: {
      default: "bg-gradient-to-r from-[hsl(var(--la-primary))] to-[hsl(var(--la-secondary))] bg-clip-text text-transparent",
      primary: "bg-gradient-to-r from-[hsl(var(--la-primary))] to-[hsl(var(--la-primary)/0.7)] bg-clip-text text-transparent",
      rainbow: "bg-gradient-to-r from-[hsl(var(--la-destructive))] via-[hsl(var(--la-primary))] to-[hsl(var(--la-secondary))] bg-clip-text text-transparent",
      sunset: "bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {}

function GradientText({
  className,
  variant,
  children,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(gradientTextVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
GradientText.displayName = "GradientText";

export { BlurIn, FadeUp, GradientText };
