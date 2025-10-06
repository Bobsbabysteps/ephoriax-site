// src/pages/PDFSubmit.tsx
import { Link } from "react-router-dom";

export default function PDFSubmit() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Submit a Property</h1>
      <p className="mt-3 text-slate-600">
        Paste an address to request a property report (demo placeholder).
      </p>

      <form className="mt-6 grid gap-3">
        <input
          type="text"
          placeholder="123 Main St, City, ST"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Generate Report
        </button>
      </form>

      <div className="mt-6">
        <Link
          to="/pdf"
          className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          ← Back to PDF
        </Link>
      </div>
    </main>
  );
}