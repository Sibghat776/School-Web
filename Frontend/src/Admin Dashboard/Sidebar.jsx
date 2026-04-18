import React from 'react';
import {
    LayoutDashboard, Users, GraduationCap,
    Settings, LogOut, FileText, Bell, ChevronRight
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Overview", link: "/admin/overview" },
        { icon: <Users size={20} />, label: "Teachers List", link: "/admin/teachers" },
        { icon: <GraduationCap size={20} />, label: "Alumni Records", link: "/admin/alumni" },
        { icon: <FileText size={20} />, label: "Reports", link: "/admin/reports" },
        { icon: <Bell size={20} />, label: "Notifications", link: "/admin/notifications" },
        { icon: <Settings size={20} />, label: "Admin Settings", link: "/admin/settings" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/");
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-72 bg-[#0f172a] border-r border-white/5 flex flex-col p-6 z-50 shadow-2xl">

            {/* --- Logo Section --- */}
            <div className="flex items-center gap-4 px-2 mb-12 relative">
                {/* Decorative Glow behind logo */}
                <div className="absolute -left-4 w-12 h-12 bg-blue-600/20 blur-2xl rounded-full"></div>

                <div className="w-12 h-12 bg-gradient-to-br from-[#2E3192] to-[#1BFFFF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3 group-hover:rotate-0 transition-transform">
                    <GraduationCap className="text-white" size={26} />
                </div>

                <div className="relative z-10">
                    <h1 className="text-white font-black text-xl leading-tight tracking-tighter uppercase">
                        Noor <span className="text-blue-400 font-light italic">Public</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="h-[1px] w-4 bg-blue-500/50"></span>
                        <p className="text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">Admin Suite</p>
                    </div>
                </div>
            </div>

            {/* --- Navigation --- */}
            <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.link;
                    return (
                        <NavLink
                            key={index}
                            to={item.link}
                            className={`relative group flex items-center justify-between px-4 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 overflow-hidden
                                ${isActive
                                    ? 'bg-gradient-to-r from-blue-600/20 to-transparent text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                            )}

                            <div className="flex items-center gap-4 relative z-10">
                                <span className={`transition-transform duration-300 group-hover:scale-110 
                                    ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400'}`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </div>

                            {/* Chevron that appears on hover */}
                            <ChevronRight size={16} className={`transition-all duration-300 
                                ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-400'}`}
                            />
                        </NavLink>
                    );
                })}
            </nav>

            {/* --- Logout Section --- */}
            <div className="mt-auto pt-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="group w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all uppercase tracking-widest relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-red-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="relative z-10">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;