import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const colorMap = {
  live: 'bg-phosphor-400 shadow-[0_0_12px_rgba(52,211,154,0.6)]',
  warn: 'bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.55)]',
  muted: 'bg-slate-500',
};

const PULSE_CYCLES = 4;
const PULSE_DURATION_S = 1.6;

export function StatusDot({ status = 'live', label, className = '' }) {
  const reduced = useReducedMotion();
  const [pulsing, setPulsing] = useState(true);
  const color = colorMap[status] ?? colorMap.live;

  useEffect(() => {
    if (reduced || status !== 'live') return;
    const id = window.setTimeout(() => setPulsing(false), PULSE_CYCLES * PULSE_DURATION_S * 1000);
    return () => window.clearTimeout(id);
  }, [reduced, status]);

  const shouldAnimate = !reduced && status === 'live' && pulsing;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <motion.span
        className={`block h-2 w-2 rounded-full ${color}`}
        animate={shouldAnimate ? { opacity: [0.45, 1, 0.45] } : { opacity: 1 }}
        transition={
          shouldAnimate
            ? { duration: PULSE_DURATION_S, repeat: PULSE_CYCLES - 1, ease: 'easeInOut' }
            : { duration: 0.4 }
        }
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
