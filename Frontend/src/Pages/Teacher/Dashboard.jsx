import React, { useEffect, useState } from 'react';
import { ClipboardCheck, BookOpen, Award, Bell } from 'lucide-react';
import { StatCard, Loading, ErrorState } from '../../Components/ui';
import { attendanceService, resultService, diaryService, notificationService } from '../../services';

const TeacherDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [att, res, diary, notes] = await Promise.all([
          attendanceService.getClass({ className: '', date: new Date().toISOString().split('T')[0] }).catch(() => ({ data: { data: { attendance: [] } } })),
          resultService.getClass({}).catch(() => ({ data: { data: { results: [] } } })),
          diaryService.getAll({}).catch(() => ({ data: { data: { entries: [] } } })),
          notificationService.getAll().catch(() => ({ data: { data: { notifications: [] } } })),
        ]);
        setStats({
          attendance: att.data?.data?.attendance?.length || 0,
          results: res.data?.data?.results?.length || 0,
          diary: diary.data?.data?.entries?.length || 0,
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
      <h2 className="text-2xl font-black text-white">Teacher Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Attendance Records" value={stats.attendance} icon={ClipboardCheck} accent="blue" />
        <StatCard label="Results" value={stats.results} icon={Award} accent="emerald" />
        <StatCard label="Diary Entries" value={stats.diary} icon={BookOpen} accent="violet" />
        <StatCard label="Notifications" value={stats.notifications} icon={Bell} accent="amber" />
      </div>
    </div>
  );
};

export default TeacherDashboard;
