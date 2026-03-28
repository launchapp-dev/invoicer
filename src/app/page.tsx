"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import { InvoiceHistory } from "@/components/invoice-history";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/invoice-schema";
import { saveInvoice } from "@/lib/storage";
import { toast } from "@/components/ui/sonner";
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
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultValues(),
  });

  const invoice = form.watch() as Invoice;

  const handleSave = () => {
    try {
      saveInvoice(form.getValues() as Invoice);
      toast.success("Invoice saved");
    } catch {
      toast.error("Failed to save invoice");
    }
  };

  const handleNew = () => {
    form.reset(defaultValues());
  };

  const handleLoad = (inv: Invoice) => {
    form.reset(inv as InvoiceFormValues);
  };

  const handleDuplicate = (inv: Invoice) => {
    form.reset({
      ...(inv as InvoiceFormValues),
      id: crypto.randomUUID(),
      invoiceNumber: `INV-${Date.now()}`,
      status: "draft",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">Invoicer</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleNew}>New</Button>
            <InvoiceHistory onLoad={handleLoad} onDuplicate={handleDuplicate} />
            <Button onClick={handleSave}>Save Invoice</Button>
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
