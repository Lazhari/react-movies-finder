import Link from "next/link";

export default function MovieNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold text-primary">Movie Not Found</h1>
      <p className="text-muted-foreground">
        The movie you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Go home
      </Link>
    </main>
  );
}
