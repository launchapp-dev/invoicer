import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getClient, getClientInvoices } from "@/lib/storage";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { InvoiceStatus } from "@/types/invoice";

const STATUS_VARIANT: Record<InvoiceStatus, "secondary" | "outline" | "default" | "destructive"> = {
  draft: "secondary",
  sent: "outline",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  const clientInvoices = await getClientInvoices(client.name);

  const currency = clientInvoices[0]?.currency ?? "USD";
  const totalBilled = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const outstanding = clientInvoices
    .filter((inv) => inv.status === "draft" || inv.status === "sent")
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdue = clientInvoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm">Invoicer</span>
          <Link
            href="/clients"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Clients
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-1">{client.name}</h1>
        {client.company && (
          <p className="text-muted-foreground text-sm mb-6">{client.company}</p>
        )}

        <Separator className="mb-6" />

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {client.email && (
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Email</dt>
              <dd className="text-sm">{client.email}</dd>
            </div>
          )}
          {client.phone && (
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Phone</dt>
              <dd className="text-sm">{client.phone}</dd>
            </div>
          )}
          {(client.address || client.city || client.state || client.zip || client.country) && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Address</dt>
              <dd className="text-sm">
                {[client.address, client.city, client.state, client.zip, client.country]
                  .filter(Boolean)
                  .join(", ")}
              </dd>
            </div>
          )}
          {client.notes && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Notes</dt>
              <dd className="text-sm whitespace-pre-wrap">{client.notes}</dd>
            </div>
          )}
        </dl>

        <Separator className="my-8" />

        <h2 className="text-base font-semibold mb-4">Invoice History</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Billed</p>
            <p className="text-lg font-semibold">{formatCurrency(totalBilled, currency)}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Outstanding</p>
            <p className="text-lg font-semibold">{formatCurrency(outstanding, currency)}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overdue</p>
            <p className="text-lg font-semibold">{formatCurrency(overdue, currency)}</p>
          </div>
        </div>

        {clientInvoices.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No invoices for this client yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell>
                    <Link
                      href={`/invoices/${inv.id}`}
                      className="hover:underline text-sm"
                    >
                      {inv.invoiceNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{inv.issueDate}</TableCell>
                  <TableCell className="text-sm">{inv.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[inv.status] ?? "secondary"}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatCurrency(inv.total, inv.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  );
}
