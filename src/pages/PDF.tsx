// src/pages/PDF.tsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// ----------------------------------------------------
// Section Heading Component (optional if used elsewhere)
// ----------------------------------------------------
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
    </div>
  );
}

// ----------------------------------------------------
// Card Component
// ----------------------------------------------------
function Card({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
      {children}
    </div>
  );
}

// ----------------------------------------------------
// Beta CTA Section
// ----------------------------------------------------
function BetaCTA() {
  return (
    <section className="bg-indigo-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <p className="text-sm font-semibold tracking-wider text-indigo-600">
          Private Beta Enrollment
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
          Join now to lock in your access
        </h3>
        <p className="mt-2 text-slate-600">
          A short window to help shape PDF. Early testers get priority and a
          preferred launch plan.
        </p>
        <div className="mt-6">
          <a
            href="/request-access"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-all"
          >
            Request Access
          </a>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Main PDF Page Component
// ----------------------------------------------------
const PDF: React.FC = () => {
  // ✅ Fix: Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }); // change "smooth" for animation
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Example content header */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold text-slate-900">
            Property Data Finder (PDF)
          </h1>
          <p className="mt-4 text-slate-600">
            The Data Integrity & Efficiency Platform for property professionals.
          </p>
        </div>
      </section>

      {/* Beta CTA Section */}
      <BetaCTA />

      {/* Final CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">
            Ready to see PDF in action?
          </h3>
          <p className="mt-2 text-slate-600">
            Start with an address. We’ll handle the heavy lifting and show our work.
          </p>
          <div className="mt-6">
            <a
              href="/pdf-trial.html"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-all"
            >
              Try it free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PDF;