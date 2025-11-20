import React, { createContext, useContext, ReactNode } from "react";

// Define a simple type for your theme
type Theme = {
  gradient: string;
  primary: string;
  secondary: string;
  text: string;
};

// Create the context
const ThemeContext = createContext<Theme | undefined>(undefined);

// Export a hook to access the theme easily
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Provider wrapper
export function ThemeProvider({
  theme,
  children,
}: {
  theme: Theme;
  children: ReactNode;
}) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}