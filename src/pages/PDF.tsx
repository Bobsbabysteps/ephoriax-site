// src/pages/PDF.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "../CTAButton";
import FreeReportGenerator from "../components/FreeReportGenerator";

// =============================
// Animated Feature Card Component
// =============================

function Card({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -6 }}
    >
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600 mt-2">{body}</p>
    </motion.div>
  );
}

// =============================
// Main PDF Page
// =============================

export default function PDF() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const addressInput = form.elements.namedItem("address") as HTMLInputElement;
    const address = addressInput.value.trim();

    if (!address) {
      setResponse("Please enter an address.");
      return;
    }

    setLoading(true);
    setResponse("Analyzing property data...");

    try {
      const res = await fetch("/api/ask-gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write a concise property summary for ${address}. Focus on location, building details, and emergency factors.`,
        }),
      });

      const data = await res.json();
      setResponse(data.reply || "No response from GPT.");
    } catch (err) {
      console.error(err);
      setResponse("Error connecting to GPT service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="max-w-5xl mx-auto px-6 py-12 space-y-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ============================= */}
      {/* Intro Text */}
      {/* ============================= */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          The EphoriaX Property Data Finder
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Gain quick property insights using AI — no complex setup required.
        </p>
      </div>

      {/* ============================= */}
      {/* Feature Cards */}
      {/* ============================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          title="Speed"
          body="Get insights in seconds, powered by GPT and real data intelligence."
        />
        <Card
          title="Accuracy"
          body="AI-generated summaries designed to highlight location, use, and potential."
        />
        <Card
          title="Ease of Use"
          body="Simply enter a property address — we handle the heavy lifting."
        />
      </div>

      {/* ============================= */}
      {/* Free Report Generator Section */}
      {/* ============================= */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
          Ready to see PDF in action?
        </h3>
        <p className="text-slate-600 mb-6 text-center">
          Start with an address — we’ll handle the rest.
        </p>
         <FreeReportGenerator />
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            name="address"
            placeholder="Enter a property address"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Try it free"}
          </button>
        </form>

        {response && (
          <motion.div
            key={response}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-6 text-slate-700 bg-slate-100 p-4 rounded-lg whitespace-pre-wrap"
          >
            {response}
          </motion.div>
        )}
      </div>

      {/* ============================= */}
      {/* CTA Section */}
      {/* ============================= */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CTAButton>Request Access</CTAButton>
      </motion.div>
    </motion.section>
  );
}