"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
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
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import { InvoiceAttachments } from "@/components/invoice-attachments";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/invoice-schema";
import { saveInvoice, loadInvoice, listClients, getMySettings, addPayment } from "@/lib/storage";
import { formatCurrency, formatDate } from "@/lib/calculations";
import type { Client } from "@/types/client";
import type { Payment } from "@/types/invoice";
import { toast } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client";

const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  { value: "check", label: "Check" },
  { value: "card", label: "Card" },
  { value: "other", label: "Other" },
];

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [leaveDestination, setLeaveDestination] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [template, setTemplate] = useState<"classic" | "modern" | "minimal">("classic");
  const [brandColor, setBrandColor] = useState<string>("#2563eb");
  const [attachmentCount, setAttachmentCount] = useState(0);
  const [invoicePayments, setInvoicePayments] = useState<Payment[]>([]);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [paymentPending, setPaymentPending] = useState(false);
  const [pmtDate, setPmtDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [pmtMethod, setPmtMethod] = useState("");
  const [pmtReference, setPmtReference] = useState("");
  const [pmtAmount, setPmtAmount] = useState(0);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      id: "",
      invoiceNumber: "",
      status: "draft",
      issueDate: "",
      dueDate: "",
      from: { name: "", email: "", address: "", city: "", state: "", zip: "", country: "" },
      to: { name: "", email: "", address: "", city: "", state: "", zip: "", country: "" },
      lineItems: [],
      subtotal: 0,
      taxLines: [{ id: crypto.randomUUID(), name: "Tax", rate: 0, amount: 0 }],
      taxAmount: 0,
      discount: 0,
      total: 0,
      notes: "",
      currency: "USD",
    },
  });

  const invoice = form.watch();

  useEffect(() => {
    if (!session || !params?.id) return;
    listClients().then(setClients).catch(() => {});
    getMySettings().then((s) => {
      if (s?.logoUrl) setLogoUrl(s.logoUrl);
      if (s?.invoiceTemplate) setTemplate(s.invoiceTemplate as "classic" | "modern" | "minimal");
      if (s?.brandColor) setBrandColor(s.brandColor);
    }).catch(() => {});
    loadInvoice(params.id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        form.reset(data as InvoiceFormValues);
        setInvoicePayments(data.payments ?? []);
        setPmtAmount(data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        const msg = err instanceof Error ? err.message : "Failed to load invoice";
        if (msg === "Unauthorized") {
          toast.error("Your session has expired. Please sign in again.");
          router.replace("/login");
          return;
        }
        toast.error("Failed to load invoice");
        router.replace("/dashboard");
      });
  }, [session, params?.id, form, router]);

  useEffect(() => {
    if (!form.formState.isDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [form.formState.isDirty]);

  function handleDashboardClick() {
    if (form.formState.isDirty) {
      setLeaveDestination("/dashboard");
      setShowLeaveDialog(true);
    } else {
      router.push("/dashboard");
    }
  }

  function handlePreviewClick() {
    if (form.formState.isDirty) {
      setLeaveDestination(`/invoices/${params.id}/preview`);
      setShowLeaveDialog(true);
    } else {
      router.push(`/invoices/${params.id}/preview`);
    }
  }

  const handleSave = form.handleSubmit(async (values) => {
    try {
      await saveInvoice(values);
      form.reset(values);
      toast.success("Invoice saved");
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Failed to save invoice";
      if (msg === "Unauthorized") {
        toast.error("Your session has expired. Please sign in again.");
        router.push("/login");
        return;
      }
      toast.error(msg);
    }
  });

  async function handleAddPayment(e: FormEvent) {
    e.preventDefault();
    if (!pmtDate || !pmtMethod || !pmtAmount) return;
    setPaymentPending(true);
    try {
      const newPayment = await addPayment(params.id, {
        amount: pmtAmount,
        paidAt: pmtDate,
        method: pmtMethod,
        reference: pmtReference || undefined,
      });
      setInvoicePayments((prev) => [...prev, newPayment]);
      setPaymentFormOpen(false);
      setPmtReference("");
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
      setPaymentPending(false);
    }
  }

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
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-48" />
          </div>
          <Skeleton className="h-24" />
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

  return (
    <div className="min-h-screen bg-background">
      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Leave anyway?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction onClick={() => leaveDestination && router.push(leaveDestination)}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">Edit Invoice</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDashboardClick}>
              Dashboard
            </Button>
            <Button variant="outline" onClick={handlePreviewClick}>
              Preview
            </Button>
            <Button onClick={handleSave} disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Invoice"
              )}
            </Button>
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
          <TabsContent value="form" className="mt-0 p-4 space-y-6">
            <FormProvider {...form}>
              <InvoiceForm clients={clients} />
            </FormProvider>
            <InvoiceAttachments invoiceId={params.id} onCountChange={setAttachmentCount} />
            <PaymentsSection
              payments={invoicePayments}
              total={invoice.total}
              currency={invoice.currency}
              onRecord={() => {
                setPmtAmount(Math.max(0, invoice.total - invoicePayments.reduce((s, p) => s + p.amount, 0)));
                setPmtDate(new Date().toISOString().split("T")[0]);
                setPmtMethod("");
                setPmtReference("");
                setPaymentFormOpen(true);
              }}
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-0 p-4">
            <InvoicePreview invoice={invoice} logoUrl={logoUrl} template={template} attachmentCount={attachmentCount} brandColor={brandColor} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden lg:flex h-[calc(100vh-57px)]">
        <div className="w-1/2 overflow-y-auto border-r border-border bg-background p-6 space-y-6">
          <FormProvider {...form}>
            <InvoiceForm clients={clients} />
          </FormProvider>
          <InvoiceAttachments invoiceId={params.id} onCountChange={setAttachmentCount} />
          <PaymentsSection
            payments={invoicePayments}
            total={invoice.total}
            currency={invoice.currency}
            onRecord={() => {
              setPmtAmount(Math.max(0, invoice.total - invoicePayments.reduce((s, p) => s + p.amount, 0)));
              setPmtDate(new Date().toISOString().split("T")[0]);
              setPmtMethod("");
              setPmtReference("");
              setPaymentFormOpen(true);
            }}
          />
        </div>
        <div className="w-1/2 overflow-y-auto bg-muted/30 p-8">
          <InvoicePreview invoice={invoice} logoUrl={logoUrl} template={template} attachmentCount={attachmentCount} brandColor={brandColor} />
        </div>
      </div>

      <Sheet open={paymentFormOpen} onOpenChange={setPaymentFormOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Record Payment</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAddPayment} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pmt-amount">Amount</Label>
              <Input
                id="pmt-amount"
                type="number"
                min="0.01"
                step="0.01"
                value={pmtAmount}
                onChange={(e) => setPmtAmount(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pmt-date">Payment Date</Label>
              <Input
                id="pmt-date"
                type="date"
                value={pmtDate}
                onChange={(e) => setPmtDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pmt-method">Payment Method</Label>
              <SelectRoot value={pmtMethod} onValueChange={setPmtMethod} required>
                <SelectTrigger id="pmt-method">
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
              <Label htmlFor="pmt-reference">Reference <span className="text-muted-foreground">(optional)</span></Label>
              <Input
                id="pmt-reference"
                type="text"
                value={pmtReference}
                onChange={(e) => setPmtReference(e.target.value)}
                placeholder="e.g. TXN-12345"
              />
            </div>
            <SheetFooter className="mt-2">
              <Button type="submit" disabled={paymentPending || !pmtDate || !pmtMethod || !pmtAmount}>
                {paymentPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Record Payment"
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface PaymentsSectionProps {
  payments: Payment[];
  total: number;
  currency: string;
  onRecord: () => void;
}

function PaymentsSection({ payments, total, currency, onRecord }: PaymentsSectionProps) {
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(0, total - totalPaid);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Payments</h2>
        <Button size="sm" variant="outline" onClick={onRecord} type="button">
          Record Payment
        </Button>
      </div>
      {payments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No payments recorded.</p>
      ) : (
        <div className="divide-y divide-border border border-border rounded-md">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{formatCurrency(p.amount, currency)}</span>
                <span className="text-muted-foreground capitalize">{p.method.replace("_", " ")}</span>
                {p.reference && <span className="text-muted-foreground">#{p.reference}</span>}
              </div>
              <span className="text-muted-foreground">{formatDate(p.paidAt)}</span>
            </div>
          ))}
        </div>
      )}
      {totalPaid > 0 && (
        <div className="text-sm space-y-1 pt-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total paid</span>
            <span className="font-medium">{formatCurrency(totalPaid, currency)}</span>
          </div>
          {remaining > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-medium">{formatCurrency(remaining, currency)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
