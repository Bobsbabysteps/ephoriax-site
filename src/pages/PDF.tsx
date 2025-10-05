// src/pages/PDF.tsx
import React from "react";
import { Link } from "react-router-dom";
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
    <section id="beta" className="bg-indigo-50 py-16">
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
          <a
            href="/beta?product=pdf"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Request Access
          </a>
        </div>
      </div>
    </section>
  );
}

// ✅ Main PDF page
export default function PDF() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section
        className="relative isolate"
        style={{
          backgroundImage:
            "linear-gradient(110deg, #1e3a8a 0%, #4f46e5 40%, #9333ea 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-indigo-200">Property Data Finder (PDF)</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              The bridge between complexity and clarity
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-50">
              We do the sifting and searching for the data that matters—permits,
              history, hazards, sources—so you can learn, understand, and make
              confident decisions in{" "}
              <span className="font-semibold">seconds</span>, not hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/pdf/submit"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
            >
              Submit a Property
            </Link>
              <a
                href="/beta?product=pdf"
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Join the Private Beta
              </a>
            </div>
          </div>
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
}