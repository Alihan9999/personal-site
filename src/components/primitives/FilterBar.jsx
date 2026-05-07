export function FilterBar({ options, value, onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={
              active
                ? 'rounded-full bg-cyan-400 px-4 py-2 text-sm text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.2)] transition'
                : 'rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40'
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
