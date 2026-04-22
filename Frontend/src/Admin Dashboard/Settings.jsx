import React, { use, useRef, useState } from 'react';
import { 
  Settings, User, Lock, Bell, 
  Globe, Save, Camera, ShieldCheck,
  School, Calendar
} from 'lucide-react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');

    const inputStyle = "w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-slate-600";
    const labelStyle = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block";
    const logo = useRef(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const handleLogoUpdation = () => {
        console.log(logo.current.files[0])
        const updatedLogo = logo?.current?.files[0]
        setLogoPreview(URL.createObjectURL(updatedLogo))
        return updatedLogo
    }

    return (
        <div className="space-y-8 max-w-5xl">
            
            {/* --- Header --- */}
            <div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                    System <span className="text-blue-500">Configuration</span>
                </h2>
                <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase mt-1">
                    Manage Institution Identity & Security
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* --- Left Navigation Tabs --- */}
                <div className="lg:w-64 flex flex-col gap-2">
                    {[
                        { id: 'general', label: 'School Profile', icon: School },
                        { id: 'academic', label: 'Academic Year', icon: Calendar },
                        { id: 'security', label: 'Security', icon: Lock },
                        { id: 'notifications', label: 'Notifications', icon: Bell },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                                activeTab === tab.id 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- Main Settings Panel --- */}
                <div className="flex-1 bg-[#1e293b]/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl">
                    
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-3xl bg-[#0f172a] border border-white/10 flex items-center justify-center overflow-hidden">
                                        {
                                            logoPreview ? 
                                            <img src={logoPreview} alt="School Logo" /> : 
                                            <School size={40} className="text-slate-700" />
                                        }
                                    </div>
                                    <label htmlFor="logo-upload" className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
                                        <Camera size={14} />
                                    </label>
                                    <input ref={logo} onChange={handleLogoUpdation} id="logo-upload" type="file" className="hidden" accept="image/*" title="Change Logo"/>
                                </div>
                                <div>
                                    <h4 className="text-white font-black uppercase tracking-tight">Institutional Logo</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Recommended: 512x512 PNG</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelStyle}>School Name</label>
                                    <input type="text" className={inputStyle} defaultValue="Noor Public School" />
                                </div>
                                <div>
                                    <label className={labelStyle}>Established Year</label>
                                    <input type="text" className={inputStyle} defaultValue="1998" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelStyle}>Office Address</label>
                                    <input type="text" className={inputStyle} defaultValue="Karachi, Pakistan" />
                                </div>
                                <div>
                                    <label className={labelStyle}>Contact Email</label>
                                    <input type="email" className={inputStyle} placeholder="info@noorpublic.edu" />
                                </div>
                                <div>
                                    <label className={labelStyle}>Phone Number</label>
                                    <input type="tel" className={inputStyle} placeholder="+92 000 0000000" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center gap-4">
                                <ShieldCheck className="text-blue-500" size={24} />
                                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Two-Factor Authentication is currently Active</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className={labelStyle}>Current Password</label>
                                    <input type="password" className={inputStyle} placeholder="••••••••" />
                                </div>
                                <div>
                                    <label className={labelStyle}>New Password</label>
                                    <input type="password" className={inputStyle} placeholder="••••••••" />
                                </div>
                                <div>
                                    <label className={labelStyle}>Confirm New Password</label>
                                    <input type="password" className={inputStyle} placeholder="••••••••" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Academic Settings */}
                    {activeTab === 'academic' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelStyle}>Active Academic Session</label>
                                    <select className={inputStyle + " appearance-none"}>
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelStyle}>Current Term</label>
                                    <select className={inputStyle + " appearance-none"}>
                                        <option>Final Term</option>
                                        <option>Mid Term</option>
                                        <option>First Term</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                        <button className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95">
                            <Save size={16} />
                            Save Configurations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;