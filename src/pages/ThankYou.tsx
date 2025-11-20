// src/pages/ThankYou.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function ThankYou() {
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-indigo-50 via-white to-indigo-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Message */}
      <div className="max-w-2xl">
        <h1 className="text-5xl font-extrabold text-indigo-900 mb-4">
          🎉 Thanks for Reaching Out
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          We’ve received your message and will be in touch soon.  
          Our team reviews every inquiry personally to make sure  
          you get the right answers — fast.
        </p>
        <p className="text-slate-600 mb-10">
          Whether you’re looking for property data, planning support,  
          or customized research, EphoriaX is here to help simplify your work.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <Link to="/pdf">
            <Button className="bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-50">
              Explore Property Tools
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle Footer Note */}
      <div className="mt-16 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} EphoriaX. Empowering faster, smarter decisions.</p>
      </div>
    </motion.section>
  );
}