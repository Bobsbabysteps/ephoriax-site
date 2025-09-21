// src/pages/EphoriaXHome.tsx

type CardProps = { title: string; body: string; className?: string };
function Card({ title, body, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className="text-sm font-semibold tracking-wider text-indigo-600">{eyebrow}</p>}
      <h2 className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-lg leading-8 text-gray-600">{copy}</p>}
    </div>
  );
}

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

export default function EphoriaXHome() {
  const benefits: CardProps[] = [
    { title: "Precision", body: "Clean, normalized data built for underwriting and inspection work." },
    { title: "Speed", body: "Answer property questions in seconds, not hours." },
    { title: "Transparency", body: "Trace sources and see exactly how we arrived at a result." },
    { title: "Built for Pros", body: "Field-tested workflows that respect expert judgment." },
  ];

  const products: CardProps[] = [
    {
      title: "Property Data Finder (PDF)",
      body: "Fast, accurate property insights—permits, history, hazards—tailored for inspection and underwriting teams.",
    },
    {
      title: "InsightHub (Coming Soon)",
      body: "Cross-dataset exploration and dashboards for decision support.",
    },
    {
      title: "RiskLens",
      body: "Hazard scoring and what-if analysis for portfolios.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ===== Top Nav ===== */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="text-xl font-semibold tracking-tight">EphoriaX Main</div>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#products" className="hover:text-slate-900">Products</a>
            <a href="#why" className="hover:text-slate-900">Why EphoriaX</a>
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
          <div className="hidden md:block">
            <CTAButton href="#beta">Join Beta</CTAButton>
          </div>
        </div>
      </header>

      {/* ===== Hero with bridge image ===== */}
      <section
        className="relative isolate"
        style={{
          backgroundImage: "url('/bridge.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/55" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-indigo-300">EphoriaX Platform</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Professional property intelligence—built for expert judgment
            </h1>
            <p className="mt-4 max-w-xl text-slate-100">
              EphoriaX is the umbrella for a growing suite of field-tested tools. Our flagship,
              <span className="font-semibold"> Property Data Finder (PDF)</span>, delivers clean, auditable answers in seconds.
            </p>
            <div className="mt-8 flex gap-3">
              <CTAButton href="#products">Explore Products</CTAButton>
              <a
                href="#beta"
                className="inline-flex items-center justify-center rounded-xl border border-white/70 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Request Access
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why / Benefits ===== */}
      <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <Card key={b.title} title={b.title} body={b.body} />
          ))}
        </div>
      </section>

      {/* ===== Products ===== */}
      <section id="products" className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Products"
            title="A growing family of tools under one platform."
            copy=""
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Card key={p.title} title={p.title} body={p.body} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <CTAButton href="#beta">Request Access</CTAButton>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="About EphoriaX"
          title="Built with inspectors and underwriters"
          copy="We build professional data tools that respect expert judgment. Platform-first: shared identity, security, and UX across products—transparent sources, auditable outputs, and workflow-ready (n8n, Make, custom)."
        />
      </section>

      {/* ===== Contact / CTA ===== */}
      <section id="beta" className="bg-indigo-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h3 className="text-2xl font-semibold text-slate-900">Join the private beta</h3>
          <p className="mt-2 text-slate-600">
            Get early access to Property Data Finder and the EphoriaX platform updates.
          </p>
          <div className="mt-6 flex justify-center">
            <CTAButton href="mailto:beta@ephoriax.com">Request an Invite</CTAButton>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer id="contact" className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} EphoriaX</p>
          <div className="text-sm text-slate-500">
            <a className="hover:text-slate-700" href="mailto:hello@ephoriax.com">hello@ephoriax.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}