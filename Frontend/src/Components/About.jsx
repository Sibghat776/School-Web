import React from "react";
import {
    GraduationCap,
    HeartHandshake,
    Globe2,
    ShieldCheck,
    Landmark,
    Award,
} from "lucide-react";

const About = () => {
    return (
        <section id="about" className="bg-[#f2f6f9] text-[#1d1449] py-24 px-6 md:px-24">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* --- Main Header --- */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase italic">
                        Noor Public <span className="text-blue-600">School</span>
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm sm:text-base">
                        Great Education • Strong Character • Future Leaders
                    </p>
                </div>

                {/* --- Pillars Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Vision */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-slate-100 hover:border-blue-500/20 transition-all">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Globe2 className="text-blue-600" size={28} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-3">Our Vision</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            We help students become great leaders who have strong Islamic values and the skills to help everyone in the world.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-purple-500/5 border border-slate-100 hover:border-purple-500/20 transition-all">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <GraduationCap className="text-purple-600" size={28} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-3">Our Mission</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            To provide the best education by mixing Islamic teachings with modern studies, preparing students for success in this life and the next.
                        </p>
                    </div>

                    {/* Core Values */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-amber-500/5 border border-slate-100 hover:border-amber-500/20 transition-all">
                        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <HeartHandshake className="text-amber-600" size={28} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-3">Core Values</h3>
                        <ul className="text-slate-600 text-xs font-bold uppercase tracking-widest space-y-2">
                            <li className="flex items-center gap-2 italic"> <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Honesty & Respect</li>
                            <li className="flex items-center gap-2 italic"> <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Faith & Hard Work</li>
                            <li className="flex items-center gap-2 italic"> <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Helping Others</li>
                        </ul>
                    </div>

                    {/* Discipline */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-500/5 border border-slate-100 hover:border-emerald-500/20 transition-all">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="text-emerald-600" size={28} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-3">Discipline</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            We teach students to be on time, follow rules, and respect everyone according to Islamic manners.
                        </p>
                    </div>

                    {/* Foundation */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-rose-500/5 border border-slate-100 hover:border-rose-500/20 transition-all">
                        <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Landmark className="text-rose-600" size={28} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-3">Our History</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            Established in 1998, Noor Public School is built on trust, quality teaching, and good Islamic upbringing.
                        </p>
                    </div>

                    {/* Achievements */}
                    <div className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-cyan-500/5 border border-slate-100 hover:border-cyan-500/20 transition-all">
                        <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Award className="text-cyan-600" size={28} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight mb-3">Success</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            Our students always do great in exams, sports, and helping the community. We are proud of their hard work.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;