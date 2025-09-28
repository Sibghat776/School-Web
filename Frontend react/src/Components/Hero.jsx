import { useEffect, useState } from "react";
import { School, GraduationCap, Users } from "lucide-react";
import img1 from "../assets/Slides/Image 2.jpg";
import img2 from "../assets/Slides/Image 3.jpg";
import img3 from "../assets/Slides/Image 5.jpg";
import FounderImg from "../assets/founder.jpeg";

const images = [img1, img2, img3];

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = target;
        if (start === end) return;

        const incrementTime = 1000 / end;
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [target]);

    return <span>{count}</span>;
};

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[100vh] w-full overflow-hidden">
            {/* Slideshow */}
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`slide-${i}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === i ? "opacity-100 z-20" : "opacity-0 z-10"
                        }`}
                />
            ))}

            {/* Bottom Black Fade Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-30"></div>

            {/* Left-side Content */}
            <div className="absolute inset-0 z-40 flex items-end justify-start px-6 md:px-16 pb-12 md:pb-20">
                <div className="max-w-md text-left space-y-4">
                    {/* Founder Image */}
                    <div className="flex justify-start">
                        <img
                            src={FounderImg}
                            alt="Founder"
                            className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg mb-4"
                            title="Founder: Mr. Zaka Ullah"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg leading-tight">
                        Welcome to
                        <span className="block text-yellow-300 mt-2">
                            Noor Public School
                        </span>
                    </h1>

                    {/* Counters */}
                    <div className="mt-4 text-white space-y-3">
                        <div className="flex items-center gap-3">
                            <School className="text-yellow-500" />
                            <span>
                                <Counter target={1000} />+ Students
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <GraduationCap className="text-green-500" />
                            <span>
                                <Counter target={50} />+ Teachers
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="text-blue-500" />
                            <span>
                                <Counter target={10} />+ Classes
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;