import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EphoriaXHome from "./pages/EphoriaXHome";
import PDF from "./pages/PDF";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EphoriaXHome />} />
        <Route path="/pdf" element={<PDF />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}