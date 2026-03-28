import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Skeleton className="h-7 w-24 mb-6" />

        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-36 mb-2" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-10" />
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="col-span-2 h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-10" />
            <Skeleton className="h-9 w-28" />
          </div>

          <div className="border border-border rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-36 mb-2" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-10" />
            <Skeleton className="h-24" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </main>
    </div>
  );
}
