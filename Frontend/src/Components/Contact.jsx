"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send, MessageSquare, Clock, Globe } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { showToast } from "../utils/commonFunctions";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            return showToast("Please fill all Fields!", "error", "dark");
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post(`${baseUrl}contact/sendMessage`, {
                name,
                email,
                message
            });
            showToast(res.data.message || "Message sent successfully!", "success", "light");
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            showToast("Something went wrong. Please try again.", "error", "dark");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen selection:bg-[white] selection:text-[#1d114e]">
            <Navbar />

            {/* --- Hero Header --- */}
            <div className="relative pt-40 pb-20 bg-[#1d114e] overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-[#f8fafc] mb-4 tracking-tight">
                        Let’s Start a <span className="text-amber-400">Conversation</span>
                    </h1>
                    <p className="text-indigo-200/100 text-lg max-w-2xl mx-auto font-medium">
                        Whether you're a parent seeking admission or a visitor with a query, our doors (and inboxes) are always open.
                    </p>
                </div>
            </div>

            <section className="py-20 px-6 mt-[-60px]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">

                    {/* --- Left Column: Info --- */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Contact Cards Container */}
                        <div className="grid gap-6">
                            {/* Campus 1 */}
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/50 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500 group">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#1d114e] text-[10px] font-black uppercase tracking-widest border border-indigo-100">Main Campus</span>
                                </div>
                                <h4 className="text-2xl font-black text-[#1d114e] mb-4">Campus I</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 text-slate-600">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><MapPin size={20} /></div>
                                        <span className="font-medium">Ghazi Nagar, Siddique Wahab Road, Street # 20, Karachi</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600">
                                        <div className="p-2 bg-green-50 rounded-lg text-green-600"><Phone size={20} /></div>
                                        <span className="font-bold">+92 315 2779033</span>
                                    </div>
                                </div>
                            </div>

                            {/* Campus 2 */}
                            <div className="bg-white p-8 rounded-[2rem] border-slate-200/50 shadow-sm border hover:shadow-xl hover:shadow-green-50 transition-all duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-green-50 text-[#448026] text-[10px] font-black uppercase tracking-widest border border-green-100">Primary Branch</span>
                                </div>
                                <h4 className="text-2xl font-black text-[#1d114e] mb-4">Campus II</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 text-slate-600">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><MapPin size={20} /></div>
                                        <span className="font-medium">Ranchorline KMC Store, Nishter Road, Karachi</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600">
                                        <div className="p-2 bg-green-50 rounded-lg text-green-600"><Phone size={20} /></div>
                                        <span className="font-bold">+92 317 2108821</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/50 flex justify-between items-center">
                            <span className="font-black text-[#1d114e] uppercase tracking-tighter">Follow Us</span>
                            <div className="flex gap-4">
                                {[
                                    {
                                        icon: <Facebook size={20} />,
                                        base: "text-blue-600 border-blue-600",
                                        hover: "hover:bg-blue-600 hover:text-white"
                                    },
                                    {
                                        icon: <Twitter size={20} />,
                                        base: "text-sky-500 border-sky-500",
                                        hover: "hover:bg-sky-500 hover:text-white"
                                    },
                                    {
                                        icon: <Instagram size={20} />,
                                        base: "text-pink-600 border-pink-600",
                                        hover: "hover:bg-pink-600 hover:text-white"
                                    },
                                    {
                                        icon: <Youtube size={20} />,
                                        base: "text-red-600 border-red-600",
                                        hover: "hover:bg-red-600 hover:text-white"
                                    }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className={`w-10 h-10 border-2 rounded-xl flex items-center justify-center transition-all duration-300 ${social.base} ${social.hover}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Form --- */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-8 md:p-12 border border-slate-200/50 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-[#1d114e] tracking-tight">Send a Message</h3>
                                        <p className="text-slate-400 text-sm font-medium">We usually respond within 24 hours.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#1d114e] uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                placeholder="Enter your name"
                                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-200 transition-all font-medium"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[#1d114e] uppercase tracking-widest ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={email}
                                                placeholder="e.g. name@mail.com"
                                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-200 transition-all font-medium"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-[#1d114e] uppercase tracking-widest ml-1">Your Message</label>
                                        <textarea
                                            rows="5"
                                            placeholder="Tell us how we can help..."
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-200 transition-all font-medium resize-none"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto bg-[#1d114e] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[2px] shadow-xl shadow-indigo-100 hover:bg-amber-500 hover:shadow-amber-200 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {isSubmitting ? "Sending..." : "Submit Message"}
                                        {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </button>
                                </form>
                            </div>

                            {/* Decorative Background for Form */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-0" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Quick Info Strip --- */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: <Clock className="text-amber-500" />, label: "Hours", val: "8AM - 2PM" },
                        { icon: <Globe className="text-indigo-500" />, label: "Location", val: "Karachi, PK" },
                        { icon: <Mail className="text-red-500" />, label: "Email", val: "noorpubsch@gmail.com" },
                        { icon: <Phone className="text-green-500" />, label: "Support", val: "Available" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/50 flex flex-col items-center text-center">
                            <div className="mb-2">{item.icon}</div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.label}</p>
                            <p className="text-sm font-bold text-[#1d114e]">{item.val}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;