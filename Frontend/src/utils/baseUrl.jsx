// Central API configuration. In dev we proxy /api to the local backend (see vite.config.js).
// For production, set VITE_API_URL (e.g. on Vercel) — otherwise defaults to /api.
export const baseUrl = import.meta.env.VITE_API_URL || "/api/";
