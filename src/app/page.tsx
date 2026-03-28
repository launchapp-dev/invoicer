import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Eye,
  Send,
  Zap,
  RefreshCw,
  Users,
  Globe,
  CreditCard,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg text-foreground">Invoicer</span>
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
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary">Open-source SaaS showcase</Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Professional invoices,{" "}
              <span className="text-primary">in seconds.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Create, preview, and send beautiful invoices with live PDF
              generation. Track payments, manage clients, and get paid faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>

          {/* Mock invoice preview */}
          <div className="relative">
            <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">
                  Invoice #INV-0042
                </span>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-lg">Acme Corp</div>
                    <div className="text-sm text-muted-foreground">
                      123 Business St, NY
                    </div>
                  </div>
                  <Badge>Sent</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  {[
                    { label: "Web Design", qty: 1, price: "$2,400" },
                    { label: "SEO Audit", qty: 1, price: "$800" },
                    { label: "Hosting (annual)", qty: 1, price: "$360" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-foreground">{item.label}</span>
                      <span className="text-muted-foreground font-mono">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary font-mono">$3,560.00</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <div className="h-2 rounded-full bg-primary/20 flex-1">
                    <div className="h-2 rounded-full bg-primary w-2/3" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    67% paid
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 rounded-xl border border-border bg-card/60 w-full h-full blur-sm" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Everything you need to get paid</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Invoicer handles the business side so you can focus on your work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-5 w-5 text-primary" />,
                title: "AI invoice creation",
                desc: "Describe your project and let AI fill in the line items, pricing, and terms automatically.",
              },
              {
                icon: <Eye className="h-5 w-5 text-primary" />,
                title: "Live PDF preview",
                desc: "See a real-time PDF preview as you type — no surprises when you send.",
              },
              {
                icon: <RefreshCw className="h-5 w-5 text-primary" />,
                title: "Recurring invoices",
                desc: "Set up automatic billing cycles for retainers and subscriptions.",
              },
              {
                icon: <Users className="h-5 w-5 text-primary" />,
                title: "Client management",
                desc: "Keep a contact book of clients with saved addresses and payment history.",
              },
              {
                icon: <Globe className="h-5 w-5 text-primary" />,
                title: "Multi-currency",
                desc: "Invoice in any currency. Exchange rates and formatting handled for you.",
              },
              {
                icon: <CreditCard className="h-5 w-5 text-primary" />,
                title: "Partial payments",
                desc: "Track deposits and installments against each invoice with a clear balance view.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border border-border">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Up and running in minutes</h2>
            <p className="text-muted-foreground">Three steps from signup to paid.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-6 w-6 text-primary" />,
                step: "01",
                title: "Create",
                desc: "Fill in client details and line items, or let AI do it from a description.",
              },
              {
                icon: <Eye className="h-6 w-6 text-primary" />,
                step: "02",
                title: "Preview",
                desc: "Review the live PDF preview and tweak until it looks perfect.",
              },
              {
                icon: <Send className="h-6 w-6 text-primary" />,
                step: "03",
                title: "Send & Download",
                desc: "Download the PDF or share a link. Track payment status in your dashboard.",
              },
            ].map((s, i) => (
              <div key={s.step} className="relative space-y-4">
                {i < 2 && (
                  <div className="hidden md:block absolute top-5 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
                )}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-primary/30 bg-primary/10 relative">
                    {s.icon}
                    <span className="absolute -top-2 -right-2 text-xs font-bold text-primary bg-background border border-border rounded-full h-5 w-5 flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">
              Start free. Upgrade when you need more.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 items-start">
            {/* Free tier */}
            <Card className="border border-border">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Free
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for getting started.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    "5 invoices / month",
                    "1 currency",
                    "PDF download",
                    "Client management",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/signup">Get started free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro tier */}
            <Card className="border-2 border-primary relative">
              <CardContent className="p-8 space-y-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most popular</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Pro
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    For freelancers who mean business.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Unlimited invoices",
                    "All currencies",
                    "AI invoice creation",
                    "AI autofill",
                    "Cash flow forecasting",
                    "Smart payment reminders",
                    "Recurring invoices",
                    "Expense tracking",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/signup">Start free trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-primary/5 border-y border-border">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <CheckCircle className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-3xl font-bold">Start invoicing for free</h2>
          <p className="text-muted-foreground">
            No credit card required. Get your first invoice out the door today.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Create your account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
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
