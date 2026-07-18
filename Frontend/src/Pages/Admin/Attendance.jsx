import React, { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Button, Input, Select, Badge } from '../../Components/ui';
import { attendanceService, studentService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const todayStr = () => new Date().toISOString().split('T')[0];

const AdminAttendance = () => {
  const [className, setClassName] = useState('');
  const [date, setDate] = useState(todayStr());
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadStudents = async () => {
    if (!className) { setStudents([]); return; }
    setLoading(true);
    try {
      const res = await studentService.getAll({ className });
      setStudents(res.data?.data?.students || []);
    } catch { setError(true); } finally { setLoading(false); }
  };

  const loadSaved = async () => {
    if (!className || !date) return;
    try {
      const res = await attendanceService.getClass({ className, date });
      setSaved(res.data?.data?.attendance || []);
    } catch { /* ignore */ }
  };

  useEffect(() => { loadSaved(); }, [className, date]);

  const setStatus = (gr, status) => setRecords({ ...records, [gr]: status });

  const save = async () => {
    if (!className || !date) return showToast('Select class and date', 'error');
    if (students.length === 0) return showToast('No students in class', 'error');
    const payload = {
      date, className,
      records: students.map((s) => ({ grNumber: s.grNumber, status: records[s.grNumber] || 'Present' })),
    };
    try {
      await attendanceService.mark(payload);
      showToast('Attendance saved', 'success');
      loadSaved();
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={loadStudents} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Attendance</h2>
      <PanelCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Class</label>
            <Input value={className} onChange={(e) => { setClassName(e.target.value); setStudents([]); }} placeholder="e.g. Grade 5" />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <Button onClick={loadStudents}>Load Students</Button>
        </div>
      </PanelCard>

      {students.length > 0 && (
        <PanelCard title={`Mark Attendance — ${className}`} action={<Button onClick={save}>Save Attendance</Button>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-4">GR #</th><th className="py-3 px-4">Name</th><th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 text-white">{s.grNumber}</td>
                    <td className="py-3 px-4">{s.name}</td>
                    <td className="py-3 px-4">
                      <Select value={records[s.grNumber] || 'Present'} onChange={(e) => setStatus(s.grNumber, e.target.value)} className="!py-1.5 !text-xs">
                        <option>Present</option><option>Absent</option><option>Late</option><option>Leave</option>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>
      )}

      {saved.length > 0 && (
        <PanelCard title={`Saved — ${className} (${date})`}>
          <div className="flex flex-wrap gap-2">
            {saved.map((a) => (
              <span key={a._id} className="flex items-center gap-2 bg-[#1e293b]/60 rounded-xl px-3 py-2 text-sm">
                <span className="text-white font-semibold">{a.student?.name || a.grNumber}</span>
                <Badge color={a.status === 'Present' ? 'green' : a.status === 'Absent' ? 'red' : a.status === 'Late' ? 'amber' : 'blue'}>{a.status}</Badge>
              </span>
            ))}
          </div>
        </PanelCard>
      )}
    </div>
  );
};

export default AdminAttendance;
