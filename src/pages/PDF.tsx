// src/pages/PDF.tsx
// ============================================================================
// Property Data Finder (PDF)
// Unified gradient styling + refined copy for EphoriaX brand consistency
// ============================================================================

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button.js";
import FreeReportGenerator from "../components/FreeReportGenerator.js";
import BetaCTA from "../components/BetaCTA.js";
import { ThemeProvider } from "../context/ThemeContext.js";
import { pdfTheme } from "../styles/theme/pdfTheme.js";

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function PDF() {
  // Detect scroll to toggle subtle header shadow
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll helper for in-page navigation
  const scrollToReport = () => {
    const el = document.getElementById("report-generator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={pdfTheme}>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {/* HEADER */}
        <header
          className={`sticky top-0 z-50 w-full backdrop-blur bg-white/80 border-b transition-shadow ${scrolled ? "shadow-sm" : ""
            }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
            <Link
              to="/"
              className="text-lg font-bold text-indigo-700 tracking-tight"
            >
              Property Data Finder
            </Link>
            <a
              href="/"
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              ← Back to Home
            </a>
          </div>
        </header>

        <main className="flex-grow">
          {/* HERO SECTION */}
          <motion.section
            className="relative isolate text-center text-white py-24 sm:py-32"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(67,56,202,0.9) 0%, rgba(99,102,241,0.85) 50%, rgba(165,180,252,0.9) 100%), url('/city.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
              <p className="text-indigo-200 uppercase tracking-wide font-semibold">
                EphoriaX | Property Data Finder
              </p>
              <h1 className="mt-3 font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl drop-shadow-lg">
                Ready to Experience a Real Time-Saver?
              </h1>
              <p className="mt-5 text-indigo-100 text-base sm:text-lg leading-7 sm:leading-8">
                Search dozens of websites, assessor and planning records instantly
                by entering a single property address. Our system locates,
                filters, and compares data from verified sources — giving you fast,
                accurate insight in one easy step.
              </p>
              <div className="mt-8 flex justify-center">
                <Button onClick={scrollToReport}>Get Started</Button>
              </div>
            </div>
          </motion.section>

          {/* WHY PROFESSIONALS CHOOSE PROPERTY DATA FINDER */}
          <section className="bg-gradient-to-b from-indigo-50 to-white py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Why Professionals Choose Property Data Finder
              </h2>
              <p className="text-slate-600 mb-12 text-lg">
                Designed for speed, accuracy, and total clarity — PDF transforms how professionals find property data.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Efficiency",
                    text: "Turn hours of research into instant results. PDF searches dozens of trusted websites, assessor and planning databases at once to find exactly what you need.",
                  },
                  {
                    title: "Clarity",
                    text: "All the verified data, none of the noise. PDF delivers clear, structured answers you can trust.",
                  },
                  {
                    title: "Confidence",
                    text: "No more uncertainty — our Property Data Finder compiles, compares, and presents public data with the precision professionals rely on.",
                  },
                ].map(({ title, text }) => (
                  <motion.div
                    key={title}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-6">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FREE REPORT GENERATOR */}
          <section
            id="report-generator"
            className="py-20 sm:py-24 bg-gradient-to-b from-white to-indigo-50"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Free Property Data Report
              </h2>
              <p className="text-slate-600 mb-10">
                Generate a complete property profile instantly using verified
                public data. Just enter an address to begin.
              </p>
              <FreeReportGenerator />
            </div>
          </section>

          {/* PRIVATE BETA CTA */}
          <section id="beta" className="bg-indigo-50 py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
              <p className="text-sm font-semibold tracking-wider text-indigo-600">
                Private Beta Enrollment
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                Join now to lock in your access
              </h3>
              <p className="mt-2 text-slate-600">
                For a short time we're seeking help to evaluate and shape the Property Data Finder. In return, you will have full access to the tool for some period of time.
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
        </main>

        {/* FOOTER */}
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
      </div>
    </ThemeProvider>
  );
}