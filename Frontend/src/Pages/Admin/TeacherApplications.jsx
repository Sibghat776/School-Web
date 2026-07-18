import React, { useEffect, useState } from 'react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Select } from '../../Components/ui';
import { teacherService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const TeacherApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const res = await teacherService.getAllApplications();
      setApps(res.data?.data?.applications || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const update = async (id, st) => {
    try {
      await teacherService.updateApplication(id, { status: st });
      showToast('Application updated', 'success');
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await teacherService.deleteApplication(id);
      showToast('Deleted', 'success');
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Teacher Applications</h2>
      <PanelCard>
        {apps.length === 0 ? <EmptyState message="No applications" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Father</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{a.teacherName}</td>
                    <td className="py-3 px-4">{a.fatherName}</td>
                    <td className="py-3 px-4">{a.classAssigned}</td>
                    <td className="py-3 px-4">{a.qualification}</td>
                    <td className="py-3 px-4"><Badge color={a.status === 'Approved' ? 'green' : a.status === 'Rejected' ? 'red' : 'amber'}>{a.status}</Badge></td>
                    <td className="py-3 px-4 flex gap-2 flex-wrap">
                      <Select value={status[a._id] || a.status} onChange={(e) => setStatus({ ...status, [a._id]: e.target.value })} className="!py-1.5 !text-xs">
                        <option>Pending</option><option>Approved</option><option>Rejected</option>
                      </Select>
                      <Button onClick={() => update(a._id, status[a._id] || a.status)} className="!py-1.5">Set</Button>
                      <Button variant="danger" onClick={() => remove(a._id)} className="!py-1.5">Delete</Button>
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

export default TeacherApplications;
