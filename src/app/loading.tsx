export default function Loading() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-8">
      <div className="h-[60vh] w-full animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    </main>
  );
}
