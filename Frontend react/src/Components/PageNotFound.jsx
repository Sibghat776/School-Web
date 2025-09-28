import React from "react";
import { Ghost, ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const PageNotFound = () => {
    return (
        <>
            <Navbar />
            <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-[#1d1449] px-6 relative overflow-hidden">
                {/* Floating animation shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse animation-delay-1000"></div>
                </div>

                <div className="z-10 text-center space-y-6">
                    <Ghost className="mx-auto text-[#1d1449] bg-white p-3 rounded-full shadow-lg animate-bounce" size={80} />
                    <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
                        404
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1449]">
                        Page Not Found
                    </h2>
                    <p className="text-[#5f5971] text-base sm:text-lg max-w-xl mx-auto">
                        Oops! The page you’re looking for doesn’t exist. It might have been removed or relocated. Don’t worry, you can find your way back!
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-[#1d1449] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#2c1d69] transition duration-300 group"
                    >
                        <ArrowLeftCircle className="group-hover:-translate-x-1 transition-transform duration-300" size={20} />
                        Back to Home
                    </Link>
                </div>
            </section>
        </>
    );
};

export default PageNotFound;