import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { listRecurringInvoices } from "@/lib/recurring-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogoutButton } from "@/app/dashboard/logout-button";
import { RecurringActions } from "./recurring-actions";

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

export default async function RecurringPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const series = await listRecurringInvoices(session.user.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-sm">Invoicer</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{session.user.email}</span>
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
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
          <h1 className="text-xl font-semibold">Recurring Invoices</h1>
          <Button asChild>
            <Link href="/invoices/new">New Invoice</Link>
          </Button>
        </div>

        {series.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-muted-foreground">No recurring invoices yet.</p>
            <p className="text-sm text-muted-foreground">
              Create an invoice and enable &quot;Make this recurring&quot; to get started.
            </p>
            <Button asChild>
              <Link href="/invoices/new">Create Invoice</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-40">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {series.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.title}</TableCell>
                    <TableCell>{FREQUENCY_LABELS[s.frequency] ?? s.frequency}</TableCell>
                    <TableCell>{s.nextRunAt}</TableCell>
                    <TableCell>
                      <Badge variant={s.status === "active" ? "default" : "secondary"}>
                        {s.status === "active" ? "Active" : "Paused"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <RecurringActions id={s.id} status={s.status as "active" | "paused"} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
