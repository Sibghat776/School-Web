import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Bell, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = ({ menuItems, title, userLabel, homePath }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const pathName = location.pathname.split('/').pop() || 'Dashboard';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] font-sans selection:bg-blue-500 selection:text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full opacity-50"></div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-72 bg-[#0f172a] border-r border-white/5 flex flex-col p-6 z-50 shadow-2xl">
        <div className="flex items-center gap-4 px-2 mb-12 relative">
          <div className="absolute -left-4 w-12 h-12 bg-blue-600/20 blur-2xl rounded-full"></div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#2E3192] to-[#1BFFFF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3">
            <GraduationCap className="text-white" size={26} />
          </div>
          <div className="relative z-10">
            <h1 className="text-white font-black text-xl leading-tight tracking-tighter uppercase">
              Noor <span className="text-blue-400 font-light italic">Public</span>
            </h1>
            <p className="text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">{title}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.link}
                className={`relative group flex items-center justify-between px-4 py-4 rounded-2xl font-semibold text-sm transition-all duration-300
                  ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-transparent text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                )}
                <div className="flex items-center gap-4 relative z-10">
                  <span className={isActive ? 'text-blue-400' : 'group-hover:text-blue-400'}>
                    <Icon size={20} />
                  </span>
                  {item.label}
                </div>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button onClick={handleLogout} className="group w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all uppercase tracking-widest">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="ml-72 flex-1 flex flex-col relative z-10">
        <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 backdrop-blur-xl sticky top-0 z-40 bg-[#0f172a]/60">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{title}</span>
            <span className="text-slate-700">/</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">{pathName}</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0f172a]"></span>
            </button>
            <div className="flex items-center gap-4 bg-[#1e293b]/50 p-1.5 pr-4 rounded-2xl border border-white/5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-white leading-none uppercase tracking-tighter">{userLabel}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{auth?.role}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-10 flex-1">
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
