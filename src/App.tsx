import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { baseTheme } from "./styles/theme/baseTheme";

import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF";
import ThankYou from "./pages/ThankYou";
import ViaLumina from "./pages/tools/vialumina/ViaLumina";

export default function App() {
  // 🔗 Backend connection check
  useEffect(() => {
    const API = import.meta.env.VITE_API_BASE_URL;
    console.log("Connecting to backend:", API);

    fetch(`${API}/health`)
      .then((res) => res.json())
      .then((data) => console.log("Backend response:", data))
      .catch((err) => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <Router>
      <ThemeProvider theme={baseTheme}>
        <Routes>
          <Route path="/" element={<EphoriaXHome />} />
          <Route path="/pdf" element={<PDF />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ViaLumina handles its own internal routes */}
          <Route path="/tools/vialumina/*" element={<ViaLumina />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
