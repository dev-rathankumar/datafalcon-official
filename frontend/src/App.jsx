import { BrowserRouter, Routes, Route } from "react-router-dom";
import DatafalconHome from "./Homepage";
import Services from "./Services";
import Industries from "./Industries";
import OurWork from "./OurWork";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DatafalconHome />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/our-work" element={<OurWork />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
