import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ViaLuminaThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-amber-50 via-white to-amber-100 px-6">
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-6">
          Thank You 🌿
        </h1>

        {/* Main message */}
        <p className="text-lg text-amber-700 mb-6 leading-relaxed">
          Thank you for your interest in <span className="font-semibold">ViaLumina</span>.
          You will be contacted when ViaLumina is launched in the near future.
        </p>

        {/* Subtext / gentle line */}
        <p className="italic text-amber-800 mb-10">
          “The entrance of Your words gives light.” — Psalm 119:130
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/tools/vialumina"
              className="inline-block px-8 py-3 rounded-full bg-amber-700 text-white font-semibold shadow-md hover:bg-amber-800 transition-colors"
            >
              Return to ViaLumina
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-block px-8 py-3 rounded-full bg-white text-amber-800 font-semibold border border-amber-300 shadow-sm hover:bg-amber-50 transition-colors"
            >
              Return to EphoriaX
            </Link>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-sm text-amber-600 mt-12 opacity-70">
          © EphoriaX — Guided by Light
        </p>
      </motion.div>
    </div>
  );
}