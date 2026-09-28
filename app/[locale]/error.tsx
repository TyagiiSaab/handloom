"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-widest2 text-gold-500">Something went wrong</p>
      <h1 className="font-display mt-3 text-4xl font-bold">The loom jammed</h1>
      <p className="mt-3 text-sm opacity-70">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-navy-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory-50 hover:bg-gold-500 hover:text-navy-950"
      >
        Try again
      </button>
    </div>
  );
}
