import api, { withFallback } from "./axios.js";
import { students } from "../data/students.js";

export const getStudents = () => withFallback(() => api.get("/students"), students);
export const getStudent = (id) =>
  withFallback(() => api.get(`/students/${id}`), () => students.find((s) => s.id === id));
export const createStudent = (payload) =>
  withFallback(() => api.post("/students", payload), { ...payload, id: `s_${Date.now()}` });
export const updateStudent = (id, payload) =>
  withFallback(() => api.put(`/students/${id}`, payload), { id, ...payload });
export const deleteStudent = (id) =>
  withFallback(() => api.delete(`/students/${id}`), { id, ok: true });