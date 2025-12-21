// src/styles/theme/baseTheme.ts
import type { Theme } from "../../context/ThemeContext";

export const baseTheme: Theme = {
  name: "EphoriaX Base",
  colors: {
    primary: { DEFAULT: "#4F46E5", light: "#6366F1", dark: "#4338CA" },
    accent: { DEFAULT: "#8B5CF6", light: "#A78BFA", dark: "#7C3AED" },
    background: { light: "#F9FAFB", dark: "#111827" },
    text: { primary: "#111827", secondary: "#6B7280", light: "#F9FAFB" },
  },
  typography: {
    fontFamily: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
    weight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  gradients: {
    hero: "linear-gradient(135deg, rgba(79,70,229,0.9) 0%, rgba(99,102,241,0.85) 50%, rgba(165,180,252,0.9) 100%)",
    section: "linear-gradient(to bottom, #F9FAFB, #EEF2FF)",
  },
};
