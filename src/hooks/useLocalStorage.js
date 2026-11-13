import { useCallback, useEffect, useRef, useState } from 'react';

function readStored(key, initial, normalize) {
  const fallback = () => (typeof initial === 'function' ? initial() : initial);
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback();
    const parsed = JSON.parse(raw);
    const result = normalize ? normalize(parsed) : parsed;
    return result ?? fallback();
  } catch {
    return fallback();
  }
}

/**
 * useState that persists to localStorage.
 * - normalize(parsed) may repair or reject stored data (return null to reject).
 * - Returns [value, setValue, flush]; flush() writes immediately and returns true on success.
 */
export function useLocalStorage(key, initial, normalize) {
  const [value, setValue] = useState(() => readStored(key, initial, normalize));
  const latest = useRef(value);

  useEffect(() => {
    latest.current = value;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked: the app keeps working in memory */
    }
  }, [key, value]);

  const flush = useCallback(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(latest.current));
      return true;
    } catch {
      return false;
    }
  }, [key]);

  return [value, setValue, flush];
}
