"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Building2, Paperclip } from "lucide-react";
import { calcSubtotal, calcTotal, formatCurrency, formatDate } from "@/lib/calculations";
import { toast } from "@/components/ui/sonner";
import type { Invoice } from "@/types/invoice";
import type { InvoiceTemplate } from "@/components/invoice-pdf";

const PAYMENT_TERMS_LABELS: Record<NonNullable<Invoice["paymentTerms"]>, string> = {
  net15: "Net 15",
  net30: "Net 30",
  net60: "Net 60",
  due_on_receipt: "Due on Receipt",
  custom: "Custom",
};

const STATUS_VARIANT: Record<Invoice["status"], "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  sent: "outline",
  viewed: "secondary",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
  partial: "outline",
};

interface InvoicePreviewProps {
  invoice: Invoice;
  hideDownload?: boolean;
  logoUrl?: string;
  template?: InvoiceTemplate;
  attachmentCount?: number;
  brandColor?: string;
}

export function InvoicePreview({ invoice, hideDownload = false, logoUrl, template = "classic", attachmentCount = 0, brandColor = "#2563eb" }: InvoicePreviewProps) {
  const subtotal = calcSubtotal(invoice.lineItems);
  const taxAmount = invoice.taxAmount;
  const total = calcTotal(subtotal, taxAmount, invoice.discount);
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { InvoicePDF } = await import("@/components/invoice-pdf");
      const blob = await pdf(<InvoicePDF invoice={invoice} logoUrl={logoUrl} template={template} brandColor={brandColor} />).toBlob();
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

  const isModern = template === "modern";
  const isMinimal = template === "minimal";

  return (
    <Card className="shadow-xl border-border bg-card min-h-[700px] overflow-hidden">
      {isModern && (
        <div className="px-8 py-7 flex items-end justify-between" style={{ backgroundColor: brandColor }}>
          <div className="flex items-end gap-3">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt="Business logo" className="h-11 w-auto max-w-[110px] object-contain" />
            ) : null}
            <div>
              <p className="text-xs text-white/50 uppercase tracking-[0.2em]">Invoice</p>
              <p className="text-2xl font-bold text-white mt-1">{invoice.invoiceNumber || "INV-001"}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <Badge className="bg-transparent border border-white/30 text-white text-[10px] uppercase tracking-wider">
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
            <div className="text-xs text-white/60 mt-2 space-y-0.5">
              <p>Issued: {formatDate(invoice.issueDate)}</p>
              <p>Due: {formatDate(invoice.dueDate)}</p>
              {invoice.paymentTerms && <p>Terms: {PAYMENT_TERMS_LABELS[invoice.paymentTerms]}</p>}
            </div>
          </div>
        </div>
      )}
      <CardContent className={isModern ? "p-8 space-y-6" : "p-8 space-y-6"}>
        {!isModern && (
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Business logo"
                  className="h-12 w-auto max-w-[120px] object-contain"
                />
              ) : (
                !isMinimal && (
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                )
              )}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Invoice</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {invoice.invoiceNumber || "INV-001"}
                </p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <Badge variant={STATUS_VARIANT[invoice.status]}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </Badge>
              <div className="text-xs text-muted-foreground mt-2">
                <p>Issued: {formatDate(invoice.issueDate)}</p>
                <p>Due: {formatDate(invoice.dueDate)}</p>
                {invoice.paymentTerms && (
                  <p>Terms: {PAYMENT_TERMS_LABELS[invoice.paymentTerms]}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {!hideDownload && (
          <div className="flex justify-end">
            <Button onClick={handleDownload} disabled={downloading} size="sm">
              {downloading ? "Generating…" : "Download PDF"}
            </Button>
          </div>
        )}

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">From</p>
            <p className="font-semibold text-sm">{invoice.from.name || "Your Name"}</p>
            <p className="text-sm text-muted-foreground">{invoice.from.email}</p>
            <p className="text-sm text-muted-foreground">{invoice.from.address}</p>
            {invoice.from.city && (
              <p className="text-sm text-muted-foreground">
                {[invoice.from.city, invoice.from.state, invoice.from.zip].filter(Boolean).join(", ")}
              </p>
            )}
            <p className="text-sm text-muted-foreground">{invoice.from.country}</p>
            {invoice.from.taxId && (
              <p className="text-sm text-muted-foreground">Tax ID: {invoice.from.taxId}</p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Bill To</p>
            <p className="font-semibold text-sm">{invoice.to.name || "Client Name"}</p>
            <p className="text-sm text-muted-foreground">{invoice.to.email}</p>
            <p className="text-sm text-muted-foreground">{invoice.to.address}</p>
            {invoice.to.city && (
              <p className="text-sm text-muted-foreground">
                {[invoice.to.city, invoice.to.state, invoice.to.zip].filter(Boolean).join(", ")}
              </p>
            )}
            <p className="text-sm text-muted-foreground">{invoice.to.country}</p>
            {invoice.to.taxId && (
              <p className="text-sm text-muted-foreground">Tax ID: {invoice.to.taxId}</p>
            )}
          </div>
        </div>

        <Separator />

        <Table aria-label="Invoice line items">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-0">Description</TableHead>
              <TableHead className="text-right w-16">Qty</TableHead>
              <TableHead className="text-right w-28">Rate</TableHead>
              <TableHead className="text-right pr-0 w-28">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.lineItems.length > 0 ? (
              invoice.lineItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-transparent">
                  <TableCell className="pl-0 text-sm">
                    {item.description || <span className="text-muted-foreground italic">No description</span>}
                  </TableCell>
                  <TableCell className="text-right text-sm">{item.quantity}</TableCell>
                  <TableCell className="text-right text-sm">{formatCurrency(item.rate, invoice.currency)}</TableCell>
                  <TableCell className="text-right pr-0 text-sm font-medium">
                    {formatCurrency(item.amount, invoice.currency)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="pl-0 text-sm text-muted-foreground italic">
                  No line items
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Separator />

        <div className="flex flex-col items-end space-y-2 text-sm">
          <div className="flex justify-between w-56">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal, invoice.currency)}</span>
          </div>
          {(invoice.taxLines ?? []).map((line) =>
            line.rate > 0 ? (
              <div key={line.id} className="flex justify-between w-56">
                <span className="text-muted-foreground">
                  {line.name || "Tax"} ({line.rate}%)
                </span>
                <span>{formatCurrency(line.amount, invoice.currency)}</span>
              </div>
            ) : null
          )}
          {(invoice.discount ?? 0) > 0 && (
            <div className="flex justify-between w-56">
              <span className="text-muted-foreground">Discount</span>
              <span>-{formatCurrency(invoice.discount, invoice.currency)}</span>
            </div>
          )}
          <Separator className="w-56" />
          <div className="flex justify-between w-56 font-semibold text-base" style={{ color: brandColor }}>
            <span>Total</span>
            <span>{formatCurrency(total, invoice.currency)}</span>
          </div>
        </div>

        {invoice.notes && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Notes</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.notes}</p>
            </div>
          </>
        )}

        {attachmentCount > 0 && (
          <>
            <Separator />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Paperclip className="h-3.5 w-3.5" />
              <span>{attachmentCount} attachment{attachmentCount !== 1 ? "s" : ""}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
