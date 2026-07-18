import React, { useEffect, useState } from 'react';
import { Plus, Bell } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input, Select, Textarea } from '../../Components/ui';
import { notificationService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const AdminNotifications = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', audience: 'All', className: '' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await notificationService.getAll();
      setNotes(res.data?.data?.notifications || []);
    } catch { setError(true); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    try {
      await notificationService.create(form);
      showToast('Notification sent', 'success');
      setForm({ title: '', message: '', audience: 'All', className: '' });
      setShowForm(false);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    try { await notificationService.remove(id); showToast('Deleted', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Notifications</h2>
        <Button onClick={() => setShowForm(!showForm)}><Plus size={16} className="mr-1 inline" />New</Button>
      </div>

      {showForm && (
        <PanelCard title="Send Notification">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="title" value={form.title} onChange={onChange} placeholder="Title" required />
            <Select name="audience" value={form.audience} onChange={onChange}>
              <option>All</option><option>Admin</option><option>Teacher</option><option>Student</option><option>Parent</option>
            </Select>
            <Input name="className" value={form.className} onChange={onChange} placeholder="Target class (optional)" />
            <Textarea name="message" value={form.message} onChange={onChange} placeholder="Message" className="md:col-span-2" required />
            <Button type="submit">Send</Button>
          </form>
        </PanelCard>
      )}

      <PanelCard>
        {notes.length === 0 ? <EmptyState message="No notifications" icon={Bell} /> : (
          <div className="space-y-3">
            {notes.map((n) => (
              <div key={n._id} className="border border-white/5 rounded-xl p-4 bg-[#1e293b]/40 flex items-start justify-between gap-4">
                <div>
                  <p className="text-white font-bold">{n.title}</p>
                  <p className="text-slate-300 text-sm mt-1">{n.message}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge color="blue">{n.audience}</Badge>
                    {n.className && <Badge color="violet">{n.className}</Badge>}
                  </div>
                </div>
                <Button variant="danger" onClick={() => remove(n._id)} className="!py-1.5">Delete</Button>
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  );
};

export default AdminNotifications;
