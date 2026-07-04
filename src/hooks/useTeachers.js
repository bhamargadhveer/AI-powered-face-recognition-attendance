import { useCallback } from "react";
import { useApiResource } from "./useApiResource.js";
import * as api from "../api/teachers.js";

export function useTeachers() {
  const fetcher = useCallback(() => api.getTeachers(), []);
  const resource = useApiResource(fetcher, { initialData: [] });
  return { ...resource, teachers: resource.data || [], api };
}