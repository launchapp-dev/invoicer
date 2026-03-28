"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoicePreview } from "@/components/invoice-preview";
import { loadInvoice } from "@/lib/storage";
import { authClient } from "@/lib/auth-client";
import type { Invoice } from "@/types/invoice";

export default function PreviewInvoicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: session, isPending } = authClient.useSession();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (!session || !params?.id) return;
    loadInvoice(params.id)
      .then((data) => {
        if (!data) {
          setNotFound(true);
        } else {
          setInvoice(data);
        }
        setLoading(false);
      })
      .catch(() => {
        router.replace("/dashboard");
      });
  }, [session, params?.id, router]);

  if (isPending || !session) {
    return <div className="min-h-screen bg-background" />;
  }

  if (loading) {
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-semibold">Invoice Preview</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/invoices/${params?.id}`}>Back to Edit</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="p-6 max-w-3xl mx-auto">
        {invoice && <InvoicePreview invoice={invoice} />}
      </div>
    </div>
  );
}
