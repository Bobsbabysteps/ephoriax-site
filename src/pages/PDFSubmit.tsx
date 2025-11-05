import { useState } from "react";
import Button from "../components/Button";

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!address.trim()) {
      setError("Please enter a valid address before generating a report.");
      return;
    }

    setError(null);
    setLoading(true);
    setReport(null);

    try {
  const response = await fetch(`/api/property-gpt?address=${encodeURIComponent(address)}`);

  // Try parsing JSON safely
  let data;
  try {
    data = await response.json();
  } catch {
    const text = await response.text(); // fallback for non-JSON
    throw new Error(`Invalid JSON response: ${text.slice(0, 100)}...`);
  }

  if (!response.ok) {
    throw new Error(data?.error || "Failed to generate report.");
  }

  setReport(data?.report || "No report data returned.");
} catch (err: any) {
  setError(err.message || "Something went wrong. Please try again.");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-20 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Free Property Data Report
      </h1>
      <p className="text-gray-600 max-w-2xl text-center mb-8">
        Generate AI-powered insights instantly. Enter a property address to receive your free analysis.
      </p>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter property address..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <div className="flex justify-center">
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </div>

      {/* --- Display Results --- */}
      {error && (
        <div className="mt-6 text-red-600 font-medium">{error}</div>
      )}

      {report && (
        <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Generated Report
          </h2>
          <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {report}
          </pre>
        </div>
      )}
    </div>
  );
}