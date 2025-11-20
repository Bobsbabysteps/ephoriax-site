// src/components/MissionSection.tsx
import React from "react";
import { motion } from "framer-motion";

const MissionSection: React.FC = () => {
  return (
    <motion.section
      id="mission"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-indigo-50 to-white py-20 sm:py-24 text-center"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          At EphoriaX, our mission is to empower individuals and organizations 
          with intelligent, data-driven tools that turn complexity into clarity. 
          We believe in making insight accessible, transparent, and actionable 
          for everyone.
        </p>
      </div>
    </motion.section>
  );
};

export default MissionSection;