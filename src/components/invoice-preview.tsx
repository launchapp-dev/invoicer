"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { calculateTotals, formatCurrency } from "@/lib/calculations";
import type { Invoice } from "@/types/invoice";

const STATUS_VARIANT: Record<Invoice["status"], "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  sent: "outline",
  paid: "default",
  overdue: "destructive",
};

interface InvoicePreviewProps {
  invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const totals = calculateTotals(invoice.lineItems, invoice.taxRate, invoice.discountRate);

  return (
    <Card className="shadow-xl border-border bg-white min-h-[700px]">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-3">
              <span className="text-muted-foreground text-xs font-semibold">LOGO</span>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Invoice</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {invoice.invoiceNumber || "INV-001"}
            </p>
          </div>
          <div className="text-right space-y-1">
            <Badge variant={STATUS_VARIANT[invoice.status]}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
            <div className="text-xs text-muted-foreground mt-2">
              <p>Issued: {invoice.issueDate || "—"}</p>
              <p>Due: {invoice.dueDate || "—"}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">From</p>
            <p className="font-semibold text-sm">{invoice.senderName || "Your Name"}</p>
            <p className="text-sm text-muted-foreground">{invoice.senderEmail}</p>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.senderAddress}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Bill To</p>
            <p className="font-semibold text-sm">{invoice.recipientName || "Client Name"}</p>
            <p className="text-sm text-muted-foreground">{invoice.recipientEmail}</p>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.recipientAddress}</p>
          </div>
        </div>

        <Separator />

        <Table aria-label="Invoice line items">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-0">Description</TableHead>
              <TableHead className="text-right w-16">Qty</TableHead>
              <TableHead className="text-right w-28">Unit Price</TableHead>
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
                  <TableCell className="text-right text-sm">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="text-right pr-0 text-sm font-medium">
                    {formatCurrency(item.quantity * item.unitPrice)}
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
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          {invoice.discountRate > 0 && (
            <div className="flex justify-between w-56 text-destructive">
              <span>Discount ({invoice.discountRate}%)</span>
              <span>−{formatCurrency(totals.discountAmount)}</span>
            </div>
          )}
          {invoice.taxRate > 0 && (
            <div className="flex justify-between w-56">
              <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
              <span>{formatCurrency(totals.taxAmount)}</span>
            </div>
          )}
          <Separator className="w-56" />
          <div className="flex justify-between w-56 font-semibold text-base">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
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
      </CardContent>
    </Card>
  );
}
