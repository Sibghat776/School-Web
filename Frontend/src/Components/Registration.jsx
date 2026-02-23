"use client";
import React, { createRef, useState } from "react";
import axios from "axios";
import {
    User, Users, Calendar, MapPin, Phone, School, ShieldCheck,
    Printer, Trash2, BookOpen, CreditCard, Briefcase, Banknote, CheckCircle2,
    CastleIcon,
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
        email: "", classAdmitted: ""
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
        classAdmitted: React.createRef()
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


    // Common Input Style for Compactness
    const labelStyle = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1";
    const inputStyle = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all duration-200 outline-none placeholder:text-slate-400";


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
                                            <input required ref={inputRefs.studentName} name="studentName" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Date of Birth</label>
                                            <input required type="date" ref={inputRefs.dateOfBirth} name="dateOfBirth" onChange={handleChange} className={inputStyle} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Std B-Form # <span className="text-blue-500 font-normal">(Optional)</span></label>
                                            <input name="stdBFormNo" onChange={handleChange} ref={inputRefs.stdBFormNo} className={inputStyle} placeholder="xxxxx-xxxxxxx-x" />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Gender / Religion</label>
                                            <div className="flex gap-2">
                                                <select name="gender" ref={inputRefs.gender} value={formData.gender} onChange={handleChange} className={inputStyle}>
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                <select name="religion" ref={inputRefs.religion} value={formData.religion} onChange={handleChange} className={inputStyle}>
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
                                            <input required name="fatherName" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherName} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Father CNIC #</label>
                                            <input required name="fatherCNIC" onChange={handleChange} className={inputStyle} placeholder="42xxx-xxxxxxx-x" ref={inputRefs.fatherCNIC} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Father Cell #</label>
                                            <input required name="fatherContactNo" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherContactNo} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Occupation</label>
                                            <input required name="fatherOccupation" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherOccupation} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Monthly Income <span className="text-blue-500 font-normal">(Optional)</span></label>
                                            <input name="fatherIncome" onChange={handleChange} className={inputStyle} ref={inputRefs.fatherIncome} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Email</label>
                                            <input required name="email" onChange={handleChange} className={inputStyle} ref={inputRefs.email} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>Mother's Name</label>
                                            <input required name="motherName" onChange={handleChange} className={inputStyle} ref={inputRefs.motherName} />
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
                                                    ref={inputRefs.classAdmitted}
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
                                            <input required name="address" onChange={handleChange} className={inputStyle} ref={inputRefs.address} />
                                        </div>
                                        <div>
                                            <label className={labelStyle}>City</label>
                                            <input required name="city" onChange={handleChange} className={inputStyle} ref={inputRefs.city} />
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

                            <div
                                ref={admissioSheetRef}
                                className="relative bg-white p-12 shadow-2xl rounded-sm border-[12px] border-slate-100 print:border-none print:shadow-none overflow-hidden max-w-4xl mx-auto"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {/* Decorative Border Inner */}
                                <div className="absolute inset-4 border border-slate-300 pointer-events-none"></div>

                                {/* Premium Top Bar */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900"></div>

                                {/* Watermark Background */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                    <img src={logo} alt="Watermark" className="w-[500px] grayscale" />
                                </div>

                                {/* Header Section */}
                                <div className="relative z-10 flex flex-col items-center text-center border-b-4 border-double border-slate-800 pb-6 mb-10">
                                    <div className="flex items-center justify-between w-full mb-6">
                                        <img src={logo} alt="School Logo" className="w-24 h-24 object-contain" />

                                        <div className="flex-1 px-4">
                                            <h2 className="text-4xl font-serif font-black tracking-tight text-slate-900 uppercase leading-none">
                                                Noor Public School
                                            </h2>
                                            <p className="text-sm text-slate-600 font-medium mt-2 tracking-widest uppercase">
                                                ---------- Nursery to Matric ----------
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1 font-extrabold uppercase">
                                                Ghazi Nagar, Usmanabad, Garden West, Karachi
                                            </p>
                                        </div>

                                        {/* Student Photo Box - Shifted to Header for cleaner look */}
                                        <div className="w-28 h-32 border-2 border-slate-300 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 text-center px-2 uppercase font-bold">
                                            Student Photograph Here
                                        </div>
                                    </div>

                                    <div className="bg-slate-900 text-white px-8 py-1.5 rounded-full text-sm font-bold tracking-[0.3em] uppercase">
                                        Admission Registration Certificate
                                    </div>
                                </div>

                                {/* Form Info Row */}
                                <div className="relative z-10 flex justify-between mb-10 text-sm">
                                    <div className="flex gap-2">
                                        <span className="font-bold text-slate-500 uppercase">Form ID:</span>
                                        <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 rounded">#{"123"}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-bold text-slate-500 uppercase">Registration Date:</span>
                                        <span className="font-bold text-slate-800 underline decoration-slate-300 underline-offset-4">{regDate}</span>
                                    </div>
                                </div>

                                {/* Student Data Grid */}
                                <div className="relative z-10 grid grid-cols-2 gap-x-10 gap-y-8">
                                    {[
                                        { l: "Student Name", v: data?.data?.data?.studentName },
                                        { l: "B-Form / CNIC", v: data?.data?.data?.stdBFormNo || "Not Provided" },
                                        { l: "Father's Name", v: data?.data?.data?.fatherName },
                                        { l: "Father CNIC", v: data?.data?.data?.fatherCNIC },
                                        { l: "Contact Number", v: data?.data?.data?.fatherContactNo },
                                        { l: "Father's Occupation", v: data?.data?.data?.fatherOccupation },
                                        { l: "Monthly Income", v: data?.data?.data?.fatherIncome || "N/A" },
                                        { l: "Date of Birth", v: data?.data?.data?.dateOfBirth },
                                        { l: "Religion / Gender", v: `${data?.data?.data?.religion} / ${data?.data?.data?.gender}` },
                                        { l: "Last School Attended", v: data?.data?.data?.lastSchoolAttended || "N/A" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="relative border-b border-slate-200 pb-1">
                                            <span className="block text-[10px] font-black text-indigo-900 uppercase tracking-tighter opacity-70">
                                                {item.l}
                                            </span>
                                            <span className="text-base font-bold text-slate-800 capitalize italic">
                                                {item.v || "—"}
                                            </span>
                                        </div>
                                    ))}

                                    {/* Address Full Width */}
                                    <div className="col-span-2 relative border-b border-slate-200 pb-1 mt-2">
                                        <span className="block text-[10px] font-black text-indigo-900 uppercase tracking-tighter opacity-70">
                                            Residential Address
                                        </span>
                                        <span className="text-base font-bold text-slate-800 italic">
                                            {formData.address}, {formData.city}
                                        </span>
                                    </div>
                                </div>

                                {/* Signature Section */}
                                <div className="relative z-10 mt-24 flex justify-between items-end px-10">
                                    <div className="text-center">
                                        <div className="w-48 border-t-2 border-slate-900 pt-2">
                                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">
                                                Parent/Guardian
                                            </p>
                                            <p className="text-[9px] text-slate-500 italic mt-0.5">(Sign & Date)</p>
                                        </div>
                                    </div>

                                    {/* Official Stamp Area */}
                                    <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center">
                                        <span className="text-[8px] text-slate-300 font-bold text-center uppercase leading-tight">Official<br />School Stamp</span>
                                    </div>

                                    <div className="text-center">
                                        <div className="w-48 border-t-2 border-slate-900 pt-2">
                                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800">
                                                Issuing Authority
                                            </p>
                                            <p className="text-[9px] text-slate-500 italic mt-0.5">(Principal Signature)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Detail */}
                                <div className="relative z-10 mt-16 flex flex-col items-center">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4"></div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.5em]">
                                        Verified Computer Generated Document • Noor Public School
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