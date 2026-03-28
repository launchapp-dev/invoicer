import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { listInvoices, countInvoices } from "@/lib/storage";
import { formatCurrency, formatDate } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogoutButton } from "./logout-button";
import { InvoiceActions } from "./invoice-actions";
import { PaginationControls } from "./pagination-controls";
import { DashboardFilters } from "./dashboard-filters";
import { DashboardStats } from "./dashboard-stats";
import type { InvoiceStatus } from "@/types/invoice";

const VALID_STATUSES: InvoiceStatus[] = ["draft", "sent", "paid", "overdue", "cancelled"];

const STATUS_VARIANT: Record<InvoiceStatus, "secondary" | "outline" | "default" | "destructive"> = {
  draft: "secondary",
  sent: "outline",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
};

const LIMIT = 25;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const page = Math.max(1, parseInt((params.page as string) ?? "1", 10) || 1);
  const offset = (page - 1) * LIMIT;
  const search = (params.search as string) ?? "";
  const statusParam = (params.status as string) ?? "";
  const status = VALID_STATUSES.includes(statusParam as InvoiceStatus) ? (statusParam as InvoiceStatus) : undefined;
  const filters = {
    ...(search ? { search } : {}),
    ...(status ? { status } : {}),
  };
  const hasFilters = !!(search || statusParam);

  const [invoices, totalCount] = await Promise.all([
    listInvoices(LIMIT, offset, filters),
    countInvoices(filters),
  ]);

  const totalPages = Math.ceil(totalCount / LIMIT);

  if (invoices.length === 0 && page > 1) {
    const redirectParams = new URLSearchParams();
    if (search) redirectParams.set("search", search);
    if (statusParam) redirectParams.set("status", statusParam);
    redirect(`/dashboard${redirectParams.size ? `?${redirectParams}` : ""}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm">Invoicer</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Invoices</h1>
          <Button asChild>
            <Link href="/invoices/new">New Invoice</Link>
          </Button>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
          </div>
        }>
          <DashboardStats />
        </Suspense>

        <Suspense fallback={
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-9 w-[240px]" />
            <Skeleton className="h-9 w-40" />
          </div>
        }>
          <DashboardFilters />
        </Suspense>

        {invoices.length === 0 && page === 1 ? (
          hasFilters ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <p className="text-muted-foreground">No invoices match your filters.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <p className="text-muted-foreground">No invoices yet.</p>
              <Button asChild>
                <Link href="/invoices/new">Create Invoice</Link>
              </Button>
            </div>
          )
        ) : (
          <>
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
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
                    <TableRow key={invoice.id} className="hover:bg-muted/50">
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

            {totalCount > LIMIT && (
              <Suspense fallback={<Skeleton className="h-9 w-64 mt-4" />}>
                <PaginationControls page={page} totalPages={totalPages} />
              </Suspense>
            )}
          </>
        )}
      </main>
    </div>
  );
}
