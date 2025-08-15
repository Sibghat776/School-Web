import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
        `relative transition duration-300 hover:text-[#94c484] ${location.pathname === path ? "text-[#94c484]" : "text-white"
        }`;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md 
                ${isScrolled
                    ? "bg-[#1d5546]/80 backdrop-blur-md"  // Scroll hone par
                    : "bg-[#1d5546]/70"                   // Default
                }
`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-12 object-contain" />
                        <span onClick={() => window.scrollTo(0, 0)} className="text-white font-semibold text-lg md:text-xl tracking-wide hidden md:inline-block">
                            NOOR PUBLIC SCHOOL
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={navLinkClass("/")}>
                            Home
                        </Link>
                        <a href="/about" className="text-white hover:text-[#94c484] transition">
                            About
                        </a>
                        <Link to="/admission" className={navLinkClass("/admission")}>
                            Admissions
                        </Link>
                        <Link to="/contact" className={navLinkClass("/contact")}>
                            Contact
                        </Link>

                        <div className="ml-4 flex gap-2">
                            <button className="px-4 py-1.5 text-sm border border-white text-white rounded-full hover:bg-white hover:text-[#1d1449] transition duration-200">
                                Sign In
                            </button>
                            <button className="px-4 py-1.5 text-sm bg-[#498138] text-white rounded-full hover:bg-[#234e18] transition duration-200">
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {
                open && (
                    <div className="md:hidden bg-[#1d1449]/90 backdrop-blur-md px-6 pt-4 pb-6 space-y-4 rounded-b-xl transition-all duration-300">
                        <Link to="/" className="block text-white hover:text-[#94c484]">
                            Home
                        </Link>
                        <a href="#about" className="block text-white hover:text-[#94c484]">
                            About
                        </a>
                        <Link to="/admission" className="block text-white hover:text-[#94c484]">
                            Admissions
                        </Link>
                        <Link to="/contact" className="block text-white hover:text-[#94c484]">
                            Contact
                        </Link>

                        <div className="pt-3 space-y-2">
                            <button className="w-full py-2 border border-white text-white rounded-full hover:bg-white hover:text-[#1d1449] transition duration-200">
                                Sign In
                            </button>
                            <button className="w-full py-2 bg-[#498138] text-white rounded-full hover:bg-[#234e18] transition duration-200">
                                Sign Up
                            </button>
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;