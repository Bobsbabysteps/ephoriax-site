// src/pages/EphoriaXHome.tsx
// ============================================================================
// EphoriaX Home
// Unified layout and styling consistent with the PDF page
// Gradient + motion enhancements applied
// ============================================================================

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button.js";

// ===== Types ================================================================
type CardProps = {
  title: string;
  body: string;
  className?: string;
};

// ===== Reusable Components ==================================================
function Card({ title, body, className = "" }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm leading-6">{body}</p>
    </motion.div>
  );
}

// ===== Sections =============================================================

// 🟣 HERO SECTION -------------------------------------------------------------
function Hero() {
  return (
    <motion.section
      className="relative isolate text-center text-white py-24 sm:py-32"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(67,56,202,0.9) 0%, rgba(99,102,241,0.85) 50%, rgba(165,180,252,0.9) 100%), url('/bridge.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-indigo-200 uppercase tracking-wide font-semibold">
          EphoriaX Platform
        </p>

        <h1 className="mt-3 font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl drop-shadow-lg">
          Turning Complexity into Clarity
        </h1>

        <p className="mt-5 text-indigo-100 text-base sm:text-lg leading-7 sm:leading-8">
          We handle the searching, filtering, and comparison work for you —
          finding the most accurate and relevant data, instantly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#products">
            <Button>Explore Tools</Button>
          </a>
          <a
            href="https://ephoriax.kit.com/b0ab7abf0b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
              Request Access
            </Button>
          </a>
        </div>
      </div>
    </motion.section>
  );
}

// ⚙️ WHY PILLARS -------------------------------------------------------------
function WhyPillars() {
  const pillars: CardProps[] = [
    {
      title: "Speed",
      body: "Search dozens of assessor and planning databases instantly for the property you need.",
    },
    {
      title: "Accuracy",
      body: "We collect, compare, and verify property details from trusted official sources.",
    },
    {
      title: "Ease of Use",
      body: "All you do is enter an address — we do the rest. No forms, no waiting, just data.",
    },
  ];

  return (
    <section
      id="why"
      className="bg-gradient-to-b from-indigo-50 to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Why EphoriaX?
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            We simplify complex research workflows into clear, instant answers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} title={p.title} body={p.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

// 🧩 PRODUCTS SECTION --------------------------------------------------------
function Products() {
  return (
    <section id="products" className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            A Growing Suite of Research Tools
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Each designed to transform scattered information into actionable
            insight.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/pdf"
            className="rounded-2xl border border-slate-200 bg-white block hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Property Data Finder (PDF)
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Locate and compare verified property data in seconds.
            </p>
          </a>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-75">
            <h3 className="text-lg font-semibold text-slate-900">
              InsightHub (Coming Soon)
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Cross-dataset dashboards for informed, evidence-based decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm opacity-75">
            <h3 className="text-lg font-semibold text-slate-900">RiskLens</h3>
            <p className="mt-2 text-sm text-slate-600">
              Risk visualization and predictive scenario modeling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 🏗️ ABOUT SECTION -----------------------------------------------------------
function AboutSection() {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-indigo-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl text-center px-4 sm:px-6">
        <p className="text-sm font-semibold tracking-wider text-indigo-600">
          About EphoriaX
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
          Built to turn complexity into clarity
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          We create focused tools that handle the heavy lifting—sifting,
          connecting, and translating data into actionable decisions for
          professionals who depend on accuracy and speed.
        </p>
      </div>
    </section>
  );
}

// 🧠 CUSTOM TOOL CTA ----------------------------------------------------------
function CustomToolCTA() {
  return (
    <section id="custom-tools" className="bg-indigo-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <h3 className="text-3xl font-bold text-indigo-800">
          Custom Tool Creation
        </h3>
        <p className="mt-4 text-slate-600 text-lg">
          We create custom tools to help you learn, create, solve problems and
          build.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="https://ephoriax.kit.com/b0ab7abf0b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Let Us Know How We Can Help</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// 🦶 FOOTER ------------------------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} EphoriaX. All rights reserved.
        </p>
        <a
          href="mailto:hello@ephoriax.com"
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          hello@ephoriax.com
        </a>
      </div>
    </footer>
  );
}

// ===== PAGE EXPORT ==========================================================
export default function EphoriaXHome() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Hero />
      <WhyPillars />
      <Products />
      <AboutSection />
      <CustomToolCTA />
      <Footer />
    </div>
  );
}