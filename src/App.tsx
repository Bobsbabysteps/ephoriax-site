import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.js";
import { baseTheme } from "./styles/theme/baseTheme.ts";
import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF";

export default function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Routes>
        <Route path="/" element={<EphoriaXHome />} />
        <Route path="/pdf" element={<PDF />} />
      </Routes>
    </ThemeProvider>
  );
}