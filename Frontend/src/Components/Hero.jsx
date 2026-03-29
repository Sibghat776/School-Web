import { useEffect, useState } from "react";
import { School, GraduationCap, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Assets (Keep your existing imports)
import FounderImg from "../assets/founder.jpeg";
import img1 from "../assets/Slides/Image 1.jpeg";
import img2 from "../assets/Slides/Image 2.jpeg";
import img3 from "../assets/Slides/Image 3.jpeg";
import img4 from "../assets/Slides/Image 4.jpeg";
import img5 from "../assets/Slides/Image 5.jpeg";

const images = [img1, img2, img3, img4, img5];

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 2000; // Thoda slow aur smooth counter
        const stepTime = Math.max(Math.floor(duration / target), 30);
        const timer = setInterval(() => {
            start += Math.ceil(target / 50); // Badi values ke liye jump logic
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, stepTime);
        return () => clearInterval(timer);
    }, [target]);
    return <span>{count.toLocaleString()}</span>;
};

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const slider = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 6000); // 6 seconds for a more relaxed feel
        return () => clearInterval(slider);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-slate-900">
            {/* Background Slides with Ken Burns Effect */}
            {images.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === i ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={img}
                        alt={`slide-${i}`}
                        className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-linear transform ${index === i ? "scale-110" : "scale-100"
                            }`}
                    />
                </div>
            ))}

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 lg:px-16">
                <div className="max-w-2xl space-y-2">

                    {/* Founder Badge */}
                    <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl p-1.5 pr-6 rounded-full border border-white/20 shadow-2xl animate-fadeInLeft">
                        <img
                            src={FounderImg}
                            alt="Founder"
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#448026]"
                        />
                        <div>
                            <p className="text-white font-medium text-sm leading-none">Mr. Zaka Ullah</p>
                            <p className="text-[#a8d5ba] text-[10px] uppercase tracking-widest mt-1 font-bold">Founder & Chairman</p>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4">
                        <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight animate-fadeInUp">
                            Shaping The <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9ddeff] to-[#80d854]">
                                Leaders Of Tomorrow
                            </span>
                        </h1>
                        <p className="text-gray-200 text-lg md:text-lg max-w-lg leading-relaxed font-light animate-fadeInUp delay-300">
                            Noor Public School is committed to academic excellence and character building in an inspiring environment.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4 animate-fadeInUp delay-500">
                        <Link
                            to="/registration"
                            className="group bg-[#448026] hover:bg-[#35631e] text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl transition-all duration-300 flex items-center gap-2"
                        >
                            Enroll Your Child
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to={"/gallery"} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-sm font-bold transition-all">
                            Our Events
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 animate-fadeInUp delay-700">
                        {[
                            { icon: <Users className="text-[#9ddeff] w-5 h-5" />, count: 1280, label: "Students" },
                            { icon: <GraduationCap className="text-[#9ddeff] w-5 h-5" />, count: 48, label: "Teachers" },
                            { icon: <School className="text-[#9ddeff] w-5 h-5" />, count: 10, label: "Modern Labs" },
                        ].map((stat, idx) => (
                            <div key={idx} className="group cursor-default">
                                <div className="flex items-center gap-2 mb-1">
                                    {stat.icon}
                                    <span className="text-white text-2xl font-bold tracking-tight">
                                        <Counter target={stat.count} />+
                                    </span>
                                </div>
                                <p className="text-gray-400 text-xs uppercase tracking-widest font-medium group-hover:text-[#9ddeff] transition-colors">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style>
                {`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInLeft {
                    0% { opacity: 0; transform: translateX(-30px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
                .animate-fadeInLeft { animation: fadeInLeft 1s ease-out forwards; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-700 { animation-delay: 0.7s; }
                `}
            </style>
        </section>
    );
};

export default Hero;