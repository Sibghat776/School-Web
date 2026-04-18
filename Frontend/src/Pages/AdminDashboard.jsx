import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { User, ChevronDown, LayoutGrid, Bell, ShieldCheck } from 'lucide-react';
import Sidebar from '../Admin Dashboard/Sidebar';

const AdminDashboard = () => {
    const location = useLocation();

    // Breadcrumb logic: "/admin/overview" -> "Overview"
    const pathName = location.pathname.split("/").pop() || "Dashboard";

    return (
        <div className="flex min-h-screen bg-[#0b0f1a] font-sans selection:bg-blue-500 selection:text-white">

            {/* --- 1. PRO BACKGROUND DECOR --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full opacity-50"></div>
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
            </div>

            {/* --- 2. SIDEBAR --- */}
            <Sidebar />

            {/* --- 3. MAIN CONTENT AREA --- */}
            <div className="ml-72 flex-1 flex flex-col relative z-10">

                {/* --- TOP HEADER (Glassmorphism) --- */}
                <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 backdrop-blur-xl sticky top-0 z-40 bg-[#0f172a]/60">

                    {/* Dynamic Breadcrumbs */}
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <LayoutGrid size={16} className="text-blue-400" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Admin</span>
                            <span className="text-slate-700">/</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                                {pathName}
                            </span>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6">
                        {/* Notifications icon with indicator */}
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors group">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0f172a] group-hover:scale-125 transition-transform"></span>
                        </button>

                        {/* Admin Profile Section */}
                        <div className="flex items-center gap-4 bg-[#1e293b]/50 p-1.5 pr-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group shadow-lg">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-blue-500/20">
                                <div className="w-full h-full rounded-xl bg-[#0f172a] flex items-center justify-center overflow-hidden">
                                    <User size={18} className="text-white group-hover:scale-110 transition-transform" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-white leading-none uppercase tracking-tighter">Zaka Ullah</span>
                                    <ShieldCheck size={12} className="text-blue-400" />
                                </div>
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Super Admin</span>
                            </div>

                            <ChevronDown size={14} className="text-slate-500 group-hover:text-blue-400 transition-all group-hover:translate-y-0.5" />
                        </div>
                    </div>
                </header>

                {/* --- MAIN PAGE CONTENT --- */}
                <main className="p-10 flex-1">
                    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <Outlet />
                    </div>
                </main>

                {/* --- FOOTER --- */}
                <footer className="mt-auto py-8 px-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
                            © 2026 <span className="text-slate-400">Noor Public School</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                        <span className="text-[9px] font-black text-blue-400/60 uppercase tracking-widest">
                            Neural Core v4.0 Active
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminDashboard;