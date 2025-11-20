import React from "react";

export default function WhyPillars() {
  return (
    <section className="py-16 text-center bg-slate-50">
      <h3 className="text-3xl font-bold text-slate-900 mb-10">
        Why EphoriaX?
      </h3>
      <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <h4 className="font-semibold text-indigo-700 mb-2">Speed</h4>
          <p className="text-slate-600">
            We search for the data you need so you don’t have to — in seconds.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <h4 className="font-semibold text-indigo-700 mb-2">Accuracy</h4>
          <p className="text-slate-600">
            We collect, compare, and verify details from trusted, documented
            sources.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm">
          <h4 className="font-semibold text-indigo-700 mb-2">Tailored Tools</h4>
          <p className="text-slate-600">
            Our tools are designed to match your goals — simple, smart, and
            efficient.
          </p>
        </div>
      </div>
    </section>
  );
}