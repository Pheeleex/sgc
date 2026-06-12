import { cn } from "@/lib/utils";

function Skeleton({ className }: { className: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-neutral-200", className)} />;
}

export function PageLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-80 max-w-full" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function PostLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-10 w-5/6" />
        <Skeleton className="h-4 w-40" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn("h-4", index % 3 === 0 ? "w-full" : "w-11/12")}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export function ResourceLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <section className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="space-y-3 pt-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl bg-neutral-50 p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-16 w-full" />
        </section>
      </div>
    </main>
  );
}
