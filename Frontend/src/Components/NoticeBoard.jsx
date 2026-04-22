import React from "react";
import {
    Megaphone,
    CalendarDays,
    AlertTriangle,
    Info,
    ArrowUpRight,
    Pin
} from "lucide-react";

const notices = [
    {
        title: "Admission Open",
        description: "Admission for Grade Pre-Primary to Grade 9 are Open Now for the Session 2026 - 27.",
        icon: Megaphone,
        gradient: "from-blue-600 to-cyan-400",
        tag: "Admission"
    },
    {
        title: "Break Time",
        description: "School Break Time 10:00 AM to 10:30 AM tak ha !",
        icon: CalendarDays,
        gradient: "from-indigo-600 to-purple-500",
        tag: "Time"
    },
    {
        title: "School Timing",
        description: "School ka Main Gate 7:30 AM Se Khulega aur 8:00 AM Pe Gate Band Ho Jayega. Please be on time.",
        icon: AlertTriangle,
        gradient: "from-amber-500 to-orange-600",
        tag: "Time"
    },
    {
        title: "Chutti Time",
        description: "Chutti Ka waqt Pre-Primary Classes mein 12:45 PM ha Aur Baaki Classes ke liye 1:00 PM ha.",
        icon: Info,
        gradient: "from-emerald-500 to-teal-400",
        tag: "Info"
    },
];

const NoticeBoard = () => {
    return (
        <section className="w-full bg-black py-12">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Pin size={16} className="text-blue-500 rotate-45" />
                            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">Official Bulletin</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                            Notice <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">Board</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 text-xs font-bold max-w-xs uppercase tracking-widest leading-relaxed border-l-2 border-white/5 pl-6">
                        Stay synchronized with the latest institutional milestones and updates.
                    </p>
                </div>

                {/* --- NOTICES GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {notices.map((notice, index) => {
                        const Icon = notice.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:bg-[#1e293b]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
                            >
                                {/* Background Decorative Glow */}
                                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${notice.gradient} opacity-[0.03] group-hover:opacity-10 blur-2xl rounded-full transition-opacity`}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    
                                    {/* Top Row: Icon & Tag */}
                                    <div className="flex items-start justify-between mb-8">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${notice.gradient} flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon size={24} />
                                        </div>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">
                                            {notice.tag}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-black text-white mb-3 tracking-tighter group-hover:text-blue-400 transition-colors">
                                        {notice.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 flex-grow">
                                        {notice.description}
                                    </p>

                                    {/* Footer Action */}
                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Read Details</span>
                                        <div className="p-2 bg-white/5 rounded-xl text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Highlight */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-[2.5rem] transition-all pointer-events-none"></div>
                            </div>
                        );
                    })}
                </div>
                
                {/* --- BOTTOM DECOR --- */}
                <div className="mt-16 flex items-center justify-center gap-4 opacity-20">
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-slate-500"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">End of Bulletin</span>
                    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-slate-500"></div>
                </div>
            </div>
        </section>
    );
};

export default NoticeBoard;