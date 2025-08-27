import React from "react";
import {
    Megaphone,
    CalendarDays,
    AlertTriangle,
    Info,
} from "lucide-react";

const notices = [
    {
        title: "New Admissions Open",
        description: "Admissions for classes KG to Grade 10 are now open.",
        icon: Megaphone,
        color: "from-[#2E3192] to-[#1BFFFF]", // Royal Blue → Aqua
    },
    {
        title: "Holiday Notice",
        description: "School will remain closed on 14th August for Independence Day.",
        icon: CalendarDays,
        color: "from-[#8E2DE2] to-[#4A00E0]", // Purple → Dark Violet
    },
    {
        title: "Exam Schedule Released",
        description: "Mid-term exam schedule is uploaded on the student portal.",
        icon: AlertTriangle,
        color: "from-[#0BA360] to-[#3CBA92]", // Emerald Greens
    },
    {
        title: "Parent-Teacher Meeting",
        description: "PTM will be held on 20th August in the school auditorium.",
        icon: Info,
        color: "from-[#f7971e] to-[#ffd200]", // Sunset Orange → Gold
    },
];

const NoticeBoard = () => {
    return (
        <section className="w-full bg-[#F4F6F8] py-16 px-5">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#1d1449]">
                    Notice Board
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {notices.map((notice, index) => {
                        const Icon = notice.icon;
                        return (
                            <div
                                key={index}
                                className={`relative rounded-3xl p-[1px] shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 bg-gradient-to-r ${notice.color}`}
                            >
                                <div className="bg-white rounded-3xl p-6 h-full flex flex-col">
                                    <div
                                        className={`mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${notice.color} text-white shadow-md`}
                                    >
                                        <Icon size={26} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-[#1d1449]">
                                        {notice.title}
                                    </h3>
                                    <p className="text-gray-700 flex-grow">{notice.description}</p>
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