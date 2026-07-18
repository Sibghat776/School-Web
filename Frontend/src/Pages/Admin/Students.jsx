import React, { useEffect, useState } from 'react';
import { Search, Plus, UserPlus } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input, Select } from '../../Components/ui';
import { studentService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', grNumber: '', email: '', className: '', section: '', parentName: '', parentContact: '', password: '' });

  const load = async (q = '') => {
    setLoading(true);
    try {
      const res = await studentService.getAll(q ? { search: q } : {});
      setStudents(res.data?.data?.students || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    try {
      await studentService.create(form);
      showToast('Student created (default password = GR number)', 'success');
      setForm({ name: '', grNumber: '', email: '', className: '', section: '', parentName: '', parentContact: '', password: '' });
      setShowForm(false);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Create failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await studentService.remove(id);
      showToast('Student deleted', 'success');
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const resetPwd = async (id) => {
    try {
      await studentService.resetPassword(id, {});
      showToast('Password reset to GR number', 'success');
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={() => load()} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Students</h2>
        <Button onClick={() => setShowForm(!showForm)}><Plus size={16} className="mr-1 inline" />Add Student</Button>
      </div>

      {showForm && (
        <PanelCard title="New Student">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="name" value={form.name} onChange={onChange} placeholder="Full Name" required />
            <Input name="grNumber" value={form.grNumber} onChange={onChange} placeholder="GR Number" required />
            <Input name="email" value={form.email} onChange={onChange} placeholder="Email" />
            <Input name="className" value={form.className} onChange={onChange} placeholder="Class" />
            <Input name="section" value={form.section} onChange={onChange} placeholder="Section" />
            <Input name="parentName" value={form.parentName} onChange={onChange} placeholder="Parent Name" />
            <Input name="parentContact" value={form.parentContact} onChange={onChange} placeholder="Parent Contact" />
            <Input name="password" value={form.password} onChange={onChange} placeholder="Password (optional)" />
            <Button type="submit">Create</Button>
          </form>
        </PanelCard>
      )}

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-3.5 text-slate-500" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && load(search)} placeholder="Search name / GR / parent" className="!pl-9" />
      </div>

      <PanelCard>
        {students.length === 0 ? <EmptyState message="No students found" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-4">GR #</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Parent</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{s.grNumber}</td>
                    <td className="py-3 px-4">{s.name}</td>
                    <td className="py-3 px-4">{s.className || '—'}</td>
                    <td className="py-3 px-4">{s.parentName || '—'}</td>
                    <td className="py-3 px-4"><Badge color={s.status === 'Active' ? 'green' : 'amber'}>{s.status}</Badge></td>
                    <td className="py-3 px-4 flex gap-2">
                      <Button variant="ghost" onClick={() => resetPwd(s._id)} className="!py-1.5">Reset Pwd</Button>
                      <Button variant="danger" onClick={() => remove(s._id)} className="!py-1.5">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PanelCard>
    </div>
  );
};

export default Students;
