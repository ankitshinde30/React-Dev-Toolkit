import { useCallback, useEffect, useState } from 'react';

export default function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((previous) => ({ ...previous, loading: true, error: null }));

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Request failed with status ' + response.status);
        return response.json();
      })
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ data: null, error, loading: false });
      });

    return () => controller.abort();
  }, [url, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { ...state, refetch };
}
