// src/App.tsx
import { Routes, Route } from "react-router-dom";
import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF";
import PDFSubmit from "./pages/PDFSubmit";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EphoriaXHome />} />
      <Route path="/pdf" element={<PDF />} />
      <Route path="/pdf/submit" element={<PDFSubmit />} />
    </Routes>
  );
}