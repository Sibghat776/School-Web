import React, { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behaviour: "smooth" })
    }

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
            ? "text-blue-400 border-b-2 border-[#418026]"
            : location.pathname === "/"
                ? "text-white hover:text-[#448026]"
                : "text-black hover:text-[#448026]"
        } ${scrolled ? "text-white hover:text-[#448026]" : ""}`;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-[#1d114e]/90 backdrop-blur-md shadow-lg"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                    onClick={() => setOpen(false)}
                >
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                    <div>
                        <h1
                            className={`font-bold text-lg transition-colors ${location.pathname === "/"
                                ? "text-white"
                                : scrolled
                                    ? "text-white"
                                    : ""
                                }`}
                        >
                            NOOR PUBLIC SCHOOL
                        </h1>
                        <p className={`text-xs tracking-wide ${location.pathname === "/" || scrolled ? "text-[#c6ffdd]" : "text-[#2a661b]"
                            }`}>
                            Knowledge • Discipline • Success
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className={`hidden md:flex items-center gap-8`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={scrollToTop}
                            className={linkClass(link.path)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Social */}
                <div className="hidden md:flex items-center gap-4 ml-6">
                    <a
                        href="https://www.facebook.com/noorpublicschool"
                        target="_blank"
                        className={`transition ${location.pathname === "/" || scrolled
                            ? "text-white/60"
                            : "text-black/70"
                            } hover:text-[#1877F2]`}
                    >
                        <Facebook size={18} />
                    </a>

                    <a
                        href="https://www.instagram.com/noor_public_school_karachi/"
                        target="_blank"
                        className={`transition ${location.pathname === "/" || scrolled
                            ? "text-white/60"
                            : "text-black/70"
                            } hover:text-[#D62976]`}
                    >
                        <Instagram size={18} />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/noorpublicschool"
                        target="_blank"
                        className={`transition ${location.pathname === "/" || scrolled
                            ? "text-white/60"
                            : "text-black/70"
                            } hover:text-[#0a66c2]`}
                    >
                        <Linkedin size={18} />
                    </a>
                </div>

                {/* Mobile Menu Button (ONLY MOBILE) */}
                <button
                    onClick={() => setOpen(!open)}
                    className={`md:hidden ${location.pathname === "/" || scrolled
                        ? "text-white"
                        : "text-black"
                        }`}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu (ONLY MOBILE) */}
            {(open || window.scroll === null) && (
                <div className="bg-black/50 z-10 h-screen transition-opacity " onClick={() => setOpen(false)}>
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
                            <Facebook className="text-white/60 hover:text-[#1877F2]" size={18} />
                            <Instagram className="text-white/60 hover:text-[#D62976]" size={18} />
                            <Linkedin className="text-white/60 hover:text-[#0a66c2]" size={18} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;