export default function TVShowLoading() {
  return (
    <main className="flex flex-1 flex-col gap-8">
      <div className="h-[80vh] w-full animate-pulse bg-muted" />
      <div className="flex gap-4 overflow-hidden px-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-48 w-32 shrink-0 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    </main>
  );
}
