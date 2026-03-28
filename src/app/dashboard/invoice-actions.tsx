"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Loader2, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { deleteInvoice, duplicateInvoice, updateInvoiceStatus, recordPayment } from "@/lib/storage";
import type { InvoiceStatus } from "@/types/invoice";

const STATUSES: { value: InvoiceStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
];

interface InvoiceActionsProps {
  invoiceId: string;
  status: InvoiceStatus;
}

const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  { value: "check", label: "Check" },
  { value: "card", label: "Card" },
  { value: "other", label: "Other" },
];

export function InvoiceActions({ invoiceId, status }: InvoiceActionsProps) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [recordPaymentOpen, setRecordPaymentOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [paymentDate, setPaymentDate] = React.useState(() => new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [paymentReference, setPaymentReference] = React.useState("");

  async function handleDuplicate() {
    setPending(true);
    try {
      await duplicateInvoice(invoiceId);
      router.refresh();
      toast.success("Invoice duplicated");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Unauthorized") {
        toast.error("Your session has expired. Please sign in again.");
        router.push("/login");
      } else {
        toast.error("Failed to duplicate invoice");
      }
    } finally {
      setPending(false);
    }
  }

  async function handleDelete() {
    setPending(true);
    try {
      await deleteInvoice(invoiceId);
      router.refresh();
      toast.success("Invoice deleted");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Unauthorized") {
        toast.error("Your session has expired. Please sign in again.");
        router.push("/login");
      } else {
        toast.error("Failed to delete invoice");
      }
    } finally {
      setPending(false);
      setDeleteOpen(false);
    }
  }

  async function handleRecordPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!paymentDate || !paymentMethod) return;
    setPending(true);
    try {
      await recordPayment(invoiceId, {
        paidAt: paymentDate,
        paidMethod: paymentMethod,
        paidReference: paymentReference || undefined,
      });
      setRecordPaymentOpen(false);
      router.refresh();
      toast.success("Payment recorded");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Unauthorized") {
        toast.error("Your session has expired. Please sign in again.");
        router.push("/login");
      } else {
        toast.error("Failed to record payment");
      }
    } finally {
      setPending(false);
    }
  }

  async function handleStatusChange(newStatus: InvoiceStatus) {
    setPending(true);
    try {
      await updateInvoiceStatus(invoiceId, newStatus);
      router.refresh();
      toast.success("Status updated");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Unauthorized") {
        toast.error("Your session has expired. Please sign in again.");
        router.push("/login");
      } else {
        toast.error("Failed to update status");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={pending} aria-label="Invoice actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${invoiceId}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${invoiceId}/preview`}>Preview</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {status !== "paid" && (
            <DropdownMenuItem onSelect={() => setRecordPaymentOpen(true)}>
              Record Payment
            </DropdownMenuItem>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={pending}>Change Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {STATUSES.map(({ value, label }) => (
                <DropdownMenuItem
                  key={value}
                  onSelect={() => handleStatusChange(value)}
                  className="flex items-center gap-2"
                >
                  <Check className={`h-4 w-4 ${value === status ? "opacity-100" : "opacity-0"}`} />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleDuplicate}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setDeleteOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete invoice?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={pending}>
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

      <Sheet open={recordPaymentOpen} onOpenChange={setRecordPaymentOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Record Payment</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleRecordPayment} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="payment-date">Payment Date</Label>
              <Input
                id="payment-date"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="payment-method">Payment Method</Label>
              <SelectRoot value={paymentMethod} onValueChange={setPaymentMethod} required>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="payment-reference">Reference / Transaction Number <span className="text-muted-foreground">(optional)</span></Label>
              <Input
                id="payment-reference"
                type="text"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="e.g. TXN-12345"
              />
            </div>
            <SheetFooter className="mt-2">
              <Button type="submit" disabled={pending || !paymentDate || !paymentMethod}>
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Mark as Paid"
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
