// ============================================================================
// ViaLumina Theme
// Faithful, clarity-driven palette for Scripture-centered study
// ============================================================================

export const viaLuminaTheme = {
  name: "viaLumina",
  colors: {
    primary: { DEFAULT: "#7C3AED", light: "#C084FC", dark: "#5B21B6" },
    accent: { DEFAULT: "#FBBF24", light: "#FCD34D", dark: "#D97706" },
    background: { light: "#F9FAFB", dark: "#1E1E24" },
    text: { primary: "#1E293B", secondary: "#475569", light: "#E0E7FF" },
  },
  typography: {
    fontFamily: { heading: "Inter, ui-sans-serif, system-ui", body: "Inter, ui-sans-serif, system-ui" },
    weight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  gradients: {
    hero: "linear-gradient(135deg, rgba(124,58,237,0.9) 0%, rgba(192,132,252,0.85) 50%, rgba(233,213,255,0.9) 100%)",
    section: "linear-gradient(to bottom, #F3E8FF, #FFFFFF)",
  },
};