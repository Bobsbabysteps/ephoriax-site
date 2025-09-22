// src/pages/PDF.tsx
export default function PDF() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="text-xl font-semibold tracking-tight">EphoriaX · PDF</div>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="/" className="hover:text-slate-900">Home</a>
            <a href="/pdf" className="hover:text-slate-900">PDF</a>
          </nav>
        </div>
      </header>

      <section className="relative isolate">
        <div className="absolute inset-0 bg-slate-900/55" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 bg-[url('/bridge.jpg')] bg-cover bg-center">
          <div className="max-w-2xl">
            <p className="text-indigo-300">Property Data Finder</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Property Data Finder (PDF)
            </h1>
            <p className="mt-4 max-w-xl text-slate-100">
              Fast, accurate property insights—permits, history, hazards—tailored for inspection and underwriting teams.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">What’s inside</h2>
          <ul className="mt-3 list-disc pl-5 text-slate-700">
            <li>Permits & history</li>
            <li>Hazards & risk overlays</li>
            <li>Auditable sources & traceability</li>
          </ul>
        </div>
      </section>
    </div>
  );
}