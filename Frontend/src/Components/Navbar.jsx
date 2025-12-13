import React, { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

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

    const linkClass = (path) =>
        `px-3 py-2 font-medium text-sm transition-colors duration-200 ${location.pathname === path
            ? "text-[#85bbd7] border-b-2 border-[#448026]"
            : "text-white hover:text-[#448026]"
        }`;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#1d114e]/90 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                    <div>
                        <h1 className="text-white font-bold text-lg">NOOR PUBLIC SCHOOL</h1>
                        <p className="text-[#a8d5ba] text-xs tracking-wide">Knowledge • Discipline • Success</p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} className={linkClass(link.path)}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Social */}
                <div className="hidden md:flex items-center gap-4 ml-6">
                    <a href="#" className="text-white/60 hover:text-[#88ff4d] transition">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="text-white/60 hover:text-[#91ff5a] transition">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="text-white/60 hover:text-[#8eff55] transition">
                        <Linkedin size={18} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setOpen(!open)} className="md:hidden text-white">
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-[#1d114e]/95 backdrop-blur-md shadow-xl border-t border-[#448026]/30 px-6 pt-4 pb-6 space-y-4 rounded-b-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className="block text-white hover:text-[#85bbd7] font-medium transition"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex gap-5 pt-4 border-t border-[#448026]/30">
                        <Facebook className="w-5 h-5 text-white/60 hover:text-[#85bbd7]" />
                        <Instagram className="w-5 h-5 text-white/60 hover:text-[#85bbd7]" />
                        <Linkedin className="w-5 h-5 text-white/60 hover:text-[#85bbd7]" />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;