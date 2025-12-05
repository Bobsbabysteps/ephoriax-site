// ============================================================================
// ViaLumina: Scripture Without Confusion
// EphoriaX Product Page – Final Refined Version (Explore-focused)
// ============================================================================

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../../components/Button.js";
import ThemeToggle from "../../../components/ThemeToggle.jsx";
import { ThemeProvider } from "../../../context/ThemeContext.tsx";
import { viaLuminaTheme } from "../../../styles/theme/viaLuminaTheme.js";

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ViaLumina() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ThemeProvider theme={viaLuminaTheme}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {/* HEADER */}
        <header
          className={`sticky top-0 z-50 w-full backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b transition-shadow ${
            scrolled ? "shadow-sm" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
            <Link
              to="/"
              className="text-lg font-bold text-violet-700 dark:text-violet-300 tracking-tight"
            >
              ViaLumina
            </Link>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-violet-600 dark:text-violet-300 hover:text-violet-800 flex items-center gap-1"
              >
                ← Back to Home
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {/* HERO */}
          <motion.section
            className="relative isolate text-center text-white py-24 sm:py-32"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(124,58,237,0.9) 0%, rgba(192,132,252,0.85) 50%, rgba(233,213,255,0.9) 100%), url('/bible.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
              <p className="text-violet-200 uppercase tracking-wide font-semibold">
                EphoriaX | ViaLumina
              </p>
              <h1 className="mt-3 font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl drop-shadow-lg">
                Scripture Without Confusion
              </h1>
              <p className="mt-5 text-violet-100 text-base sm:text-lg leading-7 sm:leading-8">
                Bring your Bible and trusted faith books together. ViaLumina
                guides your exploration with clarity and conviction, keeping God
                at the center where His light reveals the way and softens the
                heart for His truth.
              </p>
              <div className="mt-8 flex justify-center">
                <Button>Begin Your Exploration</Button>
              </div>
            </div>
          </motion.section>

          {/* WHY VIALUMINA EXISTS */}
          <section className="bg-gradient-to-b from-violet-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Faith Deserves Clarity
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-12 text-lg max-w-3xl mx-auto">
                In an age of endless voices and opinions, believers often lose
                direction. ViaLumina brings order and reverence back to
                Scripture—helping you explore, reflect, and live truth with
                confidence.
              </p>
            </div>

            {/* NEW: WHAT YOU'LL DISCOVER SECTION */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 text-center mb-8">
                What You’ll Discover
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    title: "Explore the Word",
                    text: "Dive into Scripture with context and clarity, uncovering insights that deepen your understanding.",
                  },
                  {
                    title: "Deepen Understanding",
                    text: "See how history, culture, and faith tradition illuminate the meaning behind each passage.",
                  },
                  {
                    title: "Grow in Conviction",
                    text: "Apply truth with confidence through guided reflection and practical wisdom for everyday life.",
                  },
                ].map(({ title, text }) => (
                  <motion.div
                    key={title}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm text-center"
                  >
                    <h4 className="text-lg font-semibold mb-2 text-violet-700 dark:text-violet-300">
                      {title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-6">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="bg-white dark:bg-slate-900 py-20 sm:py-24 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Explore Scripture with Structure
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-12">
                Each interaction follows a Scripture-centered rhythm:
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  {
                    title: "Lesson",
                    text: "Focus on the chosen passage or theme.",
                  },
                  {
                    title: "Learning",
                    text: "Gain historical and cultural context.",
                  },
                  {
                    title: "Reflection",
                    text: "Engage your heart and mind thoughtfully.",
                  },
                  {
                    title: "Application",
                    text: "Discover ways to live the truth practically.",
                  },
                  {
                    title: "Prayer",
                    text: "End with a short, reverent prayer.",
                  },
                ].map(({ title, text }) => (
                  <motion.div
                    key={title}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-6">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PERSONALIZE SECTION */}
          <section className="bg-gradient-to-b from-white to-violet-50 dark:from-slate-800 dark:to-slate-900 py-20 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Bring Your Library With You
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-10 text-lg">
                Upload your Bible or trusted materials. ViaLumina respects your
                translation and tradition, using your chosen texts as the
                foundation for every exploration.
              </p>
              <Button>Upload Your Bible</Button>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-violet-600 dark:bg-violet-700 text-white text-center py-20 sm:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <h2 className="text-4xl font-bold mb-3">
                The Bible Deserves Clarity.
              </h2>
              <p className="text-violet-100 mb-8">
                Let ViaLumina help you explore Scripture with understanding,
                conviction, and peace.
              </p>
              <Button>Start Exploring</Button>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} EphoriaX. All rights reserved.
            </p>
            <a
              href="mailto:hello@ephoriax.com"
              className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              hello@ephoriax.com
            </a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}