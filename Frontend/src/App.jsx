import React from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Admission from "./Components/Admissions";
import About from "./Components/About";
import PageNotFound from "./Components/PageNotFound";
import Contact from "./Components/Contact";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;