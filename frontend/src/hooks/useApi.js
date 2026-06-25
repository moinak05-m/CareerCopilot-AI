import { useCallback, useEffect, useState } from "react";

/**
 * Generic fetch-on-mount hook with loading / error / refetch handling.
 * fn: () => Promise<data>
 */
export function useApi(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run().catch(() => {});
  }, [run]);

  return { data, setData, loading, error, refetch: run };
}
