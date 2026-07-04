import api, { withFallback } from "./axios.js";
import {
  attendanceLogs,
  attendanceWeekly,
  attendanceMonthly,
  statusPie,
  heatmap,
} from "../data/attendance.js";

export const getAttendanceLogs = (params) =>
  withFallback(() => api.get("/attendance", { params }), attendanceLogs);
export const getAttendanceWeekly = () =>
  withFallback(() => api.get("/attendance/weekly"), attendanceWeekly);
export const getAttendanceMonthly = () =>
  withFallback(() => api.get("/attendance/monthly"), attendanceMonthly);
export const getAttendanceStatusBreakdown = () =>
  withFallback(() => api.get("/attendance/status"), statusPie);
export const getAttendanceHeatmap = () =>
  withFallback(() => api.get("/attendance/heatmap"), heatmap);
export const markAttendance = (payload) =>
  withFallback(() => api.post("/attendance", payload), { ...payload, id: `a_${Date.now()}` });
export const bulkUpdateAttendance = (payload) =>
  withFallback(() => api.post("/attendance/bulk", payload), { ok: true, ...payload });