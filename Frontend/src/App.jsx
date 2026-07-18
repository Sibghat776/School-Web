import React from "react";
import Home from "./Pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Admission from "./Components/Admissions";
import About from "./Components/About";
import PageNotFound from "./Components/PageNotFound";
import Contact from "./Components/Contact";
import Gallery from "./Components/Gallery";
import Registration from "./Components/Registration";
import Complaint from "./Components/Complaint";
import TeacherApply from "./Pages/TeacherApply";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./Private Routes/ProtectedRoute";
import DashboardLayout from "./Components/DashboardLayout";
import AdminLogin from "./Pages/AdminLogin";
import TeacherLogin from "./Pages/TeacherLogin";
import StudentLogin from "./Pages/StudentLogin";

// Admin pages
import AdminOverview from "./Pages/Admin/Overview";
import AdminTeachers from "./Pages/Admin/TeachersList";
import AdminApplications from "./Pages/Admin/TeacherApplications";
import AdminStudents from "./Pages/Admin/Students";
import AdminSalary from "./Pages/Admin/TeachersSalary";
import AdminComplaints from "./Pages/Admin/Complaints";
import AdminAttendance from "./Pages/Admin/Attendance";
import AdminResults from "./Pages/Admin/Results";
import AdminFees from "./Pages/Admin/Fees";
import AdminDiary from "./Pages/Admin/Diary";
import AdminNotifications from "./Pages/Admin/Notifications";
import AdminGallery from "./Pages/Admin/Gallery";
import AdminSettings from "./Pages/Admin/Settings";
import AdminRegistrations from "./Pages/Admin/Registrations";

// Teacher pages
import TeacherDashboard from "./Pages/Teacher/Dashboard";
import TeacherAttendance from "./Pages/Teacher/Attendance";
import TeacherResults from "./Pages/Teacher/Results";
import TeacherDiary from "./Pages/Teacher/Diary";
import TeacherProfile from "./Pages/Teacher/Profile";

// Student pages
import StudentDashboard from "./Pages/Student/Dashboard";
import StudentResults from "./Pages/Student/Results";
import StudentAttendance from "./Pages/Student/Attendance";
import StudentDiary from "./Pages/Student/Diary";
import StudentFees from "./Pages/Student/Fees";
import StudentProfile from "./Pages/Student/Profile";

import {
  LayoutDashboard, Users, FileText, GraduationCap, Wallet,
  ClipboardCheck, Award, BookOpen, Bell, Image, Settings, UserCog, FileWarning,
} from "lucide-react";

const adminMenu = [
  { icon: LayoutDashboard, label: "Overview", link: "/admin/overview" },
  { icon: Users, label: "Teachers", link: "/admin/teachers" },
  { icon: FileText, label: "Applications", link: "/admin/applications" },
  { icon: GraduationCap, label: "Students", link: "/admin/students" },
  { icon: Wallet, label: "Salary", link: "/admin/salary" },
  { icon: FileWarning, label: "Complaints", link: "/admin/complaints" },
  { icon: ClipboardCheck, label: "Attendance", link: "/admin/attendance" },
  { icon: Award, label: "Results", link: "/admin/results" },
  { icon: Wallet, label: "Fees", link: "/admin/fees" },
  { icon: BookOpen, label: "Diary", link: "/admin/diary" },
  { icon: Bell, label: "Notifications", link: "/admin/notifications" },
  { icon: Image, label: "Gallery", link: "/admin/gallery" },
  { icon: Settings, label: "Settings", link: "/admin/settings" },
  { icon: FileText, label: "Registrations", link: "/admin/registrations" },
];

const teacherMenu = [
  { icon: LayoutDashboard, label: "Dashboard", link: "/teacher/dashboard" },
  { icon: ClipboardCheck, label: "Attendance", link: "/teacher/attendance" },
  { icon: Award, label: "Results", link: "/teacher/results" },
  { icon: BookOpen, label: "Diary", link: "/teacher/diary" },
  { icon: UserCog, label: "Profile", link: "/teacher/profile" },
];

const studentMenu = [
  { icon: LayoutDashboard, label: "Dashboard", link: "/student/dashboard" },
  { icon: Award, label: "Results", link: "/student/results" },
  { icon: ClipboardCheck, label: "Attendance", link: "/student/attendance" },
  { icon: BookOpen, label: "Diary", link: "/student/diary" },
  { icon: Wallet, label: "Fees", link: "/student/fees" },
  { icon: UserCog, label: "Profile", link: "/student/profile" },
];

const App = () => {
  return (
    <AuthProvider>
      <div>
        <ToastContainer />
        <Routes>
          {/* Public site */}
          <Route path="/" element={<Home />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/teacher/apply" element={<TeacherApply />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/about" element={<About />} />

          {/* Separate login experiences per role */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />

          {/* Admin panel */}
          <Route path="/admin" element={<ProtectedRoute roles={["admin"]} />}>
            <Route element={<DashboardLayout menuItems={adminMenu} title="Admin Suite" userLabel="Admin" />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="salary" element={<AdminSalary />} />
              <Route path="complaints" element={<AdminComplaints />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="results" element={<AdminResults />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="diary" element={<AdminDiary />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="registrations" element={<AdminRegistrations />} />
            </Route>
          </Route>

          {/* Teacher panel */}
          <Route path="/teacher" element={<ProtectedRoute roles={["teacher"]} />}>
            <Route element={<DashboardLayout menuItems={teacherMenu} title="Teacher Suite" userLabel="Teacher" />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="results" element={<TeacherResults />} />
              <Route path="diary" element={<TeacherDiary />} />
              <Route path="profile" element={<TeacherProfile />} />
            </Route>
          </Route>

          {/* Student panel */}
          <Route path="/student" element={<ProtectedRoute roles={["student"]} />}>
            <Route element={<DashboardLayout menuItems={studentMenu} title="Student Suite" userLabel="Student" />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="results" element={<StudentResults />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="diary" element={<StudentDiary />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
