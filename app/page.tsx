"use client";

import { useEffect } from "react";
import Link from "next/link";
import { defaultLocale } from "@/lib/i18n";
import { withBase } from "@/lib/site";

/** Root landing: client-side redirect so this works on static hosts too. */
export default function RootPage() {
  useEffect(() => {
    window.location.replace(withBase(`/${defaultLocale}`));
  }, []);
  return (
    <main className="grid min-h-screen place-items-center bg-ivory-50">
      <div className="text-center">
        <p className="font-display text-3xl font-bold text-navy-900">HADLOOM</p>
        <p className="mt-2 text-xs uppercase tracking-widest2 text-gold-500">
          Redirecting to the export house…
        </p>
        <Link
          href={withBase(`/${defaultLocale}`)}
          className="mt-6 inline-block rounded-lg bg-navy-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory-50"
        >
          Enter
        </Link>
      </div>
    </main>
  );
}
