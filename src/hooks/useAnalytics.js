import { useCallback } from "react";
import { useApiResource } from "./useApiResource.js";
import * as api from "../api/analytics.js";

export function useAnalytics() {
  const fetcher = useCallback(() => api.getAnalyticsOverview(), []);
  const resource = useApiResource(fetcher, { initialData: null });
  return { ...resource, overview: resource.data, api };
}