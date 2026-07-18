import React, { useEffect, useState } from 'react';
import { Check, X, Eye, Trash2, Search, Filter } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input, Select } from '../../Components/ui';
import { registrationService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const statusColor = (s) =>
  s === 'Approved' ? 'green' : s === 'Rejected' ? 'red' : 'amber';

const Registrations = () => {
  const [regs, setRegs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);
  const [grInput, setGrInput] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await registrationService.getAll();
      setRegs(res.data?.data || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openDetail = async (id) => {
    try {
      const res = await registrationService.getById(id);
      setDetail(res.data?.data || null);
      setGrInput(res.data?.data?.grNumber || '');
    } catch {
      showToast('Failed to load details', 'error');
    }
  };

  const setStatus = async (id, status, grNumber) => {
    try {
      await registrationService.updateStatus(id, { status, grNumber });
      showToast(`Registration ${status.toLowerCase()}`, 'success');
      setDetail(null);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this registration?')) return;
    try {
      await registrationService.remove(id);
      showToast('Registration deleted', 'success');
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const filtered = regs.filter((r) => {
    const matchStatus = filter === 'All' || r.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.studentName?.toLowerCase().includes(q) ||
      r.fatherName?.toLowerCase().includes(q) ||
      (r.grNumber || '').toLowerCase().includes(q) ||
      (r.classAdmitted || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    All: regs.length,
    Pending: regs.filter((r) => r.status === 'Pending').length,
    Approved: regs.filter((r) => r.status === 'Approved').length,
    Rejected: regs.filter((r) => r.status === 'Rejected').length,
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-black text-white">Admission Registrations</h2>
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3 top-3 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name / father / GR / class"
            className="!pl-9"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['All', 'Pending', 'Approved', 'Rejected'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filter === s
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {s} <span className="opacity-60">({counts[s]})</span>
          </button>
        ))}
      </div>

      <PanelCard>
        {filtered.length === 0 ? (
          <EmptyState message="No registrations found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-4">GR #</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Father</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{r.grNumber || '—'}</td>
                    <td className="py-3 px-4">{r.studentName}</td>
                    <td className="py-3 px-4">{r.classAdmitted}</td>
                    <td className="py-3 px-4">{r.fatherName}</td>
                    <td className="py-3 px-4">{r.fatherContactNo}</td>
                    <td className="py-3 px-4">
                      <Badge color={statusColor(r.status)}>{r.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="ghost" onClick={() => openDetail(r._id)} className="!py-1.5">
                          <Eye size={14} className="mr-1 inline" />View
                        </Button>
                        {r.status !== 'Approved' && (
                          <Button onClick={() => setStatus(r._id, 'Approved', r.grNumber)} className="!py-1.5 !bg-emerald-600 hover:!bg-emerald-500">
                            <Check size={14} className="mr-1 inline" />Approve
                          </Button>
                        )}
                        {r.status !== 'Rejected' && (
                          <Button variant="danger" onClick={() => setStatus(r._id, 'Rejected')} className="!py-1.5">
                            <X size={14} className="mr-1 inline" />Reject
                          </Button>
                        )}
                        <Button variant="danger" onClick={() => remove(r._id)} className="!py-1.5">
                          <Trash2 size={14} className="inline" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PanelCard>

      {detail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDetail(null)}>
          <div className="w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl p-8 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white">{detail.studentName}</h3>
              <Badge color={statusColor(detail.status)}>{detail.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
              <Field label="Class" value={detail.classAdmitted} />
              <Field label="Gender" value={detail.gender} />
              <Field label="Date of Birth" value={detail.dateOfBirth?.slice(0, 10)} />
              <Field label="Religion" value={detail.religion} />
              <Field label="Father" value={detail.fatherName} />
              <Field label="Father CNIC" value={detail.fatherCNIC} />
              <Field label="Father Contact" value={detail.fatherContactNo} />
              <Field label="Father Occupation" value={detail.fatherOccupation} />
              <Field label="Mother" value={detail.motherName} />
              <Field label="B-Form" value={detail.stdBFormNo} />
              <Field label="Last School" value={detail.lastSchoolAttended} />
              <Field label="Address" value={detail.address} />
            </div>

            {detail.status !== 'Approved' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">GR Number (optional, auto-generated if blank)</label>
                <Input value={grInput} onChange={(e) => setGrInput(e.target.value)} placeholder="e.g. GR-1024" />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {detail.status !== 'Approved' && (
                <Button className="!bg-emerald-600 hover:!bg-emerald-500 flex-1" onClick={() => setStatus(detail._id, 'Approved', grInput)}>
                  <Check size={16} className="mr-1 inline" />Approve
                </Button>
              )}
              {detail.status !== 'Rejected' && (
                <Button variant="danger" className="flex-1" onClick={() => setStatus(detail._id, 'Rejected')}>
                  <X size={16} className="mr-1 inline" />Reject
                </Button>
              )}
              <Button variant="ghost" onClick={() => setDetail(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value }) => (
  <div className="bg-white/5 rounded-xl px-3 py-2">
    <p className="text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
    <p className="text-white font-medium truncate">{value || '—'}</p>
  </div>
);

export default Registrations;
