"use client";

import { useState, useCallback } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { listInvoices, deleteInvoice } from "@/lib/storage";
import { formatCurrency } from "@/lib/calculations";
import type { Invoice } from "@/types/invoice";

interface InvoiceHistoryProps {
  onLoad: (invoice: Invoice) => void;
  onDuplicate: (invoice: Invoice) => void;
}

function InvoiceHistoryPanel({ onLoad, onDuplicate, onClose }: InvoiceHistoryProps & { onClose: () => void }) {
  const [invoices, setInvoices] = useState<Invoice[]>(() => listInvoices());
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; invoiceNumber: string } | null>(null);

  const refresh = useCallback(() => setInvoices(listInvoices()), []);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteInvoice(deleteTarget.id);
    refresh();
    setDeleteTarget(null);
  };

  const handleLoad = (invoice: Invoice) => {
    onLoad(invoice);
    onClose();
  };

  const handleDuplicate = (invoice: Invoice) => {
    onDuplicate(invoice);
    onClose();
  };

  if (invoices.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
        No saved invoices yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="rounded-lg border border-border p-4 grid gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{invoice.invoiceNumber}</span>
                <Badge variant="secondary" className="text-xs">{invoice.status}</Badge>
              </div>
              <p className="text-sm text-foreground">{invoice.to.name || "—"}</p>
              <p className="text-xs text-muted-foreground">{invoice.issueDate}</p>
            </div>
            <span className="font-semibold text-sm whitespace-nowrap">
              {formatCurrency(invoice.total, invoice.currency)}
            </span>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button size="sm" variant="default" onClick={() => handleLoad(invoice)}>
              Load
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDuplicate(invoice)}>
              Duplicate
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="ml-auto text-destructive hover:text-destructive"
              onClick={() => setDeleteTarget({ id: invoice.id, invoiceNumber: invoice.invoiceNumber })}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete invoice {deleteTarget?.invoiceNumber}?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function InvoiceHistory({ onLoad, onDuplicate }: InvoiceHistoryProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">History</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle>Invoice History</SheetTitle>
        </SheetHeader>
        {open && (
          <InvoiceHistoryPanel
            onLoad={onLoad}
            onDuplicate={onDuplicate}
            onClose={() => setOpen(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
