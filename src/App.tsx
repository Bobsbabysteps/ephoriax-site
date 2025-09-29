// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EphoriaXHome />} />
      <Route path="/pdf" element={<PDF />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
