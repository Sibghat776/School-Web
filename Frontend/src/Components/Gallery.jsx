"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Download, MoveLeftIcon, MoveRightIcon, Plus, X, UploadCloud, GraduationCap } from "lucide-react";
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

    const fileInputRef = useRef();

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${baseUrl}gallery/getPosts`);
            setPosts(res.data.data || []);
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
        <div className="bg-[#fcfdfe] min-h-screen font-sans">
            <Navbar />

            {/* --- Hero Section --- */}
            <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-b from-indigo-50/50 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                        <GraduationCap size={16} /> Campus Life
                    </div>
                    <h2
                        onClick={() => setFormVisible(!formVisible)}
                        className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                        School <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Gallery</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Capturing the moments of excellence, creativity, and student life at Noor Public School.
                    </p>
                </div>
            </section>

            <section className="pb-28 px-4 md:px-10 lg:px-20">
                {/* --- Upload Form (Refined) --- */}
                {formVisible && (
                    <div className="max-w-2xl mx-auto mb-20 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative">
                            <button
                                onClick={() => setFormVisible(false)}
                                className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                                    <UploadCloud size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">Add New Memories</h3>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        name="teacherName"
                                        value={formData.teacherName}
                                        onChange={handleChange}
                                        placeholder="Teacher Name"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                    />
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Event Title"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        multiple
                                        accept="image/*"
                                        onChange={handleFilesChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center group-hover:border-indigo-400 transition-colors">
                                        <p className="text-slate-500 font-medium">Click or Drag images to upload</p>
                                        <p className="text-xs text-slate-400 mt-1">High resolution images recommended</p>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    {loading ? "Processing..." : <><Plus size={20} /> Publish to Gallery</>}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- Gallery Grid --- */}
                <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {posts.map((post, idx) =>
                        post.imageUrl.map((img, i) => (
                            <div
                                key={`${idx}-${i}`}
                                className="group relative h-[400px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-[0_30px_60px_rgba(79,70,229,0.18)] transition-all duration-700 cursor-pointer border border-slate-400"
                                onClick={() => setSelectedImage({ src: img, title: post.title })}
                            >
                                <img
                                    src={img}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-110"
                                />

                                {/* Info Glass-Ribbon */}
                                <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-[1rem] p-4 shadow-2xl">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col flex-1 min-w-0 pr-4">
                                                <h3 className="text-slate-900 group group-hover:text-indigo-700 font-bold text-lg truncate">
                                                    {post.title}
                                                </h3>
                                            </div>
                                            <a
                                                href={img}
                                                download={post.title || "image"}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg hover:bg-indigo-600 transition-all duration-300 active:scale-90"
                                            >
                                                <Download size={20} />
                                            </a>
                                        </div>

                                        {/* Expandable Description */}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* --- Lightbox Modal (Ultra Premium) --- */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-300"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="absolute top-8 right-8 flex gap-4 z-[110]">
                            <a
                                href={selectedImage.src}
                                download={selectedImage.title}
                                target="_blank"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all active:scale-90"
                            >
                                <Download size={24} />
                            </a>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="bg-white/10 hover:bg-red-500 text-white p-4 rounded-full backdrop-blur-md transition-all active:scale-90"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                            {/* Prev Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                className="absolute left-4 md:left-10 z-10 bg-white/5 hover:bg-indigo-600 text-white p-5 rounded-full backdrop-blur-md transition-all group active:scale-90"
                            >
                                <MoveLeftIcon size={32} className="group-hover:-translate-x-1 transition-transform" />
                            </button>

                            <div className="relative max-w-6xl w-full flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="w-full max-h-[75vh] object-contain rounded-[2rem] shadow-[0_0_100px_rgba(79,70,229,0.2)]"
                                />
                                <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-2xl">
                                    <p className="text-white font-bold text-xl md:text-2xl tracking-tight">
                                        {selectedImage.title}
                                    </p>
                                </div>
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                className="absolute right-4 md:right-10 z-10 bg-white/5 hover:bg-indigo-600 text-white p-5 rounded-full backdrop-blur-md transition-all group active:scale-90"
                            >
                                <MoveRightIcon size={32} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
};

export default Gallery;