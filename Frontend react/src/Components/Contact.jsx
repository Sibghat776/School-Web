import React, { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useFetch from "../Hooks/useFetch";
import { showToast } from "../utils/commonFunctions";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !message) showToast("Please fill all Fields !", "error", "dark")
        const res = await axios.post(`${baseUrl}contact/sendMessage`, {
            name,
            email,
            message
        })
        showToast(res.data.message, "success", "light")
        setName("")
        setEmail("")
        setMessage("")
    }
    return (
        <>
            <Navbar />
            <section className="min-h-fit bg-gradient-to-br from-[#e8f3f1] via-white to-[#dbece2] py-28 px-6">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

                    {/* Left Column */}
                    <div>
                        <h2 className="text-4xl font-bold text-[#1d1449] mb-6">Get in Touch</h2>
                        <p className="text-[#3d534d] mb-6 leading-relaxed">
                            Have a question or just want to say hi? We’re here to help and answer any questions you might have.
                        </p>

                        {/* Addresses */}
                        <div className="space-y-6 mb-8 text-[#3d534d]">
                            {/* Campus 1 */}
                            <div>
                                <h4 className="font-semibold text-lg text-[#1d1449] mb-2">Campus 1</h4>
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-[#498138] mt-1" />
                                    <span>Ghazi Nagar, Siddique Wahab Road, Street # 20, Karachi</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="text-[#498138]" />
                                <span>+92 315 2779033</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <Mail className="text-[#498138]" />
                                <a href="mailto:noorpubsch@gmail.com" className="hover:underline">
                                    noorpubsch@gmail.com
                                </a>
                            </div>

                            {/* Campus 2 */}
                            <div>
                                <h4 className="font-semibold text-lg text-[#1d1449] mb-2">Campus 2</h4>
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-[#498138] mt-1" />
                                    <span>Ranchorline KMC Store, Nishter Road, Near Masjid e Quba, Kaka Street, Karachi</span>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <Phone className="text-[#498138]" />
                                <span>+92 317 2108821</span>
                            </div>

                            {/* Email */}
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
                                    value={name}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94c484]"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#3d534d]">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94c484]"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#3d534d]">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="Your message..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#94c484]"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#1d1449] text-white px-6 py-2 rounded-full hover:bg-[#2a1f61] transition duration-300"
                                onClick={handleSubmit}
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