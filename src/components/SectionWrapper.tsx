// src/components/SectionWrapper.tsx
import React from "react";
import { motion } from "framer-motion";

type SectionWrapperProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean; // enables background gradient
  delay?: number; // optional animation delay
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  children,
  className = "",
  gradient = false,
  delay = 0,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={`
        py-20 sm:py-24
        ${gradient ? "bg-gradient-to-b from-white to-indigo-50" : ""}
        ${className}
      `}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </motion.section>
  );
};

export default SectionWrapper;