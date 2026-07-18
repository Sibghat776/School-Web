import React, { useEffect, useState } from 'react';
import { Award, ClipboardCheck, BookOpen, Wallet, Bell } from 'lucide-react';
import { StatCard, Loading, ErrorState } from '../../Components/ui';
import { resultService, attendanceService, diaryService, feeService, notificationService } from '../../services';

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [res, att, diary, fees, notes] = await Promise.all([
          resultService.getOwn().catch(() => ({ data: { data: { results: [] } } })),
          attendanceService.getOwnSummary().catch(() => ({ data: { data: { summary: {} } } })),
          diaryService.getAll({}).catch(() => ({ data: { data: { entries: [] } } })),
          feeService.getAll().catch(() => ({ data: { data: { fees: [], summary: {} } } })),
          notificationService.getAll().catch(() => ({ data: { data: { notifications: [] } } })),
        ]);
        setStats({
          results: res.data?.data?.results?.length || 0,
          attendancePct: att.data?.data?.summary?.percentage || 0,
          diary: diary.data?.data?.entries?.length || 0,
          pendingFees: fees.data?.data?.summary?.pending || 0,
          notifications: notes.data?.data?.notifications?.length || 0,
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Student Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard label="Results" value={stats.results} icon={Award} accent="emerald" />
        <StatCard label="Attendance %" value={`${stats.attendancePct}%`} icon={ClipboardCheck} accent="blue" />
        <StatCard label="Diary Entries" value={stats.diary} icon={BookOpen} accent="violet" />
        <StatCard label="Pending Fees" value={`Rs ${stats.pendingFees}`} icon={Wallet} accent="amber" />
        <StatCard label="Notifications" value={stats.notifications} icon={Bell} accent="rose" />
      </div>
    </div>
  );
};

export default StudentDashboard;
