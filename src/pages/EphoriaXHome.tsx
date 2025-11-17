// src/pages/EphoriaXHome.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ================================================
// Types
// ================================================
type CardProps = {
  title: string;
  body: string;
  className?: string;
};

// ================================================
// Reusable Card Component
// ================================================
function Card({ title, body, className = "" }: CardProps) {
  return (
    <motion.div
      className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition ${className}`}
      whileHover={{ y: -4 }}
    >
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{body}</p>
    </motion.div>
  );
}

// ================================================
// Main EphoriaX Home Page
// ================================================
export default function EphoriaXHome() {
  const pillars: CardProps[] = [
    {
      title: "Efficiency",
      body: "Cut hours of searching to seconds with instant, accurate property intelligence.",
    },
    {
      title: "Clarity",
      body: "Get reliable, actionable answers — no confusing reports or incomplete data.",
    },
    {
      title: "Satisfaction",
      body: "No more endless digging. EphoriaX delivers clarity and confidence in one click.",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-indigo-900 font-bold text-xl tracking-tight"
          >
            EPHORIAX
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/pdf"
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              Get Free Report
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Property Data, Simplified.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          EphoriaX transforms how inspectors, analysts, and real estate
          professionals find property information — faster, clearer, and with
          less hassle.
        </p>
        <Link
          to="/pdf"
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow hover:bg-indigo-700 transition"
        >
          Try the Free Report Generator
        </Link>
      </motion.section>

      {/* Feature Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-slate-900 mb-10">
            Why Professionals Choose EphoriaX
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <Card key={i} title={pillar.title} body={pillar.body} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indigo-50 text-center">
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">
          Ready to Experience a Real Timesaver?
        </h3>
        <p className="text-slate-600 mb-8">
          Enter a property address and see how fast your next report can be.
        </p>
        <Link
          to="/pdf"
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>
          © {new Date().getFullYear()} EphoriaX — All Rights Reserved.
          <br />
          <Link
            to="/pdf"
            className="text-indigo-600 hover:underline mt-2 inline-block"
          >
            → Try the Free Report Generator
          </Link>
        </p>
      </footer>
    </div>
  );
}