"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";
import { EXPORT_EMAIL, LEAD_MODE, withBase } from "@/lib/site";
import { Reveal, SectionHeading } from "./ui";

const inputCls =
  "w-full border border-navy-900/15 bg-transparent px-4 py-3 text-sm placeholder:text-navy-900/40 focus:border-gold-400 focus:outline-none dark:border-ivory-50/15 dark:placeholder:text-ivory-100/40";

function useLeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot spam trap
    if (data.get("company_website")) {
      setState("done");
      return;
    }
    const fields = Object.fromEntries(data.entries());
    if (LEAD_MODE === "mailto") {
      // Static-host mode: compose a prefilled email to the export desk.
      const subject = encodeURIComponent(
        `Export inquiry — ${String(fields.company || fields.name || "new lead")}`,
      );
      const body = encodeURIComponent(
        Object.entries(fields)
          .filter(([k, v]) => k !== "company_website" && !(v instanceof File) && String(v).trim())
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n"),
      );
      window.location.href = `mailto:${EXPORT_EMAIL}?subject=${subject}&body=${body}`;
      setState("done");
      return;
    }
    setState("sending");
    // Server capture (Vercel/self-hosted): POST to /api/leads.
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };
  return { state, submit };
}

export function CatalogDownload({ locale }: { locale: Locale }) {
  const { state, submit } = useLeadForm();
  return (
    <section id="catalog" aria-label="Catalog download" className="bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow="Lead-gated"
            title={t(locale, "catalog.title")}
            body={t(locale, "catalog.sub")}
          />
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Full 120-page PDF with specs, GSM and wash-care",
              "Tiered export pricing + MOQ schedules",
              "OEKO-TEX, SEDEX & GOTS document pack",
              "Delivered by email + CRM-tracked follow-up",
            ].map((li) => (
              <li key={li} className="flex gap-3">
                <span aria-hidden="true" className="font-bold text-gold-400">✓</span>
                <span className="text-ivory-100/80">{li}</span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="border border-gold-400/30 bg-white/[0.04] p-6 sm:p-8">
          {state === "done" ? (
            <div role="status" className="py-10 text-center">
              <p className="font-display text-3xl text-gold-300">Catalog on its way</p>
              <p className="mt-3 text-sm text-ivory-100/75">
                Check your inbox for the PDF download link. Our export desk follows up within one business day.
              </p>
              <a
                href={withBase("/catalog/hadloom-export-catalog.pdf")}
                download
                className="mt-6 inline-block rounded-lg bg-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-navy-950 hover:bg-gold-300"
              >
                Download PDF now
              </a>
            </div>
          ) : (
            <form onSubmit={submit} aria-label="Catalog request form" className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cd-name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory-100/70">Full name *</label>
                <input id="cd-name" name="name" required autoComplete="name" placeholder="Ava Sharma" className={`${inputCls} border-ivory-50/20 text-ivory-50`} />
              </div>
              <div>
                <label htmlFor="cd-company" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory-100/70">Company *</label>
                <input id="cd-company" name="company" required autoComplete="organization" placeholder="Nordic Home Ltd" className={`${inputCls} border-ivory-50/20 text-ivory-50`} />
              </div>
              <div>
                <label htmlFor="cd-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory-100/70">Business email *</label>
                <input id="cd-email" name="email" type="email" required autoComplete="email" placeholder="buyer@company.com" className={`${inputCls} border-ivory-50/20 text-ivory-50`} />
              </div>
              <div>
                <label htmlFor="cd-phone" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory-100/70">Phone</label>
                <input id="cd-phone" name="phone" type="tel" autoComplete="tel" placeholder="+44 …" className={`${inputCls} border-ivory-50/20 text-ivory-50`} />
              </div>
              <div>
                <label htmlFor="cd-country" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory-100/70">Country *</label>
                <input id="cd-country" name="country" required autoComplete="country-name" placeholder="United Kingdom" className={`${inputCls} border-ivory-50/20 text-ivory-50`} />
              </div>
              <div>
                <label htmlFor="cd-interest" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-ivory-100/70">Product interest *</label>
                <select id="cd-interest" name="interest" required className={`${inputCls} border-ivory-50/20 bg-navy-950 text-ivory-50`} defaultValue="Mink Blankets">
                  {["Mink Blankets", "Hand-Tufted Rugs", "Premium Carpets", "Full Range"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              {/* honeypot */}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              {state === "error" && (
                <p role="alert" className="text-sm text-red-300 sm:col-span-2">
                  Something went wrong. Please email export@hadloom.example directly.
                </p>
              )}
              <button
                type="submit"
                disabled={state === "sending"}
                className="bg-gold-400 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60 sm:col-span-2"
              >
                {state === "sending" ? "Sending…" : t(locale, "catalog.submit")}
              </button>
              <p className="text-[11px] leading-relaxed text-ivory-100/50 sm:col-span-2">
                By submitting you agree to be contacted about trade programs. HubSpot / Zoho / Salesforce-ready lead capture.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20" role="status">Loading inquiry form…</div>}>
      <ContactForm locale={locale} />
    </Suspense>
  );
}

function ContactForm({ locale }: { locale: Locale }) {
  const { state, submit } = useLeadForm();
  const product = useSearchParams().get("product") ?? undefined;
  return (
    <section aria-label="Contact form" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="RFQ"
        title={t(locale, "contact.title")}
        body="International sourcing workflow: tell us volumes and specs — the export desk replies with quotation, lab-dips timeline and shipment plan."
      />
      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <Reveal className="space-y-5 text-sm">
          <div className="border border-gold-400/40 p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest2 text-gold-500">Export desk</h3>
            <p className="mt-2">export@hadloom.example<br />+91 123 456 7890 (Mon–Sat, IST)</p>
            <a
              href="https://wa.me/911234567890?text=Hello%20Hadloom%20export%20team"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg bg-navy-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ivory-50 hover:bg-gold-500 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950"
            >
              WhatsApp Business
            </a>
          </div>
          <div className="border border-navy-900/10 p-5 dark:border-ivory-50/10">
            <h3 className="text-xs font-bold uppercase tracking-widest2 text-gold-500">Global offices</h3>
            <p className="mt-2 leading-relaxed opacity-75">
              Panipat (HQ & Mill) · Dubai (MENA desk) · Hamburg (EU liaison)
            </p>
          </div>
          <div className="border border-navy-900/10 p-5 dark:border-ivory-50/10">
            <h3 className="text-xs font-bold uppercase tracking-widest2 text-gold-500">Response SLA</h3>
            <p className="mt-2 leading-relaxed opacity-75">Quotation in 48h · Lab-dips in 7 days · PP samples in 12 days.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2">
          {state === "done" ? (
            <div role="status" className="border border-gold-400/50 p-10 text-center">
              <p className="font-display text-3xl font-bold">RFQ received</p>
              <p className="mt-3 text-sm opacity-70">Reference ID: HL-{new Date().getFullYear()}-RFQ. Our team replies within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} aria-label="Export inquiry form" className="grid gap-4 border border-navy-900/10 p-6 sm:grid-cols-2 sm:p-8 dark:border-ivory-50/10">
              <div>
                <label htmlFor="c-company" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Company name *</label>
                <input id="c-company" name="company" required autoComplete="organization" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-person" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Contact person *</label>
                <input id="c-person" name="name" required autoComplete="name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Business email *</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-phone" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Phone</label>
                <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-country" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Country *</label>
                <input id="c-country" name="country" required autoComplete="country-name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="c-interest" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Product interest *</label>
                <input id="c-interest" name="interest" required defaultValue={product ?? ""} placeholder="e.g. Embossed mink blankets" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-volume" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Annual requirement</label>
                <select id="c-volume" name="volume" className={inputCls} defaultValue="10k – 50k units">
                  {["< 10k units", "10k – 50k units", "50k – 200k units", "200k+ units"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-msg" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Message *</label>
                <textarea id="c-msg" name="message" required rows={5} placeholder="Specs, target prices, delivery ports, timelines…" className={inputCls} />
              </div>
              {LEAD_MODE === "api" && (
                <div className="sm:col-span-2">
                  <label htmlFor="c-file" className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-70">Tech pack / artwork (PDF, PNG)</label>
                  <input id="c-file" name="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg" className="text-sm" />
                </div>
              )}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              {state === "error" && (
                <p role="alert" className="text-sm text-red-600 sm:col-span-2">Submission failed — please email export@hadloom.example.</p>
              )}
              <button
                type="submit"
                disabled={state === "sending"}
                className="bg-navy-900 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ivory-50 hover:bg-gold-500 hover:text-navy-950 disabled:opacity-60 sm:col-span-2 dark:bg-gold-400 dark:text-navy-950 dark:hover:bg-gold-300"
              >
                {state === "sending" ? "Sending…" : t(locale, "contact.submit")}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
