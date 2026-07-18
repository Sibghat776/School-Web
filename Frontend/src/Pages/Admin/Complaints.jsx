import React, { useEffect, useState } from 'react';
import { FileWarning } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Select, Textarea } from '../../Components/ui';
import { complaintService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusMap, setStatusMap] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const res = await complaintService.getAll();
      setComplaints(res.data?.data?.complaints || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const update = async (id) => {
    try {
      await complaintService.update(id, { status: statusMap[id] || 'Resolved' });
      showToast('Complaint updated', 'success');
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this complaint?')) return;
    try { await complaintService.remove(id); showToast('Deleted', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Complaints</h2>
      <PanelCard>
        {complaints.length === 0 ? <EmptyState message="No complaints" icon={FileWarning} /> : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c._id} className="border border-white/5 rounded-xl p-4 bg-[#1e293b]/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white font-bold">{c.parentName} <span className="text-slate-500 text-xs">({c.contactNumber})</span></p>
                    <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">{c.complaintCategory}</p>
                    <p className="text-slate-300 text-sm mt-2">{c.complaintMessage}</p>
                    {c.adminResponse && <p className="text-emerald-400 text-sm mt-2">↳ {c.adminResponse}</p>}
                  </div>
                  <Badge color={c.status === 'Resolved' ? 'green' : c.status === 'In Review' ? 'blue' : 'amber'}>{c.status}</Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Select value={statusMap[c._id] || c.status} onChange={(e) => setStatusMap({ ...statusMap, [c._id]: e.target.value })} className="!py-1.5 !text-xs max-w-[160px]">
                    <option>Pending</option><option>In Review</option><option>Resolved</option>
                  </Select>
                  <Button onClick={() => update(c._id)} className="!py-1.5">Update</Button>
                  <Button variant="danger" onClick={() => remove(c._id)} className="!py-1.5">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  );
};

export default Complaints;
