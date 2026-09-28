export default function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-label="Loading">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 animate-pulse place-items-center bg-navy-900 font-display text-xl font-bold text-gold-400">
          H
        </span>
        <p className="text-sm uppercase tracking-widest2 opacity-60">Preparing the atelier…</p>
      </div>
    </div>
  );
}
