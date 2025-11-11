import { useState } from "react";

const PDFSubmit = () => {
  const [address, setAddress] = useState<string>("");
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!address.trim()) {
      setError("Please enter a valid address before generating a report.");
      return;
    }

    setError(null);
    setLoading(true);
    setReport(null);

    try {
      // ✅ Send the request to your n8n production webhook
      const response = await fetch("https://doble.app.n8n.cloud/webhook/workflow8-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Check this property: ${address}` }),
      });

      // ✅ Handle JSON or fallback to text
      let data: any;
      try {
        data = await response.json();
      } catch {
        const text = await response.text();
        throw new Error(`Invalid JSON response: ${text.slice(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate report.");
      }

      // ✅ Display structured or raw data
      setReport(
        data?.report
          || JSON.stringify(data, null, 2)
          || "No report data returned."
      );

      console.log("✅ n8n workflow response:", data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
};

export default PDFSubmit;