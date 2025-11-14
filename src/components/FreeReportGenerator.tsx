import React, { useState, useEffect } from "react";
import Button from "./Button.js";

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [restored, setRestored] = useState(false);

  // 🧠 Load last report from localStorage on mount
  useEffect(() => {
    const savedReport = localStorage.getItem("lastReport");
    if (savedReport) {
      try {
        const parsed = JSON.parse(savedReport);
        setReport(parsed);
        setAddress(parsed.address || "");
        setRestored(true);
      } catch {
        console.warn("⚠️ Failed to parse saved report");
      }
    }
  }, []);

  // 💾 Save report to localStorage whenever it changes
  useEffect(() => {
    if (report) {
      localStorage.setItem("lastReport", JSON.stringify(report));
    }
  }, [report]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError("Please enter a property address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/pdf?address=${encodeURIComponent(address)}`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setReport(data);
    } catch (err: any) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Clear report + storage
  const handleClear = () => {
    localStorage.removeItem("lastReport");
    setReport(null);
    setAddress("");
    setRestored(false);
    setError("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-center text-2xl font-bold mb-2">
        Free Property Data Report
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Generate AI-powered insights instantly. Enter a property address to
        receive your free analysis.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="1240 W Robinhood Dr, Stockton CA"
          className="w-full border rounded-lg px-4 py-2"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Generating..." : "Generate Report"}
          </Button>
          {report && (
            <Button
              type="button"
              onClick={handleClear}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1"
            >
              Clear
            </Button>
          )}
        </div>
      </form>

      {error && <p className="text-red-600 text-center mt-3">{error}</p>}

      {report && (
        <div className="mt-6 p-4 border rounded-xl bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-lg mb-2">{report.address}</h3>
          <p>
            <strong>Property Type:</strong> {report.propertyType}
          </p>

          {/* Handle new AI summary */}
          {report.summary && (
            <div className="mt-3 text-gray-700 whitespace-pre-line">
              <strong>Summary:</strong>
              <p className="mt-2">
                {report.summary.replace(/```json|```/g, "").trim()}
              </p>
            </div>
          )}

          {/* Keep legacy structured format (optional fallback) */}
          {report.details && (
            <>
              <p><strong>Year Built:</strong> {report.details.yearBuilt}</p>
              <p><strong>Lot Size:</strong> {report.details.lotSize}</p>
              <p><strong>Zoning:</strong> {report.details.zoning}</p>
              <p className="mt-2">{report.details.description}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}