import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Generic data-fetching hook with loading/error/refetch.
 * Pass a stable async fetcher (wrap with useCallback in callers if needed).
 */
export function useApiResource(fetcher, { initialData = null, immediate = true, deps = [] } = {}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (mounted.current) setData(result);
      return result;
    } catch (err) {
      if (mounted.current) setError(err);
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) load().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return { data, setData, loading, error, refetch: load };
}