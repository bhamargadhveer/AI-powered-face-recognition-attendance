import api, { withFallback } from "./axios.js";
import { classes } from "../data/classes.js";

export const getClasses = () => withFallback(() => api.get("/classes"), classes);
export const getClass = (id) =>
  withFallback(() => api.get(`/classes/${id}`), () => classes.find((c) => c.id === id));
export const createClass = (payload) =>
  withFallback(() => api.post("/classes", payload), { ...payload, id: `c_${Date.now()}` });
export const updateClass = (id, payload) =>
  withFallback(() => api.put(`/classes/${id}`, payload), { id, ...payload });
export const deleteClass = (id) =>
  withFallback(() => api.delete(`/classes/${id}`), { id, ok: true });