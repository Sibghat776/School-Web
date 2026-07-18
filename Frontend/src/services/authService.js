import api from "./api";

export const authService = {
  adminLogin: (payload) => api.post("/auth/admin-login", payload),
  teacherLogin: (payload) => api.post("/auth/teacher-login", payload),
  studentLogin: (payload) => api.post("/auth/student-login", payload),
};
