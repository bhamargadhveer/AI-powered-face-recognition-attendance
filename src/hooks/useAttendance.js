import { useCallback } from "react";
import { useApiResource } from "./useApiResource.js";
import * as api from "../api/attendance.js";

export function useAttendance(params) {
  const fetcher = useCallback(() => api.getAttendanceLogs(params), [params]);
  const resource = useApiResource(fetcher, { initialData: [], deps: [params] });
  return { ...resource, logs: resource.data || [], api };
}