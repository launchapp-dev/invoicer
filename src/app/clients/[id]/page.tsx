import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getClient, getClientInvoices, updateClient } from "@/lib/storage";
import { getClientExpenses } from "@/lib/expense-storage";
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
import type { ExpenseCategory } from "@/lib/expense-storage";

const CATEGORY_COLORS: Record<ExpenseCategory, "default" | "secondary" | "outline" | "destructive"> = {
  software: "default",
  hardware: "secondary",
  travel: "outline",
  meals: "secondary",
  contractor: "default",
  marketing: "outline",
  other: "secondary",
};

const STATUS_VARIANT: Record<InvoiceStatus, "secondary" | "outline" | "default" | "destructive"> = {
  draft: "secondary",
  sent: "outline",
  viewed: "secondary",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
  partial: "outline",
  archived: "outline",
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

const CURRENCIES = [
  { code: "USD", label: "USD — US Dollar" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "JPY", label: "JPY — Japanese Yen" },
  { code: "CAD", label: "CAD — Canadian Dollar" },
  { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "CHF", label: "CHF — Swiss Franc" },
  { code: "INR", label: "INR — Indian Rupee" },
  { code: "SGD", label: "SGD — Singapore Dollar" },
  { code: "AED", label: "AED — UAE Dirham" },
];

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

  async function handleUpdateClient(formData: FormData) {
    "use server";
    await updateClient(id, {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zip: formData.get("zip") as string,
      country: formData.get("country") as string,
      taxId: formData.get("taxId") as string,
      currencyPreference: formData.get("currencyPreference") as string,
      notes: formData.get("notes") as string,
    });
    redirect(`/clients/${id}`);
  }
  const [clientInvoices, clientExpenses] = await Promise.all([
    getClientInvoices(client.name),
    getClientExpenses(id),
  ]);

  const currency = clientInvoices[0]?.currency ?? "USD";
  const totalBilled = clientInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const outstanding = clientInvoices
    .filter((inv) => inv.status === "draft" || inv.status === "sent")
    .reduce((sum, inv) => sum + inv.total, 0);
  const overdue = clientInvoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);
  const totalExpensesCents = clientExpenses.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = totalExpensesCents / 100;
  const profit = totalBilled - totalExpenses;

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
          {client.taxId && (
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tax ID / VAT / EIN</dt>
              <dd className="text-sm">{client.taxId}</dd>
            </div>
          )}
          {client.currencyPreference && (
            <div>
              <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Currency Preference</dt>
              <dd className="text-sm">{client.currencyPreference}</dd>
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

        <details className="mb-8">
          <summary className="text-base font-semibold cursor-pointer select-none">Edit Client</summary>
          <form action={handleUpdateClient} className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="edit-name">Name *</label>
              <input
                id="edit-name"
                name="name"
                defaultValue={client.name}
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="edit-company">Company</label>
                <input
                  id="edit-company"
                  name="company"
                  defaultValue={client.company}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="edit-email">Email</label>
                <input
                  id="edit-email"
                  name="email"
                  type="email"
                  defaultValue={client.email}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="edit-phone">Phone</label>
              <input
                id="edit-phone"
                name="phone"
                type="tel"
                defaultValue={client.phone}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="edit-address">Address</label>
              <input
                id="edit-address"
                name="address"
                defaultValue={client.address}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm font-medium" htmlFor="edit-city">City</label>
                <input
                  id="edit-city"
                  name="city"
                  defaultValue={client.city}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="edit-state">State</label>
                <input
                  id="edit-state"
                  name="state"
                  defaultValue={client.state}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="edit-zip">ZIP</label>
                <input
                  id="edit-zip"
                  name="zip"
                  defaultValue={client.zip}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="edit-country">Country</label>
              <input
                id="edit-country"
                name="country"
                defaultValue={client.country}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="edit-taxId">Tax ID / VAT / EIN</label>
                <input
                  id="edit-taxId"
                  name="taxId"
                  defaultValue={client.taxId}
                  placeholder="e.g. GB123456789"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="edit-currencyPreference">Currency Preference</label>
                <select
                  id="edit-currencyPreference"
                  name="currencyPreference"
                  defaultValue={client.currencyPreference}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">— No preference —</option>
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="edit-notes">Notes</label>
              <textarea
                id="edit-notes"
                name="notes"
                rows={3}
                defaultValue={client.notes}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </details>

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

        <Separator className="my-8" />

        <h2 className="text-base font-semibold mb-4">Expenses & P&L</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Invoiced</p>
            <p className="text-lg font-semibold">{formatCurrency(totalBilled, currency)}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Expenses</p>
            <p className="text-lg font-semibold">{formatCurrency(totalExpenses, currency)}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Profit</p>
            <p className={`text-lg font-semibold ${profit < 0 ? "text-destructive" : ""}`}>
              {formatCurrency(profit, currency)}
            </p>
          </div>
        </div>

        {clientExpenses.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No expenses linked to this client yet.{" "}
            <Link href="/expenses" className="underline hover:no-underline">
              Add expenses
            </Link>
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="text-sm">{expense.date}</TableCell>
                  <TableCell className="text-sm font-medium">{expense.vendor}</TableCell>
                  <TableCell>
                    <Badge variant={CATEGORY_COLORS[expense.category] ?? "secondary"}>
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{expense.description || "—"}</TableCell>
                  <TableCell className="text-right text-sm">
                    {formatCurrency(expense.amount / 100, expense.currency)}
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
