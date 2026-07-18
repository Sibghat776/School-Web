import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Input, Button } from "../Components/ui";
import { showToast } from "../utils/commonFunctions";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login("admin", form);
      navigate("/admin", { replace: true });
    } catch {
      // toast handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-slate-500 text-xs mb-6 hover:text-slate-300">
          <ArrowLeft size={14} /> Back to website
        </button>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#1d1449] to-[#2E3192] p-10 text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 rotate-3">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold">Admin Portal</h2>
            <p className="text-blue-200/70 text-sm mt-2 font-light">Verification required to access dashboard</p>
          </div>

          <form onSubmit={onSubmit} className="p-10 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="admin@school.com"
                  required
                  className="!pl-12 !bg-gray-50 !border-gray-100"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  required
                  className="!pl-12 !bg-gray-50 !border-gray-100"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full !bg-[#1d1449] hover:!bg-[#2e236b] !py-4 !rounded-2xl !font-bold">
              {loading ? "Authenticating..." : "Authenticate & Enter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
