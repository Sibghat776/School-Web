import React, { useState } from 'react';
import {
  Edit, Trash2, UserPlus, Search,
  MoreVertical, CheckSquare, Square,
  GraduationCap, Calendar, DollarSign
} from 'lucide-react';

const TeachersList = () => {
  // Sample Data - Isko aap API se replace kar sakte hain
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Arsalan Ahmed", fatherName: "Ahmed Ali", designation: "Senior Math Teacher", appointmentDate: "12-Mar-2022", qualification: "M.Sc Mathematics", salary: "45,000" },
    { id: 2, name: "Sana Khan", fatherName: "Farooq Khan", designation: "Science Lead", appointmentDate: "05-Jan-2023", qualification: "B.Ed / M.Sc Physics", salary: "38,000" },
    { id: 3, name: "Zubair Sheikh", fatherName: "Yousuf Sheikh", designation: "IT Specialist", appointmentDate: "10-Feb-2024", qualification: "BSCS", salary: "55,000" },
    { id: 4, name: "Nabila Pervez", fatherName: "Pervez Alam", designation: "Junior Arts", appointmentDate: "20-Aug-2021", qualification: "B.A Fine Arts", salary: "32,000" },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);

  // --- Handlers ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(teachers.map(t => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteOne = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const deleteSelected = () => {
    if (window.confirm(`Delete ${selectedIds.length} selected records?`)) {
      setTeachers(teachers.filter(t => !selectedIds.includes(t.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div className="space-y-6">

      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Faculty <span className="text-blue-500">Directory</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase mt-1">
            Managing {teachers.length} Active Staff Members
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={deleteSelected}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all animate-in fade-in zoom-in"
            >
              <Trash2 size={16} />
              Delete Selected ({selectedIds.length})
            </button>
          )}

          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
            <UserPlus size={16} />
            Add New Teacher
          </button>
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="bg-[#1e293b]/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#0f172a]/50">
                <th className="p-6 w-12 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedIds.length === teachers.length && teachers.length > 0}
                    className="w-4 h-4 rounded border-slate-700 bg-darkBase text-blue-500 focus:ring-blue-500/20"
                  />
                </th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">S.No</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name / Father Name</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Designation</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date / Qualification</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Salary</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {teachers.map((teacher, index) => {
                const isSelected = selectedIds.includes(teacher.id);
                return (
                  <tr
                    key={teacher.id}
                    className={`group hover:bg-white/5 transition-colors ${isSelected ? 'bg-blue-500/5' : ''}`}
                  >
                    <td className="p-6 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(teacher.id)}
                        className="w-4 h-4 rounded border-slate-700 bg-darkBase text-blue-500 focus:ring-blue-500/20"
                      />
                    </td>

                    <td className="p-6">
                      <span className="text-xs font-bold text-slate-500">#{index + 1}</span>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">{teacher.name}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">S/O: {teacher.fatherName}</span>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f172a] border border-white/5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{teacher.designation}</span>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Calendar size={12} className="text-blue-500" />
                          <span className="text-[11px] font-bold">{teacher.appointmentDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 italic">
                          <GraduationCap size={12} />
                          <span className="text-[10px] font-medium">{teacher.qualification}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex items-center gap-1 text-emerald-400 font-black">
                        <span className="text-xs font-bold opacity-50">PKR</span>
                        <span className="text-sm tracking-tighter">{teacher.salary}</span>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2.5 bg-[#0f172a] text-slate-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all border border-white/5 shadow-inner">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteOne(teacher.id)}
                          className="p-2.5 bg-[#0f172a] text-slate-400 hover:text-white hover:bg-red-600 rounded-xl transition-all border border-white/5 shadow-inner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {teachers.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">No Records Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachersList;