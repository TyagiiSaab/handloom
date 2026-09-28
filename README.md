# Hadloom — Premium Home Textile Export Portfolio

Enterprise-grade multi-page B2B export website for a global home textile manufacturer.
Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · Dark/Light themes.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000 (redirects to /en)
npm run build && npm start
```

Static export for GitHub Pages is tested with:

```bash
$env:STATIC_EXPORT="1"; $env:PAGES_BASE_PATH="/handloom"; $env:NEXT_PUBLIC_BASE_PATH="/handloom"; $env:NEXT_PUBLIC_LEAD_MODE="mailto"; npm run build
# output in ./out
```

Lead capture has two modes: `api` (POST to a server route — Vercel/self-hosted;
see git history for the reference `/api/leads` implementation with validation,
rate limiting and CRM fan-out) and `mailto` (static hosts: composes a prefilled
email to the export desk). Set via `NEXT_PUBLIC_LEAD_MODE`.

> **Note (this machine):** Node 24's bundled OpenSSL fails TLS handshakes here, so plain
> `npm install` against `https://registry.npmjs.org` errors with
> `ERR_SSL_CIPHER_OPERATION_FAILED`. Two workarounds:
>
> 1. `python C:/Users/DELL/AppData/Local/Temp/opencode/npm-proxy2.py` (serves
>    `http://127.0.0.1:4874` with a disk cache), then
>    `npm install --registry http://127.0.0.1:4874`.
> 2. Use Node 20 LTS, whose OpenSSL is unaffected.

## Routes (× 5 locales: en, fr, de, es, ar + RTL)

| Route | Content |
|---|---|
| `/:locale` | Hero, heritage + KPI counters, product catalog preview, facility, export map, certifications, sustainability, testimonials, catalog gate, buyer portal, contact |
| `/:locale/products` | Full filterable catalog + quick-view modal |
| `/:locale/about` | Heritage timeline + metrics |
| `/:locale/manufacturing` | Facility showcase + capacity stats |
| `/:locale/global-reach` | Interactive export map (10 markets, hover cards) |
| `/:locale/certifications` | ISO 9001, OEKO-TEX, SEDEX, BSCI, GOTS + ESG |
| `/:locale/buyer-portal` | B2B dashboard mock + login/registration + SSO buttons |
| `/:locale/contact` | RFQ form (file upload), catalog gate, WhatsApp integration |
| `/api/leads` | (Server deploys only) Validated, rate-limited lead capture, CRM-ready (HubSpot/Zoho/Salesforce). Static builds use mailto mode. |

## Photography

Product and facility photos in `public/images/` are freely-licensed images from
Wikimedia Commons contributors (CC BY / CC BY-SA / public domain), individually
reviewed for topical fit. Before commercial launch, verify each file's license
page and add attribution where required. Swap any file by overwriting it —
`ProductImage` (next/image, AVIF/WebP, lazy) picks it up automatically.
`components/TextileArt.tsx` remains as an offline generative-texture fallback.

## Production checklist

- [ ] Drop real footage at `public/videos/mill.mp4` (hero `<video>` already wired: autoplay/muted/loop/poster).
- [ ] Add `public/catalog/hadloom-export-catalog.pdf`.
- [ ] Set CRM tokens and re-add server capture (`git log` has the reference `/api/leads`
  implementation) when deploying to Vercel/self-hosted instead of Pages.
- [ ] Configure OAuth (Google/Microsoft) + email OTP for the buyer portal.
- [ ] Point `metadataBase` + sitemap/robots at the real domain.
- [ ] Add Mapbox token if upgrading the SVG export map to Mapbox GL.
