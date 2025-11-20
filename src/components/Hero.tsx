// src/components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const Hero: React.FC = () => {
  return (
    <motion.section
      className="relative isolate text-center text-white py-32 sm:py-40 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(67,56,202,0.95) 0%, rgba(99,102,241,0.9) 50%, rgba(165,180,252,0.95) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-indigo-200 uppercase tracking-widest font-semibold mb-4">
          EphoriaX Platform
        </p>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-md">
          Turning Complexity into Clarity
        </h1>
        <p className="text-lg text-indigo-100 mb-10 leading-relaxed">
          We handle the searching, filtering, and comparison work for you — 
          finding the most accurate and relevant data, instantly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#products">
            <Button>Explore Tools</Button>
          </a>
          <a
            href="https://ephoriax.kit.com/b0ab7abf0b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50">
              Request Access
            </Button>
          </a>
        </div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-800/10 to-indigo-900/20 pointer-events-none" />
    </motion.section>
  );
};

export default Hero;