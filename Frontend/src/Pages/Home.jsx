import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import About from "../Components/About";
import NoticeBoard from "../Components/NoticeBoard";
import Gallery from "../Components/Gallery";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="bg-white overflow-x-hidden scroll-smooth selection:bg-blue-600 selection:text-white">
      {/* --- Navigation --- */}
      <Navbar />

      {/* --- Hero Section --- */}
      <Hero />

      {/* --- Main Content --- */}
      <main>
        {/* About Section (Intro & Pillars) */}
        <section id="about-us">
          <About />
        </section>

        {/* Notice Board - Latest Updates */}
        <section id="announcements">
          <NoticeBoard />
        </section>
      </main>

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
};

export default Home;