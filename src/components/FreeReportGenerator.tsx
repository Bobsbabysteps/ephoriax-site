import React, { useState } from "react";

const WEBHOOK_URL = "https://doble.app.n8n.cloud/webhook/property-lookup";

interface PropertyReport {
  address: string;
  yearBuilt?: number | null;
  propType?: string;
  sizeSqft?: number | null;
}

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<PropertyReport | null>(null);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Non-OK response from n8n:", errorText);
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from n8n:", result);

      if (result.status === "ok") {
        const property = result.property;
        setReport({
          address: property.address,
          yearBuilt: property.yearBuilt,
          propType: property.propType,
          sizeSqft: property.sizeSqft,
        });
      } else {
        setError("No property data found.");
      }
    } catch (err: any) {
      console.error("Error generating report:", err);
      setError(err.message || "Something went wrong while generating the report.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Free Property Data Report
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Generate AI-powered insights instantly. Enter a property address to receive your free analysis.
        </p>

        <form onSubmit={handleGenerateReport} className="flex flex-col gap-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="1240 W Robinhood Dr, Stockton CA"
            className="border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isLoading ? "Generating..." : "Generate Report"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">
            Server error: {error}
          </p>
        )}

        {/* Display Report */}
        {report && (
          <div className="mt-6 border-t pt-4 text-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Property Report</h2>
            <ul className="space-y-1">
              <li><strong>Address:</strong> {report.address}</li>
              <li><strong>Year Built:</strong> {report.yearBuilt ?? "N/A"}</li>
              <li><strong>Property Type:</strong> {report.propType ?? "N/A"}</li>
              <li><strong>Size (SqFt):</strong> {report.sizeSqft ?? "N/A"}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}