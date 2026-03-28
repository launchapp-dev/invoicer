import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { listInvoices } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout-button";
import { InvoiceTable } from "./invoice-table";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const invoices = await listInvoices();

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

        {invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-muted-foreground">No invoices yet.</p>
            <Button asChild>
              <Link href="/invoices/new">Create Invoice</Link>
            </Button>
          </div>
        ) : (
          <InvoiceTable invoices={invoices} />
        )}
      </main>
    </div>
  );
}
