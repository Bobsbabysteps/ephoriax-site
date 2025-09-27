import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF";
import BetaSignup from "./pages/BetaSignup";
import PDFSubmit from "./pages/PDFSubmit";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EphoriaXHome />} />
        <Route path="/pdf" element={<PDF />} />
        <Route path="/beta" element={<BetaSignup />} />
        <Route path="/pdf/submit" element={<PDFSubmit />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}