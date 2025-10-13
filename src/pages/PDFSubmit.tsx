import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PDFSubmit() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [trialCount, setTrialCount] = useState(0);
  const [limit] = useState(3);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const used = Number(localStorage.getItem("pdf_submits") || 0);
    setTrialCount(used);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const used = Number(localStorage.getItem("pdf_submits") || 0);
    if (used >= limit) {
      setMessage("Your free trial has ended. Please subscribe to continue.");
      setTimeout(() => {
        window.location.href = "https://app.kit.com/creator-network/YOUR-FORM-ID";
      }, 1500);
      return;
    }

    if (!file) {
      setMessage("Please upload a PDF file first.");
      return;
    }

    // Increment trial usage
    localStorage.setItem("pdf_submits", String(used + 1));
    setTrialCount(used + 1);

    // Simulate processing the PDF (replace with actual logic later)
    setMessage("Processing your PDF…");
    setTimeout(() => {
      setMessage("Upload successful!");
      navigate("/thank-you");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
          Try EphoriaX PDF Finder
        </h1>
        <p className="text-slate-600 text-center mb-6">
          Upload your PDF report below. You have{" "}
          <span className="font-semibold">{limit - trialCount}</span> of{" "}
          {limit} free trials remaining.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Property Report (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-slate-700 border border-slate-300 rounded-lg cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
          </div>

          <button
            type="submit"
            disabled={trialCount >= limit}
            className={`w-full rounded-lg py-2.5 font-semibold transition ${
              trialCount >= limit
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {trialCount >= limit ? "Trial Ended" : "Submit PDF"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-slate-700 font-medium">{message}</p>
        )}

        {trialCount >= limit && (
          <div className="mt-6 text-center">
            <p className="text-slate-600 mb-3">
              Your free trial has ended. Continue using EphoriaX with a full subscription.
            </p>
            <a
              href="https://ephoriax.kit.com/b0ab7abf0b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
            >
              Subscribe Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}