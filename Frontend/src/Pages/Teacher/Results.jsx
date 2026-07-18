import React, { useEffect, useState } from 'react';
import { Plus, Award } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge, Button, Input } from '../../Components/ui';
import { resultService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const TeacherResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ grNumber: '', className: '', examType: '', subject: '', marksObtained: '', totalMarks: 100, session: '' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await resultService.getClass({});
      setResults(res.data?.data?.results || []);
    } catch { setError(true); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    try {
      await resultService.add(form);
      showToast('Result saved', 'success');
      setForm({ grNumber: '', className: '', examType: '', subject: '', marksObtained: '', totalMarks: 100, session: '' });
      setShowForm(false);
      load();
    } catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this result?')) return;
    try { await resultService.remove(id); showToast('Deleted', 'success'); load(); }
    catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Results</h2>
        <Button onClick={() => setShowForm(!showForm)}><Plus size={16} className="mr-1 inline" />Add Result</Button>
      </div>

      {showForm && (
        <PanelCard title="New Result">
          <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="grNumber" value={form.grNumber} onChange={onChange} placeholder="GR Number" required />
            <Input name="className" value={form.className} onChange={onChange} placeholder="Class" required />
            <Input name="examType" value={form.examType} onChange={onChange} placeholder="Exam" required />
            <Input name="subject" value={form.subject} onChange={onChange} placeholder="Subject" required />
            <Input name="marksObtained" type="number" value={form.marksObtained} onChange={onChange} placeholder="Marks" required />
            <Input name="totalMarks" type="number" value={form.totalMarks} onChange={onChange} placeholder="Total" />
            <Input name="session" value={form.session} onChange={onChange} placeholder="Session" className="md:col-span-3" />
            <Button type="submit">Save</Button>
          </form>
        </PanelCard>
      )}

      <PanelCard>
        {results.length === 0 ? <EmptyState message="No results" icon={Award} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                <th className="py-3 px-4">Student</th><th className="py-3 px-4">Class</th><th className="py-3 px-4">Exam</th>
                <th className="py-3 px-4">Subject</th><th className="py-3 px-4">Marks</th><th className="py-3 px-4">Grade</th><th className="py-3 px-4">Action</th>
              </tr></thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{r.student?.name || r.grNumber}</td>
                    <td className="py-3 px-4">{r.className}</td>
                    <td className="py-3 px-4">{r.examType}</td>
                    <td className="py-3 px-4">{r.subject}</td>
                    <td className="py-3 px-4">{r.marksObtained}/{r.totalMarks}</td>
                    <td className="py-3 px-4"><Badge color={r.grade === 'F' ? 'red' : 'green'}>{r.grade}</Badge></td>
                    <td className="py-3 px-4"><Button variant="danger" onClick={() => remove(r._id)} className="!py-1.5">Delete</Button></td>
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

export default TeacherResults;
