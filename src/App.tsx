// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { baseTheme } from "./styles/theme/baseTheme";
import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF";
import ThankYou from "./pages/ThankYou";
// (ScrollToTop import removed — create src/components/ScrollToTop.tsx if you prefer to keep this behavior)

export default function App() {
  return (
    <Router>

      <ThemeProvider theme={baseTheme}>
        <Routes>
          <Route path="/" element={<EphoriaXHome />} />
          <Route path="/pdf" element={<PDF />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}