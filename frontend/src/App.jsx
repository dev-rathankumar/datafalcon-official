import { BrowserRouter, Routes, Route } from "react-router-dom";
import DatafalconHome from "./Homepage";
import Services from "./Services";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DatafalconHome />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
