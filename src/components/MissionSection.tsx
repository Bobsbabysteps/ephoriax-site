import React from "react";
import { motion } from "framer-motion";

const MissionSection: React.FC = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
        >
          Our Mission
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed"
        >
          At EphoriaX, our mission is to empower property investors and
          analysts with cutting-edge data insights. We believe in making
          complex property intelligence accessible, transparent, and
          actionable for everyone.
        </motion.p>
      </div>
    </section>
  );
};

export default MissionSection;