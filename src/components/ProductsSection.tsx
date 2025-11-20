// src/components/ProductsSection.tsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProductsSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.section
      id="products"
      style={{ y }}
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-slate-900"
        >
          Our Featured Tools
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-slate-600 text-lg"
        >
          From property intelligence to decision-making insights, our products 
          simplify how professionals and individuals connect with data.
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Property Data Finder (PDF)",
            text: "Locate and compare verified property data in seconds.",
          },
          {
            title: "InsightHub (Coming Soon)",
            text: "Cross-dataset dashboards for informed, evidence-based decisions.",
          },
          {
            title: "RiskLens",
            text: "Risk visualization and predictive scenario modeling.",
          },
        ].map(({ title, text }) => (
          <motion.div
            key={title}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-6">{text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProductsSection;