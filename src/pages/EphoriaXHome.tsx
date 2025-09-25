// src/pages/EphoriaXHome.tsx
// ============================================================================
// EphoriaX Home
// Structured with small, focused subcomponents + clear regions you can fold.
// Tailwind classes kept consistent across sections.
// ============================================================================


// ===== Types =================================================================
type CardProps = {
  title: string;
  body: string;
  className?: string;
};

type HeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  className?: string;
};

// ===== Shared UI Primitives ==================================================
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

function Card({ title, body, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, className = "" }: HeadingProps) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {eyebrow && <p className="text-sm font-semibold tracking-wider text-indigo-600">{eyebrow}</p>}
      <h2 className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-lg leading-8 text-gray-600">{copy}</p>}
    </div>
  );
}

// #region DATA ----------------------------------------------------------------
const pillars: CardProps[] = [
  { title: "Integrity", body: "Traceable sources, transparent logic." },
  { title: "Efficiency", body: "Hours of searching compressed to minutes." },
  { title: "Clarity", body: "Answers you can act on—and defend." },
  { title: "Built for Pros", body: "Workflows designed for inspectors & underwriters." },
];

const products: CardProps[] = [
  {
    title: "Property Data Finder (PDF)",
    body: "The Data Integrity & Efficiency Platform for property decisions.",
  },
  {
    title: "InsightHub (Coming Soon)",
    body: "Cross-dataset dashboards for smarter decisions.",
  },
  {
    title: "RiskLens",
    body: "Hazard scoring and what-if analysis for portfolios.",
  },
];
// #endregion DATA -------------------------------------------------------------

// #region LAYOUT SECTIONS -----------------------------------------------------
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold tracking-tight">EphoriaX</div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#products" className="hover:text-slate-900">
            Products
          </a>
          <a href="#why" className="hover:text-slate-900">
            Why EphoriaX
          </a>
          <a href="#about" className="hover:text-slate-900">
            About
          </a>
          <a href="#contact" className="hover:text-slate-900">
            Contact
          </a>
        </nav>

        <div className="hidden md:block">
          <CTAButton href="#beta">Join Beta</CTAButton>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="relative isolate"
      style={{
        // Shows image if present; looks good with just gradient too
        backgroundImage: "url('/bridge.jpg'), linear-gradient(to right, #1e3a8a, #9333ea)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-slate-900/55" />

      {/* content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28">
        <div className="max-w-2xl">
          {/* Platform tag (optional) */}
          <p className="text-indigo-300">EphoriaX Platform</p>

          {/* H1 */}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The bridge between complexity and clarity
          </h1>

          {/* H2 — Full */}
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-100">
            We do the sifting and searching for the data that matters, delivering the knowledge you
            need to learn, understand, and make confident decisions — in seconds, not hours.
          </p>

          {/*
          // H2 — Micro (swap to this if you want a shorter line)
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-100">
            We surface the data that matters, giving you clarity and confidence in seconds — not hours.
          </p>
          */}

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
  );
}

function WhyPillars() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p) => (
          <Card key={p.title} title={p.title} body={p.body} />
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading eyebrow="Products" title="A growing family of tools under one platform." />
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
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <SectionHeading
        eyebrow="About EphoriaX"
        title="Built with inspectors and underwriters"
        copy="We build professional data tools that respect expert judgment. Platform-first:
              shared identity, security, and UX across products—transparent sources,
              auditable outputs, and workflow-ready (n8n, Make, custom)."
      />
    </section>
  );
}

function BetaCTA() {
  return (
    <section id="beta" className="bg-indigo-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <h3 className="text-2xl font-semibold text-slate-900">Join the private beta</h3>
        <p className="mt-2 text-slate-600">
          Get early access to Property Data Finder and the EphoriaX platform updates.
        </p>
        <div className="mt-6 flex justify-center">
          <CTAButton href="mailto:beta@ephoriax.com">Request an Invite</CTAButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} EphoriaX</p>
        <div className="text-sm text-slate-500">
          <a className="hover:text-slate-700" href="mailto:hello@ephoriax.com">
            hello@ephoriax.com
          </a>
        </div>
      </div>
    </footer>
  );
}
// #endregion LAYOUT SECTIONS --------------------------------------------------

// ===== Page Export ===========================================================
export default function EphoriaXHome() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ============================ TOP NAV ============================ */}
      <Header />

      {/* ============================ HERO =============================== */}
      <Hero />

      {/* ====================== WHY / VALUE PILLARS ====================== */}
      <WhyPillars />

      {/* ============================ PRODUCTS =========================== */}
      <Products />

      {/* ============================== ABOUT ============================ */}
      <About />

      {/* =========================== CTA / BETA ========================== */}
      <BetaCTA />

      {/* ============================== FOOTER =========================== */}
      <Footer />
    </div>
  );
}