import React, { useEffect, useState } from 'react';
import { Plus, Bell } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input, Select, Textarea } from '../../Components/ui';
import { diaryService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const AdminDiary = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ className: '' });
  const [form, setForm] = useState({ title: '', description: '', className: '', subject: '', dueDate: '' });

  const load = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.className) params.className = filters.className;
      const res = await diaryService.getAll(params);
      setEntries(res.data?.data?.entries || []);
    } catch { setError(true); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    try {
      await diaryService.create(form);
      showToast('Diary entry created', 'success');
      setForm({ title: '', description: '', className: '', subject: '', dueDate: '' });
      setShowForm(false);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    try { await diaryService.remove(id); showToast('Deleted', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Diary</h2>
        <Button onClick={() => setShowForm(!showForm)}><Plus size={16} className="mr-1 inline" />Add Entry</Button>
      </div>

      <Input value={filters.className} onChange={(e) => setFilters({ className: e.target.value })} placeholder="Filter by class" onKeyDown={(e) => e.key === 'Enter' && load()} />

      {showForm && (
        <PanelCard title="New Diary Entry">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="title" value={form.title} onChange={onChange} placeholder="Title" required />
            <Input name="className" value={form.className} onChange={onChange} placeholder="Class" required />
            <Input name="subject" value={form.subject} onChange={onChange} placeholder="Subject" />
            <Input name="dueDate" type="date" value={form.dueDate} onChange={onChange} />
            <Textarea name="description" value={form.description} onChange={onChange} placeholder="Description / homework" className="md:col-span-2" required />
            <Button type="submit">Create</Button>
          </form>
        </PanelCard>
      )}

      <PanelCard>
        {entries.length === 0 ? <EmptyState message="No diary entries" icon={Bell} /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((d) => (
              <div key={d._id} className="border border-white/5 rounded-xl p-4 bg-[#1e293b]/40">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-bold">{d.title}</p>
                    <p className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">{d.className} {d.subject && `• ${d.subject}`}</p>
                  </div>
                  <Button variant="danger" onClick={() => remove(d._id)} className="!py-1.5">Delete</Button>
                </div>
                <p className="text-slate-300 text-sm mt-2">{d.description}</p>
                {d.dueDate && <p className="text-amber-400 text-xs mt-2">Due: {d.dueDate}</p>}
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  );
};

export default AdminDiary;
