import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Hash, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Input, Button } from "../Components/ui";

const StudentLogin = () => {
  const [form, setForm] = useState({ grNumber: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login("student", form);
      navigate("/student", { replace: true });
    } catch {
      // toast handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-600/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-slate-500 text-xs mb-6 hover:text-slate-300">
          <ArrowLeft size={14} /> Back to website
        </button>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#7c2d12] to-[#b45309] p-10 text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 rotate-3">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-bold">Student Portal</h2>
            <p className="text-amber-100/70 text-sm mt-2 font-light">Access your results, attendance & fees</p>
          </div>

          <form onSubmit={onSubmit} className="p-10 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">GR Number</label>
              <div className="relative">
                <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  name="grNumber"
                  value={form.grNumber}
                  onChange={onChange}
                  placeholder="e.g. GR-001"
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

            <Button type="submit" disabled={loading} className="w-full !bg-[#b45309] hover:!bg-[#92400e] !py-4 !rounded-2xl !font-bold">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
