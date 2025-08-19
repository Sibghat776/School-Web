import React from "react";
import {
    Megaphone,
    CalendarDays,
    AlertTriangle,
    Info,
} from "lucide-react";

// Classy deep-gradient colour palette
const notices = [
    {
        title: "New Admissions Open",
        description: "Admissions for classes KG to Grade 10 are now open.",
        icon: Megaphone,
        color: "from-[#2E3192] to-[#1BFFFF]",       // Royal Blue → Aqua
    },
    {
        title: "Holiday Notice",
        description: "School will remain closed on 14th August for Independence Day.",
        icon: CalendarDays,
        color: "from-[#8E2DE2] to-[#4A00E0]",       // Purple → Dark Violet
    },
    {
        title: "Exam Schedule Released",
        description: "Mid-term exam schedule is uploaded on the student portal.",
        icon: AlertTriangle,
        color: "from-[#0BA360] to-[#3CBA92]",       // Emerald Greens
    },
    {
        title: "Parent-Teacher Meeting",
        description: "PTM will be held on 20th August in the school auditorium.",
        icon: Info,
        color: "from-[#f7971e] to-[#ffd200]",       // Sunset Orange → Gold
    },
];

const NoticeBoard = () => {
    return (
        <section className="w-full bg-[#F4F6F8] py-16 px-5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1d1449]">
                    Notice Board
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {notices.map((notice, index) => {
                        const Icon = notice.icon;
                        return (
                            <div
                                key={index}
                                className={`relative rounded-3xl p-[1px] shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer bg-gradient-to-r ${notice.color}`}
                            >
                                <div className="bg-white rounded-3xl p-6 h-full w-full">
                                    <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-[#1d1449] text-white">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-1 text-[#1d1449]">
                                        {notice.title}
                                    </h3>
                                    <p className="text-gray-700">{notice.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default NoticeBoard;