import { useState } from "react";
import Button from "./Button";

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!address.trim()) {
      setError("Please enter a property address.");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch(`/api/pdf?address=${encodeURIComponent(address)}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setReport(data);
    } catch (err: any) {
      console.error("Error fetching report:", err);
      setError("Server error: Unable to generate report. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md text-center">
      <h1 className="text-2xl font-bold mb-2">Free Property Data Report</h1>
      <p className="text-gray-500 mb-6">
        Generate AI-powered insights instantly. Enter a property address to receive your free analysis.
      </p>

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="1240 W Robinhood Dr, Stockton CA"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button onClick={generateReport} disabled={loading} className="w-full py-2 text-lg">
        {loading ? "Generating..." : "Generate Report"}
      </Button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {report && (
        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{report.address}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Property Type:</strong> {report.propertyType}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Year Built:</strong> {report.details.yearBuilt}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Lot Size:</strong> {report.details.lotSize}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Zoning:</strong> {report.details.zoning}
          </p>
          <p className="text-gray-700 mt-3">{report.details.description}</p>
        </div>
      )}
    </div>
  );
}