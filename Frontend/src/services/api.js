import axios from "axios";
import { baseUrl } from "../utils/baseUrl.jsx";
import { showToast } from "../utils/commonFunctions.jsx";

const api = axios.create({
  baseURL: baseUrl,
});

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch {
      // ignore corrupt storage
    }
  }
  return config;
});

// Global error interceptor (optional auto-handling)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Optional: could auto-logout here
    }
    return Promise.reject(err);
  }
);

export default api;

// Helper to extract payload from backend response: { data: { data: ... } } or { data: ... }
export const unwrap = (res) => {
  const body = res?.data || {};
  if (body.data && "data" in body.data) {
    return body.data.data;
  }
  if (body.data) {
    return body.data.data !== undefined ? body.data.data : body.data;
  }
  return body;
};

export const apiError = (err, fallback = "Request failed") => {
  return err.response?.data?.message || fallback;
};

export { showToast };
