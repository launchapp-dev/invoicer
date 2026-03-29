"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InvoicePreview } from "@/components/invoice-preview";
import { toast } from "@/components/ui/sonner";
import { formatCurrency, formatDate } from "@/lib/calculations";
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

  const payments = invoice.payments ?? [];
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(0, invoice.total - totalPaid);

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
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <InvoicePreview invoice={invoice} hideDownload />
        {payments.length > 0 && (
          <div className="border border-border rounded-md p-4 space-y-3">
            <h2 className="text-sm font-semibold">Payment History</h2>
            <div className="divide-y divide-border">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrency(p.amount, invoice.currency)}</span>
                    <span className="text-muted-foreground capitalize">{p.method.replace("_", " ")}</span>
                    {p.reference && <span className="text-muted-foreground">#{p.reference}</span>}
                  </div>
                  <span className="text-muted-foreground">{formatDate(p.paidAt)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total paid</span>
                <span className="font-medium">{formatCurrency(totalPaid, invoice.currency)}</span>
              </div>
              {remaining > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining balance</span>
                  <span className="font-medium">{formatCurrency(remaining, invoice.currency)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
