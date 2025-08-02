import React from "react";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#1e1e2f] text-white pt-14 pb-8 px-4 sm:px-8 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

                {/* School Info */}
                <div>
                    <h2 className="text-2xl font-bold text-[#ffe066] mb-4">Noor Public School</h2>
                    <p className="text-white/80 text-sm leading-relaxed">
                        A vibrant hub for creative learning, excellence, and values. We believe in empowering every student to shine bright in life.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-[#4dabf7] mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[#ff6b6b] transition">Home</a></li>
                        <li><a href="#" className="hover:text-[#ff6b6b] transition">About</a></li>
                        <li><a href="#" className="hover:text-[#ff6b6b] transition">Admissions</a></li>
                        <li><a href="#" className="hover:text-[#ff6b6b] transition">Gallery</a></li>
                        <li><a href="#" className="hover:text-[#ff6b6b] transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-[#4dabf7] mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <MapPin className="text-[#ffe066] w-4 h-4 mt-1" />
                            Main Campus, City Name, Pakistan
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="text-[#ffe066] w-4 h-4" />
                            +92 300 1234567
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="text-[#ffe066] w-4 h-4" />
                            info@noorpublicschool.edu.pk
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold text-[#4dabf7] mb-4">Follow Us</h3>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="hover:scale-110 transition duration-300">
                            <Facebook className="text-white hover:text-[#3b5998] w-6 h-6" />
                        </a>
                        <a href="#" className="hover:scale-110 transition duration-300">
                            <Twitter className="text-white hover:text-[#1DA1F2] w-6 h-6" />
                        </a>
                        <a href="#" className="hover:scale-110 transition duration-300">
                            <Instagram className="text-white hover:text-[#e1306c] w-6 h-6" />
                        </a>
                        <a href="#" className="hover:scale-110 transition duration-300">
                            <Linkedin className="text-white hover:text-[#0077b5] w-6 h-6" />
                        </a>
                        <a href="#" className="hover:scale-110 transition duration-300">
                            <Youtube className="text-white hover:text-[#FF0000] w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider & Copyright */}
            <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/60">
                © {new Date().getFullYear()} Noor Public School. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;