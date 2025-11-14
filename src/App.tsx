import { Routes, Route } from "react-router-dom";
import EphoriaXHome from "./pages/EphoriaXHome.js";
import PDF from "./pages/PDF.js";
import ThankYou from "./pages/ThankYou.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EphoriaXHome />} />
      <Route path="/pdf" element={<PDF />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}