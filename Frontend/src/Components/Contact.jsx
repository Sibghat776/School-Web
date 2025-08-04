import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Contact = () => {
    return (
        <>
            <Navbar admission={"admission"} />
             <section className="min-h-screen bg-gradient-to-br from-[#e8f3f1] via-white to-[#dbece2] py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-4xl font-bold text-[#1d1449] mb-6">Get in Touch</h2>
                        <p className="text-[#3d534d] mb-6 leading-relaxed">
                            Have a question or just want to say hi? We’re here to help and answer any questions you might have.
                        </p>

                        <div className="space-y-4 mb-8 text-[#3d534d]">
                            <div className="flex items-center gap-3">
                                <MapPin className="text-[#498138]" />
                                <span>Noor Public School, Main Road, Karachi</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="text-[#498138]" />
                                <span>+92 300 1234567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-[#498138]" />
                                <a href="mailto:noorpubsch@gmail.com" className="hover:underline">
                                    noorpubsch@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-5 text-2xl">
                            <a href="#" className="text-[#4267B2] hover:scale-110 transition duration-300">
                                <Facebook />
                            </a>
                            <a href="#" className="text-[#1DA1F2] hover:scale-110 transition duration-300">
                                <Twitter />
                            </a>
                            <a href="#" className="text-[#C13584] hover:scale-110 transition duration-300">
                                <Instagram />
                            </a>
                            <a href="#" className="text-[#FF0000] hover:scale-110 transition duration-300">
                                <Youtube />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-l-[6px] border-[#94c484]">
                        <h3 className="text-xl font-semibold mb-4 text-[#1d1449]">Send us a message</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-[#3d534d]">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94c484]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#3d534d]">Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94c484]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#3d534d]">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="Your message..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94c484]"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#1d1449] text-white px-6 py-2 rounded-full hover:bg-[#2a1f61] transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;
