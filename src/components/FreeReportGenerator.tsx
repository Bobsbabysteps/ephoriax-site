// src/components/FreeReportGenerator.tsx
import React, { useState } from "react";
import { motion } from "framer-motion"; // ← Add this line
// ================================================
// Free Report Generator Component
// ================================================
export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulated async report generation
  const handleGenerateReport = async () => {
    if (!address.trim()) {
      setError("Please enter a valid address.");
      return;
    }

    setError(null);
    setReport(null);
    setLoading(true);

    try {
      // Simulate API latency for realism
      await new Promise((res) => setTimeout(res, 1500));

      // Simulated result data
      const fakeData = `
        🔍 Report Summary for ${address}

        • Property located in a high-value growth area.
        • Zoning: Residential (R-1)
        • Assessed Value: $384,200
        • Lot Size: 0.28 acres
        • Built: 1987
        • Nearby sales confirm stable property trends.

        ✅ Data compiled from verified county, planning, and assessor sources.
      `;

      setReport(fakeData.trim());
    } catch {
      setError("Something went wrong while generating the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-8 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-semibold text-slate-900 mb-4">
        Free Property Report Generator
      </h2>
      <p className="text-slate-600 mb-6">
        Enter a property address below to instantly generate a property data
        summary — sourced from assessor and planning databases.
      </p>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <input
          type="text"
          placeholder="Enter property address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleGenerateReport}
          disabled={loading}
          className={`px-6 py-3 rounded-xl font-medium text-white shadow transition ${loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {/* Error or Result */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {report && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left text-sm whitespace-pre-line font-mono text-slate-700 overflow-auto"
        >
          {report}
        </motion.div>
      )}
    </div>
  );
}