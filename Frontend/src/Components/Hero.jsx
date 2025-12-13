import { useEffect, useState } from "react";
import { School, GraduationCap, Users } from "lucide-react";
import FounderImg from "../assets/founder.jpeg";
import img1 from "../assets/Slides/Image 2.jpg";
import img2 from "../assets/Slides/Image 3.jpg";
import img3 from "../assets/Slides/Image 5.jpg";

const images = [img1, img2, img3];

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
        <section className="relative h-screen w-full overflow-hidden bg-[#1d114e]">
            {/* Slides with smooth zoom + fade */}
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`slide-${i}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out transform ${index === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                />
            ))}

            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#234e18]/70 via-[#85bbd7]/30 to-transparent z-10"></div>

            {/* Hero Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-6 md:px-16">
                <div className="max-w-xl space-y-6">

                    {/* Founder Card */}
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                        <img
                            src={FounderImg}
                            alt="Founder"
                            className="w-24 h-24 rounded-full object-cover border-2 border-[#448026] shadow-lg"
                        />
                        <div>
                            <p className="text-white font-semibold text-lg">Mr. Zaka Ullah</p>
                            <p className="text-[#a8d5ba] text-sm tracking-wide">Founder & Chairman</p>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight animate-fadeInUp">
                        Shaping Future Through
                        <span className="block text-[#9ddeff] mt-2">Quality Education</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-[#e6e6e6] text-base md:text-lg leading-relaxed animate-fadeInUp delay-200">
                        Noor Public School is committed to academic excellence, character building,
                        and disciplined learning in a safe and inspiring environment.
                    </p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 pt-6">
                        {[
                            { icon: <School className="mx-auto text-[#125e8a] mb-2 animate-bounce" />, count: 1280, label: "Students" },
                            { icon: <GraduationCap className="mx-auto text-[#125e8a] mb-2 animate-bounce" />, count: 48, label: "Teachers" },
                            { icon: <Users className="mx-auto text-[#125e8a] mb-2 animate-bounce" />, count: 10, label: "Classes" },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center border border-[#ffffff]/10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                {stat.icon}
                                <p className="text-white text-xl font-semibold">
                                    <Counter target={stat.count} />+
                                </p>
                                <p className="text-[#d4d4d4] text-sm mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Optional CTA Button */}
                    <button className="mt-6 bg-[#448026] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        Admission
                    </button>

                </div>
            </div>

            {/* Fade In Animation */}
            <style>
                {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
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