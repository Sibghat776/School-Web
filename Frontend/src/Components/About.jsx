import React from "react";
import {
    GraduationCap,
    HeartHandshake,
    Globe2,
    ShieldCheck,
    Landmark,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
    return (
        <>
            <section
                id="about"
                className="bg-[#f2f6f9] text-[#1d1449] py-20 px-6 sm:px-10 md:px-24"
            >
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header Section */}
                    <div className="text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#234e18]">
                            <span className="text-[#1d1449]">Noor Public School</span>
                        </h2>
                    </div>

                    {/* Card Grid Section */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#234e18] mb-14">
                            Our Guiding Pillars
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {/* Vision */}
                            <div className="bg-gradient-to-br from-white via-[#e2f7e8] to-[#b2ceb7] rounded-2xl shadow-lg border-l-[6px] border-[#94c484] p-6 hover:scale-[1.02] transition duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <Globe2 className="text-[#498138]" size={32} />
                                    <h3 className="text-xl font-bold text-[#234e18]">Our Vision</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    To nurture future leaders grounded in Islamic character,
                                    academic excellence, and service to humanity.
                                </p>
                            </div>

                            {/* Mission */}
                            <div className="bg-gradient-to-br from-white via-[#d3cdf3] to-[#a0a0be] rounded-2xl shadow-lg border-l-[6px] border-[#5f5971] p-6 hover:scale-[1.02] transition duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <GraduationCap className="text-[#1d1449]" size={32} />
                                    <h3 className="text-xl font-bold text-[#1d1449]">Our Mission</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    To deliver holistic education that combines Islamic values with
                                    modern academics, preparing students for this world and the
                                    hereafter.
                                </p>
                            </div>

                            {/* Core Values */}
                            <div className="bg-gradient-to-br from-white via-[#eadfc9] to-[#d0c7b9] rounded-2xl shadow-lg border-l-[6px] border-[#c3ad74] p-6 hover:scale-[1.02] transition duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <HeartHandshake className="text-[#aa934e]" size={32} />
                                    <h3 className="text-xl font-bold text-[#6b5e3e]">Core Values</h3>
                                </div>
                                <ul className="list-disc text-[#3d534d] ml-5 text-sm space-y-1 leading-relaxed">
                                    <li>Truthfulness & Respect</li>
                                    <li>Faith & Responsibility</li>
                                    <li>Excellence in Knowledge</li>
                                    <li>Service & Leadership</li>
                                </ul>
                            </div>

                            {/* Discipline */}
                            <div className="bg-gradient-to-br from-white via-[#d4ecff] to-[#c8d4da] rounded-2xl shadow-lg border-l-[6px] border-[#7eadc9] p-6 hover:scale-[1.02] transition duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="text-[#5a97b1]" size={32} />
                                    <h3 className="text-xl font-bold text-[#1d3c55]">Discipline</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    A structured environment promoting punctuality, self-control,
                                    and dignity in accordance with Islamic values.
                                </p>
                            </div>

                            {/* Foundation */}
                            <div className="bg-gradient-to-br from-white via-[#ffd3d3] to-[#ffb7b7] rounded-2xl shadow-lg border-l-[6px] border-[#cf6363] p-6 hover:scale-[1.02] transition duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <Landmark className="text-[#cf6363]" size={32} />
                                    <h3 className="text-xl font-bold text-[#3d3a4d]">Our Foundation</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    Noor Public School is rooted in quality, community service,
                                    and Islamic tarbiyah — not just a school, but a vision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;