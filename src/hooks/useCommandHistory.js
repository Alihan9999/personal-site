import { useCallback, useState } from 'react';

const STORAGE_KEY = 'cmd:history';
const MAX = 30;

const readInitial = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(-MAX) : [];
  } catch {
    return [];
  }
};

export function useCommandHistory() {
  const [history, setHistory] = useState(readInitial);

  const push = useCallback((entry) => {
    setHistory((current) => {
      const next = [...current, entry].slice(-MAX);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { history, push };
}
