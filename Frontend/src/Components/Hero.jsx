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
        </div>
    );
};

export default Hero;