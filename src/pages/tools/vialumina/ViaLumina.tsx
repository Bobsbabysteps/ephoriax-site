import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import ViaLuminaThankYou from "./ThankYou";

export default function ViaLumina() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-amber-50 via-white to-amber-100 px-6">
      {/* Animated Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold tracking-widest text-amber-900 mb-10"
      >
        VIALUMINA
      </motion.header>

      {/* Main Section: Nested Routes */}
      <main className="max-w-2xl text-center">
        <Routes>
          {/* Default ViaLumina Page */}
          <Route
            index
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-amber-900">
                  Your Scripture Companion
                </h2>

                <p className="text-amber-700 mb-8 leading-relaxed">
                  ViaLumina helps you explore Scripture with clarity, context,
                  and depth. Join our waitlist today to be among the first to
                  experience this innovative spiritual companion when it launches soon.
                </p>

                <a
                  href="https://ephoriax.kit.com/b59fb85c4f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-full bg-amber-700 text-white font-semibold shadow-md hover:bg-amber-800 transition-colors"
                >
                  Join the Waitlist
                </a>

                <p className="italic text-amber-800 mt-8">
                  “The entrance of Your words gives light.” — Psalm 119:130
                </p>
              </motion.div>
            }
          />

          {/* Thank You Page */}
          <Route path="thank-you" element={<ViaLuminaThankYou />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-amber-700 text-sm opacity-70">
        © {new Date().getFullYear()} EphoriaX — Guided by Light
      </footer>
    </div>
  );
}