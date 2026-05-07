const variantClass = {
  tech: 'rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-200',
  tag: 'rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200',
  skill:
    'rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 light:bg-white/70 light:text-slate-700',
  ghost: 'rounded-full bg-white/6 px-3 py-1 text-xs text-slate-200',
};

export function Chip({ variant = 'tech', children, className = '' }) {
  return <span className={`${variantClass[variant]} ${className}`}>{children}</span>;
}
