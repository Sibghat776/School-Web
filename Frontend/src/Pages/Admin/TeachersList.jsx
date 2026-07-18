import React, { useEffect, useState } from 'react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input, Select } from '../../Components/ui';
import { teacherService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: 'Approved', classAssigned: '' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await teacherService.getAllTeachers();
      setTeachers(res.data?.data?.teachers || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const startEdit = (t) => { setEditing(t._id); setForm({ status: t.status, classAssigned: t.classAssigned || '' }); };
  const cancel = () => { setEditing(null); };

  const save = async (id) => {
    try {
      await teacherService.updateTeacher(id, form);
      showToast('Teacher updated', 'success');
      setEditing(null);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Update failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this teacher?')) return;
    try {
      await teacherService.deleteTeacher(id);
      showToast('Teacher deleted', 'success');
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Delete failed', 'error');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Teachers</h2>
      <PanelCard>
        {teachers.length === 0 ? <EmptyState message="No teachers yet" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr key={t._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{t.name}</td>
                    <td className="py-3 px-4">{t.email}</td>
                    <td className="py-3 px-4">
                      {editing === t._id ? (
                        <Input value={form.classAssigned} onChange={(e) => setForm({ ...form, classAssigned: e.target.value })} placeholder="Class" className="!py-2" />
                      ) : (t.classAssigned || '—')}
                    </td>
                    <td className="py-3 px-4">
                      {editing === t._id ? (
                        <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="!py-2">
                          <option>Pending</option><option>Approved</option><option>Rejected</option>
                        </Select>
                      ) : (
                        <Badge color={t.status === 'Approved' ? 'green' : t.status === 'Rejected' ? 'red' : 'amber'}>{t.status}</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      {editing === t._id ? (
                        <>
                          <Button onClick={() => save(t._id)} className="!py-1.5">Save</Button>
                          <Button variant="ghost" onClick={cancel} className="!py-1.5">Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" onClick={() => startEdit(t)} className="!py-1.5">Edit</Button>
                          <Button variant="danger" onClick={() => remove(t._id)} className="!py-1.5">Delete</Button>
                        </>
                      )}
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

export default TeachersList;
