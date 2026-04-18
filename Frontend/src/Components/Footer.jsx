import React, { useState } from "react";
import {
    Lock,
    User,
    ShieldCheck,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Phone,
    Mail,
    MapPin,
    X, // Close button ke liye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const [open, setOpen] = useState(false);
    const [adminName, setAdminName] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (adminPassword === "zfsmsma@123") {
            localStorage.setItem("admin", JSON.stringify({ adminName, adminPassword }));
            setOpen(false); // Modal band karne ke liye
            navigate("/admin");
        } else {
            setError("Ghalat Password! Dobara koshish karein.");
        }
    };

    return (
        <footer className="relative bg-[#1e1e2f] text-white pt-16 pb-8 px-6 lg:px-20 overflow-hidden">
            {/* Background Accent Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">

                {/* School Info */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#ffe066] tracking-tight">Noor Public School</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        A vibrant hub for creative learning, excellence, and values. We believe in empowering every student to shine bright in life.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-[#4dabf7] mb-6">Quick Links</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><a href="/" className="hover:text-[#ff6b6b] transition-colors">Home</a></li>
                        <li><a href="/about" className="hover:text-[#ff6b6b] transition-colors">About Us</a></li>
                        <li><a href="/admission" className="hover:text-[#ff6b6b] transition-colors">Admissions</a></li>
                        <li><a href="/gallery" className="hover:text-[#ff6b6b] transition-colors">Gallery</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold text-[#4dabf7] mb-6">Contact Us</h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <MapPin className="text-[#ffe066] w-5 h-5 flex-shrink-0" />
                            <span className="leading-snug">Ghazi Nagar, Street #20, Karachi.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-[#ffe066] w-4 h-4" />
                            <a href="tel:+923032021040" className="hover:text-white transition">+92 303 2021040</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-[#ffe066] w-4 h-4" />
                            <a href="mailto:noorpubsch@gmail.com" className="hover:text-white transition">noorpubsch@gmail.com</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-[#4dabf7] mb-6">Follow Our Journey</h3>
                    <div className="flex gap-4">
                        {[
                            { icon: Facebook, color: 'hover:bg-[#3b5998]', link: 'https://facebook.com/noorpublicschool' },
                            { icon: Instagram, color: 'hover:bg-[#e1306c]', link: 'https://instagram.com/noor_public_school_karachi/' },
                            { icon: Youtube, color: 'hover:bg-[#FF0000]', link: 'https://youtube.com/@noorpublicschool' }
                        ].map((social, idx) => (
                            <a key={idx} href={social.link} target="_blank" className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 ${social.color} hover:-translate-y-1`}>
                                <social.icon className="w-5 h-5 text-white" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider & Copyright */}
            <div className="border-t border-white/10 mt-16 pt-8 text-center relative z-10">
                <button
                    onClick={() => setOpen(true)}
                    className="text-gray-500 text-xs hover:text-gray-300 transition-colors tracking-widest uppercase"
                >
                    © {new Date().getFullYear()} Noor Public School Karachi. All rights reserved.
                </button>
            </div>

            {/* --- ADMIN LOGIN MODAL (THE SECRET PORTAL) --- */}
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Dark Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setOpen(false)}></div>

                    {/* Login Card */}
                    <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white z-20"
                        >
                            <X size={24} />
                        </button>

                        <div className="bg-gradient-to-br from-[#1d1449] to-[#2E3192] p-10 text-center text-white">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 rotate-3">
                                <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-2xl font-bold">Admin Portal</h2>
                            <p className="text-blue-200/70 text-sm mt-2 font-light">Verification required to access dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center animate-bounce">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Admin Identity</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-gray-700"
                                        placeholder="Enter Username"
                                        onChange={(e) => setAdminName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Access Key</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-gray-700"
                                        placeholder="••••••••"
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#1d1449] py-4 rounded-2xl text-white font-bold shadow-lg shadow-blue-900/20 hover:bg-[#2e236b] active:scale-[0.97] transition-all mt-4"
                            >
                                Authenticate & Enter
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;