import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const colorMap = {
  live: 'bg-phosphor-400 shadow-[0_0_12px_rgba(52,211,154,0.6)]',
  warn: 'bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.55)]',
  muted: 'bg-slate-500',
};

export function StatusDot({ status = 'live', label, className = '' }) {
  const reduced = useReducedMotion();
  const color = colorMap[status] ?? colorMap.live;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <motion.span
        className={`block h-2 w-2 rounded-full ${color}`}
        animate={reduced || status !== 'live' ? undefined : { opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {label ? (
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-300 light:text-ink-700">
          {label}
        </span>
      ) : null}
    </span>
  );
}
