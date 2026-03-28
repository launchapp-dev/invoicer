import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>

        <div className="border border-border rounded-md overflow-hidden">
          <div className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-border bg-muted/50">
            {["w-24", "w-32", "w-24", "w-24", "w-20", "w-16", "w-8"].map((w, i) => (
              <Skeleton key={i} className={`h-4 ${w}`} />
            ))}
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="grid grid-cols-7 gap-4 px-4 py-4 border-b border-border last:border-0">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
