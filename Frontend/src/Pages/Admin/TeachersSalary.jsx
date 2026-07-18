import React, { useEffect, useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input, Select } from '../../Components/ui';
import { salaryService, teacherService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const TeachersSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ teacherId: '', employeeCode: '', joiningDate: '', monthlySalary: '', notes: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [s, t] = await Promise.all([salaryService.getAll(), teacherService.getAllTeachers()]);
      setSalaries(s.data?.data?.salaries || []);
      setTeachers(t.data?.data?.teachers || []);
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
      await salaryService.create(form);
      showToast('Salary record created', 'success');
      setForm({ teacherId: '', employeeCode: '', joiningDate: '', monthlySalary: '', notes: '' });
      setShowForm(false);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Create failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this salary record?')) return;
    try { await salaryService.remove(id); showToast('Deleted', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Teacher Salary</h2>
        <Button onClick={() => setShowForm(!showForm)}><Plus size={16} className="mr-1 inline" />Add Salary</Button>
      </div>

      {showForm && (
        <PanelCard title="New Salary Record">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select name="teacherId" value={form.teacherId} onChange={onChange} required>
              <option value="">Select Teacher</option>
              {teachers.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
            </Select>
            <Input name="employeeCode" value={form.employeeCode} onChange={onChange} placeholder="Employee Code" required />
            <Input name="joiningDate" type="date" value={form.joiningDate} onChange={onChange} required />
            <Input name="monthlySalary" type="number" value={form.monthlySalary} onChange={onChange} placeholder="Monthly Salary" required />
            <Input name="notes" value={form.notes} onChange={onChange} placeholder="Notes" className="md:col-span-2" />
            <Button type="submit">Create</Button>
          </form>
        </PanelCard>
      )}

      <PanelCard>
        {salaries.length === 0 ? <EmptyState message="No salary records" icon={Wallet} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-4">Teacher</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Joining</th>
                  <th className="py-3 px-4">Monthly</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((s) => (
                  <tr key={s._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{s.teacherId?.name || '—'}</td>
                    <td className="py-3 px-4">{s.employeeCode}</td>
                    <td className="py-3 px-4">{s.joiningDate?.slice(0, 10)}</td>
                    <td className="py-3 px-4">Rs {s.monthlySalary}</td>
                    <td className="py-3 px-4"><Badge color={s.status === 'Active' ? 'green' : 'amber'}>{s.status}</Badge></td>
                    <td className="py-3 px-4"><Button variant="danger" onClick={() => remove(s._id)} className="!py-1.5">Delete</Button></td>
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

export default TeachersSalary;
