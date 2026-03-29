import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Go home
      </Link>
    </main>
  );
}
