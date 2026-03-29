export default function CollectionLoading() {
  return (
    <main className="flex flex-1 flex-col gap-8">
      <div className="h-[50vh] w-full animate-pulse bg-muted" />
      <div className="grid grid-cols-2 gap-4 px-8 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    </main>
  );
}
