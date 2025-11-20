import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center bg-gradient-to-b from-indigo-50 to-white">
      <h2 className="text-4xl font-extrabold text-indigo-900 mb-4">
        Welcome to EphoriaX
      </h2>
      <p className="max-w-2xl text-slate-600 text-lg">
        Intelligent tools built to help you find clarity, act decisively, and
        achieve what matters—at work or in life.
      </p>
    </section>
  );
}