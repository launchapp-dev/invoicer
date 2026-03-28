"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, CheckCheck } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InvoiceActions } from "./invoice-actions";
import { bulkDeleteInvoices, bulkUpdateInvoiceStatus } from "@/lib/storage";
import { formatCurrency, formatDate } from "@/lib/calculations";
import type { Invoice, InvoiceStatus } from "@/types/invoice";

const STATUS_VARIANT: Record<InvoiceStatus, "secondary" | "outline" | "default" | "destructive"> = {
  draft: "secondary",
  sent: "outline",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
};

interface DashboardTableProps {
  invoices: Invoice[];
}

export function DashboardTable({ invoices }: DashboardTableProps) {
  const router = useRouter();
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const allChecked = invoices.length > 0 && selected.size === invoices.length;
  const someChecked = selected.size > 0 && selected.size < invoices.length;

  function toggleAll() {
    if (allChecked) {
      setSelected(new Set());
    } else {
      setSelected(new Set(invoices.map((inv) => inv.id)));
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleBulkDelete() {
    setPending(true);
    try {
      await bulkDeleteInvoices(Array.from(selected));
      setSelected(new Set());
      router.refresh();
      toast.success(`${selected.size} invoice${selected.size === 1 ? "" : "s"} deleted`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Unauthorized") {
        toast.error("Your session has expired. Please sign in again.");
        router.push("/login");
      } else {
        toast.error("Failed to delete invoices");
      }
    } finally {
      setPending(false);
      setDeleteOpen(false);
    }
  }

  async function handleMarkAsSent() {
    const draftIds = Array.from(selected).filter(
      (id) => invoices.find((inv) => inv.id === id)?.status === "draft"
    );
    if (draftIds.length === 0) {
      toast.info("No draft invoices selected");
      setSelected(new Set());
      return;
    }
    setPending(true);
    try {
      await bulkUpdateInvoiceStatus(draftIds, "sent");
      setSelected(new Set());
      router.refresh();
      toast.success(`${draftIds.length} invoice${draftIds.length === 1 ? "" : "s"} marked as sent`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Unauthorized") {
        toast.error("Your session has expired. Please sign in again.");
        router.push("/login");
      } else {
        toast.error("Failed to update invoices");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {selected.size > 0 && (
        <div className="flex items-center gap-3 mb-3 px-3 py-2 rounded-md bg-muted border border-border">
          <span className="text-sm font-medium text-foreground">
            {selected.size} selected
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={handleMarkAsSent}
            >
              <CheckCheck className="h-4 w-4 mr-1.5" />
              Mark as sent
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={pending}
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Delete selected
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={allChecked ? true : someChecked ? "indeterminate" : false}
                  onCheckedChange={toggleAll}
                  aria-label="Select all invoices"
                />
              </TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead className="hidden sm:table-cell">Issue Date</TableHead>
              <TableHead className="hidden sm:table-cell">Due Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-16">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="hover:bg-muted/50"
                data-state={selected.has(invoice.id) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selected.has(invoice.id)}
                    onCheckedChange={() => toggleOne(invoice.id)}
                    aria-label={`Select invoice ${invoice.invoiceNumber}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="text-primary hover:underline"
                  >
                    {invoice.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell>{invoice.to.name || "—"}</TableCell>
                <TableCell className="hidden sm:table-cell">{formatDate(invoice.issueDate)}</TableCell>
                <TableCell className="hidden sm:table-cell">{formatDate(invoice.dueDate)}</TableCell>
                <TableCell>{formatCurrency(invoice.total, invoice.currency)}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[invoice.status] ?? "secondary"}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <InvoiceActions invoiceId={invoice.id} status={invoice.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selected.size} invoice{selected.size === 1 ? "" : "s"}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. {selected.size === 1 ? "This invoice" : "These invoices"} will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
