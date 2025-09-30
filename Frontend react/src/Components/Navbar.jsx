import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinkClass = (path) =>
        `relative transition duration-200 hover:text-[#94c400] ${location.pathname === path
            ? "text-[#94c400] underline font-extrabold"
            : "text-white"
        }`;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md 
                ${isScrolled
                    ? "bg-[#1d5546]/100 backdrop-blur-md"
                    : "bg-[#1d5546]/70"
                }
`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 md:h-16">
                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-12 object-contain" />
                        <span
                            onClick={scrollToTop}
                            className="text-white font-bold text-lg md:text-2xl tracking-wide"
                        >
                            NOOR PUBLIC SCHOOL
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" onClick={scrollToTop} className={navLinkClass("/")}>
                            Home
                        </Link>
                        <Link to="/admission" onClick={scrollToTop} className={navLinkClass("/admission")}>
                            Admissions
                        </Link>
                        <Link to="/gallery" onClick={scrollToTop} className={navLinkClass("/gallery")}>
                            Gallery
                        </Link>
                        <Link to="/contact" onClick={scrollToTop} className={navLinkClass("/contact")}>
                            Contact
                        </Link>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 ml-4">
                            <a href="https://www.facebook.com/NoorPublicSchool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1877F2] transition duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E1306C] transition duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="https://linkedin.com/in/noorpublicschool" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#0A66C2] transition duration-300">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            className="text-white focus:outline-none"
                        >
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {open && (
                <div className="md:hidden bg-[#1d1449]/90 backdrop-blur-md px-6 pt-4 pb-6 space-y-4 rounded-b-xl transition-all duration-300">
                    <Link to="/" onClick={scrollToTop} className="block text-white hover:text-[#94c484]">
                        Home
                    </Link>
                    <Link to="/admission" onClick={scrollToTop} className="block text-white hover:text-[#94c484]">
                        Admissions
                    </Link>
                    <Link to="/gallery" onClick={scrollToTop} className="block text-white hover:text-[#94c484]">
                        Gallery
                    </Link>
                    <Link to="/contact" onClick={scrollToTop} className="block text-white hover:text-[#94c484]">
                        Contact
                    </Link>

                    {/* Social Icons in Mobile */}
                    <div className="flex gap-4 mt-4">
                        <a href="https://facebook.com" className="text-white hover:text-[#1877F2]">
                            <Facebook size={18} />
                        </a>
                        <a href="https://instagram.com" className="text-white hover:text-[#E1306C]">
                            <Instagram size={18} />
                        </a>
                        <a href="https://twitter.com" className="text-white hover:text-[#1DA1F2]">
                            <Twitter size={18} />
                        </a>
                        <a href="https://linkedin.com" className="text-white hover:text-[#0A66C2]">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;