"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ParsedInvoice } from "@/lib/ai";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import { InvoiceAttachments } from "@/components/invoice-attachments";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/invoice-schema";
import { saveInvoice, getNextInvoiceNumber, getMySettings, listClients } from "@/lib/storage";
import type { Client } from "@/types/client";
import { createRecurringInvoice } from "@/lib/recurring-actions";
import { toast } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client";
import type { Invoice } from "@/types/invoice";

function defaultValues(): InvoiceFormValues {
  const today = new Date().toISOString().split("T")[0];
  const due = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  return {
    id: crypto.randomUUID(),
    invoiceNumber: "",
    status: "draft",
    issueDate: today,
    dueDate: due,
    from: { name: "", email: "", address: "", city: "", state: "", zip: "", country: "", taxId: "" },
    to: { name: "", email: "", address: "", city: "", state: "", zip: "", country: "", taxId: "" },
    lineItems: [{ id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    taxLines: [{ id: crypto.randomUUID(), name: "Tax", rate: 0, amount: 0 }],
    taxAmount: 0,
    discount: 0,
    total: 0,
    notes: "",
    currency: "USD",
  };
}

function parseDueDateFromTerms(terms: string): string {
  const lower = terms.toLowerCase().trim();
  const netMatch = lower.match(/^net\s+(\d+)$/);
  if (netMatch) {
    const days = parseInt(netMatch[1], 10);
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
  }
  if (
    lower.includes("receipt") ||
    lower.includes("immediate") ||
    lower === "due now"
  ) {
    return new Date().toISOString().split("T")[0];
  }
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
}

function NewInvoicePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();
  const [savedId, setSavedId] = useState<string | null>(null);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [template, setTemplate] = useState<"classic" | "modern" | "minimal">("classic");
  const [attachmentCount, setAttachmentCount] = useState(0);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: defaultValues(),
  });

  const { setValue } = form;
  useEffect(() => {
    const init = async () => {
      const [numResult, settingsResult, clientsResult] = await Promise.allSettled([
        getNextInvoiceNumber(),
        getMySettings(),
        listClients(),
      ]);
      if (numResult.status === "fulfilled") {
        setValue("invoiceNumber", numResult.value, { shouldDirty: false });
      } else {
        toast.error("Could not auto-generate invoice number. Please enter one manually.");
      }
      if (settingsResult.status === "fulfilled" && settingsResult.value) {
        const s = settingsResult.value;
        if (s.businessName) setValue("from.name", s.businessName, { shouldDirty: false });
        if (s.businessEmail) setValue("from.email", s.businessEmail, { shouldDirty: false });
        if (s.businessAddress) setValue("from.address", s.businessAddress, { shouldDirty: false });
        if (s.businessCity) setValue("from.city", s.businessCity, { shouldDirty: false });
        if (s.businessState) setValue("from.state", s.businessState, { shouldDirty: false });
        if (s.businessZip) setValue("from.zip", s.businessZip, { shouldDirty: false });
        if (s.businessCountry) setValue("from.country", s.businessCountry, { shouldDirty: false });
        if (s.businessTaxId) setValue("from.taxId", s.businessTaxId, { shouldDirty: false });
        setValue("currency", s.defaultCurrency, { shouldDirty: false });
        if (s.defaultTaxRate) {
          setValue("taxLines", [{ id: crypto.randomUUID(), name: "Tax", rate: s.defaultTaxRate, amount: 0 }], { shouldDirty: false });
        }
        if (s.defaultNotes) setValue("notes", s.defaultNotes, { shouldDirty: false });
        if (s.logoUrl) setLogoUrl(s.logoUrl);
        if (s.invoiceTemplate) setTemplate(s.invoiceTemplate as "classic" | "modern" | "minimal");
      }

      if (clientsResult.status === "fulfilled") {
        setClients(clientsResult.value);
      }

      const prefillParam = searchParams.get("prefill");
      if (prefillParam) {
        try {
          const prefill = JSON.parse(atob(prefillParam)) as ParsedInvoice;
          if (prefill.recipientName) {
            setValue("to.name", prefill.recipientName, { shouldDirty: true });
          }
          if (prefill.recipientEmail) {
            setValue("to.email", prefill.recipientEmail, { shouldDirty: true });
          }
          if (prefill.lineItems && prefill.lineItems.length > 0) {
            setValue(
              "lineItems",
              prefill.lineItems.map((item) => ({
                id: crypto.randomUUID(),
                description: item.description,
                quantity: item.quantity,
                rate: item.unitPrice,
                amount: item.quantity * item.unitPrice,
              })),
              { shouldDirty: true }
            );
          }
          if (prefill.paymentTerms) {
            setValue("dueDate", parseDueDateFromTerms(prefill.paymentTerms), {
              shouldDirty: true,
            });
          }
          if (prefill.notes) {
            setValue("notes", prefill.notes, { shouldDirty: true });
          }
        } catch {
          // ignore malformed prefill
        }
      }
    };
    init();
  }, [setValue, searchParams]);

  const invoice = form.watch() as Invoice;

  const handleSave = form.handleSubmit(async (values) => {
    try {
      await saveInvoice(values as Invoice);
      if (values.recurring && values.recurringFrequency && session?.user?.id) {
        const today = new Date().toISOString().split("T")[0];
        await createRecurringInvoice(session.user.id, {
          title: values.invoiceNumber || "Recurring Invoice",
          frequency: values.recurringFrequency,
          nextRunAt: today,
          template: values,
        });
      }
      form.reset(values);
      setSavedId(values.id);
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

  useEffect(() => {
    if (!form.formState.isDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [form.formState.isDirty]);

  useEffect(() => {
    if (savedId) {
      router.push(`/invoices/${savedId}`);
    }
  }, [savedId, router]);

  function handleDashboardClick() {
    if (form.formState.isDirty) {
      setShowLeaveDialog(true);
    } else {
      router.push("/dashboard");
    }
  }

  if (isPending || !session) {
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
            <AlertDialogAction onClick={() => router.push("/dashboard")}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">New Invoice</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDashboardClick}>
              Dashboard
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
            <InvoiceAttachments invoiceId={invoice.id} onCountChange={setAttachmentCount} />
          </TabsContent>
          <TabsContent value="preview" className="mt-0 p-4">
            <InvoicePreview invoice={invoice} logoUrl={logoUrl} template={template} attachmentCount={attachmentCount} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden lg:flex h-[calc(100vh-57px)]">
        <div className="w-1/2 overflow-y-auto border-r border-border bg-background p-6 space-y-6">
          <FormProvider {...form}>
            <InvoiceForm clients={clients} />
          </FormProvider>
          <InvoiceAttachments invoiceId={invoice.id} onCountChange={setAttachmentCount} />
        </div>
        <div className="w-1/2 overflow-y-auto bg-muted/30 p-8">
          <InvoicePreview invoice={invoice} logoUrl={logoUrl} template={template} attachmentCount={attachmentCount} />
        </div>
      </div>
    </div>
  );
}

export default function NewInvoicePage() {
  return (
    <Suspense>
      <NewInvoicePageContent />
    </Suspense>
  );
}
