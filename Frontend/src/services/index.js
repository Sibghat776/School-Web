import api from "./api";

export const authService = {
  adminLogin: (payload) => api.post("/auth/admin-login", payload),
  teacherLogin: (payload) => api.post("/auth/teacher-login", payload),
  studentLogin: (payload) => api.post("/auth/student-login", payload),
};

export const adminService = {
  getProfile: () => api.get("/admin/me"),
  changePassword: (payload) => api.post("/admin/change-password", payload),
};

export const teacherService = {
  getProfile: () => api.get("/teacher/me"),
  changePassword: (payload) => api.post("/teacher/me/change-password", payload),
  getAllApplications: () => api.get("/teacher/admin/teacher-applications"),
  updateApplication: (id, payload) => api.patch(`/teacher/admin/teacher/${id}`, payload),
  deleteApplication: (id) => api.delete(`/teacher/admin/teacher/${id}`),
  applyTeacher: (payload) => api.post("/teacher/apply", payload),

  getAllTeachers: () => api.get("/admin/teachers"),
  updateTeacher: (id, payload) => api.patch(`/admin/teacher/${id}`, payload),
  deleteTeacher: (id) => api.delete(`/admin/teacher/${id}`),
};

export const studentService = {
  create: (payload) => api.post("/students", payload),
  getAll: (params = {}) => api.get("/students", { params }),
  getById: (id) => api.get(`/students/${id}`),
  update: (id, payload) => api.patch(`/students/${id}`, payload),
  remove: (id) => api.delete(`/students/${id}`),
  resetPassword: (id, payload) => api.post(`/students/${id}/reset-password`, payload),

  getProfile: () => api.get("/students/me"),
  updateProfile: (payload) => api.patch("/students/me", payload),
  changePassword: (payload) => api.post("/students/me/change-password", payload),
};

export const salaryService = {
  getAll: () => api.get("/admin/salary"),
  create: (payload) => api.post("/admin/salary", payload),
  update: (id, payload) => api.patch(`/admin/salary/${id}`, payload),
  remove: (id) => api.delete(`/admin/salary/${id}`),
};

export const complaintService = {
  submit: (payload) => api.post("/complaint", payload),
  getAll: () => api.get("/complaint"),
  update: (id, payload) => api.patch(`/complaint/${id}`, payload),
  remove: (id) => api.delete(`/complaint/${id}`),
};

export const galleryService = {
  getPosts: () => api.get("/gallery/getPosts"),
  addPost: (payload) => api.post("/gallery/addPost", payload),
  deletePost: (id) => api.delete(`/gallery/deletePost/${id}`),
};

export const contactService = {
  send: (payload) => api.post("/contact/sendMessage", payload),
  getAll: () => api.get("/contact/getMessages"),
};

export const attendanceService = {
  mark: (payload) => api.post("/attendance", payload),
  getClass: (params) => api.get("/attendance/class", { params }),
  getOwn: (params = {}) => api.get("/attendance/me", { params }),
  getOwnSummary: () => api.get("/attendance/me/summary"),
};

export const resultService = {
  add: (payload) => api.post("/results", payload),
  getClass: (params) => api.get("/results/class", { params }),
  getOwn: (params = {}) => api.get("/results/me", { params }),
  remove: (id) => api.delete(`/results/${id}`),
};

export const diaryService = {
  create: (payload) => api.post("/diary", payload),
  getAll: (params = {}) => api.get("/diary", { params }),
  update: (id, payload) => api.patch(`/diary/${id}`, payload),
  remove: (id) => api.delete(`/diary/${id}`),
};

export const feeService = {
  create: (payload) => api.post("/fees", payload),
  getAll: (params = {}) => api.get("/fees", { params }),
  pay: (id, payload) => api.post(`/fees/${id}/pay`, payload),
  update: (id, payload) => api.patch(`/fees/${id}`, payload),
  remove: (id) => api.delete(`/fees/${id}`),
};

export const notificationService = {
  create: (payload) => api.post("/notifications", payload),
  getAll: () => api.get("/notifications"),
  remove: (id) => api.delete(`/notifications/${id}`),
};

export const registrationService = {
  register: (payload) => api.post("/registration/register", payload),
  getAll: () => api.get("/registration/getStudents"),
  getById: (id) => api.get(`/registration/getStudent/${id}`),
  updateStatus: (id, payload) => api.patch(`/registration/updateStatus/${id}`, payload),
  remove: (id) => api.delete(`/registration/deleteStudent/${id}`),
  removeAll: () => api.delete("/registration/deleteAllStudents"),
};
