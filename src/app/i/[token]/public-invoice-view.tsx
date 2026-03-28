"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InvoicePreview } from "@/components/invoice-preview";
import { toast } from "@/components/ui/sonner";
import type { Invoice } from "@/types/invoice";

interface PublicInvoiceViewProps {
  invoice: Invoice;
}

export function PublicInvoiceView({ invoice }: PublicInvoiceViewProps) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { InvoicePDF } = await import("@/components/invoice-pdf");
      const blob = await pdf(<InvoicePDF invoice={invoice} logoUrl="" />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoice.invoiceNumber || "invoice"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to generate PDF");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">Invoice {invoice.invoiceNumber}</h1>
          <Button onClick={handleDownload} disabled={downloading}>
            {downloading ? "Generating…" : "Download PDF"}
          </Button>
        </div>
      </header>
      <div className="p-6 max-w-3xl mx-auto">
        <InvoicePreview invoice={invoice} hideDownload />
      </div>
    </div>
  );
}
