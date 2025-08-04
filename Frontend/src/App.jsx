import React from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Admission from "./Components/Admissions";
import About from "./Components/About";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;