import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import About from "../Components/About";
import NoticeBoard from "../Components/NoticeBoard";
import Gallery from "../Components/Gallery";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="bg-white overflow-x-hidden scroll-smooth">
      <Navbar />
      <Hero />
      <NoticeBoard />
      <Footer />
    </div>
  );
};

export default Home;
