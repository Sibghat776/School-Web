"use client";
import React, { useState } from "react";
import {
    User, Users, Calendar, MapPin, Phone, School, ShieldCheck,
    Printer, Trash2, BookOpen, CreditCard, Briefcase, Banknote, CheckCircle2
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { showToast } from "../utils/commonFunctions";

const Registration = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        studentName: "", fatherName: "", motherName: "", dob: "",
        religion: "", gender: "", cast: "", address: "",
        city: "", contact: "", lastSchool: "", stdBForm: "",
        fatherCnic: "", fatherContact: "", fatherOccupation: "", fatherIncome: ""
    });

    const formNo = "ADM-" + Math.floor(1000 + Math.random() * 9000);
    const regDate = new Date().toLocaleDateString("en-GB");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        formData == "" && showToast("Form data is missing!", "error");
        e.preventDefault();
        setSubmitted(true);
        showToast("Admission form submitted successfully!", "success");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrint = () => { window.print(); };

    // Common Input Style for Compactness
    const inputStyle = "w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50 text-sm";
    const labelStyle = "text-[11px] font-bold text-slate-600 uppercase tracking-tight flex items-center gap-1 mb-0.5";

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f8fafc] p-3 md:p-6 font-sans">
                {/* Header - Compact */}
                <div className="max-w-4xl mx-auto text-center mb-4 print:hidden pt-16 md:pt-20">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-indigo-900 bg-clip-text text-transparent tracking-tight">
                        NPS ADMISSION PORTAL
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">Digital Enrollment System</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {!submitted ? (
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                            <div className="bg-slate-900 p-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white">
                                    <User size={18} className="text-indigo-400" />
                                    <span className="text-sm font-bold uppercase tracking-widest">New Admission Form</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">FORM ID: {formNo}</span>
                            </div>

                            <form onSubmit={handleSubmit} className="p-5">
                                {/* Section 1: Student Details */}
                                <div className="mb-4">
                                    <h3 className="text-xs font-black text-indigo-600 mb-3 border-b border-indigo-50 pb-1 flex items-center gap-2">
                                        <User size={14} /> STUDENT INFORMATION
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
                                        <div>
                                            <label className={labelStyle}>Student Full Name</label>
                                            <input required name="studentName" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Date of Birth</label>
                                            <input required type="date" name="dob" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Std B-Form # <span className="text-blue-500 font-normal">(Optional)</span></label>
                                            <input name="stdBForm" onChange={handleChange} className={inputStyle} placeholder="xxxxx-xxxxxxx-x" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Gender / Religion</label>
                                            <div className="flex gap-2">
                                                <select name="gender" onChange={handleChange} className={inputStyle}>
                                                    <option>Male</option><option>Female</option>
                                                </select>
                                                <select name="religion" onChange={handleChange} className={inputStyle}>
                                                    <option>Islam</option><option>Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Cast / Community</label>
                                            <input name="cast" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Last School <span className="text-blue-500 font-normal">(Optional)</span></label>
                                            <input name="lastSchool" onChange={handleChange} className={inputStyle} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Father/Guardian Details */}
                                <div className="mb-4">
                                    <h3 className="text-xs font-black text-indigo-600 mb-3 border-b border-indigo-50 pb-1 flex items-center gap-2">
                                        <Users size={14} /> FATHER / GUARDIAN INFORMATION
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
                                        <div>
                                            <label className={labelStyle}>Father's Name</label>
                                            <input required name="fatherName" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Father CNIC #</label>
                                            <input required name="fatherCnic" onChange={handleChange} className={inputStyle} placeholder="42xxx-xxxxxxx-x" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Father Cell #</label>
                                            <input required name="fatherContact" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Occupation</label>
                                            <input required name="fatherOccupation" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Monthly Income <span className="text-blue-500 font-normal">(Optional)</span></label>
                                            <input name="fatherIncome" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Mother's Name</label>
                                            <input required name="motherName" onChange={handleChange} className={inputStyle} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Address */}
                                <div>
                                    <h3 className="text-xs font-black text-indigo-600 mb-3 border-b border-indigo-50 pb-1 flex items-center gap-2">
                                        <MapPin size={14} /> RESIDENTIAL ADDRESS
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-3">
                                            <label className={labelStyle}>Current Address</label>
                                            <input required name="address" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>City</label>
                                            <input required name="city" onChange={handleChange} className={inputStyle} />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-lg shadow-slate-200">
                                    <CheckCircle2 size={18} /> Finalize & Generate Sheet
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* --- 2. ADMISSION SHEET (Fits on Screen) --- */
                        <div className="animate-in fade-in duration-500 scale-95 md:scale-100">
                            <div className="flex gap-2 mb-4 print:hidden">
                                <button onClick={() => setSubmitted(false)} className="px-4 py-1.5 text-xs bg-white border border-slate-200 text-slate-600 rounded-lg font-bold flex items-center gap-1 hover:bg-slate-50">
                                    <Trash2 size={14} /> EDIT
                                </button>
                                <button onClick={handlePrint} className="px-6 py-1.5 text-xs bg-slate-900 text-white rounded-lg font-bold flex items-center gap-1 ml-auto hover:bg-slate-800 shadow-md">
                                    <Printer size={14} /> PRINT ADMISSION COPY
                                </button>
                            </div>

                            <div className="bg-white p-6 shadow-2xl rounded-sm border-[6px] border-double border-slate-200 relative print:shadow-none print:border-slate-800">
                                {/* Header Compact */}
                                <div className="border-b-2 border-slate-800 pb-3 mb-4 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 leading-tight tracking-tighter">NOOR PUBLIC SCHOOL</h2>
                                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Ghazi Nagar, Usmanabad, Garden West, Karachi</p>
                                    </div>
                                    <div className="text-right border-l pl-4 border-slate-100">
                                        <p className="text-[10px] font-black text-white bg-slate-900 px-2 py-0.5 rounded">FORM: {formNo}</p>
                                        <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase">Date: {regDate}</p>
                                    </div>
                                </div>

                                {/* Content Grid - 2 Column for Sheet */}
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                                    {[
                                        { l: "Student Name", v: formData.studentName },
                                        { l: "B-Form #", v: formData.stdBForm || "Not Provided" },
                                        { l: "Father's Name", v: formData.fatherName },
                                        { l: "Father CNIC", v: formData.fatherCnic },
                                        { l: "Father Contact", v: formData.fatherContact },
                                        { l: "Occupation", v: formData.fatherOccupation },
                                        { l: "Income", v: formData.fatherIncome || "N/A" },
                                        { l: "Date of Birth", v: formData.dob },
                                        { l: "Religion/Gender", v: `${formData.religion} / ${formData.gender}` },
                                        { l: "Last School", v: formData.lastSchool || "N/A" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col border-b border-slate-200">
                                            <span className="text-[9px] font-black text-indigo-900 uppercase tracking-widest">{item.l}</span>
                                            <span className="text-sm font-bold text-slate-800 uppercase">{item.v}</span>
                                        </div>
                                    ))}
                                    <div className="col-span-2 flex flex-col border-b border-slate-200">
                                        <span className="text-[9px] font-black text-indigo-900 uppercase tracking-widest">Residential Address</span>
                                        <span className="text-sm font-bold text-slate-800 uppercase">{formData.address}, {formData.city}</span>
                                    </div>
                                </div>

                                {/* Photo box - absolute */}
                                <div className="absolute top-24 right-6 w-24 h-28 border border-slate-300 flex items-center justify-center text-[8px] text-slate-400 text-center px-2 print:border-slate-800">
                                    STUDENT PHOTO
                                </div>

                                <div className="mt-6 flex justify-between pt-10 px-4">
                                    <div className="text-center w-32 border-t border-slate-800 pt-1">
                                        <p className="text-[9px] font-bold uppercase">Guardian Sign</p>
                                    </div>
                                    <div className="text-center w-32 border-t border-slate-800 pt-1">
                                        <p className="text-[9px] font-bold uppercase">Principal Sign</p>
                                    </div>
                                </div>

                                <p className="mt-6 text-center text-[8px] text-slate-400 italic tracking-[0.2em] uppercase border-t pt-2">
                                    NPS Official Computer Generated Document
                                </p>
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