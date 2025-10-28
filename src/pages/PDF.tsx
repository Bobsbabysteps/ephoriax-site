// src/pages/PDF.tsx
import { motion } from "framer-motion";
import { useState } from "react";

export default function PDF() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTryItFree = async () => {
    setLoading(true);
    setResult(null);
    try {
    const res = await fetch("/api/sample");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("⚠️ Could not fetch property data. Check your API URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-400 text-white text-center py-24 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Built for the insurance industry
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Property Data Finder gives inspectors, underwriters, and analysts fast,
          complete, and accurate property data to make confident decisions.
        </p>
        <p className="italic max-w-2xl mx-auto mb-8">
          Created by field inspectors for the industry we serve — precise data you
          can trust, in the field, in the office, and on the fly.
        </p>
        <button
          onClick={handleTryItFree}
          className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-50 transition disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Try it Free"}
        </button>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Property Data Finder Matters
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-blue-700 font-semibold mb-2">⏱ Save Time</h3>
            <p>
              Property Data Finder brings data from over twenty trusted sources —
              including ATTOM — into one clear, structured report.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-blue-700 font-semibold mb-2">🛡 Reduce Risk</h3>
            <p>
              Gaps in property data create uncertainty — and uncertainty creates
              risk. Get a complete picture that helps prevent costly mistakes.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-blue-700 font-semibold mb-2">
              📊 Make Better Decisions
            </h3>
            <p>
              PDF turns fragmented information into a unified view, empowering
              confident, defensible decisions.
            </p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          How Professionals Use Property Data Finder
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-blue-700 font-semibold mb-2">📝 For Inspectors</h3>
            <p>
              Too much time is wasted piecing together courthouse files, field
              notes, and online records. PDF consolidates everything before you step
              on site — so you can spend your time verifying, not hunting.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-blue-700 font-semibold mb-2">📑 For Underwriters</h3>
            <p>
              Disconnected, incomplete data means uncertainty and delays. PDF pulls
              property intelligence into one structured report, giving you clarity
              and confidence to underwrite without second-guessing.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-blue-700 font-semibold mb-2">📈 For Analysts</h3>
            <p>
              Analysis is only as good as the data behind it — and when that data is
              scattered, accuracy suffers. PDF organizes over twenty sources into
              clear, actionable insights you can trust.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <button
            onClick={handleTryItFree}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Try it Free"}
          </button>
        </div>
      </section>

      {/* TRUSTED SOURCES */}
      <section className="bg-blue-50 text-center py-16 px-6">
        <h2 className="text-2xl font-bold mb-4">
          Trusted Sources, Trusted Results
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          Powered by industry-leading providers like ATTOM, ensuring your insights
          are accurate, complete, and up to date.
        </p>
        <div className="flex justify-center flex-wrap gap-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Attom_Data_logo.png"
            alt="ATTOM Logo"
            className="h-10"
          />
          <img
            src="https://via.placeholder.com/150x40?text=Trusted+Source"
            alt="Placeholder Logo"
            className="h-10"
          />
          <img
            src="https://via.placeholder.com/150x40?text=Trusted+Source"
            alt="Placeholder Logo"
            className="h-10"
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-900 text-white text-center py-20 px-6">
        <h2 className="text-3xl font-semibold mb-6">
          Smarter tools. More time. More growth.
        </h2>
        <button
          onClick={handleTryItFree}
          className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-100 transition disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Try it Free"}
        </button>
      </section>

      {/* OPTIONAL: Display fetched data */}
      {result && (
        <section className="max-w-3xl mx-auto p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Fetched Property Data:</h3>
          <pre className="text-left text-sm bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}
    </motion.div>
  );
}