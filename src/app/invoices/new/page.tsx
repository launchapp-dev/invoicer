"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/invoice-schema";
import { saveInvoice } from "@/lib/storage";
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

export default function NewInvoicePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultValues(),
  });

  const invoice = form.watch() as Invoice;

  const handleSave = form.handleSubmit(async (values) => {
    try {
      await saveInvoice(values as Invoice);
      form.reset(values);
      setSavedId(values.id);
      toast.success("Invoice saved");
    } catch {
      toast.error("Failed to save invoice");
    }
  });

  useEffect(() => {
    if (!form.formState.isDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [form.formState.isDirty]);

  useEffect(() => {
    if (savedId) {
      router.push(`/invoices/${savedId}`);
    }
  }, [savedId, router]);

  if (isPending || !session) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">New Invoice</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button onClick={handleSave} disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Invoice"
              )}
            </Button>
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
    </div>
  );
}
