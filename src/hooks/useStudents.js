import { useCallback } from "react";
import { useApiResource } from "./useApiResource.js";
import * as api from "../api/students.js";

export function useStudents() {
  const fetcher = useCallback(() => api.getStudents(), []);
  const resource = useApiResource(fetcher, { initialData: [] });
  return { ...resource, students: resource.data || [], api };
}