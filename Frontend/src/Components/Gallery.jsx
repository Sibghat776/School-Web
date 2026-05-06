"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Download, MoveLeftIcon, MoveRightIcon, Plus, X, UploadCloud, GraduationCap, ImagePlus, CheckCircle2, FolderOpen, Images } from "lucide-react";
import { showToast } from "../utils/commonFunctions";
import { baseUrl } from "../utils/baseUrl";

const Gallery = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    
    // Lightbox ke liye states
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const [formData, setFormData] = useState({
        teacherName: "",
        title: "",
        images: []
    });

    const fileInputRef = useRef();

    // Next Image Logic (Sirf current folder ke andar)
    const handleNextImage = (e) => {
        if (e) e.stopPropagation();
        const totalImages = posts[selectedPostIndex].imageUrl.length;
        setCurrentImgIndex((prev) => (prev + 1) % totalImages);
    }

    // Previous Image Logic (Sirf current folder ke andar)
    const handlePrevImage = (e) => {
        if (e) e.stopPropagation();
        const totalImages = posts[selectedPostIndex].imageUrl.length;
        setCurrentImgIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${baseUrl}gallery/getPosts`);
            setPosts(res.data.data || []);
            setLoading(false)
        } catch (err) {
            showToast(err?.response?.data?.message || "Failed to fetch posts", "error");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilesChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.teacherName || !formData.title || formData.images.length === 0) {
            return showToast("Please fill all fields & select images", "error");
        }
        const form = new FormData();
        form.append("teacherName", formData.teacherName);
        form.append("title", formData.title);
        for (let i = 0; i < formData.images.length; i++) {
            form.append("images", formData.images[i]);
        }
        try {
            setLoading(true);
            await axios.post(`${baseUrl}gallery/addPost`, form);
            showToast("Post added successfully!", "success");
            setFormVisible(false);
            setFormData({ teacherName: "", title: "", images: [] });
            fetchPosts();
        } catch (err) {
            showToast(err?.response?.data?.message || "Submission failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-indigo-600 selection:text-white">
            <Navbar />

            {/* --- Hero Section --- */}
            <section className="relative pt-36 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(241,245,249,0.8),rgba(255,255,255,0))] -z-10" />
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[2px] mb-6 shadow-sm">
                        <GraduationCap size={14} className="animate-bounce" /> Academic Archives
                    </div>

                    <h2
                        onClick={() => setFormVisible(!formVisible)}
                        className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight cursor-pointer hover:opacity-80 transition-opacity active:scale-95 duration-200"
                    >
                        Moments of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Excellence</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium italic">
                        Capturing the spirit of creativity, unity, and student life at Noor Public School.
                    </p>
                </div>
            </section>

            {loading && posts.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center py-24">
                     <div className="h-10 w-10 bg-indigo-600 rounded-full animate-ping"></div>
                     <p className="mt-4 font-bold text-slate-400">Loading Folders...</p>
                </div>
            ) : (
                <section className="pb-28 px-4 md:px-10 lg:px-16 max-w-8xl mx-auto">

                    {/* --- Admin Form --- */}
                    {formVisible && (
                        <div className="max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top-6 duration-500">
                             <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 relative">
                                <button onClick={() => setFormVisible(false)} className="absolute top-8 right-8 text-slate-400 hover:text-red-500"><X /></button>
                                <h3 className="text-2xl font-black mb-6">Create New Album</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input type="text" name="teacherName" value={formData.teacherName} onChange={handleChange} placeholder="Teacher Name" className="w-full bg-slate-50 rounded-2xl px-5 py-4 outline-none focus:border-indigo-600 border-2 border-transparent transition-all" />
                                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Event Title (e.g. Sports Day)" className="w-full bg-slate-50 rounded-2xl px-5 py-4 outline-none focus:border-indigo-600 border-2 border-transparent transition-all" />
                                    </div>
                                    <div className="relative h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50">
                                        <input type="file" multiple accept="image/*" onChange={handleFilesChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        <UploadCloud className="text-slate-400" />
                                        <p className="text-sm font-bold text-slate-500">{formData.images.length > 0 ? `${formData.images.length} images selected` : "Upload up to 15 images"}</p>
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all">
                                        {loading ? "Uploading..." : "Create Album"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* --- Folder Grid --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {posts.map((post, idx) => (
                            <div
                                key={idx}
                                className="group relative h-[400px] rounded-[2rem] overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100"
                                onClick={() => {
                                    setSelectedPostIndex(idx);
                                    setCurrentImgIndex(0);
                                }}
                            >
                                {/* Folder Cover Image (Pehli image) */}
                                <img
                                    src={post.imageUrl[0]}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Image Count Badge */}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                                    <Images size={14} />
                                    {post.imageUrl.length} Photos
                                </div>

                                {/* Folder Content Info */}
                                <div className="absolute bottom-0 inset-x-0 p-8">
                                    <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <FolderOpen size={14} /> Album
                                    </p>
                                    <h3 className="text-white font-bold text-2xl tracking-tight mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm font-medium">By {post.teacherName}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Cinematic Lightbox (Album Viewer) --- */}
                    {selectedPostIndex !== null && (
                        <div
                            className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl flex items-center justify-center z-[100] animate-in fade-in duration-300"
                            onClick={() => setSelectedPostIndex(null)}
                        >
                            {/* Close & Download Buttons */}
                            <div className="absolute top-8 right-8 flex gap-4 z-[110]">
                                <a
                                    href={posts[selectedPostIndex].imageUrl[currentImgIndex]}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white/10 hover:bg-white text-white hover:text-slate-900 h-12 w-12 flex items-center justify-center rounded-xl backdrop-blur-md transition-all"
                                >
                                    <Download size={20} />
                                </a>
                                <button
                                    onClick={() => setSelectedPostIndex(null)}
                                    className="bg-white/10 hover:bg-red-500 text-white h-12 w-12 flex items-center justify-center rounded-xl backdrop-blur-md transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Main Carousel Area */}
                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                
                                {/* Prev Button */}
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 md:left-10 z-10 bg-white/10 hover:bg-indigo-600 text-white h-14 w-14 flex items-center justify-center rounded-full backdrop-blur-md transition-all group"
                                >
                                    <MoveLeftIcon size={24} className="group-hover:-translate-x-1 transition-transform" />
                                </button>

                                {/* Content Display */}
                                <div className="relative max-w-5xl w-full flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
                                    <div className="relative">
                                        <img
                                            src={posts[selectedPostIndex].imageUrl[currentImgIndex]}
                                            alt="Gallery"
                                            className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
                                        />
                                        {/* Counter inside Lightbox */}
                                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/50 font-bold text-sm">
                                            {currentImgIndex + 1} / {posts[selectedPostIndex].imageUrl.length}
                                        </div>
                                    </div>
                                    
                                    <div className="text-center mt-4">
                                        <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight">
                                            {posts[selectedPostIndex].title}
                                        </h3>
                                        <p className="text-indigo-400 font-bold uppercase tracking-[2px] text-xs mt-2">
                                            Supervisor: {posts[selectedPostIndex].teacherName}
                                        </p>
                                    </div>
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 md:right-10 z-10 bg-white/10 hover:bg-indigo-600 text-white h-14 w-14 flex items-center justify-center rounded-full backdrop-blur-md transition-all group"
                                >
                                    <MoveRightIcon size={24} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            )}
            <Footer />
        </div>
    );
};

export default Gallery;