// src/components/AboutSection.tsx
import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const AboutSection: React.FC = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-white via-indigo-50 to-indigo-100 py-20 sm:py-24 text-center"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold tracking-wider text-indigo-600 mb-2"
        >
          About EphoriaX
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900"
        >
          Built to turn complexity into clarity
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 text-lg text-slate-600"
        >
          We create focused tools that handle the heavy lifting — sifting, 
          connecting, and translating data into actionable insights for anyone 
          who values accuracy and clarity.
        </motion.p>

        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-4"
          >
            Custom Tool Creation
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-slate-600 mb-8"
          >
            We design custom tools to help you learn, create, solve problems, and build smarter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a
              href="https://ephoriax.kit.com/b0ab7abf0b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Let Us Know How We Can Help</Button>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;