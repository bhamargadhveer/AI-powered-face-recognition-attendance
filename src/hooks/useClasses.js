import { useCallback } from "react";
import { useApiResource } from "./useApiResource.js";
import * as api from "../api/classes.js";

export function useClasses() {
  const fetcher = useCallback(() => api.getClasses(), []);
  const resource = useApiResource(fetcher, { initialData: [] });
  return { ...resource, classes: resource.data || [], api };
}