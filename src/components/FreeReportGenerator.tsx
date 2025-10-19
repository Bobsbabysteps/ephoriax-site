// src/components/FreeReportGenerator.tsx
import React, { useState } from "react";

export default function FreeReportGenerator() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500); // simulate GPT response delay
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-slate-50 border border-slate-200 rounded-2xl p-10 shadow-lg hover:shadow-2xl hover:border-indigo-300/60 transition-all duration-500">
      <h3 className="text-2xl font-semibold text-slate-900 mb-3">
        Ready to generate your Free Property Report?
      </h3>
      <p className="text-slate-600 mb-6">
        Enter a property address below to get an instant AI-generated summary.
      </p>

      <input
        type="text"
        placeholder="1234 Oak Street, Stockton, CA"
        className="w-full p-3 border border-slate-300 rounded-lg mb-4"
      />

      <button
        onClick={handleClick}
        disabled={loading}
        className={`relative overflow-hidden bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-sm transition-all group ${
          loading ? "opacity-70 cursor-wait" : ""
        }`}
      >
        <span className="relative z-10">
          {loading ? "Generating..." : "Generate Report"}
        </span>
        <span
          className={`absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-white/40 to-indigo-400/20 translate-x-[-100%] ${
            loading ? "animate-shimmer" : "group-hover:translate-x-[100%]"
          } transition-transform duration-1000 ease-out`}
        ></span>
      </button>
    </div>
  );
}