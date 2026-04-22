import React from "react";
import Home from "./Pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Admission from "./Components/Admissions";
import About from "./Components/About";
import PageNotFound from "./Components/PageNotFound";
import Contact from "./Components/Contact";
import { ToastContainer } from "react-toastify";
import Gallery from "./Components/Gallery";
import Registration from "./Components/Registration";
import AdminRoutes from "./Private Routes/AdminRoutes";
import AdminDashboard from "./Pages/AdminDashboard";
import Overview from "./Admin Dashboard/Overview";
import TeachersList from "./Admin Dashboard/TeachersList";
import AdminSettings from "./Admin Dashboard/Settings";


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


        <Route path="/admin" element={<AdminRoutes />} >
          <Route element={<AdminDashboard />} >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="teachers" element={<TeachersList />} />
            <Route path="settings" element={<AdminSettings />} />
            {/* Future Admin Pages */}
          </Route >
        </Route>
      </Routes>
    </div>
  );
};

export default App;