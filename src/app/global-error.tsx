"use client";

export const dynamic = "force-dynamic";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body style={{ backgroundColor: "#0a0f1e", color: "#f5f5f5", fontFamily: "system-ui", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h1>
          <button onClick={reset} style={{ padding: "0.5rem 1rem", backgroundColor: "#f5f5f5", color: "#0a0f1e", border: "none", borderRadius: "0.375rem", cursor: "pointer", fontWeight: 600 }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
