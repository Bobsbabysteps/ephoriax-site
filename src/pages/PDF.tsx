// src/pages/PDF.tsx
import { Link } from "react-router-dom";

function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {children}
    </a>
  );
}

export default function PDF() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ===== Top bar (simple back to Home) ===== */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            ← EphoriaX Home
          </Link>
          <div className="hidden md:block">
            <CTAButton href="#request-access">Request Access</CTAButton>
          </div>
        </div>
      </header>

      {/* ===== Hero (aligned to platform) ===== */}
      <section
  className="relative isolate"
  style={{
    backgroundImage: "url('/bridge.jpg'), linear-gradient(to right, #1e3a8a, #9333ea)", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "overlay", // blends the gradient with the image
  }}
>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            {/* Platform-aligned headline/subhead */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              The bridge between complexity and confidence
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-indigo-100">
              A data integrity and efficiency platform that transforms information into insight.
            </p>

            {/* Product positioning sentence */}
            <p className="mt-5 max-w-xl text-slate-100">
              <span className="font-semibold">Property Data Finder</span> brings clean, auditable
              property intelligence—permits, history, hazards—together in seconds, so you can act
              with confidence.
            </p>

            <div className="mt-8 flex gap-3">
              <CTAButton href="#request-access">Request Access</CTAButton>
              <a
                href="/EphoriaX_Beta_Signup.pdf"
                className="inline-flex items-center justify-center rounded-xl border border-white/70 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                download
              >
                One-pager PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Value bullets ===== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Integrity",
              b: "Traceable sources, transparent lineage for every field.",
            },
            {
              t: "Efficiency",
              b: "Compress hours of searching into minutes with focused queries.",
            },
            {
              t: "Clarity",
              b: "Normalized fields and plain-language context you can defend.",
            },
            {
              t: "Workflow-ready",
              b: "Exports and webhooks for n8n/Make or custom automations.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{c.t}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How it works (brief) ===== */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-3">
          {[
            {
              step: "1",
              t: "Search",
              b: "Enter an address, parcel, or APN. PDF locates and reconciles sources.",
            },
            {
              step: "2",
              t: "Verify",
              b: "Review normalized results with source links and timestamps.",
            },
            {
              step: "3",
              t: "Act",
              b: "Copy, export, or send downstream via webhook to your workflow.",
            },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="text-indigo-600 text-sm font-semibold">Step {s.step}</div>
              <h4 className="mt-1 text-lg font-semibold text-slate-900">{s.t}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="request-access" className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <h3 className="text-2xl font-semibold text-slate-900">Request private beta access</h3>
        <p className="mt-2 text-slate-600">
          Be first to try Property Data Finder and help shape the roadmap.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <CTAButton href="mailto:beta@ephoriax.com">Email beta@ephoriax.com</CTAButton>
          <a
            href="/EphoriaX_Beta_Signup.pdf"
            className="inline-flex items-center justify-center rounded-xl ring-1 ring-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            download
          >
            Download one-pager
          </a>
        </div>
      </section>

      {/* ===== Footer (light) ===== */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex items-center justify-between text-sm text-slate-600">
          <p>© {new Date().getFullYear()} EphoriaX</p>
          <a className="hover:text-slate-800" href="mailto:hello@ephoriax.com">
            hello@ephoriax.com
          </a>
        </div>
      </footer>
    </div>
  );
}