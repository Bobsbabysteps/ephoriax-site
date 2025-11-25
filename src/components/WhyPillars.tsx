// src/components/WhyPillars.tsx
import React from "react";
import { motion } from "framer-motion";

const pillars = [
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

const WhyPillars: React.FC = () => {
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
            <motion.div
              key={p.title}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-6">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPillars;