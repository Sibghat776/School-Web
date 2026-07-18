import React, { useEffect, useState } from 'react';
import { Users, GraduationCap, Wallet, ClipboardList, Bell, FileWarning } from 'lucide-react';
import { StatCard, Loading, ErrorState } from '../../Components/ui';
import { teacherService, studentService, salaryService, complaintService, notificationService } from '../../services';

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [teachers, students, salaries, complaints, notifications] = await Promise.all([
          teacherService.getAllTeachers(),
          studentService.getAll(),
          salaryService.getAll(),
          complaintService.getAll(),
          notificationService.getAll(),
        ]);
        setStats({
          teachers: teachers.data?.data?.teachers?.length || 0,
          students: students.data?.data?.count || 0,
          salaries: salaries.data?.data?.salaries?.length || 0,
          complaints: complaints.data?.data?.complaints?.length || 0,
          notifications: notifications.data?.data?.notifications?.length || 0,
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
      <h2 className="text-2xl font-black text-white">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard label="Teachers" value={stats.teachers} icon={Users} accent="blue" />
        <StatCard label="Students" value={stats.students} icon={GraduationCap} accent="emerald" />
        <StatCard label="Salary Records" value={stats.salaries} icon={Wallet} accent="violet" />
        <StatCard label="Complaints" value={stats.complaints} icon={FileWarning} accent="rose" />
        <StatCard label="Notifications" value={stats.notifications} icon={Bell} accent="amber" />
      </div>
    </div>
  );
};

export default Overview;
