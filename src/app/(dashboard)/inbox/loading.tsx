import { Skeleton } from "@/components/ui/skeleton";

export default function InboxLoading() {
  return (
    <div className="flex h-full min-h-0 flex-col md:grid md:grid-cols-[minmax(240px,300px)_1fr_minmax(260px,320px)]">
      <div className="flex h-full flex-col border-r border-border bg-card p-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mt-3 h-9 w-full rounded-lg" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
      <div className="hidden flex-col md:flex">
        <Skeleton className="h-14 w-full" />
        <div className="flex flex-1 flex-col gap-3 p-4">
          <Skeleton className="ml-auto h-16 w-[70%] rounded-2xl" />
          <Skeleton className="h-14 w-[65%] rounded-2xl" />
          <Skeleton className="ml-auto h-20 w-[75%] rounded-2xl" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="hidden border-l border-border md:block">
        <Skeleton className="h-full min-h-[200px] w-full rounded-none" />
      </div>
    </div>
  );
}
