import React from "react";
import { Megaphone, CalendarDays, AlertTriangle, Info } from "lucide-react";

const notices = [
    {
        title: "New Admissions Open",
        description: "Admissions for classes KG to Grade 10 are now open till 15th August 2025.",
        icon: <Megaphone className="text-white w-6 h-6" />,
        color: "from-[#34d399] to-[#10b981]",
    },
    {
        title: "Holiday Notice",
        description: "School will remain closed on 14th August for Independence Day.",
        icon: <CalendarDays className="text-white w-6 h-6" />,
        color: "from-[#60a5fa] to-[#3b82f6]",
    },
    {
        title: "Exam Schedule Released",
        description: "Mid-term exam schedule is uploaded on the student portal.",
        icon: <AlertTriangle className="text-white w-6 h-6" />,
        color: "from-[#f472b6] to-[#ec4899]",
    },
    {
        title: "Parent-Teacher Meeting",
        description: "PTM will be held on 20th August in the school auditorium.",
        icon: <Info className="text-white w-6 h-6" />,
        color: "from-[#fbbf24] to-[#f59e0b]",
    },
];

const NoticeBoard = () => {
    return (
        <section className="w-full bg-gradient-to-br from-[#e0f7fa] to-[#e1f5fe] py-16 px-4 sm:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-[#1d1449]">
                    📌 Notice Board
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {notices.map((notice, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl shadow-xl border-l-8 p-6 flex items-start gap-4 transition-transform hover:scale-[1.015] border-l-[6px] bg-gradient-to-r ${notice.color}`}
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-[#1d1449] rounded-full shadow-md">
                                {notice.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#1d1449] mb-1">
                                    {notice.title}
                                </h3>
                                <p className="text-[#333]">{notice.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NoticeBoard;
