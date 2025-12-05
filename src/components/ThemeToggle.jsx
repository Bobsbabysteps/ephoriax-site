import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.js";

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();

  const toggleTheme = () => setThemeMode(themeMode === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light or dark mode"
      className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors 
                 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100 
                 dark:hover:bg-slate-600 shadow-sm"
    >
      {themeMode === "light" ? (
        <>
          <Moon size={16} />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun size={16} />
          <span>Light</span>
        </>
      )}
    </button>
  );
}