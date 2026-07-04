import api, { withFallback } from "./axios.js";
import { teachers } from "../data/teachers.js";

export const getTeachers = () => withFallback(() => api.get("/teachers"), teachers);
export const getTeacher = (id) =>
  withFallback(() => api.get(`/teachers/${id}`), () => teachers.find((t) => t.id === id));
export const createTeacher = (payload) =>
  withFallback(() => api.post("/teachers", payload), { ...payload, id: `t_${Date.now()}` });
export const updateTeacher = (id, payload) =>
  withFallback(() => api.put(`/teachers/${id}`, payload), { id, ...payload });
export const deleteTeacher = (id) =>
  withFallback(() => api.delete(`/teachers/${id}`), { id, ok: true });