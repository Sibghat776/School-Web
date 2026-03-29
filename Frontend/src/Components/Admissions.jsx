"use client";
import React from 'react';
import { GraduationCap, BookOpenText, CalendarCheck, Users, ArrowRight, MessageCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';
import { getWhatsappLink } from '../utils/commonFunctions';
import { Link } from 'react-router-dom';

const Admission = () => {
    return (
        <div className="bg-[#fcfdfe] min-h-screen font-sans selection:bg-[#1d114e] selection:text-white">
            <Navbar />

            {/* --- Hero Section with Geometric Background --- */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] -z-10" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl -z-10" />

                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-[3px] mb-8 shadow-sm">
                        <Sparkles size={14} className="animate-pulse" /> Now Enrolling 2026-27
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-[#1d114e] mb-8 tracking-tight leading-[1.1]">
                        Join the Legacy of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d114e] to-[#448026]">Academic Excellence</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                        Unlock a bright future for your child with quality education, character building, and a nurturing environment designed for success.
                    </p>
                </div>
            </section>

            {/* --- Main Content Grid --- */}
            <section className="pb-24 px-4 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10">

                        {/* Card 1: Who Can Apply */}
                        <div className="group bg-white p-10 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-amber-400/50 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-10 group-hover:bg-amber-50 transition-colors" />
                            <div className="flex items-center gap-5 mb-8">
                                <div className="p-4 bg-[#1d114e] rounded-2xl text-white shadow-xl shadow-indigo-100">
                                    <GraduationCap size={28} />
                                </div>
                                <h2 className="text-2xl font-black text-[#1d114e] tracking-tight">Who Can Apply?</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                We welcome students from <span className="text-[#1d114e] font-bold">Nursery to Class 10</span>. Admissions are open to all children based on merit, availability, and a short assessment to ensure the right placement.
                            </p>
                        </div>

                        {/* Card 2: Required Documents */}
                        <div className="group bg-white p-10 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-indigo-400/50 transition-all duration-500">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="p-4 bg-amber-500 rounded-2xl text-white shadow-xl shadow-amber-100">
                                    <BookOpenText size={28} />
                                </div>
                                <h2 className="text-2xl font-black text-[#1d114e] tracking-tight">Required Documents</h2>
                            </div>
                            <ul className="grid grid-cols-1 gap-4">
                                {['Birth Certificate / B-Form', 'Passport-sized Photographs', 'Previous School Record (if any)', 'Parent/Guardian CNIC Copy'].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm bg-slate-50 p-3 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                                        <div className="h-2 w-2 rounded-full bg-amber-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Card 3: Admission Schedule */}
                        <div className="group bg-[#1d114e] p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white transition-all duration-500 hover:-translate-y-2">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-amber-400">
                                    <CalendarCheck size={28} />
                                </div>
                                <h2 className="text-2xl font-black tracking-tight">Admission Schedule</h2>
                            </div>
                            <p className="text-indigo-100/80 leading-relaxed font-medium text-lg">
                                Admissions usually open in <span className="text-amber-400 font-black italic">March</span> for the new academic session. Exact dates are announced via our official notice board and social media channels.
                            </p>
                            <div className="mt-8 flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest">
                                <div className="h-[1px] w-8 bg-amber-400" /> Plan Your Visit
                            </div>
                        </div>

                        {/* Card 4: Why Choose Us */}
                        <div className="group bg-white p-10 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-[#448026]/50 transition-all duration-500">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="p-4 bg-[#448026] rounded-2xl text-white shadow-xl shadow-green-100">
                                    <Users size={28} />
                                </div>
                                <h2 className="text-2xl font-black text-[#1d114e] tracking-tight">Why Choose Us?</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'Experienced and qualified faculty',
                                    'Islamic and modern education blend',
                                    'Safe and secure learning environment'
                                ].map((text, i) => (
                                    <div key={i} className="flex items-start gap-3 group/item">
                                        <div className="mt-1.5 h-4 w-4 rounded-full border-2 border-[#448026] flex items-center justify-center shrink-0">
                                            <div className="h-1.5 w-1.5 rounded-full bg-[#448026] scale-0 group-hover/item:scale-100 transition-transform" />
                                        </div>
                                        <span className="text-slate-600 font-bold">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Call to Action --- */}
                    <div className="mt-20 text-center bg-gradient-to-tr from-[#1d114e] to-[#2d1b7a] p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />

                        <h3 className="text-3xl font-black text-white mb-6">Ready to Start the Journey?</h3>
                        <Link
                            to="/registration"
                            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-white text-[#1d114e] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[2px] shadow-xl transition-all duration-300 active:scale-95 group"
                        >
                            Start Online Registration <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    {/* --- Footer Contact Info --- */}
                    <div className="mt-20 border-t border-slate-100 pt-16">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <h4 className="text-[#1d114e] font-black text-xl mb-2">Visit Our Admissions Office</h4>
                                <p className="text-slate-500 font-medium">Monday — Saturday | 8:00 AM - 2:00 PM</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                {/* WhatsApp Campus I */}
                                <a
                                    href="https://wa.me/923032021040?text=Assalam u alaikum
                                    I've Raached you throughout your official website."
                                    target="_blank"
                                    className="flex items-center gap-3 bg-green-50 text-green-700 px-6 py-3 rounded-2xl border border-green-100 hover:bg-green-600 hover:text-white transition-all font-bold"
                                >
                                    <MessageCircle size={20} /> Campus I
                                </a>

                                {/* WhatsApp Campus II */}
                                <a
                                    href="https://wa.me/923172108821"
                                    target="_blank"
                                    className="flex items-center gap-3 bg-green-50 text-green-700 px-6 py-3 rounded-2xl border border-green-100 hover:bg-green-600 hover:text-white transition-all font-bold"
                                >
                                    <MessageCircle size={20} /> Campus II
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:noorpubsch@gmail.com"
                                    target='_blank'
                                    className="flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all font-bold"
                                >
                                    <Mail size={20} /> Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Admission;