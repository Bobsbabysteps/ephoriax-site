// src/pages/PDF.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "../CTAButton";

// ------------------------------------------------------
// Animated Feature Card Component
// ------------------------------------------------------
function Card({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
      whileHover={{ y: -4 }}
    >
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600 mt-2">{body}</p>
    </motion.div>
  );
}

// ------------------------------------------------------
// Main PDF Page
// ------------------------------------------------------
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
          prompt: `Write a concise property summary for ${address}. Focus on location, type, and appeal.`,
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

  // ------------------------------------------------------
  // Animated Layout
  // ------------------------------------------------------
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-6"
    >
      {/* Header Section */}
      <motion.section
        className="max-w-5xl mx-auto text-center mb-12"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          The EphoriaX Property Data Finder
        </h1>
        <p className="text-slate-600 text-lg">
          Gain quick property insights using AI — no complex setup required.
        </p>
      </motion.section>

      {/* Animated Cards Section */}
      <motion.section
        className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
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
      </motion.section>

      {/* GPT Form Section */}
      <motion.section
        className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Ready to see PDF in action?
        </h3>
        <p className="text-slate-600 mb-6">
          Start with an address — we’ll handle the rest.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="address"
            placeholder="Enter a property address"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
          >
            {loading ? "Analyzing..." : "Try it free"}
          </button>
        </form>

        {/* Animated GPT Response */}
        <motion.div
          key={response}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          id="gpt-result"
          className={`mt-6 text-slate-700 bg-slate-100 p-4 rounded-lg text-sm whitespace-pre-line ${
            response?.includes("Error") ? "text-red-600" : "text-slate-700"
          }`}
        >
          {response}
        </motion.div>
      </motion.section>

      {/* Footer CTA Section with reversed button order */}
      <motion.div
        className="text-center mt-16 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Primary: Request Access */}
        <CTAButton
          to="/request-access"
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Request Access
        </CTAButton>    
      </motion.div>
    </motion.div>
  );
}