// src/pages/EphoriaXHome.tsx
// ============================================================================
// EphoriaX Home
// Unified button system using <Button> component for consistent design
// ============================================================================

import { Link } from "react-router-dom";
import Button from "../components/Button.js"; 
import { useLocation } from "react-router-dom";
// ===== Types ================================================================
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

// ===== Reusable Components ==================================================
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

// ===== Data ================================================================
const pillars: CardProps[] = [
  { title: "Integrity", body: "Traceable sources, transparent logic." },
  { title: "Efficiency", body: "Hours of searching compressed to minutes." },
  { title: "Clarity", body: "Answers you can act on—and defend." },
  {
    title: "Satisfaction",
    body:
      "No more endless digging. EphoriaX delivers clarity and confidence in seconds—helping you reach your goals and enjoy the results of smarter work.",
  },
];

// ===== Layout Sections ======================================================
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

          const location = useLocation();

          {location.pathname === "/pdf" && (
            <a
              href="https://ephoriax.kit.com/b0ab7abf0b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Join Beta</Button>
            </a>
          )}
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
        backgroundImage: "url('/bridge.jpg'), linear-gradient(to right, #1e3a8a, #9333ea)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/55" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-indigo-300">EphoriaX Platform</p>

          <h1 className="mt-3 font-bold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl">
            The bridge between complexity and clarity
          </h1>

          <p className="mt-5 text-slate-100 text-base sm:text-lg leading-7 sm:leading-8">
            We do the sifting and searching for the data that matters, delivering
            the knowledge you need to learn, understand, and make confident
            decisions — in seconds, not hours.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#products">
              <Button>Explore Products</Button>
            </a>
            <a
              href="https://ephoriax.kit.com/b0ab7abf0b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Request Information</Button>
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
        <SectionHeading
          eyebrow="Products"
          title="A growing family of tools under one platform."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/pdf"
            className="rounded-2xl border border-slate-200 bg-white block hover:shadow-lg hover:-translate-y-1 hover:bg-slate-50 transition-all duration-300 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Property Data Finder (PDF)
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              The Data Integrity & Efficiency Platform for property professionals.
            </p>
          </a>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-70">
            <h3 className="text-lg font-semibold text-slate-900">
              InsightHub (Coming Soon)
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cross-dataset dashboards for smarter decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-70">
            <h3 className="text-lg font-semibold text-slate-900">RiskLens</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Hazard scoring and what-if analysis for portfolios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <SectionHeading
        eyebrow="About EphoriaX"
        title="Built to turn complexity into clarity"
        copy="We create focused tools that do the heavy lifting—sifting, connecting, and translating data into decisions."
      />
    </section>
  );
}

function BetaCTA() {
  return (
    <section id="beta" className="bg-indigo-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <p className="text-sm font-semibold tracking-wider text-indigo-600">
          Private Beta Enrollment
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
          Join now to lock in your access
        </h3>
        <p className="mt-2 text-slate-600">
          A short window to help shape PDF. Early testers get priority and a
          preferred launch plan.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="https://ephoriax.kit.com/b0ab7abf0b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Join Beta</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} EphoriaX
        </p>
        <div className="text-sm text-slate-500">
          <a className="hover:text-slate-700" href="mailto:hello@ephoriax.com">
            hello@ephoriax.com
          </a>
        </div>
      </div>
    </footer>
  );
}

// ===== Page Export ==========================================================
export default function EphoriaXHome() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <Hero />
      <WhyPillars />
      <Products />
      <AboutSection />
      <BetaCTA />
      <Footer />
    </div>
  );
}