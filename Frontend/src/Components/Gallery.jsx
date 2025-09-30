import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const images = [
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
    "https://thumbs.dreamstime.com/b/elementary-school-classroom-27014997.jpg",
];

const Gallery = () => {
    return (
        <>
            <Navbar />
            <section className="bg-[#f4f7f8] py-16 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-[#1d1449] mb-4">School Gallery</h2>
                    <p className="text-gray-600 mb-12">A glimpse into student life at Noor Public School</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 bg-white"
                            >
                                <img
                                    src={src}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Gallery;