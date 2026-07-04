import { students } from "./students.js";

const statuses = ["Present","Present","Present","Present","Absent","Late","Leave"];
const SUBJECTS = ["AI","Machine Learning","DSA","DBMS","Operating Systems","Web Engineering"];

export const attendanceLogs = students.slice(0, 30).map((s, i) => ({
  id: `a_${i}`,
  studentId: s.id,
  student: s.name,
  rollNo: s.rollNo,
  className: s.className,
  avatar: s.avatar,
  subject: SUBJECTS[i % SUBJECTS.length],
  status: statuses[i % statuses.length],
  checkIn: `${8 + (i % 3)}:${String(5 + (i * 7) % 55).padStart(2,"0")} AM`,
  checkOut: `${2 + (i % 4)}:${String(5 + (i * 11) % 55).padStart(2,"0")} PM`,
  date: "2026-07-03",
}));

export const attendanceWeekly = [
  { day: "Mon", present: 412, absent: 32, late: 18 },
  { day: "Tue", present: 428, absent: 21, late: 13 },
  { day: "Wed", present: 401, absent: 44, late: 17 },
  { day: "Thu", present: 435, absent: 19, late: 8 },
  { day: "Fri", present: 419, absent: 28, late: 15 },
  { day: "Sat", present: 260, absent: 12, late: 6 },
];

export const attendanceMonthly = [
  { m: "Jan", rate: 92 },{ m: "Feb", rate: 94 },{ m: "Mar", rate: 91 },
  { m: "Apr", rate: 95 },{ m: "May", rate: 93 },{ m: "Jun", rate: 96 },
  { m: "Jul", rate: 97 },{ m: "Aug", rate: 94 },{ m: "Sep", rate: 92 },
  { m: "Oct", rate: 95 },{ m: "Nov", rate: 96 },{ m: "Dec", rate: 98 },
];

export const statusPie = [
  { name: "Present", value: 82, color: "#10B981" },
  { name: "Absent", value: 8, color: "#EF4444" },
  { name: "Late", value: 6, color: "#F59E0B" },
  { name: "Leave", value: 4, color: "#64748B" },
];

export const heatmap = Array.from({ length: 7 }).map((_, r) =>
  Array.from({ length: 24 }).map((_, c) => ({
    d: r, h: c, v: Math.round(Math.random() * 100),
  }))
);