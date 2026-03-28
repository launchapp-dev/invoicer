import { getInvoiceStats } from "@/lib/storage";
import { formatCurrency } from "@/lib/calculations";
import { Card, CardContent } from "@/components/ui/card";

export async function DashboardStats() {
  const stats = await getInvoiceStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Total Outstanding</p>
          <p className="text-2xl font-semibold mt-1">
            {formatCurrency(stats.totalOutstanding, stats.currency)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.outstandingCount} {stats.outstandingCount === 1 ? "invoice" : "invoices"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Paid This Month</p>
          <p className="text-2xl font-semibold mt-1">
            {formatCurrency(stats.paidThisMonth, stats.currency)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.paidThisMonthCount} {stats.paidThisMonthCount === 1 ? "invoice" : "invoices"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <p className="text-2xl font-semibold mt-1">
            {formatCurrency(stats.overdueAmount, stats.currency)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.overdueCount} {stats.overdueCount === 1 ? "invoice" : "invoices"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
