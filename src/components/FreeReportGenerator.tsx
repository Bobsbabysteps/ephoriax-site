import { useState } from "react";

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!address.trim()) {
      setError("Please enter a property address.");
      return;
    }
    setError(null);
    setLoading(true);
    setReport(null);

    try {
      const res = await fetch(`/api/property-gpt?address=${encodeURIComponent(address)}`);
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
      const data = await res.json();

      // Clean up GPT response (strip backticks + parse JSON if needed)
      let parsed = data.report;
      if (typeof parsed === "string") {
        parsed = parsed.replace(/```json|```/g, "").trim();
        parsed = JSON.parse(parsed);
      }

      setReport(parsed);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white shadow-md space-y-4 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-slate-800">Try Property Data Finder</h2>
      <p className="text-slate-600 text-sm">
        Enter an address below to generate an instant AI-powered property report.
      </p>

      <div className="flex gap-2 justify-center">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, Springfield"
          className="w-2/3 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-all disabled:bg-slate-400"
        >
          {loading ? "Generating..." : "Try it Free"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {report && (
        <div className="text-left mt-6 border-t border-slate-200 pt-4 space-y-2">
          <h3 className="font-semibold text-slate-800 text-lg">
            {report.property_address}
          </h3>
          <p className="text-slate-600 text-sm">
            Type: {report.property_characteristics.property_type} —{" "}
            {report.property_characteristics.square_footage} sq ft
          </p>
          <p className="text-slate-600 text-sm">
            Built: {report.property_characteristics.year_built} • Bedrooms:{" "}
            {report.property_characteristics.number_of_bedrooms} • Bathrooms:{" "}
            {report.property_characteristics.number_of_bathrooms}
          </p>

          <div className="mt-4 text-sm">
            <h4 className="font-semibold text-slate-700">Risk Insights:</h4>
            <pre className="bg-slate-50 p-2 rounded-lg overflow-x-auto text-xs">
              {JSON.stringify(report.risk_insights, null, 2)}
            </pre>
          </div>

          <div className="mt-4 text-sm">
            <h4 className="font-semibold text-slate-700">Inspection Notes:</h4>
            <pre className="bg-slate-50 p-2 rounded-lg overflow-x-auto text-xs">
              {JSON.stringify(report.underwriting_inspection_notes, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}