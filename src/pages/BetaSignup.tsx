// src/pages/BetaSignup.tsx
import React from "react";

export default function BetaSignup() {
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product") || "platform";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Request Beta Access</h1>
      <p className="mt-3 text-slate-600">
        You’re signing up for:{" "}
        <span className="font-semibold">
          {product === "pdf" ? "Property Data Finder (PDF)" : "EphoriaX Platform"}
        </span>
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Placeholder form (we’ll swap in Sheets/n8n) */}
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm font-medium text-slate-700">
            Name
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Jane Smith"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="jane@company.com"
              required
            />
          </label>
          <input type="hidden" name="product" value={product} />
          <button
            className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
            type="submit"
          >
            Join Beta
          </button>
        </form>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        (This is a temporary form—next step is wiring to Google Sheets via n8n.)
      </p>
    </div>
  );
}