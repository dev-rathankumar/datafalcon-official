import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DatafalconHome from "./Homepage";
import OurExpertise from "./OurExpertise";
import OurWork from "./OurWork";
import Contact from "./Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DatafalconHome />} />
        <Route path="/our-expertise" element={<OurExpertise />} />
        <Route path="/services" element={<Navigate to="/our-expertise" replace />} />
        <Route path="/industries" element={<Navigate to="/" replace />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
