import React, { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge } from '../../Components/ui';
import { attendanceService } from '../../services';

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [att, sum] = await Promise.all([
          attendanceService.getOwn(),
          attendanceService.getOwnSummary(),
        ]);
        setAttendance(att.data?.data?.attendance || []);
        setSummary(sum.data?.data?.summary || {});
      } catch { setError(true); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">My Attendance</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-white">{summary.total || 0}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Total</p></div>
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-emerald-400">{summary.present || 0}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Present</p></div>
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-rose-400">{summary.absent || 0}</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Absent</p></div>
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5"><p className="text-2xl font-black text-blue-400">{summary.percentage || 0}%</p><p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">Percentage</p></div>
      </div>

      <PanelCard>
        {attendance.length === 0 ? <EmptyState message="No attendance records" icon={ClipboardCheck} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                <th className="py-3 px-4">Date</th><th className="py-3 px-4">Class</th><th className="py-3 px-4">Status</th>
              </tr></thead>
              <tbody>
                {attendance.map((a) => (
                  <tr key={a._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 text-white">{a.date}</td>
                    <td className="py-3 px-4">{a.className}</td>
                    <td className="py-3 px-4"><Badge color={a.status === 'Present' ? 'green' : a.status === 'Absent' ? 'red' : a.status === 'Late' ? 'amber' : 'blue'}>{a.status}</Badge></td>
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

export default StudentAttendance;
