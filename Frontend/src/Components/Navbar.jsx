import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-100 ease-in-out shadow-sm ${isScrolled ? "backdrop-blur-md bg-[#1d1449]/40" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo + School Name */}
                    <Link to="/" className="flex items-center gap-1">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-12 object-contain"
                        />
                        <span className="text-white font-bold text-xl hidden md:inline-block tracking-wide">
                            NOOR PUBLIC SCHOOL
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-white hover:text-[#94c484] transition">Home</Link>
                        <Link to="/about" className="text-white hover:text-[#94c484] transition">About</Link>
                        <Link to="/admission" className="text-white hover:text-[#94c484] transition">Admissions</Link>
                        <Link to="/contact" className="text-white hover:text-[#94c484] transition">Contact</Link>

                        <div className="space-x-3">
                            <button className="px-4 py-1 text-white border border-white rounded-full hover:bg-white hover:text-black transition">Sign In</button>
                            <button className="px-4 py-1 text-white bg-[#498138] rounded-full hover:bg-[#234e18] transition">Sign Up</button>
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setOpen(!open)} className="text-white">
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {open && (
                <div className={`md:hidden px-6 pb-6 pt-4 rounded-b-lg shadow-md transition-all duration-100 ease-in-out ${isScrolled ? "backdrop-blur-md" : "backdrop-blur-0"}`}>
                    <Link to="/" className="block text-white py-2">Home</Link>
                    <Link to="/about" className="block text-white py-2">About</Link>
                    <Link to="/admissions" className="block text-white py-2">Admissions</Link>
                    <Link to="/contact" className="block text-white py-2">Contact</Link>
                    <div className="mt-4 space-y-2">
                        <button className="w-full py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition">Sign In</button>
                        <button className="w-full py-2 bg-[#498138] text-white rounded-full hover:bg-[#234e18] transition">Sign Up</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;