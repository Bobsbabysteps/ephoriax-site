// ============================================================================
// ThemeContext.tsx
// EphoriaX Global Theme Context — Type-Safe + Dark/Light Mode Sync
// ============================================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ============================================================================
// THEME TYPE DEFINITIONS
// ============================================================================

export interface Theme {
  name: string;
  colors: {
    primary: { DEFAULT: string; light: string; dark: string };
    accent: { DEFAULT: string; light: string; dark: string };
    background: { light: string; dark: string };
    text: { primary: string; secondary: string; light: string };
  };
  typography: {
    fontFamily: { heading: string; body: string };
    weight: { normal: number; medium: number; semibold: number; bold: number };
  };
  gradients: {
    hero: string;
    section: string;
  };
}

// ============================================================================
// CONTEXT SHAPE
// ============================================================================

interface ThemeContextProps {
  theme: Theme;
  themeMode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export const ThemeProvider = ({
  children,
  theme,
}: {
  theme: Theme;
  children: ReactNode;
}) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // Detect user system preference once at load
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) setThemeMode("dark");
  }, []);

  // Sync Tailwind's .dark class with document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [themeMode]);

  // Persist theme mode preference
  useEffect(() => {
    localStorage.setItem("theme-mode", themeMode);
  }, [themeMode]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved === "dark" || saved === "light") setThemeMode(saved);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      <div className="transition-colors duration-300 min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};