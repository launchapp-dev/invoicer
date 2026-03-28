import { Skeleton } from "@/components/ui/skeleton";

export default function EditInvoiceLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-3">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </header>

      <div className="hidden lg:flex h-[calc(100vh-57px)]">
        <div className="w-1/2 border-r border-border p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-2">
                  <Skeleton className="h-9 col-span-2" />
                  <Skeleton className="h-9" />
                  <Skeleton className="h-9" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-24" />
          </div>
        </div>

        <div className="w-1/2 bg-muted/30 p-8 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-px w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-48" />
          <div className="flex justify-end">
            <Skeleton className="h-16 w-48" />
          </div>
        </div>
      </div>

      <div className="lg:hidden p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
          <Skeleton className="h-48" />
          <Skeleton className="h-24" />
        </div>
      </div>
    </div>
  );
}
