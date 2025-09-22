// src/App.tsx
import { Routes, Route, Link } from "react-router-dom";
import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF"; // MUST match src/pages/PDF.tsx (case-sensitive)

export default function App() {
  return (
    <>
      {/* Tiny nav for testing; safe to remove later */}
      <nav className="hidden">
        <Link to="/">Home</Link> · <Link to="/pdf">PDF</Link>
      </nav>

      <Routes>
        <Route path="/" element={<EphoriaXHome />} />
        <Route path="/pdf" element={<PDF />} />
      </Routes>
    </>
  );
}