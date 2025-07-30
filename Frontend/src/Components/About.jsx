import React from "react";
import aboutImg from "../assets/About Image.jpg"; // Add a relevant image here

const About = () => {
    return (
        <section className="bg-[#dee9ee] py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                    <img
                        src={aboutImg}
                        alt="About Noor Public School"
                        className="w-full rounded-2xl shadow-xl"
                    />
                </div>
                <div className="md:w-1/2 text-[#1d1449]">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 border-b-4 border-[#498138] inline-block pb-1">
                        About Us
                    </h2>
                    <p className="text-lg leading-relaxed text-[#3d534d]">
                        Noor Public School is committed to providing quality education in a
                        nurturing and intellectually stimulating environment. We focus on
                        holistic development, fostering academic excellence, character
                        building, and creative skills in every student.
                    </p>
                    <p className="mt-4 text-[#67607e]">
                        Established with a vision to empower the future, our mission is to
                        guide young minds to become confident, responsible, and successful
                        individuals in society.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
