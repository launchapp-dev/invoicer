"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import type { Invoice } from "@/types/invoice";

const initialInvoice: Invoice = {
  invoiceNumber: "INV-001",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
  status: "draft",
  senderName: "",
  senderEmail: "",
  senderAddress: "",
  recipientName: "",
  recipientEmail: "",
  recipientAddress: "",
  lineItems: [{ id: "1", description: "", quantity: 1, unitPrice: 0 }],
  taxRate: 0,
  discountRate: 0,
  notes: "",
};

export default function Home() {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);

  const handleValueChange = useCallback((values: Invoice) => {
    setInvoice(values);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background px-6 py-4">
        <h1 className="text-lg font-semibold">Invoicer</h1>
      </header>

      <div className="lg:hidden">
        <Tabs defaultValue="form" className="w-full">
          <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-2">
            <TabsList className="w-full">
              <TabsTrigger value="form" className="flex-1">Form</TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="form" className="mt-0">
            <InvoiceForm onValueChange={handleValueChange} />
          </TabsContent>
          <TabsContent value="preview" className="mt-0 p-4">
            <InvoicePreview invoice={invoice} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden lg:flex h-[calc(100vh-57px)]">
        <div className="w-1/2 overflow-y-auto border-r border-border bg-background">
          <InvoiceForm onValueChange={handleValueChange} />
        </div>
        <div className="w-1/2 overflow-y-auto bg-muted/30 p-8">
          <InvoicePreview invoice={invoice} />
        </div>
      </div>
    </div>
  );
}
