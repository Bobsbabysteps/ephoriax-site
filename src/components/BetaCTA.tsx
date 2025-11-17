// src/components/BetaCTA.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ================================================
// Beta Call-To-Action Component
// ================================================
export default function BetaCTA() {
  return (
    <motion.section
      className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700 text-white py-20 px-6 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-indigo-400/20 to-transparent"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Experience Property Intelligence. Instantly.
        </h2>
        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
          Join inspectors, analysts, and real estate professionals who trust
          EphoriaX for fast, reliable, and actionable data — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/pdf"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow hover:bg-indigo-50 transition"
          >
            Generate Free Report
          </Link>
          <Link
            to="/"
            className="px-6 py-3 border border-white/70 text-white font-semibold rounded-xl hover:bg-white/10 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.section>
  );
}