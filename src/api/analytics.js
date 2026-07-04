import api, { withFallback } from "./axios.js";
import {
  attendanceWeekly,
  attendanceMonthly,
  statusPie,
} from "../data/attendance.js";

export const getAnalyticsOverview = () =>
  withFallback(() => api.get("/analytics/overview"), {
    weekly: attendanceWeekly,
    monthly: attendanceMonthly,
    status: statusPie,
  });
export const getAnalyticsInsights = () =>
  withFallback(() => api.get("/analytics/insights"), [
    { id: "i1", title: "Attendance is trending up 3.2% WoW", severity: "positive" },
    { id: "i2", title: "Grade 8-B has 4 students flagged at-risk", severity: "warning" },
    { id: "i3", title: "Physics late arrivals rose on Mondays", severity: "info" },
  ]);