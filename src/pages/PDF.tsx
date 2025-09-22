// src/pages/PDF.tsx
export default function PDF() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header (simple) */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="text-xl font-semibold tracking-tight">EphoriaX · PDF</div>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="/" className="hover:text-slate-900">Home</a>
            <a href="/pdf" className="hover:text-slate-900">PDF</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 bg-slate-900/55" />
        <div
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28"
          style={{
            backgroundImage: "url('/bridge.jpg')", // ensure /public/bridge.jpg exists
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-2xl">
            <p className="text-indigo-300">Property Data Finder</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              The Data Integrity and Efficiency Platform for property risk
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
               PDF is your <span className="font-semibold">data integrity & efficiency platform</span> — delivering fast, reliable property insights for inspection and underwriting teams.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="mailto:beta@ephoriax.com"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Join Private Beta
              </a>
              <a
                href="#whats-inside"
                className="inline-flex items-center justify-center rounded-xl border border-white/70 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                See what’s inside
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What’s inside */}
      <section id="whats-inside" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Feature title="Authoritative Data" body="Pulled from trusted public records and verified sources." />
          <Feature title="Built for Insurance & Risk" body="Tailored outputs for inspections, underwriting, and portfolio review." />
          <Feature title="Speed & Scale" body="Go from hours of research to seconds of answers." />
          <Feature title="Transparent Results" body="Every insight traceable back to its source." />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h3 className="text-2xl font-semibold text-slate-900">Be the first to cross the bridge</h3>
          <p className="mt-2 text-slate-600">
            Join our private beta and see how PDF transforms inspections and underwriting.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="mailto:beta@ephoriax.com"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Request access
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}