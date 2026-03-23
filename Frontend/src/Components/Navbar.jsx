import React, { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Admissions", path: "/admission" },
        { name: "Gallery", path: "/gallery" },
        { name: "Contact", path: "/contact" },
    ];

    // Classy Link Styling
    const getLinkStyles = (path) => {
        const isActive = location.pathname === path;
        const isHomeAndNotScrolled = location.pathname === "/" && !scrolled;

        return `relative px-2 py-1 text-[13px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 group ${isActive
                ? "text-amber-400" // Gold accent for active
                : isHomeAndNotScrolled ? "text-white hover:text-amber-200" : "text-slate-800 hover:text-[#448026]"
            } ${scrolled ? "text-white hover:text-amber-200" : ""}`;
    };

    return (
        <nav
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled
                    ? "bg-[#1d114e]/95 backdrop-blur-lg py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/10"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">

                {/* Logo & School Name */}
                <Link to="/" className="flex items-center gap-4 group" onClick={scrollToTop}>
                    <div className="relative">
                        <img src={logo} alt="Logo" className="h-14 w-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute -inset-1 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className={`font-black text-xl tracking-tighter leading-none transition-colors ${location.pathname === "/" || scrolled ? "text-white" : "text-slate-900"
                            }`}>
                            NOOR <span className="text-[#448026]">PUBLIC</span> SCHOOL
                        </h1>
                        <p className={`text-[10px] uppercase tracking-[0.3em] font-bold mt-1 ${location.pathname === "/" || scrolled ? "text-amber-400/80" : "text-[#448026]"
                            }`}>
                            Knowledge • Discipline • Success
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} onClick={scrollToTop} className={getLinkStyles(link.path)}>
                                {link.name}
                                {/* Animated Underline Effect */}
                                <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? "w-full" : ""}`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Vertical Divider */}
                    <div className={`h-6 w-[1px] mx-2 ${location.pathname === "/" || scrolled ? "bg-white/20" : "bg-black/10"}`}></div>

                    {/* Social Icons with Glass Effect */}
                    <div className="flex items-center gap-3">
                        {[
                            { icon: <Facebook size={16} />, link: "https://facebook.com/...", color: "hover:bg-[#1877F2]" },
                            { icon: <Instagram size={16} />, link: "https://instagram.com/...", color: "hover:bg-[#D62976]" },
                            { icon: <Linkedin size={16} />, link: "https://linkedin.com/...", color: "hover:bg-[#0a66c2]" }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                className={`p-2 rounded-full transition-all duration-300 border ${location.pathname === "/" || scrolled
                                        ? "text-white border-white/20 hover:border-transparent"
                                        : "text-slate-700 border-slate-200 hover:text-white"
                                    } ${social.color}`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className={`md:hidden p-2 rounded-lg transition-colors ${location.pathname === "/" || scrolled ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5"
                        }`}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[-1] transition-opacity duration-300 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`} onClick={() => setOpen(false)} />

            {/* Mobile Menu Drawer */}
            <div className={`fixed top-0 right-0 h-screen w-[75%] max-w-sm bg-[#1d114e] shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-end mb-8">
                        <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white"><X size={32} /></button>
                    </div>

                    <div className="space-y-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => { setOpen(false); scrollToTop(); }}
                                className={`block text-2xl font-bold tracking-tight transition-colors ${location.pathname === link.path ? "text-amber-400" : "text-white hover:text-amber-200"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/10">
                        <p className="text-amber-400/60 text-xs uppercase tracking-widest mb-4">Connect With Us</p>
                        <div className="flex gap-6 text-white/70">
                            <Facebook className="hover:text-amber-400 cursor-pointer transition-colors" />
                            <Instagram className="hover:text-amber-400 cursor-pointer transition-colors" />
                            <Linkedin className="hover:text-amber-400 cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;