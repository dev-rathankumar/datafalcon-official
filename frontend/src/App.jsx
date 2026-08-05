import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DatafalconHome from "./Homepage";
import OurExpertise from "./OurExpertise";
import ExpertiseDetail from "./ExpertiseDetail";
import OurWork from "./OurWork";
import Contact from "./Contact";
import About from "./About";
import Terms from "./Terms";
import Privacy from "./Privacy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DatafalconHome />} />
        <Route path="/our-expertise" element={<OurExpertise />} />
        <Route path="/our-expertise/:slug" element={<ExpertiseDetail />} />
        <Route path="/services" element={<Navigate to="/our-expertise" replace />} />
        <Route path="/industries" element={<Navigate to="/" replace />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
