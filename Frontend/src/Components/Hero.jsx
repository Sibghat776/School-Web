import { useEffect, useState } from "react";
import { School, GraduationCap, Users } from "lucide-react";
import img1 from "../assets/Slides/slide-1.avif";
import img2 from "../assets/Slides/slide-2.avif";
import img3 from "../assets/Slides/slide-3.avif";

const images = [img1, img2, img3];

// Counter component
const Counter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = target;
        if (start === end) return;

        let incrementTime = 1000 / end; // speed
        let timer = setInterval(() => {
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
        <div className="relative h-[90vh] w-full overflow-hidden">
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

            {/* Title */}
            <div className="absolute inset-0 bg-black bg-opacity-40 z-30 flex items-center justify-center">
                <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4 drop-shadow-lg">
                    Welcome to Noor Public School
                </h1>
            </div>

            {/* Stats section (bottom) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Box 1 */}
                    <div className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg text-center border border-white/30">
                        <School className="mx-auto text-blue-700 w-10 h-10" />
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            Since <Counter target={1998} />
                        </p>
                        <p className="text-gray-700 text-sm">Opening Year</p>
                    </div>

                    {/* Box 2 */}
                    <div className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg text-center border border-white/30">
                        <GraduationCap className="mx-auto text-green-700 w-10 h-10" />
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            <Counter target={2754} />
                        </p>
                        <p className="text-gray-700 text-sm">Students Enrolled</p>
                    </div>

                    {/* Box 3 */}
                    <div className="backdrop-blur-md bg-white/70 rounded-xl p-6 shadow-lg text-center border border-white/30">
                        <Users className="mx-auto text-yellow-600 w-10 h-10" />
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            <Counter target={58} />
                        </p>
                        <p className="text-gray-700 text-sm">Qualified Teachers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;