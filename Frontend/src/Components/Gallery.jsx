"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Download, MoveLeftIcon, MoveRightIcon, Plus, X } from "lucide-react";
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
        const currentIndex = posts.flatMap(post => post.imageUrl).findIndex(img => img === selectedImage.src);
        console.log(currentIndex)
        const allImages = posts.flatMap(post => post.imageUrl);
        const nextIndex = (currentIndex + 1) % allImages.length;
        setSelectedImage({ src: allImages[nextIndex], title: posts.find(post => post.imageUrl.includes(allImages[nextIndex])).title });
    }

    const handlePrevImage = () => {
        if (!selectedImage) return;
        const currentIndex = posts.flatMap(post => post.imageUrl).findIndex(img => img === selectedImage.src);
        const allImages = posts.flatMap(post => post.imageUrl);
        const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        setSelectedImage({ src: allImages[prevIndex], title: posts.find(post => post.imageUrl.includes(allImages[prevIndex])).title });
    }

    const fileInputRef = useRef();

    // Fetch Posts from Backend
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

    // Handle Form Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilesChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    // Handle Form Submit
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
            console.log("API Hit horahi...")
            const res = await axios.post(`${baseUrl}gallery/addPost`, form);
            showToast("Post added successfully!", "success");
            console.log(res)
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
        <>
            <Navbar />
            <section className="bg-[#f4f7f8] py-28 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2
                        onClick={() => setFormVisible(!formVisible)}
                        className="text-4xl font-bold text-[#1d1449] mb-2">School Gallery</h2>
                    <p className="text-gray-600">A glimpse into student life at Noor Public School</p>
                </div>

                {/* --- Upload Form --- */}
                {formVisible && (
                    <div className="max-w-3xl mx-auto  mb-10 bg-white p-10 rounded-2xl shadow-lg relative">
                        <button
                            onClick={() => setFormVisible(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                type="text"
                                name="teacherName"
                                value={formData.teacherName}
                                onChange={handleChange}
                                placeholder="Teacher Name"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Post Title"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                accept="image/*"
                                onChange={handleFilesChange}
                                className="w-full"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                            >
                                {loading ? "Uploading..." : <><Plus size={16} /> Upload</>}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- Gallery Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-slate-50 min-h-screen">
                    {posts.map((post, idx) =>
                        post.imageUrl.map((img, i) => (
                            <div
                                key={`${idx}-${i}`}
                                className="group relative flex flex-col bg-white rounded shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-300 overflow-hidden cursor-pointer"
                                onClick={() => setSelectedImage({ src: img, title: post.title })}
                            >
                                {/* Image Container - Full Image Visibility */}
                                <div className="relative aspect-[4/4] bg-slate-100 overflow-hidden flex items-center justify-center p-2">
                                    <img
                                        src={img}
                                        alt={post.title}
                                        className="max-w-full max-h-full w-auto h-auto object-contain transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    />

                                    {/* Subtle Overlay on Hover */}
                                    <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Info Area (Formal Education Style) */}
                                <div className="p-4 border-t border-slate-100 bg-white">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <h3 className="text-slate-800 font-bold text-sm md:text-base line-clamp-2 leading-snug">
                                                {post.title}
                                            </h3>
                                        </div>

                                        {/* Download Action */}
                                        <a
                                            href={img}
                                            download={post.title || "image"}
                                            target="_blank"
                                            onClick={(e) => e.stopPropagation()} // Card click prevent karne ke liye
                                            className="bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white p-2 rounded-lg transition-colors duration-300 shadow-sm"
                                            title="Download Material"
                                        >
                                            <Download size={18} />
                                        </a>
                                    </div>
                                </div>

                                {/* Decorative Bottom Bar */}
                                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        ))
                    )}
                </div>

                {/* --- Lightbox Modal --- */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-6"
                        >
                            {/* Prev Button */}
                            <div
                                onClick={handlePrevImage}
                                className="flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 transition-all duration-300 p-5 md:p-6 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
                            >
                                <MoveLeftIcon className="text-indigo-700" size={40} />
                            </div>

                            {/* Image Display */}
                            <div className="relative w-full md:w-3/4 flex flex-col items-center">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl border-4 border-indigo-200"
                                />

                                {/* Title */}
                                <p className="text-indigo-900 font-bold text-lg md:text-xl text-center mt-3 uppercase tracking-wide bg-indigo-100/50 px-4 py-1 rounded-xl shadow-sm">
                                    {selectedImage.title}
                                </p>

                                {/* Buttons Overlay */}
                                <div className="absolute top-4 right-4 flex gap-3">
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300"
                                    >
                                        <X size={24} />
                                    </button>

                                    {/* Download Button */}
                                    <a
                                        href={selectedImage.src}
                                        download={selectedImage.title || "image"}
                                        target="_blank"
                                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                                    >
                                        <Download size={24} />
                                    </a>
                                </div>
                            </div>

                            {/* Next Button */}
                            <div
                                onClick={handleNextImage}
                                className="flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 transition-all duration-300 p-5 md:p-6 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
                            >
                                <MoveRightIcon className="text-indigo-700" size={40} />
                            </div>
                        </div>
                    </div>
                )}
            </section >
            <Footer />
        </>
    );
};

export default Gallery;