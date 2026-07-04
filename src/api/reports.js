import api, { withFallback } from "./axios.js";
import { attendanceMonthly } from "../data/attendance.js";

export const getReports = (params) =>
  withFallback(() => api.get("/reports", { params }), attendanceMonthly);
export const generateReport = (payload) =>
  withFallback(() => api.post("/reports/generate", payload), {
    id: `r_${Date.now()}`,
    status: "ready",
    ...payload,
  });