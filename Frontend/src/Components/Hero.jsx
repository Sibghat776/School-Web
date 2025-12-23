import { useEffect, useState } from "react";
import { School, GraduationCap, Users } from "lucide-react";
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
        const duration = 1000;
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === target) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, [target]);

    return <span>{count}</span>;
};

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const slider = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(slider);
    }, []);

    return (
        <section className="relative h-[100vh] w-full overflow-hidden bg-[#1d114e]">
            {/* Slides */}
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`slide-${i}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out transform ${index === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                />
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#234e18]/60 via-gray-700/40 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-6xl mx-auto h-full flex items-center px-6 md:px-14 mt-5">
                <div className="max-w-lg space-y-5">

                    {/* Founder Card */}
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl shadow-lg hover:scale-[1.03] transition">
                        <img
                            src={FounderImg}
                            alt="Founder"
                            className="w-14 h-14 rounded-full object-cover border-2 border-[#448026]"
                        />
                        <div>
                            <p className="text-white font-semibold text-base">
                                Mr. Zaka Ullah
                            </p>
                            <p className="text-[#a8d5ba] text-xs tracking-wide">
                                Founder & Chairman
                            </p>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight animate-fadeInUp">
                        Shaping Future Through
                        <span className="block text-[#9ddeff] mt-1">
                            Quality Education
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-[#e6e6e6] text-sm md:text-base leading-relaxed animate-fadeInUp delay-200">
                        Noor Public School is committed to academic excellence,
                        character building, and disciplined learning in a safe
                        and inspiring environment.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-3">
                        {[
                            { icon: <School className="mx-auto text-[#125e8a]" />, count: 1280, label: "Students" },
                            { icon: <GraduationCap className="mx-auto text-[#125e8a]" />, count: 48, label: "Teachers" },
                            { icon: <Users className="mx-auto text-[#125e8a]" />, count: 10, label: "Classes" },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-white/10 backdrop-blur-md rounded-xl px-2 py-2 text-center border border-white/10 shadow hover:scale-[1.03] transition"
                            >
                                {stat.icon}
                                <p className="text-white text-lg font-semibold">
                                    <Counter target={stat.count} />+
                                </p>
                                <p className="text-[#d4d4d4] text-xs">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button className="mt-4 bg-[#448026] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow hover:scale-[1.04] transition">
                        Admission
                    </button>
                </div>
            </div>

            {/* Animations */}
            <style>
                {`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(18px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.9s ease-out forwards;
                }
                .animate-fadeInUp.delay-200 {
                    animation-delay: 0.2s;
                }
            `}
            </style>
        </section>
    );
};

export default Hero;