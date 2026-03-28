"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
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
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/invoice-schema";
import { saveInvoice, loadInvoice, listClients, getMySettings } from "@/lib/storage";
import type { Client } from "@/types/client";
import { toast } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client";

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
    getMySettings().then((s) => { if (s?.logoUrl) setLogoUrl(s.logoUrl); }).catch(() => {});
    loadInvoice(params.id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        form.reset(data as InvoiceFormValues);
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
          <TabsContent value="form" className="mt-0 p-4">
            <FormProvider {...form}>
              <InvoiceForm clients={clients} />
            </FormProvider>
          </TabsContent>
          <TabsContent value="preview" className="mt-0 p-4">
            <InvoicePreview invoice={invoice} logoUrl={logoUrl} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden lg:flex h-[calc(100vh-57px)]">
        <div className="w-1/2 overflow-y-auto border-r border-border bg-background p-6">
          <FormProvider {...form}>
            <InvoiceForm clients={clients} />
          </FormProvider>
        </div>
        <div className="w-1/2 overflow-y-auto bg-muted/30 p-8">
          <InvoicePreview invoice={invoice} />
        </div>
      </div>
    </div>
  );
}
