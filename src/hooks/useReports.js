import { useCallback } from "react";
import { useApiResource } from "./useApiResource.js";
import * as api from "../api/reports.js";

export function useReports(params) {
  const fetcher = useCallback(() => api.getReports(params), [params]);
  const resource = useApiResource(fetcher, { initialData: [], deps: [params] });
  return { ...resource, reports: resource.data || [], api };
}