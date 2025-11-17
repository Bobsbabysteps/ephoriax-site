// src/pages/PDF.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FreeReportGenerator from "../components/FreeReportGenerator";
import BetaCTA from "../components/BetaCTA";

// ================================================
// Animated Feature Card Component
// ================================================
function Card({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
      whileHover={{ y: -4 }}
    >
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{body}</p>
    </motion.div>
  );
}

// ================================================
// Main PDF Page
// ================================================
export default function PDF() {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to toggle navbar shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to the FreeReportGenerator section
  const scrollToReport = () => {
    const el = document.getElementById("report-generator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md border-b border-gray-200"
            : "bg-white/90 border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
          <a
            href="/"
            className="text-indigo-900 font-bold text-xl tracking-tight"
          >
            EPHORIAX
          </a>
          <a
            href="/"
            className="text-indigo-700 hover:text-indigo-900 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Intro Section */}
      <motion.section
        className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col justify-center items-center text-center pt-24 pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            The EphoriaX Property Data Finder
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            Ready to experience a real time-saver? Just enter an address below
            and see how fast real property intelligence happens.
          </p>
          <button
            onClick={scrollToReport}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow hover:bg-indigo-700 transition"
          >
            Generate My Free Report
          </button>
        </div>
      </motion.section>

      {/* Feature Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <Card
            title="Speed"
            body="Search dozens of assessor and planning databases instantly for the property you need."
          />
          <Card
            title="Accuracy"
            body="We collect, compare, and verify property details from trusted official sources."
          />
          <Card
            title="Ease of Use"
            body="All you do is enter an address — we do the rest. No forms, no waiting, just data."
          />
        </div>
      </section>

      {/* Free Report Generator */}
      <section id="report-generator" className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-6">
          <FreeReportGenerator />
        </div>
      </section>

      {/* Beta Call-To-Action */}
      <section className="py-20 bg-gradient-to-t from-indigo-100 to-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <BetaCTA />
          <p className="text-slate-500 text-sm mt-8">
            Built for inspectors, analysts, and real estate professionals who
            rely on accurate, fast, and clear property intelligence.
          </p>
          <div className="mt-10">
            <a
              href="/"
              className="text-indigo-600 font-medium hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}