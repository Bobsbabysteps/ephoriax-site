import { useState } from "react";

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/n8n-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (!res.ok) throw new Error(`n8n returned ${res.status}`);

      const data = await res.json();
      setReport(data);
    } catch (err: any) {
      console.error("Error fetching report:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter property address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2 mt-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAddress("");
              setReport(null);
            }}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => {
              if (report) {
                navigator.clipboard.writeText(JSON.stringify(report, null, 2));
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            Copy Report
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {report &&
        report.choices &&
        report.choices[0]?.message?.content?.["Property Physical Characteristics Report"] && (
          <div className="mt-6 p-6 bg-white rounded-2xl shadow-md text-gray-800">
            {(() => {
              const data =
                report.choices[0].message.content["Property Physical Characteristics Report"];
              return (
                <>
                  <h2 className="text-xl font-semibold mb-2">
                    {data.Address}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Property Type: {data["Property Type"] || "N/A"}
                  </p>

                  <div className="space-y-1 text-sm">
                    <p><strong>Property Class:</strong> {data["Property Class"] || "N/A"}</p>
                    <p><strong>Intended Use:</strong> {data["Intended Use"] || "N/A"}</p>
                    <p><strong>Year Built:</strong> {data["Year Built"] || "N/A"}</p>
                    <p><strong>Lot Size (acres):</strong> {data["Lot Size (acres)"] || "N/A"}</p>
                    <p><strong>Total Building Area (sqft):</strong> {data["Total Building Area (sqft)"] || "N/A"}</p>
                    <p><strong>Construction Type:</strong> {data["Construction Type"] || "N/A"}</p>
                    <p><strong>Roof Type:</strong> {data.Roof?.Type || "N/A"}</p>
                    <p><strong>Roof Condition:</strong> {data.Roof?.Condition || "N/A"}</p>
                  </div>

                  {Array.isArray(data["Renovation and Permit History"]) &&
                    data["Renovation and Permit History"].length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Renovations & Permits</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {data["Renovation and Permit History"].map(
                            (permit: any, index: number) => (
                              <li key={index}>
                                <strong>{permit.Date}</strong> — {permit.Description}
                                {permit.Contractor && (
                                  <span> ({permit.Contractor})</span>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {Array.isArray(data["Observable Risk Factors"]) &&
                    data["Observable Risk Factors"].length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Observable Risk Factors</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {data["Observable Risk Factors"].map(
                            (risk: string, index: number) => (
                              <li key={index}>{risk}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </>
              );
            })()}
          </div>
        )}
    </div>
  )
}