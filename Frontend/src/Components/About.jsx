import React from "react";
import {
    GraduationCap,
    HeartHandshake,
    Globe2,
    ShieldCheck,
    Landmark,
    BookOpen,
    Award,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
    return (
        <>
            <section
                id="about"
                className="bg-[#f2f6f9] text-[#1d1449] py-24 px-6 sm:px-10 md:px-24"
            >
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header Section */}
                    <div className="text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold text-[#234e18] mb-4">
                            <span className="text-[#1d1449]">Noor Public School</span>
                        </h2>
                        <p className="text-[#444157] text-base sm:text-lg">
                            Excellence in Education, Character, and Leadership
                        </p>
                    </div>

                    {/* Card Grid Section */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#234e18] mb-16">
                            Our Guiding Pillars
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {/* Vision */}
                            <div className="bg-gradient-to-br from-[#e0f4e5] via-[#c6ebc9] to-[#a0d8a5] rounded-2xl shadow-xl border-l-8 border-[#498138] p-8 hover:scale-[1.05] transition-transform duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <Globe2 className="text-[#234e18]" size={36} />
                                    <h3 className="text-xl font-bold text-[#234e18]">Our Vision</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    To nurture future leaders grounded in Islamic character,
                                    academic excellence, and service to humanity.
                                </p>
                            </div>

                            {/* Mission */}
                            <div className="bg-gradient-to-br from-[#e6e0f8] via-[#c8c0f0] to-[#a8a0e0] rounded-2xl shadow-xl border-l-8 border-[#5f5971] p-8 hover:scale-[1.05] transition-transform duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <GraduationCap className="text-[#1d1449]" size={36} />
                                    <h3 className="text-xl font-bold text-[#1d1449]">Our Mission</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    To deliver holistic education that combines Islamic values with
                                    modern academics, preparing students for this world and the
                                    hereafter.
                                </p>
                            </div>

                            {/* Core Values */}
                            <div className="bg-gradient-to-br from-[#f9f3e3] via-[#f0e2c0] to-[#e6d19c] rounded-2xl shadow-xl border-l-8 border-[#aa934e] p-8 hover:scale-[1.05] transition-transform duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <HeartHandshake className="text-[#aa934e]" size={36} />
                                    <h3 className="text-xl font-bold text-[#6b5e3e]">Core Values</h3>
                                </div>
                                <ul className="list-disc text-[#3d534d] ml-6 text-sm space-y-1 leading-relaxed">
                                    <li>Truthfulness & Respect</li>
                                    <li>Faith & Responsibility</li>
                                    <li>Excellence in Knowledge</li>
                                    <li>Service & Leadership</li>
                                </ul>
                            </div>

                            {/* Discipline */}
                            <div className="bg-gradient-to-br from-[#d6f0ff] via-[#a8dbf0] to-[#7cc4e0] rounded-2xl shadow-xl border-l-8 border-[#5a97b1] p-8 hover:scale-[1.05] transition-transform duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <ShieldCheck className="text-[#1d3c55]" size={36} />
                                    <h3 className="text-xl font-bold text-[#1d3c55]">Discipline</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    A structured environment promoting punctuality, self-control,
                                    and dignity in accordance with Islamic values.
                                </p>
                            </div>

                            {/* Foundation */}
                            <div className="bg-gradient-to-br from-[#ffe3e3] via-[#ffc0c0] to-[#ff9c9c] rounded-2xl shadow-xl border-l-8 border-[#cf6363] p-8 hover:scale-[1.05] transition-transform duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <Landmark className="text-[#cf6363]" size={36} />
                                    <h3 className="text-xl font-bold text-[#3d3a4d]">Our Foundation</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    Noor Public School is rooted in quality, community service,
                                    and Islamic tarbiyah — not just a school, but a vision.
                                </p>
                            </div>

                            {/* Added New Pillar - Achievements */}
                            <div className="bg-gradient-to-br from-[#fff1d6] via-[#ffe2a8] to-[#ffd47a] rounded-2xl shadow-xl border-l-8 border-[#e6a23c] p-8 hover:scale-[1.05] transition-transform duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <Award className="text-[#e6993c]" size={36} />
                                    <h3 className="text-xl font-bold text-[#b5651d]">Achievements</h3>
                                </div>
                                <p className="text-[#3d534d] text-sm leading-relaxed">
                                    Our students consistently excel in academics, sports, and
                                    community service, representing the values we instill.
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
