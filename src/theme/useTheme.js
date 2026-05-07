import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

const readInitial = () => {
  if (typeof document === 'undefined') return 'dark';
  const dataset = document.documentElement.dataset.theme;
  if (dataset === 'light' || dataset === 'dark') return dataset;
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
};

const apply = (next) => {
  const root = document.documentElement;
  root.classList.toggle('light', next === 'light');
  root.dataset.theme = next;
};

export function useTheme() {
  const [theme, setThemeState] = useState(readInitial);

  const setTheme = useCallback((next) => {
    apply(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable (private mode); ignore */
    }
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event) => {
      let stored = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored) return;
      const next = event.matches ? 'light' : 'dark';
      apply(next);
      setThemeState(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return { theme, setTheme, toggleTheme };
}
