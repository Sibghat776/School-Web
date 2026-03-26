"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Download, MoveLeftIcon, MoveRightIcon, Plus, X, UploadCloud, GraduationCap, ImagePlus, CheckCircle2 } from "lucide-react";
import { showToast } from "../utils/commonFunctions";
import { baseUrl } from "../utils/baseUrl";

const Gallery = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [formData, setFormData] = useState({
        teacherName: "",
        title: "",
        images: []
    });

    const fileInputRef = useRef();

    const handleNextImage = () => {
        if (!selectedImage) return;
        const allImages = posts.flatMap(post => post.imageUrl);
        const currentIndex = allImages.findIndex(img => img === selectedImage.src);
        const nextIndex = (currentIndex + 1) % allImages.length;
        const nextImgUrl = allImages[nextIndex];
        const parentPost = posts.find(post => post.imageUrl.includes(nextImgUrl));
        setSelectedImage({ src: nextImgUrl, title: parentPost.title });
    }

    const handlePrevImage = () => {
        if (!selectedImage) return;
        const allImages = posts.flatMap(post => post.imageUrl);
        const currentIndex = allImages.findIndex(img => img === selectedImage.src);
        const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        const prevImgUrl = allImages[prevIndex];
        const parentPost = posts.find(post => post.imageUrl.includes(prevImgUrl));
        setSelectedImage({ src: prevImgUrl, title: parentPost.title });
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
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-200/20 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-violet-200/20 rounded-full blur-3xl -z-10" />

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
                <div className="w-full flex flex-col items-center justify-center py-24 space-y-8">
                    <div className="relative flex items-center justify-center h-28 w-28">
                        <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-indigo-200 border-t-indigo-600 animate-[spin_1.5s_linear_infinite]"></div>
                        <div className="absolute inset-3 rounded-full border-l-4 border-r-4 border-violet-200 border-l-violet-600 animate-[spin_1s_linear_infinite_reverse]"></div>
                        <div className="h-10 w-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-black tracking-[3px] text-slate-800 uppercase animate-pulse">
                            Rendering Archives
                        </p>
                    </div>
                </div>
            ) : (
                <section className="pb-28 px-4 md:px-10 lg:px-16 max-w-8xl mx-auto">

                    {/* --- Sleek Administrative Form Panel --- */}
                    {formVisible && (
                        <div className="max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top-6 duration-500">
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_25px_70px_rgba(15,23,42,0.07)] border border-slate-100/80 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 to-violet-600" />

                                <button
                                    onClick={() => setFormVisible(false)}
                                    className="absolute top-8 right-8 p-2.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all active:scale-90"
                                >
                                    <X size={18} />
                                </button>

                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
                                        <ImagePlus size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Expand the Gallery</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Upload memories & events</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Supervisor / Teacher</label>
                                            <input
                                                type="text"
                                                name="teacherName"
                                                value={formData.teacherName}
                                                onChange={handleChange}
                                                placeholder="e.g., Sir Arsalan"
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-slate-800"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Event Header</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="e.g., Annual Sports Day"
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-slate-800"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Visual Records</label>
                                        <div className="relative group h-44 cursor-pointer">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                multiple
                                                accept="image/*"
                                                onChange={handleFilesChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="h-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 group-hover:border-indigo-500 bg-slate-50/50 group-hover:bg-white transition-all duration-300">
                                                <UploadCloud size={40} className="text-slate-400 group-hover:text-indigo-600 mb-3 transition-colors" />
                                                <p className="text-slate-700 font-bold tracking-tight">Drop files or click to browse</p>
                                                <p className="text-xs text-slate-400 font-medium mt-1">
                                                    {formData.images.length > 0 ? `${formData.images.length} files selected` : 'Supports multi-image uploads'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black text-sm uppercase tracking-[2px] py-5 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-indigo-100 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {loading ? "Transmitting Logic..." : "Sync into Gallery"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* --- Ultra Sleek Card Grid --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {posts.map((post, idx) =>
                            post.imageUrl.map((img, i) => (
                                <div
                                    key={`${idx}-${i}`}
                                    className="group relative h-[450px] rounded-3xl overflow-hidden bg-white shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(79,70,229,0.12)] transition-all duration-700 cursor-pointer border border-slate-100"
                                    onClick={() => setSelectedImage({ src: img, title: post.title })}
                                >
                                    <img
                                        src={img}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Quick Hover Top Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <CheckCircle2 size={12} /> Live Event
                                    </div>

                                    {/* Action Glass-Bottom UI */}
                                    <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col flex-1 min-w-0 pr-4">
                                                <span className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-1">
                                                    Event Metric
                                                </span>
                                                <h3 className="text-white font-bold text-xl tracking-tight truncate">
                                                    {post.title}
                                                </h3>
                                            </div>
                                            <a
                                                href={img}
                                                download={post.title || "image"}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-white hover:bg-indigo-600 text-slate-900 hover:text-white h-12 w-12 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 active:scale-90"
                                            >
                                                <Download size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* --- Dark cinematic Lightbox Portal --- */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-slate-950/98 backdrop-blur-md flex items-center justify-center z-[100] animate-in fade-in duration-300"
                            onClick={() => setSelectedImage(null)}
                        >
                            <div className="absolute top-8 right-8 flex gap-4 z-[110]">
                                <a
                                    href={selectedImage.src}
                                    download={selectedImage.title}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white/10 hover:bg-white text-white hover:text-slate-900 h-14 w-14 flex items-center justify-center rounded-2xl backdrop-blur-md transition-all active:scale-90"
                                >
                                    <Download size={24} />
                                </a>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="bg-white/10 hover:bg-red-500 text-white h-14 w-14 flex items-center justify-center rounded-2xl backdrop-blur-md transition-all active:scale-90"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-16">
                                {/* Navigation Left */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                    className="absolute left-4 md:left-12 z-10 bg-white/10 hover:bg-indigo-600 text-white h-16 w-16 flex items-center justify-center rounded-3xl backdrop-blur-md transition-all group active:scale-90"
                                >
                                    <MoveLeftIcon size={28} className="group-hover:-translate-x-1 transition-transform" />
                                </button>

                                <div className="relative max-w-5xl w-full flex flex-col items-center gap-8" onClick={(e) => e.stopPropagation()}>
                                    <img
                                        src={selectedImage.src}
                                        alt={selectedImage.title}
                                        className="w-auto max-h-[75vh] object-contain rounded-3xl shadow-[0_50px_100px_rgba(79,70,229,0.3)] border border-white/10"
                                    />
                                    <div className="bg-white/10 backdrop-blur-md px-10 py-4 rounded-full border border-white/20 shadow-2xl">
                                        <p className="text-white font-black text-xl md:text-2xl tracking-tight">
                                            {selectedImage.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Navigation Right */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                    className="absolute right-4 md:right-12 z-10 bg-white/10 hover:bg-indigo-600 text-white h-16 w-16 flex items-center justify-center rounded-3xl backdrop-blur-md transition-all group active:scale-90"
                                >
                                    <MoveRightIcon size={28} className="group-hover:translate-x-1 transition-transform" />
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