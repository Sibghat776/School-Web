import React from 'react';
import {
  Users, GraduationCap, Briefcase, Activity,
  ArrowUpRight, ArrowDownRight, Search, Filter,
  LayoutGrid, Zap, ShieldCheck, Download
} from 'lucide-react';

const Overview = () => {
  const stats = {
    totalStudents: "1,284",
    alumni: "856",
    placements: "92%",
    activeNow: "42"
  };

  const cards = [
    {
      label: "Total Students",
      value: stats.totalStudents,
      trend: "+12%",
      up: true,
      icon: <Users size={24} />,
      color: "blue"
    },
    {
      label: "Verified Alumni",
      value: stats.alumni,
      trend: "+5.4%",
      up: true,
      icon: <GraduationCap size={24} />,
      color: "indigo"
    },
    {
      label: "Placement Rate",
      value: stats.placements,
      trend: "-2%",
      up: false,
      icon: <Briefcase size={24} />,
      color: "emerald"
    },
    {
      label: "Active Session",
      value: stats.activeNow,
      trend: "Live",
      up: true,
      icon: <Activity size={24} />,
      color: "orange"
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 animate-in fade-in duration-700">

      {/* --- TOP COMMAND CENTER --- */}
      <div className="relative group overflow-hidden bg-[#1e293b]/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap size={18} className="text-blue-400 animate-pulse" />
              </div>
              <span className="text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">Intelligence Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Analytics <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">Studio.</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-4 max-w-md leading-relaxed">
              Monitor school performance, student growth metrics, and institutional health in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/search:text-blue-400 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search metrics..."
                className="bg-[#0f172a] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all w-full md:w-72 shadow-inner"
              />
            </div>
            <button className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95">
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="group relative bg-[#1e293b]/40 border border-white/5 p-8 rounded-[2.5rem] hover:bg-[#1e293b]/60 transition-all duration-500 hover:-translate-y-2 shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 rounded-2xl bg-[#0f172a] text-blue-400 shadow-inner group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black border ${card.up ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                {card.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {card.trend}
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{card.label}</p>
              <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{card.value}</h3>
            </div>

            {/* Background Decor Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.07] group-hover:rotate-12 transition-all duration-700 text-white">
              {React.cloneElement(card.icon, { size: 120 })}
            </div>
          </div>
        ))}
      </div>

      {/* --- CORE ANALYTICS ENGINE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Visual Chart Area */}
        <div className="lg:col-span-8 bg-[#0f172a] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Institutional <span className="text-blue-400">Velocity</span></h3>
              </div>
              <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Academic growth mapping (2025-26)</p>
            </div>
            <div className="flex bg-[#1e293b]/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
              {['Quarterly', 'Monthly', 'Annual'].map((t) => (
                <button key={t} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${t === 'Monthly' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Bars Grid */}
          <div className="flex items-end gap-3 md:gap-6 h-72 relative z-10">
            {[50, 80, 45, 95, 70, 90, 100, 60, 85, 75, 88, 92].map((h, i) => (
              <div key={i} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                <div
                  style={{ height: `${h}%` }}
                  className="w-full bg-gradient-to-t from-blue-600 via-blue-400 to-emerald-400 rounded-full opacity-20 group-hover/bar:opacity-100 group-hover/bar:scale-x-125 transition-all duration-500 relative shadow-[0_0_20px_rgba(59,130,246,0)] group-hover/bar:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-[#0f172a] text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all translate-y-4 group-hover/bar:translate-y-0 shadow-2xl pointer-events-none">
                    {h}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Background Gradients */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>
        </div>

        {/* Live Feed / Activity Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1e293b]/40 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                Security Protocol
              </h4>
              <ShieldCheck size={18} className="text-blue-400" />
            </div>

            <div className="flex-1 space-y-8">
              {[
                { text: "Student database encryption active", time: "Instant", color: "bg-blue-500" },
                { text: "Manual backup triggered", time: "14m ago", color: "bg-emerald-500" },
                { text: "High-achiever reports generated", time: "1h ago", color: "bg-orange-500" },
                { text: "Admission portal health 100%", time: "3h ago", color: "bg-indigo-500" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-4 group cursor-pointer">
                  <div className={`w-1 h-10 rounded-full ${alert.color} opacity-40 group-hover:opacity-100 transition-all`}></div>
                  <div>
                    <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">{alert.text}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-12 w-full py-4.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:border-blue-500/50 active:scale-[0.98]">
              View Full Logs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;