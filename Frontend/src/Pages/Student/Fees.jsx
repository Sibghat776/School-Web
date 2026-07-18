import React, { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge } from '../../Components/ui';
import { feeService } from '../../services';

const StudentFees = () => {
  const [fees, setFees] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await feeService.getAll();
        setFees(res.data?.data?.fees || []);
        setSummary(res.data?.data?.summary || {});
      } catch { setError(true); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">My Fees</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-white">Rs {summary.total || 0}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Total</p></div>
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-emerald-400">Rs {summary.paid || 0}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Paid</p></div>
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-amber-400">Rs {summary.pending || 0}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Pending</p></div>
      </div>

      <PanelCard>
        {fees.length === 0 ? <EmptyState message="No fee records" icon={Wallet} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                <th className="py-3 px-4">Type</th><th className="py-3 px-4">Amount</th><th className="py-3 px-4">Due</th><th className="py-3 px-4">Status</th>
              </tr></thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{f.feeType}</td>
                    <td className="py-3 px-4">Rs {f.amount}</td>
                    <td className="py-3 px-4">{f.dueDate}</td>
                    <td className="py-3 px-4"><Badge color={f.status === 'Paid' ? 'green' : f.status === 'Overdue' ? 'red' : 'amber'}>{f.status}</Badge></td>
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

export default StudentFees;
