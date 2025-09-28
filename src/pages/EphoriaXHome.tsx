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
  { title: "Satisfaction", body: "No more endless digging. EphoriaX delivers clarity and confidence in seconds—helping you reach your goals and enjoy the results of smarter work." 
}
];

const products: CardProps[] = [
  {
    title: "Property Data Finder (PDF)",
    body:
      "The Data Integrity & Efficiency Platform for property decisions. Surface permits, history, and hazards in seconds.",
    // add a future link target (we won’t use it yet)
    // @ts-expect-error – extend CardProps later
    link: "/pdf",
  },
  {
    title: "InsightHub (Coming Soon)",
    body:
      "Cross-dataset dashboards for smarter decisions. Correlate, explore, and share."
  },
  {
    title: "RiskLens",
    body:
      "Hazard scoring and what-if analysis for portfolios."
  },
];

// LAYOUT (Products section)
<section id="products" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
  <SectionHeading
    eyebrow="Explore Products"
    title="Professional tools that bridge complexity to clarity"
    copy="Each tool is built on the same platform principles—integrity, efficiency, and results you can trust."
  />
  <div className="mt-8 grid gap-6 sm:grid-cols-2">
    {products.map((p) => (
      <div
        key={p.title}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow hover:shadow-md transition-shadow"
        // wire later; for now this is a harmless stub:
        data-link={(p as any).link ?? undefined}
      >
        <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{p.body}</p>
      </div>
    ))}
  </div>
</section>
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
        // looks good even if /bridge.jpg is missing
        backgroundImage:
          "url('/bridge.jpg'), linear-gradient(to right, #1e3a8a, #9333ea)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/55" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
        {/* Center the content block and control line-length */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-indigo-300">EphoriaX Platform</p>

          {/* Responsive H1 sizes */}
          <h1 className="mt-3 font-bold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl">
            The bridge between complexity and clarity
          </h1>

          {/* Body text: comfortable line-length + responsive sizes/leading */}
          <p className="mt-5 text-slate-100 text-base sm:text-lg leading-7 sm:leading-8">
            We do the sifting and searching for the data that matters, delivering
            the knowledge you need to learn, understand, and make confident
            decisions — in seconds, not hours.
          </p>

          {/* Buttons: center on all screens; stack on small screens */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
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

// --- About section (renamed to avoid collisions) ---
function AboutSection(): JSX.Element {
  return (

    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading
        eyebrow="About EphoriaX"
        title="Built to turn complexity into clarity"
        copy="We create focused tools that do the heavy lifting—sifting, connecting, and translating data so you can decide with confidence."
      />

      {/* Testimonials */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <blockquote className="rounded-xl bg-white p-6 shadow">
          <p className="text-slate-700">
            “EphoriaX cut my research time from hours to minutes. The clarity it
            delivers is unmatched.”
          </p>
          <footer className="mt-4 text-sm text-slate-500">— Beta tester, Risk Analyst</footer>
        </blockquote>

        <blockquote className="rounded-xl bg-white p-6 shadow">
          <p className="text-slate-700">
            “The platform doesn’t just save time—it gives me confidence that I’m
            making the right call.”
          </p>
          <footer className="mt-4 text-sm text-slate-500">— Underwriting Manager</footer>
        </blockquote>
      </div>


    </section>
  );  // <-- close the return ( ... )
}      // <-- close function About()
 

// --- Home Beta CTA (keeps Explore Products) ---
function BetaCTA() {
  return (
    <section id="beta" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-[1px]">
        <div className="rounded-2xl bg-white px-6 py-10 sm:px-10">
          <h3 className="text-2xl font-semibold text-slate-900">
            Join the private beta
          </h3>
          <p className="mt-3 max-w-2xl text-slate-600">
            Get early access to Property Data Finder and platform updates. We’ll
            notify you as new tools go live.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="mailto:hello@ephoriax.com?subject=Request%20Beta%20Access"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Request Access
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Explore Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} EphoriaX — Bridging the gap.
          </p>
          <nav className="flex gap-5 text-sm">
            <a href="#products" className="hover:text-slate-900 text-slate-600">
              Products
            </a>
            <a href="#why" className="hover:text-slate-900 text-slate-600">
              Why EphoriaX
            </a>
            <a href="#about" className="hover:text-slate-900 text-slate-600">
              About
            </a>
            <a href="mailto:hello@ephoriax.com" className="hover:text-slate-900 text-slate-600">
              Contact
            </a>
          </nav>
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
      <AboutSection />

      {/* =========================== CTA / BETA ========================== */}
      <BetaCTA />

      {/* ============================== FOOTER =========================== */}
      <Footer />
    </div>
  );
}