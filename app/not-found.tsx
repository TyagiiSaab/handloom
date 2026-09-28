import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-widest2 text-gold-500">404</p>
      <h1 className="font-display mt-3 text-4xl font-bold">This weave doesn&apos;t exist</h1>
      <p className="mt-3 text-sm opacity-70">The page you requested was moved or never existed.</p>
      <Link
        href="/en"
        className="mt-6 inline-block rounded-lg bg-navy-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory-50 hover:bg-gold-500 hover:text-navy-950"
      >
        Back home
      </Link>
    </div>
  );
}
