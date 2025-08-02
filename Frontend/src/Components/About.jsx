import React from "react";
import { School, BookOpenCheck, HeartHandshake, Award } from "lucide-react";

const aboutCards = [
    {
        title: "Our Vision",
        description: "Empowering students with education that builds character and knowledge.",
        icon: <School className="w-8 h-8 text-white" />,
        bg: "bg-gradient-to-br from-[#4facfe] to-[#00f2fe]",
    },
    {
        title: "Our Curriculum",
        description: "A blend of academic excellence, creativity, and real-world skills.",
        icon: <BookOpenCheck className="w-8 h-8 text-white" />,
        bg: "bg-gradient-to-br from-[#f9d423] to-[#ff4e50]",
    },
    {
        title: "Our Values",
        description: "We instill discipline, honesty, inclusiveness, and curiosity in every learner.",
        icon: <HeartHandshake className="w-8 h-8 text-white" />,
        bg: "bg-gradient-to-br from-[#43e97b] to-[#38f9d7]",
    },
    {
        title: "Achievements",
        description: "1000+ students passed with distinction and many in national competitions.",
        icon: <Award className="w-8 h-8 text-white" />,
        bg: "bg-gradient-to-br from-[#fa709a] to-[#fee140]",
    },
];

const About = () => {
    return (
        <section className="w-full bg-[#f5f7fa] py-16 px-4 sm:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-[#1d1449] mb-4">
                    💫 About Noor Public School
                </h2>
                <p className="text-lg text-[#444] max-w-3xl mx-auto mb-12 leading-relaxed">
                    We aim to shape the future by empowering young minds through value-based education, innovation,
                    and inclusivity.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {aboutCards.map((card, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 shadow-xl text-left hover:scale-[1.03] transition-all duration-300 ${card.bg}`}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-[#1d1449] p-3 rounded-full shadow-md">{card.icon}</div>
                                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                            </div>
                            <p className="text-white text-md">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;