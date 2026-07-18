import React, { useEffect, useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input, Select } from '../../Components/ui';
import { feeService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const AdminFees = () => {
  const [fees, setFees] = useState([]);
  const [summary, setSummary] = useState({ total: 0, paid: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ grNumber: '', feeType: '', amount: '', dueDate: '', remarks: '' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await feeService.getAll();
      setFees(res.data?.data?.fees || []);
      setSummary(res.data?.data?.summary || { total: 0, paid: 0, pending: 0 });
    } catch { setError(true); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    try {
      await feeService.create(form);
      showToast('Fee record created', 'success');
      setForm({ grNumber: '', feeType: '', amount: '', dueDate: '', remarks: '' });
      setShowForm(false);
      load();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  const pay = async (id) => {
    try { await feeService.pay(id, {}); showToast('Marked as paid', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this fee record?')) return;
    try { await feeService.remove(id); showToast('Deleted', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Fees</h2>
        <Button onClick={() => setShowForm(!showForm)}><Plus size={16} className="mr-1 inline" />Add Fee</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-white">Rs {summary.total}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Total</p></div>
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-emerald-400">Rs {summary.paid}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Collected</p></div>
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-amber-400">Rs {summary.pending}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Pending</p></div>
      </div>

      {showForm && (
        <PanelCard title="New Fee Record">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="grNumber" value={form.grNumber} onChange={onChange} placeholder="GR Number" required />
            <Input name="feeType" value={form.feeType} onChange={onChange} placeholder="Fee Type (e.g. Tuition)" required />
            <Input name="amount" type="number" value={form.amount} onChange={onChange} placeholder="Amount" required />
            <Input name="dueDate" type="date" value={form.dueDate} onChange={onChange} required />
            <Input name="remarks" value={form.remarks} onChange={onChange} placeholder="Remarks" className="md:col-span-2" />
            <Button type="submit">Create</Button>
          </form>
        </PanelCard>
      )}

      <PanelCard>
        {fees.length === 0 ? <EmptyState message="No fee records" icon={Wallet} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-4">Student</th><th className="py-3 px-4">Type</th><th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Due</th><th className="py-3 px-4">Status</th><th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{f.student?.name || f.grNumber}</td>
                    <td className="py-3 px-4">{f.feeType}</td>
                    <td className="py-3 px-4">Rs {f.amount}</td>
                    <td className="py-3 px-4">{f.dueDate}</td>
                    <td className="py-3 px-4"><Badge color={f.status === 'Paid' ? 'green' : f.status === 'Overdue' ? 'red' : 'amber'}>{f.status}</Badge></td>
                    <td className="py-3 px-4 flex gap-2">
                      {f.status !== 'Paid' && <Button variant="success" onClick={() => pay(f._id)} className="!py-1.5">Pay</Button>}
                      <Button variant="danger" onClick={() => remove(f._id)} className="!py-1.5">Delete</Button>
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

export default AdminFees;
