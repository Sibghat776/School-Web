"use client";
import React, { useState } from "react";
import axios from "axios";
import {
    User, Users, Calendar, MapPin, Phone, School, ShieldCheck,
    Printer, Trash2, BookOpen, CreditCard, Briefcase, Banknote, CheckCircle2,
    CastleIcon,
    Castle
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { showToast } from "../utils/commonFunctions";
import { baseUrl } from "../utils/baseUrl";

const Registration = () => {
    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        studentName: "", fatherName: "", motherName: "", dateOfBirth: "",
        religion: "", gender: "", cast: "", address: "",
        city: "", lastSchoolAttended: "", stdBFormNo: "",
        fatherCNIC: "", fatherContactNo: "", fatherOccupation: "", fatherIncome: "",
        email: "", classAdmitted: ""
    });

    const [data, setData] = useState(null);

    const requiredFields = ["studentName", "fatherName", "motherName", "dateOfBirth", "religion", "gender", "address", "city", "fatherCNIC", "fatherContactNo", "classAdmitted"];



    const regDate = new Date().toLocaleDateString("en-GB");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (requiredFields.some(field => !formData[field])) {
            console.log("Field Missing:", requiredFields.find(field => !formData[field]));
            let missingField = requiredFields.find(field => !formData[field])
            if (missingField === "classAdmitted") missingField = "Class Admitted"
            showToast(`Please fill ${missingField} field`, "error");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(`${baseUrl}registration/register`, formData);
            console.log("API Hit hui")
            console.log(res)
            setData(res);
            setSubmitted(true);
            showToast(res?.data?.message || "Registered Successfully!", "success");
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            showToast(err?.response?.data?.message || "Submission failed!", "error");
        } finally {
            setLoading(false);
        }
    };


    const handlePrint = () => { window.print(); };

    // Common Input Style for Compactness
    const inputStyle = "w-full px-3 py-1.5 rounded-lg border border-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50/50 text-sm";
    const labelStyle = "text-[11px] font-bold text-slate-600 uppercase tracking-tight flex items-center gap-2 mb-0.5";

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
                                <span className="text-[10px] text-slate-400 font-mono">FORM ID: {"123"}</span>
                            </div>

                            <form className="p-5">
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
                                            <input required type="date" name="dateOfBirth" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Std B-Form # <span className="text-blue-500 font-normal">(Optional)</span></label>
                                            <input name="stdBFormNo" onChange={handleChange} className={inputStyle} placeholder="xxxxx-xxxxxxx-x" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Gender / Religion</label>
                                            <div className="flex gap-2">
                                                <select name="gender" value={formData.gender} onChange={handleChange} className={inputStyle}>
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                <select name="religion" value={formData.religion} onChange={handleChange} className={inputStyle}>
                                                    <option value="">Select Religion</option>
                                                    <option value="Islam">Islam</option><option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Cast / Community</label>
                                            <input name="cast" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Last School <span className="text-blue-500 font-normal">(Optional)</span></label>
                                            <input name="lastSchoolAttended" onChange={handleChange} className={inputStyle} />
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
                                            <input required name="fatherCNIC" onChange={handleChange} className={inputStyle} placeholder="42xxx-xxxxxxx-x" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Father Cell #</label>
                                            <input required name="fatherContactNo" onChange={handleChange} className={inputStyle} />
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
                                            <label className={labelStyle}>Email</label>
                                            <input required name="email" onChange={handleChange} className={inputStyle} />
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
                                        <Castle size={14} /> CLASS
                                    </h3>
                                    <div className="grid mb-3 grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-3 relative">
                                            <label className="block mb-2 text-sm font-semibold text-gray-700 tracking-wide">
                                                Class Admitted
                                            </label>

                                            <div className="relative">
                                                <select
                                                    name="classAdmitted"
                                                    required
                                                    value={formData.classAdmitted}
                                                    defaultValue={""}
                                                    onChange={handleChange}
                                                    className="w-full appearance-none bg-white border border-slate-400 rounded-xl px-4 py-3 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
                                                >
                                                    <option value="" disabled >
                                                        Select Class
                                                    </option>

                                                    <option>Nursery</option>
                                                    <option>KG-I</option>
                                                    <option>KG-II</option>
                                                    <option>1st Grade</option>
                                                    <option>2nd Grade</option>
                                                    <option>3rd Grade</option>
                                                    <option>4th Grade</option>
                                                    <option>5th Grade</option>
                                                    <option>6th Grade</option>
                                                    <option>7th Grade</option>
                                                    <option>8th Grade</option>
                                                    <option>9th Grade</option>
                                                    <option>10th Grade</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
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

                                <button type="submit" onClick={handleSubmit} disabled={loading}
                                    className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-lg shadow-slate-200 disabled:opacity-50">

                                    {loading ? "Submitting..." : <><CheckCircle2 size={18} /> Finalize & Generate Sheet</>}

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

                            <div className="relative bg-white p-10 shadow-2xl rounded-2xl border border-slate-200 print:shadow-none print:border-slate-800 overflow-hidden">

                                {/* Premium Top Gradient Bar */}
                                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-700 via-blue-600 to-emerald-500"></div>

                                {/* Watermark Background */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                    <img src="" alt="School Watermark" className="w-96" />
                                </div>

                                {/* Header Section */}
                                <div className="relative z-10 flex justify-between items-center border-b-2 border-slate-800 pb-5 mb-8">

                                    {/* Logo + School Info */}
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="../assets/logo.png"  /* 👈 Yahan apna logo src lagana */
                                            alt="School Logo"
                                            className="w-20 h-20 object-contain"
                                        />

                                        <div>
                                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                                                NOOR PUBLIC SCHOOL
                                            </h2>
                                            <p className="text-sm text-slate-600 font-semibold uppercase tracking-wide">
                                                Ghazi Nagar, Usmanabad, Garden West, Karachi
                                            </p>
                                            <p className="text-xs mt-1 text-indigo-600 font-bold uppercase tracking-widest">
                                                Official Admission Registration Certificate
                                            </p>
                                        </div>
                                    </div>

                                    {/* Form Info */}
                                    <div className="text-right">
                                        <p className="text-sm font-bold bg-slate-900 text-white px-4 py-1 rounded-lg shadow-md">
                                            FORM ID: {"123"}
                                        </p>
                                        <p className="text-sm font-semibold text-slate-600 mt-2">
                                            Date: {regDate}
                                        </p>
                                    </div>
                                </div>

                                {/* Student Data Grid */}
                                <div className="relative z-10 grid grid-cols-2 gap-x-12 gap-y-6">

                                    {[
                                        { l: "Student Name", v: data?.data?.data?.studentName },
                                        { l: "B-Form #", v: data?.data?.data?.stdBFormNo || "Not Provided" },
                                        { l: "Father's Name", v: data?.data?.data?.fatherName },
                                        { l: "Father CNIC", v: data?.data?.data?.fatherCNIC },
                                        { l: "Father Contact", v: data?.data?.data?.fatherContactNo },
                                        { l: "Occupation", v: data?.data?.data?.fatherOccupation },
                                        { l: "Income", v: data?.data?.data?.fatherIncome || "N/A" },
                                        { l: "Date of Birth", v: data?.data?.data?.dateOfBirth },
                                        { l: "Religion / Gender", v: `${data?.data?.data?.religion} / ${data?.data?.data?.gender}` },
                                        { l: "Last School", v: data?.data?.data?.lastSchoolAttended || "N/A" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 hover:shadow-lg transition-all duration-300">
                                            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                                                {item.l}
                                            </span>
                                            <span className="text-lg font-semibold text-slate-800 mt-1">
                                                {item.v}
                                            </span>
                                        </div>
                                    ))}

                                    {/* Address Full Width */}
                                    <div className="col-span-2 flex flex-col bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
                                        <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                                            Residential Address
                                        </span>
                                        <span className="text-lg font-semibold text-slate-800 mt-1">
                                            {formData.address}, {formData.city}
                                        </span>
                                    </div>
                                </div>

                                {/* Student Photo Box */}
                                <div className="absolute top-40 right-12 w-32 h-36 border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center text-xs text-indigo-400 bg-white shadow-sm">
                                    STUDENT PHOTO
                                </div>

                                {/* Signature Section */}
                                <div className="relative z-10 mt-20 flex justify-between px-16">
                                    <div className="text-center w-48">
                                        <div className="border-t-2 border-slate-800 pt-3">
                                            <p className="text-sm font-bold uppercase tracking-wider text-slate-700">
                                                Guardian Signature
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center w-48">
                                        <div className="border-t-2 border-slate-800 pt-3">
                                            <p className="text-sm font-bold uppercase tracking-wider text-slate-700">
                                                Principal Signature
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <p className="relative z-10 mt-12 text-center text-xs text-slate-400 italic tracking-[0.4em] uppercase border-t pt-4">
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