"use client";

/**
 * Generative textile artwork — deterministic SVG weaves rendered offline.
 * Swap `src` with real photography via the `image` prop when available.
 */
export function TextileArt({
  hue,
  pattern,
  className,
  title,
}: {
  hue: number;
  pattern: "weave" | "emboss" | "print" | "tuft" | "pile";
  className?: string;
  title?: string;
}) {
  const id = `${pattern}-${hue}`;
  const base = `hsl(${hue} 30% 22%)`;
  const mid = `hsl(${hue} 32% 38%)`;
  const light = `hsl(${hue} 28% 62%)`;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={title ?? `Textile texture in hue ${hue}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={mid} />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={light} stopOpacity="0.85" />
        </linearGradient>
        <pattern id={`w-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={`url(#g-${id})`} />
          {pattern === "weave" || pattern === "pile" ? (
            <>
              <rect x="0" y="0" width="7" height="7" fill="#C9A86A" opacity="0.28" />
              <rect x="7" y="7" width="7" height="7" fill="#ffffff" opacity="0.12" />
            </>
          ) : null}
          {pattern === "emboss" ? (
            <>
              <ellipse cx="7" cy="7" rx="5" ry="3.4" fill="none" stroke="#C9A86A" strokeWidth="1.1" opacity="0.7" />
              <ellipse cx="7" cy="7" rx="2.4" ry="1.5" fill="#ffffff" opacity="0.18" />
            </>
          ) : null}
          {pattern === "print" ? (
            <>
              <circle cx="3.5" cy="3.5" r="2" fill="#C9A86A" opacity="0.55" />
              <circle cx="10.5" cy="10.5" r="2" fill="#ffffff" opacity="0.3" />
              <path d="M7 0 L14 7 L7 14 L0 7 Z" fill="none" stroke="#0A192F" strokeWidth="0.6" opacity="0.5" />
            </>
          ) : null}
          {pattern === "tuft" ? (
            <>
              <circle cx="4" cy="4" r="2.6" fill="#C9A86A" opacity="0.5" />
              <circle cx="10" cy="10" r="2.6" fill="#ffffff" opacity="0.25" />
              <circle cx="10" cy="4" r="1.2" fill="#0A192F" opacity="0.4" />
              <circle cx="4" cy="10" r="1.2" fill="#0A192F" opacity="0.4" />
            </>
          ) : null}
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#w-${id})`} />
      <rect width="400" height="300" fill="black" opacity="0.08" />
      {/* sheen */}
      <polygon points="0,0 150,0 40,300 0,300" fill="#ffffff" opacity="0.07" />
      <polygon points="200,0 260,0 150,300 110,300" fill="#C9A86A" opacity="0.12" />
    </svg>
  );
}

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 700"
      className={className}
      role="img"
      aria-label="Layered luxury textile weaves in navy and gold"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#112240" />
          <stop offset="60%" stopColor="#0A192F" />
          <stop offset="100%" stopColor="#060F1D" />
        </linearGradient>
        <pattern id="hero-weave" width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill="none" />
          <rect x="0" y="0" width="11" height="11" fill="#C9A86A" opacity="0.16" />
          <rect x="11" y="11" width="11" height="11" fill="#ffffff" opacity="0.06" />
        </pattern>
        <pattern id="hero-tuft" width="46" height="46" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="7" fill="#C9A86A" opacity="0.35" />
          <circle cx="34" cy="34" r="7" fill="#9db4d0" opacity="0.25" />
          <circle cx="34" cy="12" r="3" fill="#FAF8F3" opacity="0.3" />
          <circle cx="12" cy="34" r="3" fill="#FAF8F3" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="600" height="700" fill="url(#hero-bg)" />
      <rect width="600" height="700" fill="url(#hero-weave)" />
      <rect x="60" y="60" width="480" height="260" rx="6" fill="url(#hero-tuft)" opacity="0.9" />
      <rect x="60" y="60" width="480" height="260" rx="6" fill="none" stroke="#C9A86A" strokeWidth="1.5" opacity="0.8" />
      <rect x="60" y="350" width="225" height="290" rx="6" fill="#1B3252" />
      <rect x="60" y="350" width="225" height="290" rx="6" fill="url(#hero-weave)" />
      <rect x="315" y="350" width="225" height="290" rx="6" fill="#274268" />
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse key={i} cx={427} cy={390 + i * 28} rx={80 - i * 4} ry={10} fill="none" stroke="#C9A86A" strokeWidth="1.4" opacity={0.75 - i * 0.06} />
      ))}
      <polygon points="0,0 220,0 60,700 0,700" fill="#ffffff" opacity="0.05" />
      <text x="80" y="120" fill="#FAF8F3" fontFamily="Playfair Display, serif" fontSize="30" opacity="0.9">Atelier</text>
      <text x="80" y="150" fill="#C9A86A" fontFamily="Inter, sans-serif" fontSize="13" letterSpacing="4">HAND-TUFTED · 2026</text>
    </svg>
  );
}
