// src/components/BetaCTA.tsx
// ============================================================================
// BetaCTA Component
// Modernized version for /pdf page – consistent with brand and motion styling
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import Button from "./Button.js";

export default function BetaCTA() {
  return (
    <motion.section
      className="bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-20 px-6 text-center rounded-3xl shadow-lg mx-auto max-w-5xl my-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
        Private Beta Enrollment
      </p>

      <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-indigo-900">
        Join now to lock in your access
      </h2>

      <p className="mt-4 text-slate-700 text-lg max-w-2xl mx-auto mb-10">
        Help shape the next generation of EphoriaX tools.  
        Early testers receive early access, updates, and special partner benefits.
      </p>

      <motion.a
        href="https://ephoriax.kit.com/b0ab7abf0b"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button>Join the Beta</Button>
      </motion.a>
    </motion.section>
  );
}