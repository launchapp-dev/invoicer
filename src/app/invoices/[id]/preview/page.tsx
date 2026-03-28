"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { InvoicePreview } from "@/components/invoice-preview";
import { loadInvoice, getMySettings, addPayment, deletePayment } from "@/lib/storage";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/sonner";
import { formatCurrency } from "@/lib/calculations";
import type { Invoice, Payment } from "@/types/invoice";

const METHOD_LABELS: Record<string, string> = {
  bank_transfer: "Bank Transfer",
  cash: "Cash",
  check: "Check",
  card: "Card",
  other: "Other",
};

export default function PreviewInvoicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: session, isPending } = authClient.useSession();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formAmount, setFormAmount] = useState("");
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formMethod, setFormMethod] = useState("bank_transfer");
  const [formReference, setFormReference] = useState("");

  async function handleDownload() {
    if (!invoice) return;
    setDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { InvoicePDF } = await import("@/components/invoice-pdf");
      const blob = await pdf(<InvoicePDF invoice={invoice} logoUrl={logoUrl} />).toBlob();
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

  async function reloadInvoice() {
    if (!params?.id) return;
    const data = await loadInvoice(params.id);
    if (data) setInvoice(data);
  }

  async function handleAddPayment() {
    if (!invoice || !formAmount || !formDate || !formMethod) return;
    const amount = parseFloat(formAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setSaving(true);
    try {
      await addPayment(invoice.id, {
        amount,
        paidAt: formDate,
        method: formMethod,
        ...(formReference ? { reference: formReference } : {}),
      });
      await reloadInvoice();
      setSheetOpen(false);
      setFormAmount("");
      setFormDate(new Date().toISOString().slice(0, 10));
      setFormMethod("bank_transfer");
      setFormReference("");
      toast.success("Payment recorded");
    } catch {
      toast.error("Failed to record payment");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePayment(paymentId: string) {
    setDeletingId(paymentId);
    try {
      await deletePayment(paymentId);
      await reloadInvoice();
      toast.success("Payment removed");
    } catch {
      toast.error("Failed to remove payment");
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (!session || !params?.id) return;
    getMySettings().then((s) => { if (s?.logoUrl) setLogoUrl(s.logoUrl); }).catch(() => {});
    loadInvoice(params.id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setInvoice(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        const msg = err instanceof Error ? err.message : "Failed to load invoice";
        if (msg === "Unauthorized") {
          toast.error("Your session has expired. Please sign in again.");
          router.replace("/login");
          return;
        }
        toast.error("Failed to load invoice");
        router.replace("/dashboard");
      });
  }, [session, params?.id, router]);

  if (isPending || !session || loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-3">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        </header>
        <div className="p-6 max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4 text-center">
            <p className="text-lg font-semibold">Invoice not found</p>
            <p className="text-sm text-muted-foreground">
              The invoice you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const invoicePayments: Payment[] = invoice?.payments ?? [];
  const totalPaid = invoicePayments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = invoice ? invoice.total - totalPaid : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">Invoice Preview</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/invoices/${params?.id}`}>Back to Edit</Link>
            </Button>
            {invoice && (
              <Button onClick={handleDownload} disabled={downloading}>
                {downloading ? "Generating…" : "Download PDF"}
              </Button>
            )}
          </div>
        </div>
      </header>
      <div className="p-6 max-w-3xl mx-auto space-y-4">
        {invoice && <InvoicePreview invoice={invoice} hideDownload logoUrl={logoUrl} />}

        {invoice && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Payments</CardTitle>
                <Button size="sm" variant="outline" onClick={() => setSheetOpen(true)}>
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {invoicePayments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
              ) : (
                <div className="space-y-2">
                  {invoicePayments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{p.paidAt}</span>
                        <span className="text-muted-foreground">{METHOD_LABELS[p.method] ?? p.method}</span>
                        {p.reference && (
                          <span className="text-muted-foreground">#{p.reference}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(p.amount, invoice.currency)}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          disabled={deletingId === p.id}
                          onClick={() => handleDeletePayment(p.id)}
                          aria-label="Delete payment"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {invoicePayments.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total paid</span>
                      <span className="font-medium">{formatCurrency(totalPaid, invoice.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining balance</span>
                      <span className={remaining > 0 ? "font-medium text-destructive" : "font-medium"}>
                        {formatCurrency(Math.max(0, remaining), invoice.currency)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Record Payment</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="pay-amount">Amount</Label>
              <Input
                id="pay-amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pay-date">Date</Label>
              <Input
                id="pay-date"
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pay-method">Method</Label>
              <SelectRoot value={formMethod} onValueChange={setFormMethod}>
                <SelectTrigger id="pay-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </SelectRoot>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pay-reference">Reference (optional)</Label>
              <Input
                id="pay-reference"
                placeholder="Transaction ID, check #, etc."
                value={formReference}
                onChange={(e) => setFormReference(e.target.value)}
              />
            </div>
          </div>
          <SheetFooter>
            <Button onClick={handleAddPayment} disabled={saving} className="w-full">
              {saving ? "Saving…" : "Record Payment"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
