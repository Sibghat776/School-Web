"use client";
import React, { useState, useRef } from "react";
import {
    User,
    Users,
    Calendar,
    MapPin,
    Phone,
    School,
    ShieldCheck,
    Printer,
    Download,
    CheckCircle2,
    Trash2,
    BookOpen
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Registration = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        studentName: "",
        fatherName: "",
        motherName: "",
        dob: "",
        religion: "Islam",
        gender: "Male",
        cast: "",
        address: "",
        city: "",
        contact: "",
        lastSchool: "",
    });

    const formNo = "ADM-" + Math.floor(1000 + Math.random() * 9000);
    const regDate = new Date().toLocaleDateString("en-GB");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen md:py-24 bg-slate-50 p-4 md:p-10 font-sans">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-10 print:hidden">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        NPS ADMISSION PORTAL
                    </h1>
                    <p className="text-gray-500 mt-2 italic">Experience the Online Student Registration System</p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {!submitted ? (
                        /* --- 1. REGISTRATION FORM --- */
                        <div className="bg-white rounded-3xl shadow-2xl border border-indigo-50 overflow-hidden transform transition-all hover:shadow-indigo-100">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 flex items-center gap-3">
                                <User className="text-white" size={28} />
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider">New Student Registration</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Field Groups */}
                                {[
                                    { label: "Student Full Name", name: "studentName", icon: <User size={18} />, type: "text", required: true },
                                    { label: "Father's Name", name: "fatherName", icon: <Users size={18} />, type: "text", required: true },
                                    { label: "Mother's Name", name: "motherName", icon: <Users size={18} />, type: "text", required: true },
                                    { label: "Date of Birth", name: "dob", icon: <Calendar size={18} />, type: "date", required: true },
                                    { label: "Cast / Community", name: "cast", icon: <ShieldCheck size={18} />, type: "text" },
                                    { label: "City", name: "city", icon: <MapPin size={18} />, type: "text", required: true },
                                    { label: "Contact Number", name: "contact", icon: <Phone size={18} />, type: "tel", required: true },
                                    { label: "Last School Attended", name: "lastSchool", icon: <School size={18} />, type: "text" },
                                ].map((field) => (
                                    <div key={field.name} className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                            {field.icon} {field.label}
                                        </label>
                                        <input
                                            required={field.required}
                                            type={field.type}
                                            name={field.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all bg-gray-50/50"
                                        />
                                    </div>
                                ))}

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Religion</label>
                                    <select name="religion" onChange={handleChange} className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 outline-none">
                                        <option value="Islam">Islam</option>
                                        <option value="Christianity">Christianity</option>
                                        <option value="Hinduism">Hinduism</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Gender</label>
                                    <select name="gender" onChange={handleChange} className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 outline-none">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><MapPin size={18} /> Current Address</label>
                                    <input name="address" onChange={handleChange} className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 outline-none" required />
                                </div>

                                <div className="md:col-span-2 mt-4">
                                    <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                                        <CheckCircle2 size={22} /> Generate Admission Sheet
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* --- 2. PROFESSIONAL ADMISSION SHEET (Output) --- */
                        <div className="animate-in fade-in zoom-in duration-500">
                            {/* Control Buttons - Hidden during print */}
                            <div className="flex gap-4 mb-6 print:hidden">
                                <button onClick={() => setSubmitted(false)} className="flex items-center gap-2 px-6 py-2 bg-white border border-red-200 text-red-600 rounded-full font-medium hover:bg-red-50 transition">
                                    <Trash2 size={18} /> Reset Form
                                </button>
                                <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:bg-indigo-700 transition ml-auto">
                                    <Printer size={18} /> Print Sheet
                                </button>
                            </div>

                            {/* THE SHEET */}
                            <div className="bg-white p-10 shadow-2xl rounded-sm border-[10px] border-double border-gray-100 relative print:shadow-none print:border-none print:p-0">
                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0 opacity-50 print:hidden"></div>

                                {/* School Header */}
                                <div className="border-b-4 border-indigo-600 pb-6 mb-8 flex justify-between items-end relative z-10">
                                    <div>
                                        <h2 className="text-4xl font-black text-indigo-900 tracking-tighter">NOOR PUBLIC SCHOOL</h2>
                                        <p className="text-sm text-gray-600 font-medium">Quality Education • Professional Excellence • Innovation</p>
                                        <p className="text-xs text-gray-400 mt-1 uppercase">Ghazi Nagar, Siddique Wahab Road, Street # 20, Usmanabad, Garden West, Karachi, Pakistan</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-block bg-indigo-600 text-white px-4 py-1 rounded-md text-sm font-bold mb-1">OFFICIAL ADMISSION COPY</div>
                                        <p className="text-sm font-bold text-gray-700">Form No: {formNo}</p>
                                        <p className="text-xs text-gray-500 italic">Dated: {regDate}</p>
                                    </div>
                                </div>

                                {/* Student Photo Placeholder */}
                                <div className="absolute right-10 top-40 w-32 h-40 border-2 border-dashed border-gray-300 flex items-center justify-center text-center p-4 text-xs text-gray-400 print:border-solid">
                                    Affix Recent Passport Size Photograph
                                </div>

                                {/* Data Grid */}
                                <div className="grid grid-cols-1 gap-y-4 max-w-[70%]">
                                    {[
                                        { label: "STUDENT NAME", value: formData.studentName },
                                        { label: "FATHER'S NAME", value: formData.fatherName },
                                        { label: "MOTHER'S NAME", value: formData.motherName },
                                        { label: "DATE OF BIRTH", value: formData.dob },
                                        { label: "RELIGION / GENDER", value: `${formData.religion} / ${formData.gender}` },
                                        { label: "CAST / COMMUNITY", value: formData.cast || "N/A" },
                                        { label: "CONTACT NUMBER", value: formData.contact },
                                        { label: "LAST SCHOOL", value: formData.lastSchool || "N/A" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-baseline gap-4">
                                            <span className="text-xs font-black text-indigo-800 w-36 shrink-0 tracking-widest uppercase">{item.label}:</span>
                                            <span className="text-lg font-medium text-gray-800 border-b border-gray-200 grow uppercase">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Address Section */}
                                <div className="mt-8">
                                    <p className="text-xs font-black text-indigo-800 tracking-widest uppercase mb-1">Residential Address:</p>
                                    <p className="text-lg border-b border-gray-200 pb-1 text-gray-800 uppercase">{formData.address}, {formData.city}</p>
                                </div>

                                {/* Rules & Regulations */}
                                <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-2 mb-3">
                                        <BookOpen size={16} /> SCHOOL RULES & DECLARATION
                                    </h4>
                                    <ul className="text-[10px] text-gray-600 space-y-1 list-disc ml-4">
                                        <li>Attendance must be maintained above 85% in all academic sessions.</li>
                                        <li>School uniform and discipline are mandatory at all times.</li>
                                        <li>Fee must be cleared by the 10th of every month.</li>
                                        <li>I hereby declare that all information provided above is correct to the best of my knowledge.</li>
                                    </ul>
                                </div>

                                {/* Signature Area */}
                                <div className="mt-20 flex justify-between px-10">
                                    <div className="text-center w-48">
                                        <div className="border-t-2 border-gray-800 mb-2"></div>
                                        <p className="text-xs font-bold text-gray-800 uppercase">Parent/Guardian Signature</p>
                                    </div>
                                    <div className="text-center w-48">
                                        <div className="border-t-2 border-gray-800 mb-2"></div>
                                        <p className="text-xs font-bold text-gray-800 uppercase">Principal's Seal & Sign</p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-12 pt-4 border-t border-gray-100 text-center">
                                    <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase italic">
                                        This is a computer generated admission sheet authorized by Noor Public School Education System.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Registration;