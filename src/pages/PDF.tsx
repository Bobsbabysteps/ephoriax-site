import { useEffect, useState } from "react";
import FreeReportGenerator from "../components/FreeReportGenerator.js";
export default function PDF() {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to toggle shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToReport = () => {
    const el = document.getElementById("report-generator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? "bg-white shadow-md border-b border-gray-200 opacity-100"
            : "bg-white/90 border-b border-transparent opacity-0 animate-fadeIn"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="/"
            className="text-indigo-900 font-bold text-xl tracking-tight"
          >
            EPHORIAX
          </a>
          <a
            href="/"
            className="text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-indigo-900 text-white pt-28 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">
            Smarter Tools. More Time. More Growth.
          </h1>
          <p className="text-lg mb-8 text-indigo-100">
            Empower your underwriting with instant, AI-generated property
            insights.
          </p>
          <button
            onClick={scrollToReport}
            className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-medium hover:bg-indigo-100 transition-all"
          >
            Try it Free
          </button>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-12 text-center bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Trusted Sources, Trusted Results
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Powered by industry-leading providers like ATTOM, ensuring your insights
          are accurate, complete, and up to date.
        </p>

        <div className="mt-10">
          <button
            onClick={scrollToReport}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all"
          >
            Try it Free
          </button>
        </div>
      </section>

      {/* Marketing Callout */}
      <section className="bg-indigo-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">
            AI-Driven Insights in Seconds
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            Upload or enter a property address, and our AI instantly generates a property
            summary, hazard assessment, and inspection notes — all tailored for underwriting
            and lending professionals.
          </p>
          <button
            onClick={scrollToReport}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all"
          >
            Try it Free
          </button>
        </div>
      </section>

      {/* Report Generator Section */}
      <section id="report-generator" className="py-20 bg-gray-100 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <FreeReportGenerator />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white text-center py-6 mt-20">
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} EPHORIAX. All rights reserved.
        </p>
      </footer>
    </div>
  );
}