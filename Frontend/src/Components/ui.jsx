import React from 'react';
import { Loader2, Inbox } from 'lucide-react';

export const StatCard = ({ label, value, icon: Icon, accent = 'blue' }) => {
  const accents = {
    blue: 'from-blue-600/20 text-blue-400',
    emerald: 'from-emerald-600/20 text-emerald-400',
    amber: 'from-amber-600/20 text-amber-400',
    rose: 'from-rose-600/20 text-rose-400',
    violet: 'from-violet-600/20 text-violet-400',
  };
  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:border-blue-500/30 transition-all">
      {Icon && (
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accents[accent]} flex items-center justify-center`}>
          <Icon size={22} />
        </div>
      )}
      <div>
        <p className="text-3xl font-black text-white">{value}</p>
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
};

export const Loading = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center gap-3 py-20 text-slate-400">
    <Loader2 className="animate-spin" />
    <span className="text-sm font-semibold">{label}</span>
  </div>
);

export const EmptyState = ({ message = 'No records found', action }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-slate-500">
    <Inbox size={42} className="text-slate-700" />
    <p className="text-sm font-semibold">{message}</p>
    {action}
  </div>
);

export const ErrorState = ({ message = 'Something went wrong', onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-rose-400">
    <p className="text-sm font-semibold">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-300 text-xs font-bold uppercase tracking-widest hover:bg-rose-500/20">
        Retry
      </button>
    )}
  </div>
);

export const PanelCard = ({ title, children, action }) => (
  <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
    {title && (
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        {action}
      </div>
    )}
    {children}
  </div>
);

export const Badge = ({ children, color = 'slate' }) => {
  const colors = {
    slate: 'bg-slate-500/15 text-slate-300',
    green: 'bg-emerald-500/15 text-emerald-300',
    red: 'bg-rose-500/15 text-rose-300',
    amber: 'bg-amber-500/15 text-amber-300',
    blue: 'bg-blue-500/15 text-blue-300',
    violet: 'bg-violet-500/15 text-violet-300',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Input = (props) => (
  <input
    {...props}
    className={`w-full bg-[#1e293b]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 ${props.className || ''}`}
  />
);

export const Select = (props) => (
  <select
    {...props}
    className={`w-full bg-[#1e293b]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 ${props.className || ''}`}
  />
);

export const Textarea = (props) => (
  <textarea
    {...props}
    className={`w-full bg-[#1e293b]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 ${props.className || ''}`}
  />
);

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white',
    ghost: 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white',
  };
  return (
    <button
      {...props}
      className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
