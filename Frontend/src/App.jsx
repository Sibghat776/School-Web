import React from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Admission from "./Components/Admissions";
import About from "./Components/About";
import PageNotFound from "./Components/PageNotFound";
import Contact from "./Components/Contact";
import { ToastContainer } from "react-toastify";
import Gallery from "./Components/Gallery";
import Registration from "./Components/Registration";
import AdminRoutes from "./Private Routes/AdminRoutes";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<PageNotFound />} />


        <Route path="/admin" element={<AdminRoutes />} />

      </Routes>
    </div>
  );
};

export default App;