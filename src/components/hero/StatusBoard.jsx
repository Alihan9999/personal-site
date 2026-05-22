import { motion } from 'framer-motion';
import { useGitHubProfile } from '../../hooks/useGitHubProfile';
import { firstCommitYears, personaStatusRow } from '../../data';

const columns = [
  { key: 'name', label: 'NAME' },
  { key: 'role', label: 'ROLE' },
  { key: 'status', label: 'STATUS' },
  { key: 'repos', label: 'REPOS' },
  { key: 'followers', label: 'FOLLOWERS' },
  { key: 'since', label: 'SINCE' },
];

const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cellVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export function StatusBoard({ boot = false }) {
  const profile = useGitHubProfile();
  const row = {
    name: personaStatusRow.name,
    role: personaStatusRow.role,
    status: personaStatusRow.status,
    repos: profile.publicRepos,
    followers: profile.followers,
    since: `${profile.joinedYear} · ${firstCommitYears()}`,
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse font-mono text-sm">
        <thead>
          <tr className="text-left text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
            {columns.map((col) => (
              <th key={col.key} className="py-2 pr-6 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <motion.tr
            className="border-t border-white/10 light:border-slate-200/80"
            variants={rowVariants}
            initial={boot ? 'hidden' : 'visible'}
            animate="visible"
          >
            {columns.map((col) => {
              const value = row[col.key];
              const isStatus = col.key === 'status';
              const isLive = ['repos', 'followers'].includes(col.key);
              const dim = isLive && profile.fallback;
              const className = isStatus
                ? 'text-phosphor-400'
                : col.key === 'name'
                  ? 'text-amber-400'
                  : isLive
                    ? dim
                      ? 'text-slate-500'
                      : 'text-phosphor-400'
                    : 'text-slate-200 light:text-ink-700';
              return (
                <motion.td
                  key={col.key}
                  variants={cellVariants}
                  className={`py-3 pr-6 ${className}`}
                >
                  {value}
                </motion.td>
              );
            })}
          </motion.tr>
        </tbody>
      </table>
    </div>
  );
}
