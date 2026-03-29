import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeInOnScroll } from "@/components/ui/scroll-animate";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { changelogEntries, type ChangeType } from "@/data/changelog";

export const metadata: Metadata = {
  title: "Changelog | Invoicer",
  description: "See what's new in Invoicer. Latest features, improvements, and fixes.",
};

const typeConfig: Record<
  ChangeType,
  { label: string; icon: React.ReactNode; variant: "default" | "secondary" | "outline" }
> = {
  feature: {
    label: "Feature",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    variant: "default",
  },
  improvement: {
    label: "Improvement",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    variant: "secondary",
  },
  fix: {
    label: "Fix",
    icon: <Wrench className="h-3.5 w-3.5" />,
    variant: "outline",
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-foreground hover:opacity-80 transition-opacity">
            Invoicer
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get started free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Changelog
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-4">
              New features, improvements, and fixes. See how Invoicer evolves.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Changelog Entries */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-8">
          {changelogEntries.map((entry, index) => {
            const typeInfo = typeConfig[entry.type];
            return (
              <FadeInOnScroll key={entry.version} delay={index * 60}>
                <Card className="border border-border">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                      {/* Left: Date & Version */}
                      <div className="md:w-32 shrink-0 space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(entry.date)}
                        </p>
                        <p className="text-sm font-mono font-medium text-primary">
                          v{entry.version}
                        </p>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={typeInfo.variant} className="gap-1">
                            {typeInfo.icon}
                            {typeInfo.label}
                          </Badge>
                        </div>
                        <h2 className="text-xl font-semibold">{entry.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < changelogEntries.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="h-8 w-px bg-border" />
                  </div>
                )}
              </FadeInOnScroll>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-primary/5 border-y border-border">
        <FadeInOnScroll className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">Ready to try Invoicer?</h2>
          <p className="text-muted-foreground">
            Start creating professional invoices today. No credit card required.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeInOnScroll>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-foreground">Invoicer</span>
            <span className="text-muted-foreground text-sm ml-2">
              — Professional invoicing, simplified.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/changelog"
              className="text-foreground font-medium hover:text-foreground transition-colors"
            >
              Changelog
            </Link>
            <Link href="/signup" className="hover:text-foreground transition-colors">
              Sign up
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
