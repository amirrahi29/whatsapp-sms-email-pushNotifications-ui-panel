import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="app-page app-page--md">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-72 max-w-full rounded-md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="app-surface p-4">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="mt-4 h-8 w-24 rounded-lg" />
        </div>
        <div className="app-surface p-4">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="mt-4 h-8 w-28 rounded-lg" />
        </div>
        <div className="app-surface p-4">
          <Skeleton className="h-3 w-16 rounded-md" />
          <Skeleton className="mt-4 h-8 w-20 rounded-lg" />
        </div>
      </div>
      <div className="app-surface overflow-hidden p-0">
        <div className="border-b border-border/60 px-4 py-3">
          <Skeleton className="h-4 w-40 rounded-md" />
        </div>
        <div className="p-4">
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
