import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { listInvoices, countInvoices } from "@/lib/storage";
import { formatCurrency } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import type { InvoiceStatus } from "@/types/invoice";

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

  const [invoices, totalCount] = await Promise.all([
    listInvoices(LIMIT, offset),
    countInvoices(),
  ]);

  const totalPages = Math.ceil(totalCount / LIMIT);

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

        {invoices.length === 0 && page === 1 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-muted-foreground">No invoices yet.</p>
            <Button asChild>
              <Link href="/invoices/new">Create Invoice</Link>
            </Button>
          </div>
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
                      <TableCell className="hidden sm:table-cell">{invoice.issueDate}</TableCell>
                      <TableCell className="hidden sm:table-cell">{invoice.dueDate}</TableCell>
                      <TableCell>{formatCurrency(invoice.total, invoice.currency)}</TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[invoice.status] ?? "secondary"}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <InvoiceActions invoiceId={invoice.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalCount > LIMIT && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button variant="outline" asChild disabled={page <= 1}>
                  <Link href={`?page=${page - 1}`}>Previous</Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button variant="outline" asChild disabled={page >= totalPages}>
                  <Link href={`?page=${page + 1}`}>Next</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
