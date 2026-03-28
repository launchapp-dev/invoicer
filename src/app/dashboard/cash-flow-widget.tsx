import { TrendingUp, AlertTriangle } from "lucide-react";
import { getCashFlowData } from "@/lib/storage";
import { getCashFlowInsight } from "@/lib/ai";
import { formatCurrency } from "@/lib/calculations";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function CashFlowWidget() {
  const data = await getCashFlowData();
  const insight = await getCashFlowInsight(data);

  const hasData = data.expectedThisMonthCount > 0 || data.atRiskCount > 0 || data.upcomingByWeek.length > 0;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <h2 className="text-sm font-medium">Cash Flow Forecast</h2>
        {insight && (
          <p className="text-sm text-muted-foreground mt-1">{insight}</p>
        )}
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <p className="text-sm text-muted-foreground">No outstanding invoices to forecast.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Expected this month</span>
                </div>
                <p className="text-xl font-semibold">
                  {formatCurrency(data.expectedThisMonth, data.currency)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {data.expectedThisMonthCount}{" "}
                  {data.expectedThisMonthCount === 1 ? "invoice" : "invoices"}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">At risk</span>
                </div>
                <p className="text-xl font-semibold">
                  {formatCurrency(data.atRisk, data.currency)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {data.atRiskCount}{" "}
                  {data.atRiskCount === 1 ? "invoice" : "invoices"} overdue
                </p>
              </div>
            </div>

            {data.upcomingByWeek.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Upcoming payments</p>
                <div className="space-y-2">
                  {data.upcomingByWeek.map((week) => (
                    <div key={week.weekStart} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{week.weekLabel}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {week.count} {week.count === 1 ? "invoice" : "invoices"}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {formatCurrency(week.amount, data.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
