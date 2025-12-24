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
        gradient: "from-[#2E3192] to-[#1BFFFF]",
    },
    {
        title: "Holiday Notice",
        description: "School will remain closed on 14th August for Independence Day.",
        icon: CalendarDays,
        gradient: "from-[#8E2DE2] to-[#4A00E0]",
    },
    {
        title: "Exam Schedule Released",
        description: "Mid-term exam schedule is uploaded on the student portal.",
        icon: AlertTriangle,
        gradient: "from-[#0BA360] to-[#3CBA92]",
    },
    {
        title: "Parent-Teacher Meeting",
        description: "PTM will be held on 20th August in the school auditorium.",
        icon: Info,
        gradient: "from-[#f7971e] to-[#ffd200]",
    },
];

const NoticeBoard = () => {
    return (
        <section className="w-full bg-[#f5f7fb] py-20 px-5">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1449] tracking-tight">
                        Notice Board
                    </h2>
                    <p className="mt-3 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
                        Stay updated with the latest announcements and important information
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                    {notices.map((notice, index) => {
                        const Icon = notice.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 to-gray-100 hover:from-transparent hover:to-transparent transition-all"
                            >
                                <div className="relative h-full rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm group-hover:shadow-lg transition-all p-6 flex flex-col">

                                    {/* Icon */}
                                    <div
                                        className={`w-12 h-12 mb-5 rounded-xl flex items-center justify-center bg-gradient-to-br ${notice.gradient} text-white shadow-md`}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-[#1d1449] mb-2">
                                        {notice.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                                        {notice.description}
                                    </p>

                                    {/* Bottom Accent */}
                                    <div
                                        className={`mt-6 h-1 w-10 rounded-full bg-gradient-to-r ${notice.gradient}`}
                                    />
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