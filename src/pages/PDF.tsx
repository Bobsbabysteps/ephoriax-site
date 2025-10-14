// src/pages/PDF.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wider text-indigo-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {copy && <p className="mt-4 text-lg leading-8 text-slate-600">{copy}</p>}
    </div>
  );
}

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

// ✅ This is the clean BetaCTA section
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
        <div className="mt-6 flex justify-center">
          <Link
            to="/pdf/submit"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
         >
            Request Access
          </Link>
        </div>
      </div>
    </section>
  );
}

// ✅ Main PDF page
const PDF: React.FC = () => {
  const navigate = useNavigate();

  const handleTryFree = () => {
    navigate("/pdf-trial.html");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative isolate bg-gradient-to-r from-indigo-600 via-sky-500 to-teal-400 text-white text-center py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Discover Property Data Faster Than Ever
          </h1>
          <p className="text-lg text-white/90 mb-10">
            Get insights in seconds with the AI-powered Property Data Finder Tool. 
            No more guesswork — just clarity, instantly.
          </p>

          {/* Try It Free Button */}
          <button
            onClick={handleTryFree}
            className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-50 hover:shadow-indigo-300 transition-all duration-300"
          >
            🚀 Try It Free
          </button>
        </div>
      </section>

      {/* VALUE */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Why PDF"
          title="Data integrity and efficiency, together"
          copy="Stop reconciling conflicting sources. PDF normalizes data, shows provenance, and surfaces the signal—so your time goes to judgment, not hunting."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Integrity by default"
            body="Normalized fields, deduped sources, and explicit provenance—see how every answer was derived."
          />
          <Card
            title="Seconds, not hours"
            body="A single address query returns permits, history, hazards, and key attributes fast."
          />
          <Card
            title="Transparent sources"
            body="Click through to originals. PDF never hides where facts came from."
          />
          <Card
            title="Built for reliability"
            body="Designed to reduce rework and callbacks—consistent outputs you can cite."
          />
        </div>
      </section>

      {/* ... other sections like HOW IT WORKS, SOCIAL PROOF, PRICING ... */}

      {/* BETA CTA */}
      <BetaCTA />

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
          <h3 className="text-2xl font-bold">Ready to see PDF in action?</h3>
          <p className="mt-2 text-slate-600">
            Start with an address. We’ll handle the heavy lifting and show our
            work.
          </p>
          <div className="mt-6">
            <Link
              to="/pdf/submit"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Submit a property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PDF;