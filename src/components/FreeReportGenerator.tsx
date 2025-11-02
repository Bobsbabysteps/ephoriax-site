import { useState } from "react";

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<any>(null);

  const handleGenerate = async () => {
    if (!address.trim()) {
      setError("Please enter an address.");
      return;
    }

    setError("");
    setLoading(true);
    setReport(null);

    try {
      // ✅ Automatically select correct API URL for dev and production
      const apiUrl = window.location.origin.includes("localhost")
        ? "https://ephoriax-site.vercel.app/api/property-gpt"
        : "/api/property-gpt";

      console.log(
        "🔍 Fetching from:",
        `${apiUrl}?address=${encodeURIComponent(address)}`
      );

      const response = await fetch(
        `${apiUrl}?address=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // 🧠 Handle either JSON or plain-text GPT output
      let parsedReport = data.report;

      if (typeof parsedReport === "string") {
        const cleaned = parsedReport
          .replace(/```(?:json)?/gi, "")
          .replace(/```/g, "")
          .trim();

        try {
          parsedReport = JSON.parse(cleaned);
        } catch {
          console.warn("⚠️ Still not valid JSON — showing raw text output.");
          parsedReport = { text: cleaned }; // fallback to plain text
        }
      }

      setReport(parsedReport);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(
        "Could not fetch property data. Please check the address or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">
        AI Property Data Report
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Instantly generate a property overview, risk insights, and inspection
        notes using AI.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter property address"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg px-6 py-3 transition disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Generate Report"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* ✅ Structured JSON Report */}
      {report && !report.text && (
        <div className="bg-white shadow-md rounded-2xl p-6 mt-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <span className="text-indigo-700">🏠</span> Property Report Summary
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <p>
                <strong>Address:</strong> {report.property_address}
              </p>
              <p>
                <strong>Year Built:</strong>{" "}
                {report.property_characteristics?.year_built}
              </p>
              <p>
                <strong>Type:</strong> {report.property_characteristics?.type}
              </p>
              <p>
                <strong>Square Footage:</strong>{" "}
                {report.property_characteristics?.square_footage}
              </p>
              <p>
                <strong>Lot Size:</strong>{" "}
                {report.property_characteristics?.lot_size}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              ⚠️ <span className="ml-2">Risk Insights</span>
            </h3>
            <div className="text-gray-700 space-y-1">
              {Object.entries(report.risk_insights || {}).map(
                ([risk, value]) => (
                  <p key={risk}>
                    <strong>{risk}:</strong> {String(value)}
                  </p>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              🧾 <span className="ml-2">Underwriting Notes</span>
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {Object.values(report.underwriting_inspection_notes || {}).map(
                (note, idx) => (
                  <li key={idx}>{String(note)}</li>
                )
              )}
            </ul>
          </div>

          <div className="mt-8 text-right">
            <button
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium px-6 py-2 rounded-lg transition"
              onClick={() => window.print()}
            >
              Download / Print Report
            </button>
          </div>
        </div>
      )}

      {/* ✅ Text-only fallback */}
      {report?.text && (
        <div className="bg-white shadow-md rounded-2xl p-6 mt-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            🧠 AI Property Report
          </h2>
          <pre className="whitespace-pre-line text-gray-800 leading-relaxed">
            {report.text}
          </pre>
        </div>
      )}
    </div>
  );
}