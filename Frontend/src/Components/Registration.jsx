"use client";
import React, { createRef, useState } from "react";
import axios from "axios";
import {
    User, Users, Calendar, MapPin, Phone, School, ShieldCheck,
    Printer, Trash2, BookOpen, CreditCard, Briefcase, Banknote, CheckCircle2,
    Castle
} from "lucide-react";
import logo from "../assets/logo.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { showToast } from "../utils/commonFunctions";
import { baseUrl } from "../utils/baseUrl";

const Registration = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const admissioSheetRef = createRef();

    const [formData, setFormData] = useState({
        studentName: "", fatherName: "", motherName: "", dateOfBirth: "",
        religion: "", gender: "", cast: "", address: "",
        city: "", lastSchoolAttended: "", stdBFormNo: "",
        fatherCNIC: "", fatherContactNo: "", fatherOccupation: "", fatherIncome: "",
        email: "", classAdmitted: "", id: ""
    });

    const [data, setData] = useState(null);
    const regDate = new Date().toLocaleDateString("en-GB");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const requiredFields = [
        "studentName", "fatherName", "motherName", "dateOfBirth",
        "religion", "gender", "address", "city",
        "fatherCNIC", "fatherContactNo", "classAdmitted"
    ];

    // Mapping for human-readable labels
    const fieldLabels = {
        studentName: "Student Name",
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        dateOfBirth: "Date of Birth",
        religion: "Religion",
        gender: "Gender",
        address: "Residential Address",
        city: "City",
        fatherCNIC: "Father CNIC",
        fatherContactNo: "Father Contact Number",
        classAdmitted: "Class Admitted"
    };

    const inputRefs = {
        studentName: React.createRef(),
        fatherName: React.createRef(),
        motherName: React.createRef(),
        dateOfBirth: React.createRef(),
        religion: React.createRef(),
        gender: React.createRef(),
        address: React.createRef(),
        city: React.createRef(),
        fatherCNIC: React.createRef(),
        fatherContactNo: React.createRef(),
        classAdmitted: React.createRef(),
        stdBFormNo: React.createRef() // Added safety mapping
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const missingField = requiredFields.find(field => !formData[field]);
        
        if (missingField) {
            const label = fieldLabels[missingField] || missingField;
            showToast(`Please fill ${label}`, "error");
            
            // Auto focus on the missing input
            if (inputRefs[missingField]?.current) {
                inputRefs[missingField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                inputRefs[missingField].current.focus({ preventScroll: true });
            }
            
            return;
        }
        
        try {
            setLoading(true);
            const res = await axios.post(`${baseUrl}registration/register`, formData);
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
    
    const handlePrint = () => {
        if (!admissioSheetRef.current) return;

        const printContents = admissioSheetRef.current.innerHTML; // sirf div ka content
        const originalContents = document.body.innerHTML; // pura page save karo

        document.body.innerHTML = printContents; // sirf div ko show karo
        window.print(); // print karo
        document.body.innerHTML = originalContents; // wapas restore
        window.location.reload(); // React state refresh
    };

    // Premium Input Styles
    const labelStyle = "block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1 transition-all duration-200 group-focus-within:text-indigo-600";
    const inputStyle = "w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold shadow-inner focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none placeholder:text-slate-400";

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-4 md:p-8 font-sans transition-all duration-300">
                
                {/* Modern Portal Header */}
                <div className="max-w-4xl mx-auto text-center mb-8 print:hidden pt-20 md:pt-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] text-indigo-700 font-extrabold tracking-widest uppercase mb-3 shadow-sm">
                        <School size={12} className="text-indigo-600" /> Digital Enrolment Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent tracking-tight">
                        NPS ADMISSION PORTAL
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 font-semibold tracking-wider uppercase mt-1">Noor Public School, Karachi</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {!submitted ? (
                        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-indigo-950/5">
                            
                            {/* Premium Header Accent */}
                            <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-4 flex items-center justify-between border-b border-indigo-950/50">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <User size={18} className="text-indigo-400 animate-pulse" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black tracking-widest uppercase text-indigo-200">Registration Form</span>
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase">Academic Session 2026-27</span>
                                    </div>
                                </div>
                                <span className="text-[11px] text-indigo-300 font-mono font-black bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">NPS - Official</span>
                            </div>

                            <form className="p-6 md:p-8 space-y-8">
                                
                                {/* Section 1: Student Details */}
                                <div className="group">
                                    <h3 className="text-xs font-black text-indigo-600 mb-4 border-b border-indigo-50/80 pb-2 flex items-center gap-2 tracking-widest">
                                        <User size={15} className="text-indigo-500" /> STUDENT INFORMATION
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
                                        <div>
                                            <label className={labelStyle}>Student Full Name</label>
                                            <input required ref={inputRefs.studentName} name="studentName" onChange={handleChange} className={inputStyle} placeholder="Enter full name" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Date of Birth</label>
                                            <input required type="date" ref={inputRefs.dateOfBirth} name="dateOfBirth" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Std B-Form # <span className="text-blue-500 font-semibold lowercase italic">(optional)</span></label>
                                            <input name="stdBFormNo" onChange={handleChange} ref={inputRefs.stdBFormNo} className={inputStyle} placeholder="xxxxx-xxxxxxx-x" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Gender / Religion</label>
                                            <div className="flex gap-2">
                                                <select name="gender" ref={inputRefs.gender} value={formData.gender} onChange={handleChange} className={`${inputStyle} pr-8 appearance-none bg-no-repeat bg-[right_0.75rem_center]`}>
                                                    <option value="">Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                <select name="religion" ref={inputRefs.religion} value={formData.religion} onChange={handleChange} className={`${inputStyle} pr-8 appearance-none bg-no-repeat bg-[right_0.75rem_center]`}>
                                                    <option value="">Religion</option>
                                                    <option value="Islam">Islam</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Cast / Community</label>
                                            <input name="cast" onChange={handleChange} className={inputStyle} placeholder="e.g. Sunni, Memon etc." />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Last School <span className="text-blue-500 font-semibold lowercase italic">(optional)</span></label>
                                            <input name="lastSchoolAttended" onChange={handleChange} className={inputStyle} placeholder="Previous School Name" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Father/Guardian Details */}
                                <div className="group">
                                    <h3 className="text-xs font-black text-indigo-600 mb-4 border-b border-indigo-50/80 pb-2 flex items-center gap-2 tracking-widest">
                                        <Users size={15} className="text-indigo-500" /> FATHER / GUARDIAN INFORMATION
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
                                        <div>
                                            <label className={labelStyle}>Father's Name</label>
                                            <input required name="fatherName" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherName} placeholder="Father's full name" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Father CNIC #</label>
                                            <input required name="fatherCNIC" onChange={handleChange} className={inputStyle} placeholder="42xxx-xxxxxxx-x" ref={inputRefs.fatherCNIC} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Father Cell #</label>
                                            <input required name="fatherContactNo" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherContactNo} placeholder="03xx-xxxxxxx" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Occupation</label>
                                            <input required name="fatherOccupation" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherOccupation} placeholder="e.g. Business, Service" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Monthly Income <span className="text-blue-500 font-semibold lowercase italic">(optional)</span></label>
                                            <input name="fatherIncome" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherIncome} placeholder="e.g. 50,000" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Email Address</label>
                                            <input required type="email" name="email" onChange={handleChange} className={inputStyle} ref={inputRefs.email} placeholder="example@mail.com" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Mother's Name</label>
                                            <input required name="motherName" onChange={handleChange} className={inputStyle} ref={inputRefs.motherName} placeholder="Mother's full name" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Class Selection */}
                                <div className="group">
                                    <h3 className="text-xs font-black text-indigo-600 mb-4 border-b border-indigo-50/80 pb-2 flex items-center gap-2 tracking-widest">
                                        <Castle size={15} className="text-indigo-500" /> ACADEMIC LEVEL
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <div className="md:col-span-2">
                                            <label className={labelStyle}>Class Admitted</label>
                                            <div className="relative">
                                                <select
                                                    name="classAdmitted"
                                                    required
                                                    value={formData.classAdmitted}
                                                    onChange={handleChange}
                                                    ref={inputRefs.classAdmitted}
                                                    className="w-full appearance-none bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold shadow-inner focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-300 outline-none"
                                                >
                                                    <option value="" disabled>Select Class Level</option>
                                                    <option value="Nursery">Nursery</option>
                                                    <option value="KG-I">KG-I</option>
                                                    <option value="KG-II">KG-II</option>
                                                    <option value="1st Grade">1st Grade</option>
                                                    <option value="2nd Grade">2nd Grade</option>
                                                    <option value="3rd Grade">3rd Grade</option>
                                                    <option value="4th Grade">4th Grade</option>
                                                    <option value="5th Grade">5th Grade</option>
                                                    <option value="6th Grade">6th Grade</option>
                                                    <option value="7th Grade">7th Grade</option>
                                                    <option value="8th Grade">8th Grade</option>
                                                    <option value="9th Grade">9th Grade</option>
                                                    <option value="10th Grade">10th Grade</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                                                    ▼
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Address */}
                                <div className="group">
                                    <h3 className="text-xs font-black text-indigo-600 mb-4 border-b border-indigo-50/80 pb-2 flex items-center gap-2 tracking-widest">
                                        <MapPin size={15} className="text-indigo-500" /> RESIDENTIAL ADDRESS
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-3">
                                            <label className={labelStyle}>Current Address</label>
                                            <input required name="address" onChange={handleChange} className={inputStyle} ref={inputRefs.address} placeholder="House #, Street name, Block / Area" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>City</label>
                                            <input required name="city" onChange={handleChange} className={inputStyle} ref={inputRefs.city} placeholder="Karachi" />
                                        </div>
                                    </div>
                                </div>

                                {/* Modernized Submit Button */}
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full mt-8 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white font-extrabold py-4 rounded-xl hover:from-indigo-950 hover:to-indigo-900 transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-xl hover:shadow-indigo-950/20 active:scale-[0.99] disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="animate-pulse">Processing Enrolment...</span>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={16} className="text-indigo-400" />
                                            Finalize & Generate Admission Copy
                                        </>
                                    )}
                                </button>

                            </form>
                        </div>
                    ) : (
                        /* --- PREMIUM ADMISSION CERTIFICATE (Optimized for Screen & Print) --- */
                        <div className="animate-in fade-in zoom-in-95 duration-500">
                            
                            {/* Action Row */}
                            <div className="flex gap-3 mb-6 print:hidden">
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-5 py-2.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1.5 hover:bg-slate-50 shadow-sm transition-all active:scale-[0.98]"
                                >
                                    <Trash2 size={14} className="text-rose-500" /> EDIT FORM
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="px-6 py-2.5 text-xs bg-gradient-to-r from-slate-950 to-indigo-950 text-white rounded-xl font-bold flex items-center gap-1.5 ml-auto hover:from-indigo-950 hover:to-indigo-900 shadow-md transition-all active:scale-[0.98]"
                                >
                                    <Printer size={14} className="text-indigo-300" /> PRINT DOCUMENT
                                </button>
                            </div>

                            {/* Certificate Inner Frame */}
                            <div
                                ref={admissioSheetRef}
                                className="relative bg-white p-10 md:p-14 shadow-2xl rounded-sm border-[16px] border-slate-950/5 print:border-none print:shadow-none overflow-hidden max-w-4xl mx-auto print:p-0"
                                style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                            >
                                {/* Academic Premium Double Border */}
                                <div className="absolute inset-5 border border-slate-800 pointer-events-none print:inset-0"></div>
                                <div className="absolute inset-6 border-2 border-double border-slate-800 pointer-events-none print:inset-1"></div>

                                {/* Dark-Gold Accent Header Strip */}
                                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950"></div>

                                {/* Elegant Watermark Logo */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                                    <img src={logo} alt="Watermark" className="w-[450px] aspect-square grayscale object-contain" />
                                </div>

                                {/* Header Grid */}
                                <div className="relative z-10 flex flex-col items-center text-center border-b-[3px] border-double border-slate-800 pb-6 mb-8">
                                    <div className="flex items-center justify-between w-full mb-4">
                                        <img src={logo} alt="School Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />

                                        <div className="flex-1 px-4 text-center">
                                            <h2 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-slate-900 uppercase leading-none">
                                                Noor Public School
                                            </h2>
                                            <p className="text-[10px] md:text-xs text-slate-600 font-extrabold mt-1 tracking-[0.25em] uppercase">
                                                Nursery to Matriculation
                                            </p>
                                            <p className="text-[9px] md:text-[11px] text-slate-500 mt-1 font-bold uppercase tracking-wider">
                                                Ghazi Nagar, Usmanabad, Garden West, Karachi
                                            </p>
                                        </div>

                                        {/* Picture Box */}
                                        <div className="w-24 h-28 border-2 border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-[8px] text-slate-400 text-center px-2 uppercase font-extrabold tracking-wider rounded">
                                            <User size={18} className="text-slate-300 mb-1" />
                                            Affix Student Photo Here
                                        </div>
                                    </div>

                                    {/* Document Badge */}
                                    <div className="bg-slate-950 text-white px-6 py-1.5 rounded-full text-[11px] font-black tracking-[0.25em] uppercase border border-slate-800/80 shadow-md">
                                        Admission Registration Sheet
                                    </div>
                                </div>

                                {/* Certificate Form Info Row */}
                                <div className="relative z-10 flex justify-between mb-8 text-xs border-b border-dashed border-slate-200 pb-3">
                                    <div className="flex gap-2">
                                        <span className="font-extrabold text-slate-500 uppercase tracking-widest">Form ID:</span>
                                        <span className="font-mono font-black text-indigo-950 px-2.5 py-0.5 bg-slate-100 rounded">{data?.data?._id.slice(-5)}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-extrabold text-slate-500 uppercase tracking-widest">Enrolled Class:</span>
                                        <span className="font-black text-indigo-950 uppercase underline decoration-indigo-300 underline-offset-4">{formData.classAdmitted || "—"}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-extrabold text-slate-500 uppercase tracking-widest">Date of Issue:</span>
                                        <span className="font-bold text-slate-800 underline decoration-slate-300 underline-offset-4">{regDate}</span>
                                    </div>
                                </div>

                                {/* Premium Certificate Key-Value Grid */}
                                <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-6">
                                    {[
                                        { l: "Student's Full Name", v: data?.data?.data?.studentName || formData.studentName },
                                        { l: "B-Form / CNIC Number", v: data?.data?.data?.stdBFormNo || formData.stdBFormNo || "Not Provided" },
                                        { l: "Father's Full Name", v: data?.data?.data?.fatherName || formData.fatherName },
                                        { l: "Father's CNIC Number", v: data?.data?.data?.fatherCNIC || formData.fatherCNIC },
                                        { l: "Primary Contact Number", v: data?.data?.data?.fatherContactNo || formData.fatherContactNo },
                                        { l: "Father's Occupation", v: data?.data?.data?.fatherOccupation || formData.fatherOccupation },
                                        { l: "Monthly Household Income", v: data?.data?.data?.fatherIncome || formData.fatherIncome || "N/A" },
                                        { l: "Date of Birth (D.O.B)", v: data?.data?.data?.dateOfBirth || formData.dateOfBirth },
                                        { l: "Religion / Gender Status", v: `${data?.data?.data?.religion || formData.religion || "—"} / ${data?.data?.data?.gender || formData.gender || "—"}` },
                                        { l: "Previous Institution", v: data?.data?.data?.lastSchoolAttended || formData.lastSchoolAttended || "None" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="relative border-b border-slate-200/80 pb-1.5 transition-all duration-200">
                                            <span className="block text-[9px] font-black text-indigo-950 uppercase tracking-wider opacity-60">
                                                {item.l}
                                            </span>
                                            <span className="text-sm font-extrabold text-slate-800 capitalize leading-relaxed">
                                                {item.v || "—"}
                                            </span>
                                        </div>
                                    ))}

                                    {/* Full Width Address */}
                                    <div className="col-span-2 relative border-b border-slate-200/80 pb-1.5 mt-2">
                                        <span className="block text-[9px] font-black text-indigo-950 uppercase tracking-wider opacity-60">
                                            Registered Residential Address
                                        </span>
                                        <span className="text-sm font-extrabold text-slate-800 capitalize leading-relaxed">
                                            {formData.address}, {formData.city}
                                        </span>
                                    </div>
                                </div>

                                {/* Classic Dual Signatures Section */}
                                <div className="relative z-10 mt-24 flex justify-between items-end px-4">
                                    <div className="text-center">
                                        <div className="w-44 border-t border-slate-900 pt-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                                                Parent/Guardian
                                            </p>
                                            <p className="text-[8px] text-slate-500 italic mt-0.5">Signature & Date</p>
                                        </div>
                                    </div>

                                    {/* Traditional Official Circular Seal */}
                                    <div className="w-24 h-24 border border-dashed border-slate-400 rounded-full flex flex-col items-center justify-center p-1 bg-slate-50/20">
                                        <span className="text-[7px] text-slate-400 font-extrabold text-center uppercase tracking-wider leading-tight">
                                            Official School<br />Stamp & Seal
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-44 border-t border-slate-900 pt-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                                                Issuing Authority
                                            </p>
                                            <p className="text-[8px] text-slate-500 italic mt-0.5">Principal Signature</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Footer Note */}
                                <div className="relative z-10 mt-12 flex flex-col items-center">
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-3"></div>
                                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-[0.4em] text-center">
                                        Verified Secure Enrolment System • Noor Public School Karachi
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