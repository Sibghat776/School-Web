import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard, Badge } from '../../Components/ui';
import { resultService } from '../../services';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await resultService.getOwn();
        setResults(res.data?.data?.results || []);
      } catch { setError(true); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">My Results</h2>
      <PanelCard>
        {results.length === 0 ? <EmptyState message="No results yet" icon={Award} /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-500 text-left text-[11px] uppercase tracking-widest border-b border-white/5">
                <th className="py-3 px-4">Exam</th><th className="py-3 px-4">Subject</th><th className="py-3 px-4">Marks</th><th className="py-3 px-4">Grade</th>
              </tr></thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r._id} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 px-4 font-semibold text-white">{r.examType}</td>
                    <td className="py-3 px-4">{r.subject}</td>
                    <td className="py-3 px-4">{r.marksObtained}/{r.totalMarks}</td>
                    <td className="py-3 px-4"><Badge color={r.grade === 'F' ? 'red' : 'green'}>{r.grade}</Badge></td>
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

export default StudentResults;
