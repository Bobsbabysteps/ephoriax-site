// src/pages/PDF.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import CTAButton from "../CTAButton";

// ----------------------------------------------------
// Animated Feature Card Component
// ----------------------------------------------------
function Card({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm leading-6">{body}</p>
    </motion.div>
  );
}

// ----------------------------------------------------
// Main PDF Page Component
// ----------------------------------------------------
const PDF: React.FC = () => {
  // ✅ Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-slate-50 min-h-screen"
    >
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold text-slate-900">
            Property Data Finder (PDF)
          </h1>
          <p className="mt-4 text-slate-600">
            The Data Integrity & Efficiency Platform for property professionals.
          </p>
        </div>
      </motion.section>

      {/* Product Messaging / Feature Highlights */}
      <section className="mx-auto max-w-6xl px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card
          title="Data Accuracy"
          body="Access verified, multi-source property data for confident decisions."
        />
        <Card
          title="Time Efficiency"
          body="Get complete property reports instantly — no manual research required."
        />
        <Card
          title="Custom Insights"
          body="Unlock metrics designed for agents, investors, and appraisers alike."
        />
      </section>

      {/* Beta CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-indigo-50 py-16"
      >
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
          <div className="mt-6">
            <CTAButton
             to="/pdf/submit"
             className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
             Request Access
            </CTAButton>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">
            Ready to see PDF in action?
          </h3>
          <p className="mt-2 text-slate-600">
            Start with an address. We’ll handle the heavy lifting and show our
            work.
          </p>
          <div className="mt-6">
            <a
              href="/pdf-trial.html"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-all"
            >
              Try it free
            </a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default PDF;