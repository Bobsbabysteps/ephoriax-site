// src/styles/theme/pdfTheme.ts
import type { Theme } from "../../context/ThemeContext";

export const pdfTheme: Theme = {
  name: "Property Data Finder",
  colors: {
    primary: { DEFAULT: "#4338CA", light: "#6366F1", dark: "#3730A3" },
    accent: { DEFAULT: "#8B5CF6", light: "#A78BFA", dark: "#7C3AED" },
    background: { light: "#F8FAFC", dark: "#0F172A" },
    text: { primary: "#111827", secondary: "#64748B", light: "#F8FAFC" },
  },
  typography: {
    fontFamily: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
    weight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  gradients: {
    hero: "linear-gradient(135deg, rgba(67,56,202,0.9) 0%, rgba(99,102,241,0.85) 50%, rgba(165,180,252,0.9) 100%)",
    section: "linear-gradient(to bottom, #FFFFFF, #EEF2FF)",
  },
};
