import { useEffect, useState } from 'react';

const CACHE_KEY = 'gh:profile';
const TTL_MS = 1000 * 60 * 60; // 1 hour
const USERNAME = 'Alihan9999';

const FALLBACK = {
  publicRepos: 18,
  followers: 12,
  joinedYear: 2018,
  fallback: true,
};

const readCache = () => {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.cachedAt > TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ cachedAt: Date.now(), data }));
  } catch {
    /* storage unavailable, ignore */
  }
};

export function useGitHubProfile() {
  const [data, setData] = useState(() => readCache() ?? FALLBACK);

  useEffect(() => {
    const cached = readCache();
    if (cached) return undefined;

    const controller = new AbortController();
    fetch(`https://api.github.com/users/${USERNAME}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`gh ${response.status}`);
        return response.json();
      })
      .then((profile) => {
        const fresh = {
          publicRepos: profile.public_repos ?? FALLBACK.publicRepos,
          followers: profile.followers ?? FALLBACK.followers,
          joinedYear: profile.created_at ? new Date(profile.created_at).getUTCFullYear() : FALLBACK.joinedYear,
          fallback: false,
        };
        writeCache(fresh);
        setData(fresh);
      })
      .catch(() => {
        /* leave fallback in place */
      });

    return () => controller.abort();
  }, []);

  return data;
}
