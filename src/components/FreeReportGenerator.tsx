import { useState } from "react";
import Button from "./Button";
import { jsPDF } from "jspdf";

export default function FreeReportGenerator() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Production n8n webhook URL
  const WEBHOOK_URL = "https://doble.app.n8n.cloud/webhook/workflow8-intake";

  const handleGenerate = async () => {
    if (!address.trim()) {
      setError("Please enter a valid address before generating a report.");
      return;
    }

    setError(null);
    setMessage(null);
    setReport(null);
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address.trim(),
          source: "ephoriax-free-report",
          timestamp: new Date().toISOString(),
        }),
      });

      const text = await response.text();
      console.log("Raw response from n8n:", text);

      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        console.warn("Could not parse JSON, raw text:", text);
      }

      if (data?.status === "ok") {
        setMessage(data?.message || "Your submission was received successfully!");
        setReport(
          `Your property report request for "${address}" was received.\n\n` +
          `Run ID: ${data.run_id || "N/A"}\n` +
          `Status: ${data.status}\n\nRaw:\n${text}`
        );
      } else if (!response.ok) {
        throw new Error(data?.message || `Server responded with ${response.status}`);
      } else {
        throw new Error(`Unexpected response: ${text}`);
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(`Server error. Details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!report) return;

    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const margin = 40;
    const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("EphoriaX Property Data Report", margin, 50);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Address: ${address}`, margin, 80);

    const lines = pdf.splitTextToSize(report, maxWidth);
    pdf.text(lines, margin, 110);

    pdf.save(`Property_Report_${address.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-20 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Free Property Data Report
      </h1>

      <p className="text-gray-600 max-w-2xl text-center mb-8">
        Generate AI-powered insights instantly. Enter a property address to
        receive your free analysis.
      </p>

      {/* --- Address Input --- */}
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

      {/* --- Status Messages --- */}
      {error && (
        <div className="mt-6 text-red-600 font-medium text-center">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-6 text-green-600 font-medium text-center">
          {message}
        </div>
      )}

      {/* --- Report Section --- */}
      {report && (
        <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Generated Report
          </h2>
          <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-6">
            {report}
          </pre>

          <div className="flex justify-center">
            <Button onClick={handleDownloadPDF} variant="secondary">
              Download as PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}