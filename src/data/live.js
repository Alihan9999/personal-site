import { sinceDates } from './now';

const dayMs = 1000 * 60 * 60 * 24;

const dayDiff = (iso) => {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  return Math.max(0, Math.floor((Date.now() - then) / dayMs));
};

export const buildCommit = typeof __BUILD_COMMIT__ === 'string' ? __BUILD_COMMIT__ : 'dev';
export const buildTime = typeof __BUILD_TIME__ === 'string' ? __BUILD_TIME__ : new Date().toISOString();

export function buildAge() {
  const days = dayDiff(buildTime);
  if (days === null) return '—';
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  return `${days}d ago`;
}

export function homelabUptime() {
  const days = dayDiff(sinceDates.homelabBootstrap);
  return days === null ? '—' : `${days}d`;
}

export function firstCommitYears() {
  const days = dayDiff(sinceDates.firstCommit);
  if (days === null) return '7y';
  const years = Math.max(1, Math.floor(days / 365));
  return `${years}y`;
}
