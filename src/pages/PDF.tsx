// src/pages/PDF.tsx
import { motion } from "framer-motion";
import FreeReportGenerator from "../components/FreeReportGenerator";

// ============================================
// Animated Feature Card Component
// ============================================
function Card({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
      whileHover={{ y: -4 }}
    >
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{body}</p>
    </motion.div>
  );
}

// ============================================
// Main PDF Page
// ============================================
export default function PDF() {
  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-6 py-16 space-y-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ============================================ */}
      {/* Intro Section - Matches Home Page Styling */}
      {/* ============================================ */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          The EphoriaX Property Data Finder
        </h1>
        <p className="text-slate-600 text-lg">
          Generate instant AI-powered property insights — fast, accurate, and beautifully simple.
        </p>
      </div>

      {/* ============================================ */}
      {/* Feature Cards */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card
          title="Speed"
          body="Instantly analyze property data using AI — no waiting or forms required."
        />
        <Card
          title="Accuracy"
          body="AI-generated summaries highlighting local trends and relevant metrics."
        />
        <Card
          title="Ease of Use"
          body="Simply enter a property address — we’ll handle the heavy lifting."
        />
      </div>

      {/* ============================================ */}
      {/* Free Report Generator Section */}
      {/* ============================================ */}
      <motion.div
        className="max-w-2xl mx-auto mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FreeReportGenerator />
      </motion.div>
    </motion.section>
  );
}