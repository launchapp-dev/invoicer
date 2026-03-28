"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Something went wrong</h2>
          <p className="mb-4 text-sm text-gray-500">
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded px-4 py-2 text-sm font-medium"
            style={{ background: "hsl(var(--la-primary, 222 47% 11%))", color: "white" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
