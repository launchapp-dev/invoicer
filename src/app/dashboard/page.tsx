import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { listInvoices, countInvoices, listClients, markOverdueInvoices, type InvoiceSort } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutButton } from "./logout-button";
import { PaginationControls } from "./pagination-controls";
import { DashboardFilters } from "./dashboard-filters";
import { DashboardStats } from "./dashboard-stats";
import { AiInvoiceCommand } from "./ai-invoice-command";
import { DashboardTable } from "./dashboard-table";
import { CashFlowWidget } from "./cash-flow-widget";
import type { InvoiceStatus } from "@/types/invoice";

const VALID_STATUSES: InvoiceStatus[] = ["draft", "sent", "paid", "overdue", "cancelled"];
const VALID_SORTS: InvoiceSort[] = ["date_desc", "date_asc", "amount_desc", "amount_asc", "status", "client"];

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
  const dateFrom = (params.dateFrom as string) ?? "";
  const dateTo = (params.dateTo as string) ?? "";
  const sortParam = (params.sort as string) ?? "";
  const sort = VALID_SORTS.includes(sortParam as InvoiceSort) ? (sortParam as InvoiceSort) : "date_desc";
  const minAmountParam = (params.minAmount as string) ?? "";
  const maxAmountParam = (params.maxAmount as string) ?? "";
  const minAmount = minAmountParam ? parseFloat(minAmountParam) : undefined;
  const maxAmount = maxAmountParam ? parseFloat(maxAmountParam) : undefined;
  const nlQuery = (params.nlQuery as string) ?? "";
  const clientId = (params.clientId as string) ?? "";
  const currency = (params.currency as string) ?? "";
  const filters = {
    ...(search ? { search } : {}),
    ...(status ? { status } : {}),
    ...(dateFrom ? { dateFrom } : {}),
    ...(dateTo ? { dateTo } : {}),
    ...(minAmount !== undefined && !isNaN(minAmount) ? { minAmount } : {}),
    ...(maxAmount !== undefined && !isNaN(maxAmount) ? { maxAmount } : {}),
    ...(clientId ? { clientId } : {}),
    ...(currency ? { currency } : {}),
    sort,
  };
  const hasFilters = !!(search || statusParam || dateFrom || dateTo || minAmountParam || maxAmountParam || clientId || currency);

  await markOverdueInvoices(session.user.id);

  const [invoices, totalCount, clientsList] = await Promise.all([
    listInvoices(LIMIT, offset, filters),
    countInvoices(filters),
    listClients(),
  ]);

  const totalPages = Math.ceil(totalCount / LIMIT);

  if (invoices.length === 0 && page > 1) {
    const redirectParams = new URLSearchParams();
    if (search) redirectParams.set("search", search);
    if (statusParam) redirectParams.set("status", statusParam);
    if (dateFrom) redirectParams.set("dateFrom", dateFrom);
    if (dateTo) redirectParams.set("dateTo", dateTo);
    if (minAmountParam) redirectParams.set("minAmount", minAmountParam);
    if (maxAmountParam) redirectParams.set("maxAmount", maxAmountParam);
    if (clientId) redirectParams.set("clientId", clientId);
    if (currency) redirectParams.set("currency", currency);
    if (nlQuery) redirectParams.set("nlQuery", nlQuery);
    if (sortParam && sortParam !== "date_desc") redirectParams.set("sort", sortParam);
    redirect(`/dashboard${redirectParams.size ? `?${redirectParams}` : ""}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm">Invoicer</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
            <Link
              href="/clients"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clients
            </Link>
            <Link
              href="/expenses"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Expenses
            </Link>
            <Link
              href="/dashboard/recurring"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Recurring
            </Link>
            <Link
              href="/settings"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Settings
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Invoices</h1>
          <div className="flex items-center gap-2">
            <AiInvoiceCommand />
            <Button asChild>
              <Link href="/invoices/new">New Invoice</Link>
            </Button>
          </div>
        </div>

        <Suspense fallback={<Skeleton className="h-36 rounded-lg mb-6" />}>
          <CashFlowWidget />
        </Suspense>

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
          <DashboardFilters nlQuery={nlQuery} clients={clientsList.map((c) => ({ id: c.id, name: c.name }))} />
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
            <DashboardTable invoices={invoices} />

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
