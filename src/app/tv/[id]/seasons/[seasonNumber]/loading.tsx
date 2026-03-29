export default function SeasonLoading() {
  return (
    <main className="flex flex-1 flex-col gap-10">
      <div className="h-[45vh] w-full animate-pulse bg-muted sm:h-[55vh]" />
      <div className="space-y-3 px-4 sm:px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-4 rounded-xl p-3">
            <div className="aspect-video w-48 shrink-0 animate-pulse rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
