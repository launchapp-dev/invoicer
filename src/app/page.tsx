"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import { InvoiceHistory } from "@/components/invoice-history";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/invoice-schema";
import { saveInvoice, duplicateInvoice } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client";
import type { Invoice } from "@/types/invoice";

function defaultValues(): InvoiceFormValues {
  const today = new Date().toISOString().split("T")[0];
  const due = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  return {
    id: crypto.randomUUID(),
    invoiceNumber: `INV-${Date.now()}`,
    status: "draft",
    issueDate: today,
    dueDate: due,
    from: { name: "", email: "", address: "", city: "", state: "", zip: "", country: "" },
    to: { name: "", email: "", address: "", city: "", state: "", zip: "", country: "" },
    lineItems: [],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    total: 0,
    notes: "",
    currency: "USD",
  };
}

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isDark, setIsDark] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("theme"); } catch {}
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    setIsDark(next);
  };

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultValues(),
  });

  const invoice = form.watch() as Invoice;

  useEffect(() => {
    if (!form.formState.isDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [form.formState.isDirty]);

  const handleSave = form.handleSubmit(async (values) => {
    try {
      await saveInvoice(values as Invoice);
      form.reset(values);
      toast.success("Invoice saved");
    } catch {
      toast.error("Failed to save invoice");
    }
  });

  const handleNew = () => {
    if (form.formState.isDirty) {
      setShowNewDialog(true);
    } else {
      form.reset(defaultValues());
    }
  };

  const handleLoad = (inv: Invoice) => {
    form.reset(inv as InvoiceFormValues);
  };

  const handleDuplicate = async (inv: Invoice) => {
    try {
      const copy = await duplicateInvoice(inv.id);
      if (copy) {
        form.reset(copy as InvoiceFormValues);
        toast.success("Invoice duplicated");
      }
    } catch {
      toast.error("Failed to duplicate invoice");
    }
  };

  if (isPending || !session) {
    return <div className="min-h-screen bg-background" />;
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">Invoicer</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">{session.user.email}</span>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" onClick={handleNew}>New</Button>
            <InvoiceHistory onLoad={handleLoad} onDuplicate={handleDuplicate} />
            <Button onClick={handleSave} disabled={form.formState.isSubmitting}>Save Invoice</Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>Sign out</Button>
          </div>
        </div>
      </header>

      <div className="lg:hidden">
        <Tabs defaultValue="form" className="w-full">
          <div className="sticky top-[57px] z-10 bg-background border-b border-border px-4 py-2">
            <TabsList className="w-full">
              <TabsTrigger value="form" className="flex-1">Form</TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="form" className="mt-0 p-4">
            <FormProvider {...form}>
              <InvoiceForm />
            </FormProvider>
          </TabsContent>
          <TabsContent value="preview" className="mt-0 p-4">
            <InvoicePreview invoice={invoice} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden lg:flex h-[calc(100vh-57px)]">
        <div className="w-1/2 overflow-y-auto border-r border-border bg-background p-6">
          <FormProvider {...form}>
            <InvoiceForm />
          </FormProvider>
        </div>
        <div className="w-1/2 overflow-y-auto bg-muted/30 p-8">
          <InvoicePreview invoice={invoice} />
        </div>
      </div>

      <AlertDialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>Any unsaved changes will be lost.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { form.reset(defaultValues()); setShowNewDialog(false); }}>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
