import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Hero"; // your slider section
import About from "../Components/About";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import NoticeBoard from "../Components/NoticeBoard";
import Gallery from "../Components/Gallery";

const Home = () => {
  return (
    <div className="bg-white overflow-x-hidden scroll-smooth">
      <Navbar />

      <Hero />

      <section id="about">
        <About />
      </section>

      <NoticeBoard />
      <Gallery />
      {/* <Events /> */}
      {/* <Testimonials /> */}
      {/* <Contact /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;