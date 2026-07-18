import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Loading, EmptyState, ErrorState, PanelCard } from '../../Components/ui';
import { diaryService } from '../../services';

const StudentDiary = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await diaryService.getAll({});
        setEntries(res.data?.data?.entries || []);
      } catch { setError(true); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Class Diary</h2>
      <PanelCard>
        {entries.length === 0 ? <EmptyState message="No diary entries" icon={BookOpen} /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((d) => (
              <div key={d._id} className="border border-white/5 rounded-xl p-4 bg-[#1e293b]/40">
                <p className="text-white font-bold">{d.title}</p>
                <p className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">{d.className} {d.subject && `• ${d.subject}`}</p>
                <p className="text-slate-300 text-sm mt-2">{d.description}</p>
                {d.dueDate && <p className="text-amber-400 text-xs mt-2">Due: {d.dueDate}</p>}
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    </div>
  );
};

export default StudentDiary;
