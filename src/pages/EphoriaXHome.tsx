// ============================================================================
// EphoriaX Home Page
// Unified layout and styling consistent with the PDF page
// Includes motion-enhanced sections with Tailwind gradients
// ============================================================================

import React from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Hero from "../components/Hero";
import MissionSection from "../components/MissionSection";
import WhyPillars from "../components/WhyPillars";
import ProductsSection from "../components/ProductsSection";
import AboutSection from "../components/AboutSection";
import BetaCTA from "../components/BetaCTA";
import Footer from "../components/Footer";
import Button from "../components/Button";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
type CardProps = {
  title: string;
  body: string;
  className?: string;
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================
const Card: React.FC<CardProps> = ({ title, body, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
  >
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-slate-600 text-sm leading-6">{body}</p>
  </motion.div>
);

// ============================================================================
// PAGE COMPONENT
// ============================================================================
const EphoriaXHome: React.FC = () => {
  const pillars: CardProps[] = [
    {
      title: "Speed",
      body: "We search for the data you need so you don’t have to — delivering comprehensive results in seconds.",
    },
    {
      title: "Accuracy",
      body: "We collect, compare, and verify details from trusted, documented sources to ensure confidence in every result.",
    },
    {
      title: "Ease of Use",
      body: "Our tools are tailored to your needs — no complex forms, no waiting, just reliable insight at your fingertips.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ===== HEADER ===== */}
      <Header />

      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== MISSION ===== */}
      <MissionSection />

      {/* ===== WHY PILLARS ===== */}
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
              We simplify complex research workflows into clear, instant
              answers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title} title={p.title} body={p.body} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <ProductsSection />

      {/* ===== ABOUT ===== */}
      <AboutSection />

      {/* ===== BETA CTA ===== */}
      <BetaCTA />

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default EphoriaXHome;